import { useState, useCallback, lazy, Suspense } from 'react';
import {
  Trophy,
  Play,
  Eye,
  EyeOff,
  Lightbulb,
  Loader2,
  Terminal,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Code2,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import type { PracticeChallenge } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { useCodeExecution } from '../hooks/useCodeExecution';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

const LANG_MONACO_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  cpp: 'cpp',
  java: 'java',
  go: 'go',
  rust: 'rust',
};

/* ------------------------------------------------------------------ */
/*  Mac-style window dots                                              */
/* ------------------------------------------------------------------ */
function WindowDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Difficulty Badge                                                    */
/* ------------------------------------------------------------------ */
const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; dotColor: string; badgeColor: string }
> = {
  beginner: {
    label: 'Beginner',
    dotColor: 'bg-green-400',
    badgeColor: 'bg-green-50 text-green-700 border-green-200',
  },
  intermediate: {
    label: 'Intermediate',
    dotColor: 'bg-yellow-400',
    badgeColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  advanced: {
    label: 'Advanced',
    dotColor: 'bg-red-400',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
  },
};

function DifficultyBadge({ level }: { level?: string }) {
  const config = DIFFICULTY_CONFIG[level ?? 'intermediate'] ?? DIFFICULTY_CONFIG.intermediate;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border ${config.badgeColor}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hint Card                                                          */
/* ------------------------------------------------------------------ */
function HintCard({
  hint,
  index,
  isRevealed,
}: {
  hint: string;
  index: number;
  isRevealed: boolean;
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-out ${
        isRevealed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60 mb-2">
        <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
          {index + 1}
        </span>
        <p className="text-sm text-amber-900 leading-relaxed flex-1">{hint}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ChallengeBlock                                                     */
/* ================================================================== */
export default function ChallengeBlock({
  challenge,
  entryId,
  langId,
  colors,
  difficulty,
}: {
  challenge: PracticeChallenge;
  entryId: string;
  langId: string;
  colors: LangColorTokens;
  difficulty?: string;
}) {
  const storageKey = `learntext-challenge-${langId}-${entryId}`;
  const [code, setCode] = useState(challenge.starterCode);
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [hintsExpanded, setHintsExpanded] = useState(true);
  const [completed, setCompleted] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });
  const { result, isRunning, run, reset } = useCodeExecution(langId);

  const handleRun = useCallback(() => {
    run(code);
  }, [run, code]);

  const handleShowSolution = useCallback(() => {
    if (!showSolution) {
      const confirmed = window.confirm(
        'Are you sure you want to see the solution?',
      );
      if (!confirmed) return;
    }
    setShowSolution(!showSolution);
  }, [showSolution]);

  const handleMarkComplete = useCallback(() => {
    setCompleted(true);
    try {
      localStorage.setItem(storageKey, 'true');
    } catch {}
  }, [storageKey]);

  const handleRevealHint = useCallback(() => {
    setRevealedHints((h) => Math.min(h + 1, challenge.hints.length));
  }, [challenge.hints.length]);

  const handleReset = useCallback(() => {
    setCompleted(false);
    setCode(challenge.starterCode);
    setShowSolution(false);
    setRevealedHints(0);
    reset();
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [challenge.starterCode, reset, storageKey]);

  /* ---------------------------------------------------------------- */
  /*  Completed State                                                  */
  /* ---------------------------------------------------------------- */
  if (completed) {
    return (
      <div className="mt-6 mb-6">
        <div className="rounded-lg border border-green-200 overflow-hidden">
          <div className="px-5 py-6 bg-green-50 text-center">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Challenge Completed!
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Great work solving this challenge
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-green-700 bg-white border border-green-200 hover:bg-green-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Active Challenge                                                 */
  /* ---------------------------------------------------------------- */
  return (
    <div className="mt-6 mb-6">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2.5">
          <Code2 className="w-4 h-4 text-gray-400" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              Coding Challenge
            </h3>
          </div>
          {difficulty && <DifficultyBadge level={difficulty} />}
        </div>

        {/* Prompt */}
        <div className="px-5 py-4 bg-white border-b border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            {challenge.prompt}
          </p>
        </div>

        {/* Hints */}
        {challenge.hints.length > 0 && (
          <div className="px-5 py-3 border-b border-gray-100 bg-white">
            <button
              onClick={() => setHintsExpanded(!hintsExpanded)}
              className="flex items-center gap-2 mb-2 w-full text-left group"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-gray-600">
                Hints
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                ({revealedHints}/{challenge.hints.length})
              </span>
              {hintsExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-auto" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />
              )}
            </button>

            {hintsExpanded && (
              <div className="mt-1">
                {challenge.hints.map((hint, i) => (
                  <HintCard
                    key={i}
                    hint={hint}
                    index={i}
                    isRevealed={i < revealedHints}
                  />
                ))}

                {revealedHints < challenge.hints.length && (
                  <button
                    onClick={handleRevealHint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 transition-all"
                  >
                    <Lightbulb className="w-3 h-3" />
                    Reveal hint {revealedHints + 1}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Editor toolbar with Mac dots */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-3">
            <WindowDots />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              {langId}
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-600">
            editor
          </span>
        </div>

        {/* Monaco Editor */}
        <Suspense
          fallback={
            <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm bg-[#1e1e1e]">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading editor...
            </div>
          }
        >
          <MonacoEditor
            height="250px"
            language={LANG_MONACO_MAP[langId] ?? 'plaintext'}
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v ?? '')}
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

        {/* Action bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-t border-[#30363d]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-3.5 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-green-900/20"
            >
              {isRunning ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              {isRunning ? 'Running...' : 'Run & Check'}
            </button>
            <button
              onClick={handleShowSolution}
              className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#30363d] text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              {showSolution ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>
          <button
            onClick={handleMarkComplete}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-blue-900/20"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark Complete
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="border-t border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-[#30363d]/50">
              <Terminal className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                Output
              </span>
            </div>
            <pre className="px-5 py-3 text-[13px] leading-[1.7] font-mono overflow-x-auto whitespace-pre max-h-40 overflow-y-auto">
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
            </pre>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="border-t border-[#30363d] bg-[#0d1117]">
            <div className="px-4 py-1.5 border-b border-[#30363d]/50 flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-yellow-500" />
              <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-wider">
                Solution
              </span>
            </div>
            <pre className="px-5 py-3 text-[13px] leading-[1.7] font-mono text-[#e6edf3] overflow-x-auto whitespace-pre">
              <code>{challenge.solutionCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
