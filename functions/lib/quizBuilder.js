/**
 * Pure quiz-construction logic for the daily generator.
 *
 * No network, no Firebase, no environment access — everything here is a plain
 * function so it can be unit-tested with `node --test`. The side-effecting
 * parts (fetching news, calling Gemini, writing Firestore) live in index.js.
 */

"use strict";

const CHOICES_PER_QUESTION = 3;

/** Articles worth turning into questions. */
function isUsableArticle(article) {
  if (!article || typeof article !== "object") return false;
  const title = typeof article.title === "string" ? article.title.trim() : "";
  const url = typeof article.url === "string" ? article.url.trim() : "";
  if (!title || !url) return false;
  if (/^\[removed\]$/i.test(title)) return false;
  if (!/^https?:\/\//i.test(url)) return false;

  // Need something to actually write a question from.
  const body =
    (typeof article.description === "string" ? article.description : "") +
    (typeof article.content === "string" ? article.content : "");
  return body.trim().length >= 80;
}

/** Drop duplicate stories — same URL, or same headline from a syndicating outlet. */
function dedupeArticles(articles) {
  const seenUrl = new Set();
  const seenTitle = new Set();
  const out = [];
  for (const a of Array.isArray(articles) ? articles : []) {
    if (!isUsableArticle(a)) continue;
    const url = a.url.trim();
    const titleKey = a.title.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 90);
    if (seenUrl.has(url) || seenTitle.has(titleKey)) continue;
    seenUrl.add(url);
    seenTitle.add(titleKey);
    out.push(a);
  }
  return out;
}

/**
 * Build the model prompt. Explicit about the JSON contract because a
 * free-form answer is the main way this pipeline goes wrong.
 */
function buildPrompt(articles, options = {}) {
  const perArticle = options.questionsPerArticle || 1;

  const items = articles
    .map((a, i) => {
      const body = [a.description, a.content]
        .filter((s) => typeof s === "string" && s.trim())
        .join(" ")
        .replace(/\[\+\d+ chars\]$/, "")
        .trim()
        .slice(0, 900);
      return [
        `### Article ${i + 1}`,
        `Headline: ${a.title.trim()}`,
        `Outlet: ${a.source?.name || "unknown"}`,
        `Excerpt: ${body}`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    "You write multiple-choice trivia questions about current news for Quizzy.News.",
    "",
    "Rules — follow every one:",
    `1. Write exactly ${perArticle} question per article, in the same order as the articles.`,
    `2. Each question has exactly ${CHOICES_PER_QUESTION} choices. Exactly one is correct.`,
    "3. The correct answer MUST be verifiable from the excerpt alone. Never rely on outside knowledge.",
    "4. Wrong choices must be plausible but clearly wrong to someone who read the article.",
    "5. Never write questions about when an article was published, its author, or its word count.",
    "6. Do not reference 'the article', 'the excerpt', or 'the passage' in the question text. Ask about the world, not about the document.",
    "7. Keep each question under 160 characters.",
    "8. `ambiguity` is your own 0.00–1.00 estimate that a well-informed reader could defend more than one choice. Be honest; 0.00 means unambiguous.",
    "",
    "Return ONLY a JSON array. No prose, no markdown fences. Shape:",
    "[",
    '  {"articleIndex": 1, "question": "...", "choices": ["...", "...", "..."], "answer": "...", "ambiguity": "0.00"}',
    "]",
    "",
    "Articles:",
    "",
    items,
  ].join("\n");
}

/**
 * Extract a JSON array from whatever the model actually returned.
 * Tolerates ```json fences and leading/trailing chatter; throws on garbage.
 */
function parseModelJson(text) {
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Model returned an empty response");
  }
  let cleaned = text.trim();

  // Strip markdown fences.
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

  // If there's chatter around it, grab the outermost array.
  if (!cleaned.startsWith("[")) {
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start === -1 || end === -1 || end < start) {
      throw new Error("Model response contained no JSON array");
    }
    cleaned = cleaned.slice(start, end + 1);
  }

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Model response was not valid JSON: ${err.message}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error("Model response was not a JSON array");
  }
  return parsed;
}

/**
 * Validate one model-produced question and attach its source article.
 * Returns a Firestore-ready object, or null if the question is unusable.
 *
 * The `approved` key is written explicitly, clean, and always false — human
 * review sets it true later. Writing it explicitly is what prevents the
 * `"approved "` trailing-space class of bug from recurring.
 */
function buildQuestion(candidate, article) {
  if (!candidate || typeof candidate !== "object") return null;
  if (!article) return null;

  const question = typeof candidate.question === "string" ? candidate.question.trim() : "";
  const answer = typeof candidate.answer === "string" ? candidate.answer.trim() : "";
  const choices = Array.isArray(candidate.choices)
    ? candidate.choices
        .filter((c) => typeof c === "string" && c.trim())
        .map((c) => c.trim())
    : [];

  if (!question || !answer) return null;
  if (question.length > 240) return null;
  if (choices.length !== CHOICES_PER_QUESTION) return null;
  if (new Set(choices).size !== choices.length) return null;
  if (!choices.includes(answer)) return null;

  // Reject the meta-questions the old generator kept producing.
  if (/\b(the )?(article|excerpt|passage|text) (excerpt|above|below)?\b/i.test(question)) {
    return null;
  }

  const ambiguityNum = Number.parseFloat(candidate.ambiguity);
  const ambiguity = Number.isFinite(ambiguityNum)
    ? Math.min(1, Math.max(0, ambiguityNum)).toFixed(2)
    : "1.00";

  return {
    question,
    choices,
    answer,
    ambiguity,
    approved: false,
    title: String(article.title || "").trim(),
    source: {
      id: String(article.source?.id || "").trim(),
      name: String(article.source?.name || "").trim(),
      url: String(article.url || "").trim(),
    },
  };
}

/**
 * Assemble the full Firestore document for one day.
 * `quizDate` and `quiz` match the existing schema exactly so the app and the
 * 700+ historical documents stay compatible.
 */
function buildQuizDocument(articles, modelOutput, options = {}) {
  const date = options.date;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`buildQuizDocument requires a YYYY-MM-DD date, got: ${date}`);
  }

  const questions = [];
  const rejected = [];

  modelOutput.forEach((candidate, i) => {
    // Prefer the model's own articleIndex (1-based); fall back to position.
    const idxRaw = Number.parseInt(candidate?.articleIndex, 10);
    const idx = Number.isFinite(idxRaw) ? idxRaw - 1 : i;
    const article = articles[idx] ?? articles[i];

    const built = buildQuestion(candidate, article);
    if (built) questions.push(built);
    else rejected.push({ index: i, question: candidate?.question ?? null });
  });

  return {
    quizDate: date,
    quiz: questions,
    generatedAt: options.generatedAt || null,
    model: options.model || null,
    stats: {
      articlesConsidered: articles.length,
      questionsReturned: modelOutput.length,
      questionsAccepted: questions.length,
      questionsRejected: rejected.length,
    },
    rejected,
  };
}

module.exports = {
  CHOICES_PER_QUESTION,
  isUsableArticle,
  dedupeArticles,
  buildPrompt,
  parseModelJson,
  buildQuestion,
  buildQuizDocument,
};
