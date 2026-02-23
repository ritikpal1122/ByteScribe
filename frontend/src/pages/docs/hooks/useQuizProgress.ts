import { useState, useCallback } from 'react';

const QUIZ_KEY = 'learntext-quiz-progress';
const CHALLENGE_KEY = 'learntext-challenge-progress';

interface QuizState {
  quizzes: Record<string, number>;     // entryId -> score (0–100)
  challenges: Record<string, boolean>; // entryId -> completed
}

function loadState(): QuizState {
  try {
    const q = localStorage.getItem(QUIZ_KEY);
    const c = localStorage.getItem(CHALLENGE_KEY);
    return {
      quizzes: q ? JSON.parse(q) : {},
      challenges: c ? JSON.parse(c) : {},
    };
  } catch {
    return { quizzes: {}, challenges: {} };
  }
}

export function useQuizProgress() {
  const [state, setState] = useState<QuizState>(loadState);

  const saveQuizScore = useCallback(
    (entryId: string, score: number) => {
      const next = { ...state, quizzes: { ...state.quizzes, [entryId]: score } };
      setState(next);
      localStorage.setItem(QUIZ_KEY, JSON.stringify(next.quizzes));
    },
    [state],
  );

  const saveChallengeComplete = useCallback(
    (entryId: string) => {
      const next = { ...state, challenges: { ...state.challenges, [entryId]: true } };
      setState(next);
      localStorage.setItem(CHALLENGE_KEY, JSON.stringify(next.challenges));
    },
    [state],
  );

  const getQuizScore = useCallback(
    (entryId: string): number | null => {
      return state.quizzes[entryId] ?? null;
    },
    [state],
  );

  const isChallengeCompleted = useCallback(
    (entryId: string): boolean => {
      return state.challenges[entryId] ?? false;
    },
    [state],
  );

  return { saveQuizScore, saveChallengeComplete, getQuizScore, isChallengeCompleted };
}
