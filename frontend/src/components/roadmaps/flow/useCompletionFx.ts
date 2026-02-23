import { useCallback, useRef, useState } from 'react';

export interface XPToast {
  id: number;
  x: number;
  y: number;
  points: number;
}

export interface SectionBanner {
  id: number;
  title: string;
}

export function useCompletionFx() {
  const [xpToasts, setXpToasts] = useState<XPToast[]>([]);
  const [combo, setCombo] = useState(0);
  const [sectionBanner, setSectionBanner] = useState<SectionBanner | null>(null);
  const timestamps = useRef<number[]>([]);
  const idRef = useRef(0);
  const comboTimer = useRef<ReturnType<typeof setTimeout>>();

  const triggerCompletion = useCallback((screenX: number, screenY: number) => {
    const now = Date.now();
    timestamps.current = [...timestamps.current.filter((t) => now - t < 5000), now];
    const currentCombo = timestamps.current.length;
    setCombo(currentCombo);

    const points = 10 * currentCombo;
    const id = ++idRef.current;

    setXpToasts((prev) => [...prev, { id, x: screenX, y: screenY, points }]);
    setTimeout(() => setXpToasts((prev) => prev.filter((t) => t.id !== id)), 1500);

    clearTimeout(comboTimer.current);
    comboTimer.current = setTimeout(() => {
      timestamps.current = [];
      setCombo(0);
    }, 5000);

    return currentCombo;
  }, []);

  const triggerSectionComplete = useCallback((title: string) => {
    const id = ++idRef.current;
    setSectionBanner({ id, title });
    setTimeout(() => setSectionBanner(null), 3000);
  }, []);

  return { xpToasts, combo, sectionBanner, triggerCompletion, triggerSectionComplete };
}
