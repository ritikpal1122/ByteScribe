import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'interview-prep-progress';

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return new Set(JSON.parse(raw));
    }
  } catch {
    // ignore
  }
  return new Set();
}

function saveProgress(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useInterviewProgress() {
  const [reviewed, setReviewed] = useState<Set<string>>(loadProgress);

  useEffect(() => {
    saveProgress(reviewed);
  }, [reviewed]);

  const toggleReviewed = useCallback((questionId: string) => {
    setReviewed((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  }, []);

  const isReviewed = useCallback(
    (questionId: string) => reviewed.has(questionId),
    [reviewed]
  );

  const getCount = useCallback(
    (questionIds: string[]) =>
      questionIds.filter((id) => reviewed.has(id)).length,
    [reviewed]
  );

  const totalReviewed = reviewed.size;

  return { reviewed, toggleReviewed, isReviewed, getCount, totalReviewed };
}
