"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  isUsableArticle,
  dedupeArticles,
  buildPrompt,
  parseModelJson,
  buildQuestion,
  buildQuizDocument,
} = require("../lib/quizBuilder");

const article = (over = {}) => ({
  title: "Navy to escort ships out of the Strait of Hormuz",
  url: "https://www.axios.com/2026/05/03/navy-hormuz",
  description:
    "The U.S. Navy will begin escorting commercial vessels through the Strait of Hormuz " +
    "from Monday, the president said, after weeks of rising tension with Tehran.",
  content: "Officials described the move as a deterrent rather than an escalation.",
  source: { id: "axios", name: "Axios" },
  ...over,
});

const candidate = (over = {}) => ({
  articleIndex: 1,
  question: "Which waterway will the U.S. Navy begin escorting ships through?",
  choices: ["The Strait of Hormuz", "The Suez Canal", "The Bosphorus"],
  answer: "The Strait of Hormuz",
  ambiguity: "0.05",
  ...over,
});

/* ------------------------------------------------------------------ */
test("isUsableArticle accepts a well-formed article", () => {
  assert.equal(isUsableArticle(article()), true);
});

test("isUsableArticle rejects removed, untitled, and unlinked articles", () => {
  assert.equal(isUsableArticle(article({ title: "[Removed]" })), false);
  assert.equal(isUsableArticle(article({ title: "" })), false);
  assert.equal(isUsableArticle(article({ url: "" })), false);
  assert.equal(isUsableArticle(article({ url: "javascript:alert(1)" })), false);
  assert.equal(isUsableArticle(null), false);
  assert.equal(isUsableArticle(undefined), false);
});

test("isUsableArticle rejects articles with too little text to question", () => {
  assert.equal(isUsableArticle(article({ description: "Short.", content: "" })), false);
});

/* ------------------------------------------------------------------ */
test("dedupeArticles removes duplicate urls", () => {
  const distinct = article({ url: "https://x.com/b", title: "A wholly different headline today" });
  const out = dedupeArticles([article(), article(), distinct]);
  assert.equal(out.length, 2);
});

test("dedupeArticles removes syndicated duplicates by headline", () => {
  const out = dedupeArticles([
    article(),
    article({ url: "https://npr.org/other", source: { id: "npr", name: "NPR" } }),
  ]);
  assert.equal(out.length, 1);
});

test("dedupeArticles tolerates junk input", () => {
  assert.deepEqual(dedupeArticles(null), []);
  assert.deepEqual(dedupeArticles([null, 0, "x"]), []);
});

/* ------------------------------------------------------------------ */
test("buildPrompt includes every article and the JSON contract", () => {
  const prompt = buildPrompt([article(), article({ url: "https://x.com/2", title: "Second story here now" })]);
  assert.match(prompt, /### Article 1/);
  assert.match(prompt, /### Article 2/);
  assert.match(prompt, /Return ONLY a JSON array/);
  assert.match(prompt, /Strait of Hormuz/);
});

test("buildPrompt truncates very long article bodies", () => {
  const prompt = buildPrompt([article({ description: "x".repeat(5000) })]);
  assert.ok(prompt.length < 3000, `prompt was ${prompt.length} chars`);
});

/* ------------------------------------------------------------------ */
test("parseModelJson handles a bare array", () => {
  assert.equal(parseModelJson('[{"a":1}]').length, 1);
});

test("parseModelJson strips markdown fences", () => {
  assert.equal(parseModelJson('```json\n[{"a":1}]\n```').length, 1);
  assert.equal(parseModelJson('```\n[{"a":1}]\n```').length, 1);
});

test("parseModelJson recovers an array buried in chatter", () => {
  assert.equal(parseModelJson('Sure! Here you go:\n[{"a":1}]\nHope that helps.').length, 1);
});

test("parseModelJson throws clearly on unusable output", () => {
  assert.throws(() => parseModelJson(""), /empty/i);
  assert.throws(() => parseModelJson("no json at all"), /no JSON array/i);
  assert.throws(() => parseModelJson("[{broken"), /not valid JSON/i);
  assert.throws(() => parseModelJson('{"not":"an array"}'), /no JSON array|not a JSON array/i);
});

/* ------------------------------------------------------------------ */
test("buildQuestion produces a Firestore-ready question", () => {
  const q = buildQuestion(candidate(), article());
  assert.equal(q.question, candidate().question);
  assert.equal(q.answer, "The Strait of Hormuz");
  assert.equal(q.choices.length, 3);
  assert.equal(q.ambiguity, "0.05");
  assert.equal(q.source.name, "Axios");
  assert.equal(q.title, article().title);
});

test("buildQuestion always writes a clean `approved` key set to false", () => {
  const q = buildQuestion(candidate(), article());
  assert.equal(q.approved, false);
  // The bug that took the site down: a key with a trailing space.
  assert.deepEqual(
    Object.keys(q).filter((k) => k !== k.trim()),
    [],
    "no field name may contain leading or trailing whitespace"
  );
  assert.ok(Object.prototype.hasOwnProperty.call(q, "approved"));
});

test("buildQuestion rejects an answer that is not among the choices", () => {
  assert.equal(buildQuestion(candidate({ answer: "The Panama Canal" }), article()), null);
});

test("buildQuestion rejects the wrong number of choices", () => {
  assert.equal(buildQuestion(candidate({ choices: ["a", "b"] }), article()), null);
  assert.equal(buildQuestion(candidate({ choices: ["a", "b", "c", "d"] }), article()), null);
});

test("buildQuestion rejects duplicate choices", () => {
  assert.equal(
    buildQuestion(candidate({ choices: ["Same", "Same", "Other"], answer: "Same" }), article()),
    null
  );
});

test("buildQuestion rejects self-referential meta-questions", () => {
  const meta = candidate({
    question: "Based on the article excerpt, what is a potential outcome?",
    choices: ["Escalation", "Withdrawal", "Negotiation"],
    answer: "Escalation",
  });
  assert.equal(buildQuestion(meta, article()), null);
});

test("buildQuestion rejects empty or overlong questions", () => {
  assert.equal(buildQuestion(candidate({ question: "  " }), article()), null);
  assert.equal(buildQuestion(candidate({ question: "q".repeat(300) }), article()), null);
});

test("buildQuestion clamps and defaults the ambiguity score", () => {
  assert.equal(buildQuestion(candidate({ ambiguity: "5" }), article()).ambiguity, "1.00");
  assert.equal(buildQuestion(candidate({ ambiguity: "-2" }), article()).ambiguity, "0.00");
  assert.equal(buildQuestion(candidate({ ambiguity: "junk" }), article()).ambiguity, "1.00");
  assert.equal(buildQuestion(candidate({ ambiguity: undefined }), article()).ambiguity, "1.00");
});

test("buildQuestion rejects junk input without throwing", () => {
  assert.equal(buildQuestion(null, article()), null);
  assert.equal(buildQuestion(candidate(), null), null);
  assert.equal(buildQuestion({}, article()), null);
});

/* ------------------------------------------------------------------ */
test("buildQuizDocument matches the existing Firestore schema", () => {
  const doc = buildQuizDocument([article()], [candidate()], { date: "2026-07-31" });
  assert.equal(doc.quizDate, "2026-07-31");
  assert.equal(Array.isArray(doc.quiz), true);
  assert.equal(doc.quiz.length, 1);
  assert.equal(doc.stats.questionsAccepted, 1);
  assert.equal(doc.stats.questionsRejected, 0);
});

test("buildQuizDocument maps questions to articles via articleIndex", () => {
  const a1 = article({ title: "First story about the harbour", url: "https://a.com/1" });
  const a2 = article({ title: "Second story about the bridge", url: "https://a.com/2" });
  const doc = buildQuizDocument([a1, a2], [candidate({ articleIndex: 2 })], { date: "2026-07-31" });
  assert.equal(doc.quiz[0].source.url, "https://a.com/2");
});

test("buildQuizDocument falls back to position when articleIndex is missing", () => {
  const a1 = article({ url: "https://a.com/1", title: "One story about the harbour" });
  const a2 = article({ url: "https://a.com/2", title: "Two story about the bridge" });
  const doc = buildQuizDocument([a1, a2], [candidate({ articleIndex: undefined })], {
    date: "2026-07-31",
  });
  assert.equal(doc.quiz[0].source.url, "https://a.com/1");
});

test("buildQuizDocument records rejected questions instead of silently dropping them", () => {
  const doc = buildQuizDocument([article()], [candidate({ answer: "Nope" })], {
    date: "2026-07-31",
  });
  assert.equal(doc.quiz.length, 0);
  assert.equal(doc.stats.questionsRejected, 1);
  assert.equal(doc.rejected.length, 1);
});

test("buildQuizDocument refuses a malformed date", () => {
  assert.throws(() => buildQuizDocument([article()], [candidate()], { date: "31-07-2026" }), /YYYY-MM-DD/);
  assert.throws(() => buildQuizDocument([article()], [candidate()], {}), /YYYY-MM-DD/);
});

test("end to end: raw model text becomes a publishable document", () => {
  const raw = '```json\n' + JSON.stringify([
    candidate({ articleIndex: 1 }),
    candidate({ articleIndex: 1, question: "Who said the escort would begin Monday?", choices: ["The president", "The UN", "Tehran"], answer: "The president" }),
  ]) + '\n```';
  const doc = buildQuizDocument([article()], parseModelJson(raw), { date: "2026-07-31" });
  assert.equal(doc.quiz.length, 2);
  assert.ok(doc.quiz.every((q) => q.approved === false));
  assert.ok(doc.quiz.every((q) => q.choices.includes(q.answer)));
});

/* ------------------------------------------------------------------ *
 * Cost-safety guards.
 *
 * These exist because in May 2026 this project ran up ~$2,500 in five
 * minutes through an exposed API key. They are asserted as text against
 * index.js so that removing one breaks the build rather than quietly
 * re-opening the hole.
 * ------------------------------------------------------------------ */
const fs = require("node:fs");
const path = require("node:path");
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "index.js"), "utf8");

test("COST GUARD: a hard daily cap on generation runs exists", () => {
  assert.match(indexSrc, /MAX_RUNS_PER_DAY\s*=\s*\d+/);
  assert.match(indexSrc, /claimDailyRun/);
  assert.match(indexSrc, /runTransaction/, "the cap must be transactional to survive concurrent triggers");
});

test("COST GUARD: the daily run is claimed BEFORE any paid API call", () => {
  const claimAt = indexSrc.indexOf("await claimDailyRun");
  const newsAt = indexSrc.indexOf("await fetchArticles");
  const geminiAt = indexSrc.indexOf("await callGemini");
  assert.ok(claimAt > -1 && newsAt > -1 && geminiAt > -1);
  assert.ok(claimAt < newsAt, "must claim the run before fetching news");
  assert.ok(claimAt < geminiAt, "must claim the run before calling Gemini");
});

test("COST GUARD: the manual trigger is authenticated", () => {
  assert.match(indexSrc, /x-quizzy-token/i);
  assert.match(indexSrc, /RUN_TOKEN/);
  assert.match(indexSrc, /status\(403\)/, "unauthenticated callers must be rejected");
});

test("COST GUARD: prompt size and output tokens are bounded", () => {
  assert.match(indexSrc, /MAX_PROMPT_CHARS\s*=\s*\d+/);
  assert.match(indexSrc, /maxOutputTokens/);
  assert.match(indexSrc, /MAX_ARTICLES\s*=\s*\d+/);
});

test("COST GUARD: functions cannot fan out or retry endlessly", () => {
  assert.match(indexSrc, /maxInstances:\s*1/);
  assert.match(indexSrc, /retryCount:\s*1/);
});

test("COST GUARD: exactly one Gemini call per generation", () => {
  const calls = (indexSrc.match(/await callGemini\(/g) || []).length;
  assert.equal(calls, 1, "batching all articles into one request is what keeps this free");
});

test("COST GUARD: no API key is hardcoded in the generator", () => {
  assert.doesNotMatch(indexSrc, /AIza[0-9A-Za-z_-]{35}/, "keys must come from Secret Manager");
  assert.match(indexSrc, /defineSecret\("GEMINI_API_KEY"\)/);
  assert.match(indexSrc, /defineSecret\("NEWS_API_KEY"\)/);
});

test("COST GUARD: default model is a current, cheap one", () => {
  const m = indexSrc.match(/DEFAULT_MODEL\s*=\s*"([^"]+)"/);
  assert.ok(m, "DEFAULT_MODEL must be set");
  assert.doesNotMatch(m[1], /gemini-2\.0/, "gemini-2.0-* was shut down on 1 June 2026");
  assert.match(m[1], /flash/, "use a flash-class model; pro-class is far more expensive");
});
