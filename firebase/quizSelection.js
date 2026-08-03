/**
 * Pure quiz-selection logic — no Firebase imports, no React, no side effects.
 *
 * Kept deliberately dependency-free so it can be unit-tested with plain Node
 * (`npm run test:selection`) without booting Metro, Expo, or the Firebase SDK.
 */

/* ---------------------------------------------------------------------------
 * QUIZ_CONFIG — the knobs that decide what the app is willing to show.
 *
 * MIN_QUESTIONS
 *   A day is only playable if it yields at least this many usable questions.
 *   The game is built around 5.
 *
 * LOOKBACK_DOCS
 *   How many of the most recent daily documents to consider in one query.
 *   A DOCUMENT count, not a calendar-day count, so gaps in the archive don't
 *   eat into it. 120 reaches roughly five months back.
 *
 * ALLOW_UNAPPROVED_FALLBACK
 *   false (default) — only ever show questions a human marked approved.
 *   true            — if no day in range has enough APPROVED questions, fall
 *                     back to unreviewed ones, best-first by ambiguity score.
 *                     Unlocks ~488 stranded days but puts unreviewed content
 *                     in front of users. Flip deliberately.
 *
 * MAX_AMBIGUITY
 *   Only used when ALLOW_UNAPPROVED_FALLBACK is true. The generator writes an
 *   `ambiguity` score per question (0.00 = crisp). Anything above this is
 *   dropped from the unreviewed fallback.
 * ------------------------------------------------------------------------- */
export const QUIZ_CONFIG = {
  MIN_QUESTIONS: 5,

  /**
   * How far back to look for a playable quiz, widened in stages.
   *
   * Each stage is ONE Firestore query. We stop at the first stage that finds a
   * playable day, so the normal case (today's quiz is fine) never runs any of
   * them — and the degraded case doesn't pay to scan months of archive.
   */
  LOOKBACK_STAGES: [7, 30, 120],

  /** Safety limit on documents returned per stage. */
  MAX_DOCS_PER_QUERY: 200,

  ALLOW_UNAPPROVED_FALLBACK: false,
  MAX_AMBIGUITY: 0.35,
};

/** 'YYYY-MM-DD' in LOCAL time. (toISOString() would shift the day for anyone west of UTC.) */
export function formatDay(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Shift a 'YYYY-MM-DD' string by N days and return the same format. */
export function shiftDay(dayString, deltaDays) {
  const [y, m, d] = String(dayString).split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  date.setDate(date.getDate() + deltaDays);
  return formatDay(date);
}

/**
 * Firestore documents in `dailies` are not written consistently:
 *   - some questions carry no `approved` field at all
 *   - some carry `"approved "` WITH A TRAILING SPACE (a generator bug that
 *     silently emptied every quiz it touched, including 2026-05-05)
 *   - some rows are missing `answer`, `choices`, or a `source`
 *
 * normalizeQuestion() absorbs all of that so the UI can trust its input.
 * Returns null for anything unusable.
 */
export function normalizeQuestion(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  // Trim whitespace off every key — this is what rescues "approved ".
  const f = {};
  for (const key of Object.keys(raw)) {
    f[String(key).trim()] = raw[key];
  }

  const question = typeof f.question === "string" ? f.question.trim() : "";
  const answer = typeof f.answer === "string" ? f.answer.trim() : "";
  const choices = Array.isArray(f.choices)
    ? f.choices
        .filter((c) => typeof c === "string" && c.trim().length > 0)
        .map((c) => c.trim())
    : [];

  // Must be renderable AND scoreable.
  if (!question || !answer || choices.length < 2) return null;
  if (!choices.includes(answer)) return null;
  if (new Set(choices).size !== choices.length) return null; // duplicate choices

  const parsedAmbiguity = Number.parseFloat(f.ambiguity);

  // ScorePage does `item.source.url` unguarded, so source must always exist.
  const rawSource = f.source && typeof f.source === "object" ? f.source : {};

  return {
    question,
    answer,
    choices,
    approved: f.approved === true || f.approved === "true",
    ambiguity: Number.isFinite(parsedAmbiguity) ? parsedAmbiguity : null,
    title: typeof f.title === "string" ? f.title : "",
    source: {
      name: typeof rawSource.name === "string" ? rawSource.name : "",
      url: typeof rawSource.url === "string" ? rawSource.url : "",
      id: typeof rawSource.id === "string" ? rawSource.id : "",
    },
  };
}

/**
 * Pick the questions to play from one day's raw array.
 * Approved questions always win; unreviewed ones are only considered when
 * QUIZ_CONFIG.ALLOW_UNAPPROVED_FALLBACK is on.
 */
export function selectQuestions(rawQuiz, config = QUIZ_CONFIG) {
  const usable = (Array.isArray(rawQuiz) ? rawQuiz : [])
    .map(normalizeQuestion)
    .filter(Boolean);

  const approved = usable.filter((q) => q.approved);
  if (approved.length >= config.MIN_QUESTIONS) {
    return { questions: approved.slice(0, config.MIN_QUESTIONS), reviewed: true };
  }

  if (!config.ALLOW_UNAPPROVED_FALLBACK) {
    return { questions: [], reviewed: true };
  }

  const fallback = usable
    .filter((q) => q.ambiguity === null || q.ambiguity <= config.MAX_AMBIGUITY)
    .sort((a, b) => (a.ambiguity ?? 1) - (b.ambiguity ?? 1));

  if (fallback.length >= config.MIN_QUESTIONS) {
    return { questions: fallback.slice(0, config.MIN_QUESTIONS), reviewed: false };
  }

  return { questions: [], reviewed: true };
}
