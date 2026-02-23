import { useState, useCallback, useMemo } from 'react';

interface UsePaginationReturn {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function usePagination(totalPages: number): UsePaginationReturn {
  const [page, setPageInternal] = useState(1);

  const hasNext = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPrev = useMemo(() => page > 1, [page]);

  const setPage = useCallback(
    (newPage: number) => {
      const clamped = Math.max(1, Math.min(newPage, totalPages));
      setPageInternal(clamped);
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPageInternal((prev) => prev + 1);
    }
  }, [hasNext]);

  const prevPage = useCallback(() => {
    if (hasPrev) {
      setPageInternal((prev) => prev - 1);
    }
  }, [hasPrev]);

  return { page, setPage, nextPage, prevPage, hasNext, hasPrev };
}
