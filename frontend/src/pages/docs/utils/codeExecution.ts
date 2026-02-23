/* ================================================================== */
/*  Piston API Integration for Code Execution                         */
/* ================================================================== */

const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

export const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  python: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  cpp: { language: 'c++', version: '10.2.0' },
  java: { language: 'java', version: '15.0.2' },
  go: { language: 'go', version: '1.16.2' },
  rust: { language: 'rust', version: '1.68.2' },
};

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  error?: string;
}

export async function executeCode(
  langId: string,
  code: string,
  timeout = 10000,
): Promise<ExecutionResult> {
  const langConfig = LANGUAGE_MAP[langId];
  if (!langConfig) {
    return {
      stdout: '',
      stderr: '',
      exitCode: 1,
      error: `Language "${langId}" is not supported for execution.`,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(PISTON_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ content: code }],
      }),
    });

    clearTimeout(timer);

    if (!response.ok) {
      return {
        stdout: '',
        stderr: '',
        exitCode: 1,
        error: `API error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    const run = data.run;

    return {
      stdout: run?.stdout ?? '',
      stderr: run?.stderr ?? '',
      exitCode: run?.code ?? 1,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof DOMException && err.name === 'AbortError') {
      return {
        stdout: '',
        stderr: '',
        exitCode: 1,
        error: 'Execution timed out (10s limit).',
      };
    }
    return {
      stdout: '',
      stderr: '',
      exitCode: 1,
      error: `Network error: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}
