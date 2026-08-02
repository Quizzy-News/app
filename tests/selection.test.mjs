/**
 * Unit tests for the quiz-selection logic.
 *
 *     npm run test:selection
 *
 * No test framework, no build step, no network. Requires only Node 18+.
 *
 * firebase/quizSelection.js is ESM source living inside a CommonJS package,
 * so Node won't `import()` it by path. We read the text and evaluate it as a
 * data: URL module — which works precisely because that file has zero imports
 * of its own. That constraint is deliberate; keep it dependency-free.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const source = await readFile(join(here, "..", "firebase", "quizSelection.js"), "utf8");
const mod = await import(
  "data:text/javascript;base64," + Buffer.from(source, "utf8").toString("base64")
);

const { QUIZ_CONFIG, formatDay, shiftDay, normalizeQuestion, selectQuestions } = mod;

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`  ✓ ${name}`);
  } else {
    failures.push(`${name} ${detail}`.trim());
    console.log(`  ✗ ${name} ${detail}`);
  }
}

function group(title) {
  console.log(`\n${title}`);
}

const validQuestion = (over = {}) => ({
  question: "Which agency published the report?",
  answer: "NASA",
  choices: ["NASA", "NOAA", "ESA"],
  ambiguity: "0.00",
  title: "Headline",
  source: { name: "Axios", url: "https://example.com/a", id: "axios" },
  approved: true,
  ...over,
});

/* ------------------------------------------------------------------ */
group("normalizeQuestion — the trailing-space bug");

const typo = normalizeQuestion({ ...validQuestion({ approved: undefined }), "approved ": true });
check("'approved ' (trailing space) counts as approved", typo?.approved === true, `got ${typo?.approved}`);

const spacedKeys = normalizeQuestion({
  " question ": "Q?",
  "answer ": "A",
  " choices": ["A", "B"],
  " approved ": true,
});
check("whitespace trimmed from every field name", spacedKeys?.approved === true && spacedKeys?.question === "Q?");

check("approved defaults to false when absent",
  normalizeQuestion(validQuestion({ approved: undefined }))?.approved === false);
check("string 'true' is accepted as approved",
  normalizeQuestion(validQuestion({ approved: "true" }))?.approved === true);
check("string 'false' is not approved",
  normalizeQuestion(validQuestion({ approved: "false" }))?.approved === false);

/* ------------------------------------------------------------------ */
group("normalizeQuestion — malformed input is rejected, never thrown on");

check("number 0 -> null", normalizeQuestion(0) === null);
check("null -> null", normalizeQuestion(null) === null);
check("undefined -> null", normalizeQuestion(undefined) === null);
check("string -> null", normalizeQuestion("nope") === null);
check("array -> null", normalizeQuestion([1, 2]) === null);
check("empty object -> null", normalizeQuestion({}) === null);
check("missing choices -> null", normalizeQuestion({ question: "q", answer: "a" }) === null);
check("single choice -> null", normalizeQuestion(validQuestion({ choices: ["A"] })) === null);
check("missing answer -> null", normalizeQuestion(validQuestion({ answer: "" })) === null);
check("blank question -> null", normalizeQuestion(validQuestion({ question: "   " })) === null);
check("answer not among choices -> null",
  normalizeQuestion(validQuestion({ answer: "Zeta" })) === null);
check("duplicate choices -> null",
  normalizeQuestion(validQuestion({ choices: ["NASA", "NASA", "ESA"] })) === null);
check("non-string choices are dropped",
  normalizeQuestion(validQuestion({ choices: ["NASA", null, 7, "ESA"] }))?.choices.length === 2);

/* ------------------------------------------------------------------ */
group("normalizeQuestion — output shape the UI depends on");

const shaped = normalizeQuestion(validQuestion());
check("source object always present", !!shaped?.source && typeof shaped.source.url === "string");
check("missing source still yields a source object",
  normalizeQuestion(validQuestion({ source: undefined }))?.source?.url === "");
check("null source still yields a source object",
  normalizeQuestion(validQuestion({ source: null }))?.source?.name === "");
check("ambiguity parsed to a number", shaped?.ambiguity === 0);
check("unparseable ambiguity becomes null",
  normalizeQuestion(validQuestion({ ambiguity: "n/a" }))?.ambiguity === null);
check("whitespace trimmed from question text",
  normalizeQuestion(validQuestion({ question: "  Padded?  " }))?.question === "Padded?");
check("answer still matches choices after trimming",
  normalizeQuestion(validQuestion({ answer: " NASA ", choices: [" NASA ", "NOAA"] }))?.answer === "NASA");

/* ------------------------------------------------------------------ */
group("selectQuestions — the exact input that used to crash GamePage");

const crashInput = selectQuestions([0, 0, 0, 0, 0, 0]);
check("[0,0,0,0,0,0] -> zero questions, no throw", crashInput.questions.length === 0);
check("undefined quiz -> zero questions", selectQuestions(undefined).questions.length === 0);
check("null quiz -> zero questions", selectQuestions(null).questions.length === 0);
check("non-array quiz -> zero questions", selectQuestions({ nope: true }).questions.length === 0);
check("empty array -> zero questions", selectQuestions([]).questions.length === 0);

/* ------------------------------------------------------------------ */
group("selectQuestions — approved-only mode (the shipped default)");

const strict = { ...QUIZ_CONFIG, ALLOW_UNAPPROVED_FALLBACK: false };
const sixApproved = Array.from({ length: 6 }, (_, i) =>
  validQuestion({ question: `Approved ${i}?`, approved: true })
);
const sixUnapproved = Array.from({ length: 6 }, (_, i) =>
  validQuestion({ question: `Unreviewed ${i}?`, approved: false })
);

check("6 approved -> exactly MIN_QUESTIONS returned",
  selectQuestions(sixApproved, strict).questions.length === strict.MIN_QUESTIONS);
check("6 approved -> flagged reviewed", selectQuestions(sixApproved, strict).reviewed === true);
check("0 approved -> nothing served in strict mode",
  selectQuestions(sixUnapproved, strict).questions.length === 0);
check("4 approved (below minimum) -> nothing served",
  selectQuestions(sixApproved.slice(0, 4), strict).questions.length === 0);
check("approved are preferred over unreviewed",
  selectQuestions([...sixUnapproved, ...sixApproved], strict)
    .questions.every((q) => q.approved));

/* ------------------------------------------------------------------ */
group("selectQuestions — unreviewed fallback (opt-in)");

const loose = { ...QUIZ_CONFIG, ALLOW_UNAPPROVED_FALLBACK: true, MAX_AMBIGUITY: 0.35 };
check("unreviewed day becomes playable when enabled",
  selectQuestions(sixUnapproved, loose).questions.length === loose.MIN_QUESTIONS);
check("unreviewed day is flagged NOT reviewed",
  selectQuestions(sixUnapproved, loose).reviewed === false);
check("questions above MAX_AMBIGUITY are dropped",
  selectQuestions(
    sixUnapproved.map((q) => ({ ...q, ambiguity: "0.90" })), loose
  ).questions.length === 0);
check("fallback sorts crispest-first", (() => {
  const mixed = [
    validQuestion({ question: "hazy?", approved: false, ambiguity: "0.30" }),
    validQuestion({ question: "crisp?", approved: false, ambiguity: "0.01" }),
    ...sixUnapproved.slice(0, 4).map((q) => ({ ...q, ambiguity: "0.20" })),
  ];
  return selectQuestions(mixed, loose).questions[0].question === "crisp?";
})());
check("approved still win even when fallback is enabled",
  selectQuestions([...sixUnapproved, ...sixApproved], loose)
    .questions.every((q) => q.approved));

/* ------------------------------------------------------------------ */
group("formatDay — local time, not UTC");

check("formats a Date as YYYY-MM-DD", formatDay(new Date(2026, 4, 5)) === "2026-05-05");
check("zero-pads month and day", formatDay(new Date(2026, 0, 9)) === "2026-01-09");
check("late-evening local time does not roll to tomorrow",
  formatDay(new Date(2026, 6, 31, 23, 30)) === "2026-07-31");
check("accepts a string date", formatDay("2026-03-02T12:00:00") === "2026-03-02");

/* ------------------------------------------------------------------ */
group("shiftDay — used to build the Firestore lookback window");

check("goes back a week", shiftDay("2026-08-02", -7) === "2026-07-26");
check("goes back 120 days", shiftDay("2026-08-02", -120) === "2026-04-04");
check("crosses a year boundary", shiftDay("2026-01-03", -7) === "2025-12-27");
check("crosses a month boundary", shiftDay("2026-03-02", -1) === "2026-03-01");
check("handles a leap day", shiftDay("2028-03-01", -1) === "2028-02-29");
check("zero is a no-op", shiftDay("2026-08-02", 0) === "2026-08-02");

/* ------------------------------------------------------------------ */
group("lookback config — must stay index-free and bounded");

check("widens in stages rather than one huge scan",
  Array.isArray(QUIZ_CONFIG.LOOKBACK_STAGES) && QUIZ_CONFIG.LOOKBACK_STAGES.length >= 2);
check("stages are strictly increasing",
  QUIZ_CONFIG.LOOKBACK_STAGES.every((v, i, a) => i === 0 || v > a[i - 1]));
check("per-query document count is capped",
  Number.isFinite(QUIZ_CONFIG.MAX_DOCS_PER_QUERY) && QUIZ_CONFIG.MAX_DOCS_PER_QUERY <= 500);

/* ------------------------------------------------------------------ */
group("regression — the real 2026-05-05 document shape");

const may5Row = {
  "approved ": true,
  question: "Based on the analysis about the U.S. challenging Tehran, what is a potential outcome?",
  answer: "A confrontation or even an escalation.",
  choices: [
    "A confrontation or even an escalation.",
    "A renewed diplomatic negotiation.",
    "The immediate withdrawal of U.S. forces.",
  ],
  ambiguity: "0.00",
  title: "Trump says U.S. Navy will escort ships out of the Strait of Hormuz - Axios",
  source: { name: "Axios", url: "https://www.axios.com/2026/05/03/x", id: "axios" },
};
const may5 = selectQuestions(Array.from({ length: 6 }, () => ({ ...may5Row })), strict);
check("2026-05-05 becomes playable under approved-only rules",
  may5.questions.length === 5, `got ${may5.questions.length}`);
check("its source url survives normalization",
  may5.questions[0]?.source.url.startsWith("https://"));

/* ------------------------------------------------------------------ */
group("App.js — a font failure must never blank the whole site");

const appSrc = await readFile(join(here, "..", "App.js"), "utf8");

check("does not bail out on fonts with a bare `return null`",
  !/if\s*\(\s*!\s*loaded\s*\)\s*\{[^}]*return null/.test(appSrc),
  "App.js used to render nothing at all whenever useFonts stalled");
check("has a timeout so the app renders even if fonts never resolve",
  /FONT_TIMEOUT_MS/.test(appSrc) && /setTimeout/.test(appSrc));
check("treats a font error as recoverable, not fatal",
  /fontError/.test(appSrc));
check("still renders the navigation container",
  /NavigationContainer/.test(appSrc));

/* ------------------------------------------------------------------ */
group("Firestore query must not need a composite index");

const cfgSrcRaw = await readFile(join(here, "..", "firebase", "firebaseConfig.js"), "utf8");
// Strip comments — the file *explains* the descending query in prose, and we
// only care about what the code actually does.
const cfgSrc = cfgSrcRaw
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^\s*\/\/.*$/gm, "");
check("does not order documentId descending (that needs an index this project lacks)",
  !/orderBy\(\s*documentId\(\)\s*,\s*["']desc["']/.test(cfgSrc));
check("uses ascending order, which is always available",
  /orderBy\(\s*documentId\(\)\s*,\s*["']asc["']/.test(cfgSrc));
check("filters forward from a cutoff date",
  /where\(\s*documentId\(\)\s*,\s*["']>=["']/.test(cfgSrc));

/* ------------------------------------------------------------------ */
console.log(
  `\n${passed} passed, ${failures.length} failed`
);
if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
