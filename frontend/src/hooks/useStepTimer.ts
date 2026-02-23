import { useEffect, useRef, useState } from "react";
import { useLogTime } from "./useRoadmapSteps";

/**
 * Auto-starts a timer on mount, auto-logs via useLogTime on unmount (if >= 5s elapsed).
 * Returns `seconds` for display.
 */
export function useStepTimer(roadmapId: string, stepId: string) {
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef(Date.now());
  const logTime = useLogTime();

  // Reset when step changes
  useEffect(() => {
    setSeconds(0);
    startRef.current = Date.now();
  }, [stepId]);

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [stepId]);

  // Log on unmount (or step change)
  useEffect(() => {
    const start = startRef.current;
    return () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      if (elapsed >= 5 && roadmapId && stepId) {
        logTime.mutate({ roadmapId, stepId, durationSeconds: elapsed });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmapId, stepId]);

  return seconds;
}
