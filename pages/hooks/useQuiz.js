import { useState, useEffect, useRef } from "react";
import {
  getDailyQuiz,
  getLatestQuiz,
  formatDay,
  QUIZ_CONFIG,
} from "../../firebase/firebaseConfig";

/**
 * useQuiz
 *
 * Loads the quiz the app should play right now.
 *
 * Previous behaviour, and why it broke the site:
 *   The hook walked back at most 5 calendar days, one Firestore read each.
 *   When all 5 missed it set the quiz to the literal array [0,0,0,0,0,0] and
 *   flagged it as loaded. LoadingPage saw length > 0, treated that as success,
 *   and pushed those numbers into GamePage, which then did
 *   `[...quiz.current[0].choices]` on the number 0 and threw
 *   "undefined is not iterable" — the white screen users hit.
 *
 * Now:
 *   1. One cheap read for today.
 *   2. If today is missing or thin, ONE ordered range query finds the most
 *      recent day that actually has a playable quiz.
 *   3. If nothing at all is playable, `error` is set. There is no fake quiz —
 *      the UI is expected to show a real message.
 *
 * Returns:
 *   quiz      — array of normalized question objects (never partial, never fake)
 *   loaded    — the load attempt has finished, successfully or not
 *   error     — null, or { code, message }
 *   quizDate  — 'YYYY-MM-DD' of the day being played, or null
 *   isArchive — true when quizDate is not today, so the UI can label it
 *   reviewed  — true when every question was human-approved
 *   retry     — call to attempt the load again
 */
export function useQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [quizDate, setQuizDate] = useState(null);
  const [isArchive, setIsArchive] = useState(false);
  const [reviewed, setReviewed] = useState(true);
  const [attempt, setAttempt] = useState(0);

  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const load = async () => {
      setLoaded(false);
      setError(null);

      const today = formatDay(new Date());

      try {
        // 1. Fast path — today's document.
        const todays = await getDailyQuiz(today);
        if (cancelled.current) return;

        if (todays.quiz.length >= QUIZ_CONFIG.MIN_QUESTIONS) {
          setQuiz(todays.quiz);
          setQuizDate(todays.quizDate);
          setIsArchive(false);
          setReviewed(todays.reviewed);
          setLoaded(true);
          return;
        }

        // 2. Fall back to the most recent day that is actually playable.
        const latest = await getLatestQuiz(today);
        if (cancelled.current) return;

        if (latest.found) {
          setQuiz(latest.quiz);
          setQuizDate(latest.quizDate);
          setIsArchive(latest.isArchive);
          setReviewed(latest.reviewed);
          setLoaded(true);
          return;
        }

        // 3. Nothing playable. Say so instead of inventing a quiz.
        setQuiz([]);
        setQuizDate(null);
        setIsArchive(false);
        setError({
          code: "NO_QUIZ_AVAILABLE",
          message:
            `No playable quiz found in the last ${latest.inspected} published days. ` +
            `The daily quiz pipeline may not be publishing.`,
        });
        setLoaded(true);
      } catch (err) {
        if (cancelled.current) return;
        console.error("useQuiz: failed to load quiz", err);
        setQuiz([]);
        setQuizDate(null);
        setIsArchive(false);
        setError({
          code: err?.code || "FETCH_FAILED",
          message:
            err?.message ||
            "Could not reach the quiz service. Check your connection and try again.",
        });
        setLoaded(true);
      }
    };

    load();

    return () => {
      cancelled.current = true;
    };
  }, [attempt]);

  const retry = () => setAttempt((n) => n + 1);

  return { quiz, loaded, error, quizDate, isArchive, reviewed, retry };
}
