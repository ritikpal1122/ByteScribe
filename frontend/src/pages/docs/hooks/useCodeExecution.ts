import { useState, useCallback } from 'react';
import { executeCode, type ExecutionResult } from '../utils/codeExecution';

export function useCodeExecution(langId: string) {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState(0);

  const run = useCallback(
    async (code: string) => {
      // Rate limiting: 2 second cooldown
      const now = Date.now();
      if (now - lastRunTime < 2000) return;

      setIsRunning(true);
      setResult(null);
      setLastRunTime(now);

      const res = await executeCode(langId, code);
      setResult(res);
      setIsRunning(false);
    },
    [langId, lastRunTime],
  );

  const reset = useCallback(() => {
    setResult(null);
  }, []);

  return { result, isRunning, run, reset };
}
