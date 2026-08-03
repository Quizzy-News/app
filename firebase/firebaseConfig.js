import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  documentId,
} from "firebase/firestore";
import { firebaseConfig } from "./config";
import {
  QUIZ_CONFIG,
  formatDay,
  shiftDay,
  normalizeQuestion,
  selectQuestions,
} from "./quizSelection";

const app = initializeApp(firebaseConfig);

// Re-exported so callers keep importing from one place, while the pure logic
// stays testable on its own (see firebase/quizSelection.js + npm run test:selection).
export { QUIZ_CONFIG, formatDay, shiftDay, normalizeQuestion, selectQuestions };

/**
 * Fetch a single named day. Kept because it is the cheapest possible request
 * and the common case (today has a quiz) should not pay for a range query.
 */
export async function getDailyQuiz(day) {
  const db = getFirestore(app);
  const date = day || formatDay(new Date());
  const snapshot = await getDoc(doc(db, "dailies", date));

  if (!snapshot.exists()) {
    return { quiz: [], quizDate: date, found: false, reviewed: true };
  }

  const { questions, reviewed } = selectQuestions(snapshot.data()?.quiz);
  return { quiz: questions, quizDate: date, found: questions.length > 0, reviewed };
}

/**
 * Find the most recent playable quiz at or before `day`.
 *
 * WHY THE QUERY LOOKS LIKE THIS: the obvious version —
 *   where(documentId(), "<=", today) + orderBy(documentId(), "desc")
 * — needs a composite Firestore index that does not exist on this project, and
 * fails at runtime with FAILED_PRECONDITION ("The query requires an index").
 * Any DESCENDING order on __name__ needs one. Ascending order on __name__ is
 * always available, so we query ascending from a cutoff date and reverse the
 * results in memory. No index, no setup, works on a fresh project.
 *
 * The lookback widens in stages so the common case stays cheap: if today's
 * quiz is fine, `getDailyQuiz` already answered and none of this runs.
 */
export async function getLatestQuiz(day) {
  const db = getFirestore(app);
  const today = day || formatDay(new Date());
  let inspected = 0;

  for (const daysBack of QUIZ_CONFIG.LOOKBACK_STAGES) {
    const cutoff = shiftDay(today, -daysBack);

    const q = query(
      collection(db, "dailies"),
      where(documentId(), ">=", cutoff),
      orderBy(documentId(), "asc"),
      limit(QUIZ_CONFIG.MAX_DOCS_PER_QUERY)
    );

    const snapshot = await getDocs(q);

    // Ascending from the cutoff; walk it newest-first and ignore any document
    // dated in the future (the generator can write tomorrow's row early).
    const candidates = snapshot.docs
      .filter((d) => d.id <= today)
      .sort((a, b) => (a.id < b.id ? 1 : -1));

    for (const document of candidates) {
      inspected += 1;
      const { questions, reviewed } = selectQuestions(document.data()?.quiz);
      if (questions.length >= QUIZ_CONFIG.MIN_QUESTIONS) {
        return {
          quiz: questions,
          quizDate: document.id,
          isArchive: document.id !== today,
          reviewed,
          found: true,
          inspected,
        };
      }
    }
  }

  return {
    quiz: [],
    quizDate: null,
    isArchive: false,
    reviewed: true,
    found: false,
    inspected,
  };
}

export async function getDailyPixieQuiz() {
  const db = getFirestore(app);
  const date = "2024-03-05";
  const snapshot = await getDoc(doc(db, "pixieBrix1", date));
  return snapshot.data();
}
