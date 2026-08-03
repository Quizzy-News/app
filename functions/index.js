/**
 * Quizzy.News daily quiz generator — replacement for `getdailygemini`.
 *
 * ---------------------------------------------------------------------------
 * COST SAFETY — read this before changing anything
 * ---------------------------------------------------------------------------
 * In May 2026 this project ran up roughly $2,500 in five minutes because an
 * API key with access to the Gemini API was usable by someone outside the
 * project. Every design decision below exists to make that impossible to
 * repeat. Do not remove these guards to "simplify" the code.
 *
 *  1. ONE Gemini call per day. All articles go into a single batched request,
 *     never one request per article. Expected cost: about $0.03/month, which
 *     is inside the Gemini free tier.
 *  2. HARD DAILY RUN CAP. A counter in Firestore refuses more than
 *     MAX_RUNS_PER_DAY generations in any calendar day, no matter how many
 *     times anything triggers this function.
 *  3. THE MANUAL TRIGGER IS AUTHENTICATED. generateQuizNow requires a secret
 *     header. A public endpoint that spends money on each call is exactly the
 *     shape of the original incident.
 *  4. BOUNDED REQUEST AND RESPONSE. Article count, input characters, and
 *     maxOutputTokens are all capped, so a malformed feed cannot produce a
 *     huge bill.
 *  5. NO KEYS IN CODE. Both keys come from Secret Manager via defineSecret.
 *
 * Belt and braces on the platform side (see COST-SAFETY.md):
 *     - a Spend cap budget on the Gemini API, and another on Cloud Run
 *     - API key restricted to only the APIs it needs
 *     - a per-day quota on the Generative Language API
 * ---------------------------------------------------------------------------
 *
 * Exports:
 *   generateDailyQuiz — scheduled 05:30 America/New_York
 *   generateQuizNow   — HTTPS, requires the RUN_TOKEN secret in a header
 *   quizHealth        — HTTPS, public, read-only, no AI calls
 */

"use strict";

const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

const {
  dedupeArticles,
  buildPrompt,
  parseModelJson,
  buildQuizDocument,
} = require("./lib/quizBuilder");

admin.initializeApp();
const db = admin.firestore();

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const NEWS_API_KEY = defineSecret("NEWS_API_KEY");
// Shared secret for the manual trigger. Generate with:  openssl rand -hex 24
const RUN_TOKEN = defineSecret("RUN_TOKEN");

/* ------------------------- hard safety limits ------------------------- */
const MAX_RUNS_PER_DAY = 3;      // generation attempts per calendar day, ever
const MAX_ARTICLES = 15;         // articles sent to the model in one request
const MAX_PROMPT_CHARS = 30000;  // ~7,500 tokens; refuse anything larger
const MAX_OUTPUT_TOKENS = 4000;  // caps what we can be billed for per response
const GEMINI_TIMEOUT_MS = 90000;
/* ---------------------------------------------------------------------- */

const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const DEFAULT_SOURCES =
  "axios,associated-press,reuters,npr,bbc-news,the-verge,politico,bloomberg";
const REGION = "us-central1";

/** 'YYYY-MM-DD' in America/New_York, so the quiz day matches the newsroom day. */
function todayInNewYork() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Atomically claim one of today's allowed runs.
 * Throws if the day's budget is already used up. This is the guard that makes
 * a runaway loop or a repeated trigger cost nothing.
 */
async function claimDailyRun(date, reason) {
  const ref = db.collection("meta").doc("generatorRuns");
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? snap.data() : {};
    const count = data?.[date]?.count ?? 0;

    if (count >= MAX_RUNS_PER_DAY) {
      throw new Error(
        `Daily generation cap reached (${count}/${MAX_RUNS_PER_DAY} for ${date}). ` +
        `Refusing to call the AI again today. This is a cost guard, not a bug.`
      );
    }

    tx.set(
      ref,
      { [date]: { count: count + 1, lastReason: reason, lastAt: new Date().toISOString() } },
      { merge: true }
    );
    return count + 1;
  });
}

async function fetchArticles(apiKey) {
  const sources = process.env.NEWS_SOURCES || DEFAULT_SOURCES;
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    new URLSearchParams({ sources, pageSize: "40", language: "en" });

  const res = await fetch(url, { headers: { "X-Api-Key": apiKey } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`NewsAPI responded ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  if (json.status !== "ok") {
    throw new Error(`NewsAPI error: ${json.code} ${json.message}`);
  }
  return dedupeArticles(json.articles);
}

async function callGemini(apiKey, prompt) {
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  // Refuse to send an oversized prompt. Cost is driven by input size, so this
  // is the difference between a $0.001 request and an unbounded one.
  if (prompt.length > MAX_PROMPT_CHARS) {
    throw new Error(
      `Prompt is ${prompt.length} chars, over the ${MAX_PROMPT_CHARS} limit. Refusing to send.`
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
            maxOutputTokens: MAX_OUTPUT_TOKENS,
          },
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      // 404 here usually means a retired model. gemini-2.0-flash and
      // gemini-2.0-flash-lite were switched off on 1 June 2026.
      throw new Error(
        `Gemini responded ${res.status} for model "${model}": ${body.slice(0, 400)}`
      );
    }

    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error(
        `Gemini returned no text. finishReason=${json?.candidates?.[0]?.finishReason}`
      );
    }
    const usage = json?.usageMetadata ?? {};
    logger.info("Gemini usage", {
      model,
      promptTokens: usage.promptTokenCount,
      outputTokens: usage.candidatesTokenCount,
      totalTokens: usage.totalTokenCount,
    });
    return { text, model, usage };
  } finally {
    clearTimeout(timer);
  }
}

async function generate(reason) {
  const date = todayInNewYork();

  // Claim a run BEFORE spending anything.
  const runNumber = await claimDailyRun(date, reason);
  logger.info("Generating daily quiz", { date, runNumber, cap: MAX_RUNS_PER_DAY });

  const articles = (await fetchArticles(NEWS_API_KEY.value())).slice(0, MAX_ARTICLES);
  if (articles.length === 0) {
    throw new Error("No usable articles returned from NewsAPI");
  }

  const prompt = buildPrompt(articles, { questionsPerArticle: 1 });
  const { text, model, usage } = await callGemini(GEMINI_API_KEY.value(), prompt);
  const candidates = parseModelJson(text);

  const document = buildQuizDocument(articles, candidates, {
    date,
    model,
    generatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  document.usage = {
    promptTokens: usage.promptTokenCount ?? null,
    outputTokens: usage.candidatesTokenCount ?? null,
  };

  if (document.quiz.length < 5) {
    throw new Error(
      `Only ${document.quiz.length} of ${candidates.length} questions passed validation — ` +
      `refusing to publish a day that cannot be played.`
    );
  }

  await db.collection("dailies").doc(date).set(document, { merge: false });
  logger.info("Published daily quiz", { date, ...document.stats });
  return document;
}

exports.generateDailyQuiz = onSchedule(
  {
    schedule: "30 5 * * *",
    timeZone: "America/New_York",
    region: REGION,
    secrets: [GEMINI_API_KEY, NEWS_API_KEY],
    timeoutSeconds: 300,
    memory: "512MiB",
    maxInstances: 1,   // cost guard: never run in parallel
    retryCount: 1,     // one retry, not endless
  },
  async () => {
    await generate("scheduled");
  }
);

/**
 * Manual trigger. AUTHENTICATED ON PURPOSE.
 *
 * Call it with:
 *   curl -H "x-quizzy-token: YOUR_RUN_TOKEN" https://.../generateQuizNow
 *
 * An unauthenticated endpoint that spends money per request is precisely how
 * this project lost $2,500. Do not remove this check.
 */
exports.generateQuizNow = onRequest(
  {
    region: REGION,
    secrets: [GEMINI_API_KEY, NEWS_API_KEY, RUN_TOKEN],
    timeoutSeconds: 300,
    maxInstances: 1,
  },
  async (req, res) => {
    const provided = req.get("x-quizzy-token") || "";
    const expected = RUN_TOKEN.value();

    if (!expected || provided.length !== expected.length || provided !== expected) {
      logger.warn("Rejected unauthenticated generateQuizNow call", { ip: req.ip });
      res.status(403).json({ ok: false, error: "Forbidden" });
      return;
    }

    try {
      const doc = await generate("manual");
      res.status(200).json({ ok: true, date: doc.quizDate, stats: doc.stats, usage: doc.usage });
    } catch (err) {
      logger.error("Manual generation failed", err);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

/**
 * Public health endpoint. Point an uptime monitor at this.
 *
 * Read-only, no AI calls, one small Firestore read per request — comfortably
 * inside the Firestore free tier even if someone hammers it.
 *
 * 200 = a quiz was published within the last 2 days.
 * 503 = the pipeline has stalled.
 */
exports.quizHealth = onRequest(
  { region: REGION, maxInstances: 2 },
  async (req, res) => {
    res.set("Cache-Control", "public, max-age=300");
    try {
      const snap = await db
        .collection("dailies")
        .orderBy(admin.firestore.FieldPath.documentId(), "desc")
        .limit(1)
        .get();

      if (snap.empty) {
        return res.status(503).json({ ok: false, reason: "dailies collection is empty" });
      }

      const latest = snap.docs[0];
      const quiz = latest.data()?.quiz ?? [];
      const approved = quiz.filter((q) => {
        const key = Object.keys(q || {}).find((k) => k.trim() === "approved");
        return key ? q[key] === true : false;
      }).length;

      const today = todayInNewYork();
      const ageDays = Math.round(
        (Date.parse(today + "T00:00:00Z") - Date.parse(latest.id + "T00:00:00Z")) / 86400000
      );

      const healthy = ageDays <= 2;
      return res.status(healthy ? 200 : 503).json({
        ok: healthy,
        latestQuizDate: latest.id,
        ageDays,
        questionsInLatest: quiz.length,
        approvedInLatest: approved,
        playable: approved >= 5,
        checkedOn: today,
        reason: healthy ? "publishing normally" : `no quiz published for ${ageDays} days`,
      });
    } catch (err) {
      logger.error("Health check failed", err);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
);
