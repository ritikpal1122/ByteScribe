import { useState, useCallback } from 'react';

const PROGRESS_KEY = 'learntext-doc-progress';

export function useDocProgress() {
  const [completed, setCompleted] = useState<Record<string, string[]>>(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const persist = useCallback((next: Record<string, string[]>) => {
    setCompleted(next);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  }, []);

  const markCompleted = useCallback(
    (langId: string, entryId: string) => {
      const langEntries = completed[langId] ?? [];
      if (langEntries.includes(entryId)) return;
      persist({ ...completed, [langId]: [...langEntries, entryId] });
    },
    [completed, persist],
  );

  const isCompleted = useCallback(
    (langId: string, entryId: string) => {
      return (completed[langId] ?? []).includes(entryId);
    },
    [completed],
  );

  const getCompletedCount = useCallback(
    (langId: string) => {
      return (completed[langId] ?? []).length;
    },
    [completed],
  );

  const getLastVisited = useCallback(
    (langId: string): string | null => {
      const entries = completed[langId];
      return entries && entries.length > 0 ? entries[entries.length - 1]! : null;
    },
    [completed],
  );

  return { markCompleted, isCompleted, getCompletedCount, getLastVisited };
}
