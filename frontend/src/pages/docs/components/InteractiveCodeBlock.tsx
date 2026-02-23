import { useState, useCallback, lazy, Suspense } from 'react';
import { Play, RotateCcw, Copy, Check, Loader2, Terminal, AlertCircle } from 'lucide-react';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { PLAYGROUND_URLS } from '../utils/colorTokens';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

const LANG_MONACO_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  cpp: 'cpp',
  java: 'java',
  go: 'go',
  rust: 'rust',
};

export default function InteractiveCodeBlock({
  code: initialCode,
  langId,
  entryId,
}: {
  code: string;
  langId: string;
  entryId: string;
}) {
  const storageKey = `learntext-code-${entryId}-${langId}`;
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || initialCode;
    } catch {
      return initialCode;
    }
  });
  const [copied, setCopied] = useState(false);
  const { result, isRunning, run, reset } = useCodeExecution(langId);

  const handleRun = useCallback(() => {
    run(code);
  }, [run, code]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    reset();
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [initialCode, reset, storageKey]);

  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      const v = value ?? '';
      setCode(v);
      try {
        localStorage.setItem(storageKey, v);
      } catch {}
    },
    [storageKey],
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const playgroundUrl = PLAYGROUND_URLS[langId];

  if (!isEditing) {
    return (
      <div className="relative group/code my-4">
        {langId && (
          <div className="absolute top-3 left-4 text-[10px] font-mono text-gray-500 uppercase tracking-wider z-10">
            {langId}
          </div>
        )}
        <pre className="bg-[#0d1117] text-[#e6edf3] rounded-xl pt-8 pb-5 px-5 text-[13px] leading-[1.7] font-mono overflow-x-auto whitespace-pre border border-[#30363d]/50 shadow-sm">
          <code>{initialCode}</code>
        </pre>
        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover/code:opacity-100 focus-within:opacity-100 transition-all z-10">
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 rounded-md bg-[#161b22] text-green-400 hover:bg-[#30363d] transition-all text-[11px] font-medium flex items-center gap-1"
            title="Edit & Run"
          >
            <Play className="w-3 h-3" />
            Edit & Run
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-[#161b22] text-gray-400 hover:text-gray-200 hover:bg-[#30363d] transition-all"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 rounded-xl border border-[#30363d] overflow-hidden bg-[#0d1117]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            {langId}
          </span>
          <span className="text-[10px] text-gray-600">Interactive</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-medium flex items-center gap-1.5"
          >
            {isRunning ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#30363d] transition-all"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#30363d] transition-all"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => { setIsEditing(false); reset(); }}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#30363d] transition-all text-xs"
            title="Exit editor"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Suspense
        fallback={
          <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Loading editor...
          </div>
        }
      >
        <MonacoEditor
          height="300px"
          language={LANG_MONACO_MAP[langId] ?? 'plaintext'}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineHeight: 22,
            padding: { top: 12 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </Suspense>

      {/* Output */}
      {result && (
        <div className="border-t border-[#30363d]">
          <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-[#30363d]/50">
            <Terminal className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              Output
            </span>
            {result.exitCode !== 0 && (
              <span className="text-[10px] text-red-400 ml-2">
                Exit code: {result.exitCode}
              </span>
            )}
          </div>
          <pre className="px-5 py-3 text-[13px] leading-[1.7] font-mono overflow-x-auto whitespace-pre max-h-48 overflow-y-auto">
            {result.error && (
              <code className="text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {result.error}
              </code>
            )}
            {result.stdout && (
              <code className="text-green-400">{result.stdout}</code>
            )}
            {result.stderr && (
              <code className="text-red-400">{result.stderr}</code>
            )}
            {!result.error && !result.stdout && !result.stderr && (
              <code className="text-gray-500">(No output)</code>
            )}
          </pre>
        </div>
      )}

      {/* Fallback link */}
      {result?.error && playgroundUrl && (
        <div className="px-4 py-2 border-t border-[#30363d] text-center">
          <a
            href={playgroundUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 underline"
          >
            Open in external playground
          </a>
        </div>
      )}
    </div>
  );
}
