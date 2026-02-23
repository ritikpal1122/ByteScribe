import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Send,
  RotateCcw,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Loader2,
  GripVertical,
  FileText,
  Terminal,
  Settings2,
  Sparkles,
  MessageSquareText,
  LogIn,
  Lock,
} from 'lucide-react';
import { useProblem, useRunCode, useSubmitSolution } from '@/hooks/useProblems';
import { useCodeReview, useRequestReview } from '@/hooks/useCodeReview';
import { useAuthStore } from '@/stores/authStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import DiscussionSection from '@/components/discussion/DiscussionSection';
import type { Problem, RunResult, Submission, Verdict } from '@/types';
import type { CodeReviewData } from '@/api/codeReviews';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Language = 'javascript' | 'python' | 'cpp' | 'java' | 'go' | 'rust';

/* ------------------------------------------------------------------ */
/*  Editor store (language persisted)                                  */
/* ------------------------------------------------------------------ */

const LANG_STORAGE_KEY = 'learntext:editor:lang';

function getPersistedLang(): Language {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY);
    if (v) return v as Language;
  } catch { /* noop */ }
  return 'javascript';
}

function persistLang(lang: Language) {
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch { /* noop */ }
}

/* ------------------------------------------------------------------ */
/*  Starter code templates                                             */
/* ------------------------------------------------------------------ */

const starterCode: Record<Language, string> = {
  javascript: `/**
 * Write your solution here
 */
function solution() {
    // Your code here
};`,
  python: `class Solution:
    def solve(self):
        # Write your solution here
        pass`,
  cpp: `class Solution {
public:
    // Write your solution here
};`,
  java: `class Solution {
    // Write your solution here
}`,
  go: `func solve() {
    // Write your solution here
}`,
  rust: `impl Solution {
    pub fn solve() {
        // Write your solution here
    }
}`,
};

/* ------------------------------------------------------------------ */
/*  ProblemDescription                                                 */
/* ------------------------------------------------------------------ */

const diffColor: Record<string, string> = {
  easy: 'text-emerald-700 bg-emerald-50',
  medium: 'text-amber-700 bg-amber-50',
  hard: 'text-red-700 bg-red-50',
};

function ProblemDescription({ problem }: { problem: Problem }) {
  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        {problem.title}
      </h1>

      <div className="flex items-center gap-2 mb-6">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        {problem.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{t}</span>
        ))}
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none mb-6">
        {problem.description.split('\n').map((line, i) => (
          <p key={i} className="text-gray-700 leading-relaxed">
            {line.split('`').map((seg, j) =>
              j % 2 === 1 ? (
                <code key={j} className="px-1.5 py-0.5 bg-gray-100 rounded text-blue-700 text-xs font-mono">{seg}</code>
              ) : (
                <span key={j} dangerouslySetInnerHTML={{ __html: seg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ),
            )}
          </p>
        ))}
      </div>

      {/* Sample Test Cases */}
      {problem.sample_test_cases.map((tc, idx) => (
        <div key={tc.id} className="mb-4 bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Example {idx + 1}:</p>
          <div className="text-sm font-mono space-y-1">
            <p className="text-gray-600"><span className="text-gray-400">Input:</span> {tc.input}</p>
            <p className="text-gray-600"><span className="text-gray-400">Output:</span> {tc.expected_output}</p>
            {tc.explanation && (
              <p className="text-gray-500"><span className="text-gray-400">Explanation:</span> {tc.explanation}</p>
            )}
          </div>
        </div>
      ))}

      {/* Constraints */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">Constraints:</p>
        <div className="text-sm text-gray-600 font-mono whitespace-pre-wrap">{problem.constraints}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CodeEditor (placeholder textarea)                                  */
/* ------------------------------------------------------------------ */

function CodeEditor({
  code,
  onChange,
  language,
}: {
  code: string;
  onChange: (c: string) => void;
  language: Language;
}) {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      className="w-full h-full resize-none bg-gray-900 text-gray-100 font-mono text-sm p-4 focus:outline-none leading-relaxed"
      placeholder={`// Write your ${language} solution here...`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  TestCasePanel                                                      */
/* ------------------------------------------------------------------ */

function TestCasePanel({ testCases }: { testCases: Problem['sample_test_cases'] }) {
  const [active, setActive] = useState(0);
  const tc = testCases[active];

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex gap-2 mb-4">
        {testCases.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              active === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Case {i + 1}
          </button>
        ))}
      </div>
      {tc && (
        <div className="space-y-3 text-sm font-mono">
          <div>
            <p className="text-gray-500 mb-1">Input:</p>
            <pre className="bg-gray-50 rounded p-3 text-gray-700 whitespace-pre-wrap">{tc.input}</pre>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Expected Output:</p>
            <pre className="bg-gray-50 rounded p-3 text-gray-700 whitespace-pre-wrap">{tc.expected_output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ResultPanel                                                        */
/* ------------------------------------------------------------------ */

const verdictLabels: Record<string, string> = {
  accepted: 'Accepted',
  wrong_answer: 'Wrong Answer',
  time_limit_exceeded: 'Time Limit Exceeded',
  memory_limit_exceeded: 'Memory Limit Exceeded',
  runtime_error: 'Runtime Error',
  compilation_error: 'Compilation Error',
  pending: 'Pending',
};

/* ------------------------------------------------------------------ */
/*  RatingRing — small SVG circle with stroke-draw animation           */
/* ------------------------------------------------------------------ */

function RatingRing({ rating }: { rating: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(rating, 10) / 10;
  const offset = circumference - pct * circumference;
  const color = rating >= 7 ? '#10b981' : rating >= 4 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative shrink-0">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="5" />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 30 30)"
          className="animate-stroke-draw"
          style={{ '--circumference': circumference } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold" style={{ color }}>{rating}</span>
      </div>
    </div>
  );
}

function AIReviewPanel({ review }: { review: CodeReviewData }) {
  return (
    <div className="mt-4 rounded-xl border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50/50 shadow-md p-5 space-y-4 animate-slide-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
          <Sparkles className="w-4 h-4" />
          AI Code Review
        </div>
        <RatingRing rating={review.overall_rating} />
      </div>

      {/* Complexity badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-xs font-semibold shadow-sm">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Time: {review.time_complexity}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-700 text-xs font-semibold shadow-sm">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Space: {review.space_complexity}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-700 leading-relaxed">{review.summary}</p>

      {/* Strengths */}
      {review.strengths.length > 0 && (
        <div>
          <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wider">Strengths</p>
          <div className="space-y-2">
            {review.strengths.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border-l-3 border-l-green-400 bg-green-50/60 px-3 py-2 text-xs text-green-800 animate-fade-in-up"
                style={{ '--delay': `${(i + 1) * 100}ms` } as React.CSSProperties}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-500" />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {review.improvements.length > 0 && (
        <div>
          <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wider">Improvements</p>
          <div className="space-y-2">
            {review.improvements.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border-l-3 border-l-amber-400 bg-amber-50/60 px-3 py-2 text-xs text-amber-800 animate-fade-in-up"
                style={{ '--delay': `${(review.strengths.length + i + 1) * 100}ms` } as React.CSSProperties}
              >
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultPanel({
  runResult,
  submission,
  isRunning,
  isSubmitting,
}: {
  runResult: RunResult | null;
  submission: Submission | null;
  isRunning: boolean;
  isSubmitting: boolean;
}) {
  const requestReview = useRequestReview();
  const { data: existingReview } = useCodeReview(submission?.id);

  const review = requestReview.data?.data ?? existingReview ?? null;

  if (isRunning || isSubmitting) {
    return (
      <div className="flex items-center justify-center h-full gap-3 text-gray-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">{isRunning ? 'Running tests...' : 'Submitting solution...'}</span>
      </div>
    );
  }

  if (submission) {
    const accepted = submission.verdict === 'accepted';
    return (
      <div className="p-4 h-full overflow-y-auto">
        <div className={`flex items-center gap-2 mb-4 text-lg font-bold ${accepted ? 'text-emerald-600' : 'text-red-600'}`}>
          {accepted ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          {verdictLabels[submission.verdict] ?? submission.verdict}
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 mb-1">Tests Passed</p>
            <p className="text-gray-900 font-semibold">{submission.test_cases_passed}/{submission.total_test_cases}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 mb-1">Runtime</p>
            <p className="text-gray-900 font-semibold">{submission.runtime_ms != null ? `${submission.runtime_ms}ms` : '-'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-500 mb-1">Memory</p>
            <p className="text-gray-900 font-semibold">{submission.memory_kb != null ? `${(submission.memory_kb / 1024).toFixed(1)} MB` : '-'}</p>
          </div>
        </div>
        {submission.error_message && (
          <pre className="mt-4 bg-red-50 rounded-lg p-3 text-sm text-red-700 whitespace-pre-wrap">{submission.error_message}</pre>
        )}

        {/* AI Review */}
        {accepted && !review && (
          <button
            onClick={() => requestReview.mutate(submission.id)}
            disabled={requestReview.isPending}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-shift px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
          >
            {requestReview.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {requestReview.isPending ? 'Analyzing...' : 'Get AI Review'}
          </button>
        )}
        {review && <AIReviewPanel review={review} />}
      </div>
    );
  }

  if (runResult) {
    const hasTestResults = runResult.test_results && runResult.test_results.length > 0;
    return (
      <div className="p-4 h-full overflow-y-auto">
        {runResult.stderr && (
          <pre className="bg-red-50 rounded-lg p-3 text-sm text-red-700 whitespace-pre-wrap mb-3">{runResult.stderr}</pre>
        )}
        {hasTestResults ? (
          <div className="space-y-3">
            {runResult.test_results.map((r, idx) => (
              <div key={idx} className={`rounded-lg p-3 border ${r.passed ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {r.passed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                    <span className={`text-sm font-medium ${r.passed ? 'text-emerald-700' : 'text-red-700'}`}>Test Case {idx + 1}</span>
                  </div>
                  <span className="text-xs text-gray-500">{runResult.runtime_ms}ms</span>
                </div>
                {!r.passed && (
                  <div className="text-xs font-mono space-y-1 mt-2">
                    <p className="text-gray-500">Expected: <span className="text-gray-700">{r.expected_output}</span></p>
                    <p className="text-gray-500">Got: <span className="text-red-600">{r.actual_output}</span></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : runResult.stdout ? (
          <div className="rounded-lg p-3 border border-gray-200 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700 mb-2">Output:</p>
            <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap">{runResult.stdout}</pre>
          </div>
        ) : !runResult.stderr ? (
          <p className="text-sm text-gray-500">No output produced.</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
      Run your code to see results here.
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main ProblemSolve page                                             */
/* ------------------------------------------------------------------ */

export default function ProblemSolve() {
  const { slug } = useParams<{ slug: string }>();
  const { data: problem, isLoading, isError, refetch } = useProblem(slug ?? '');
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const runMutation = useRunCode();
  const submitMutation = useSubmitSolution();

  const [language, setLanguage] = useState<Language>(getPersistedLang);
  const getStarterCode = (lang: Language) => {
    if (problem?.starter_code && problem.starter_code[lang]) {
      return problem.starter_code[lang] as string;
    }
    return starterCode[lang];
  };
  const [code, setCode] = useState(starterCode[language]);
  const [leftTab, setLeftTab] = useState<'description' | 'discussion'>('description');
  const [bottomTab, setBottomTab] = useState<'testcases' | 'result'>('testcases');
  const [langDropdown, setLangDropdown] = useState(false);

  /* Resizable pane state */
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitX, setSplitX] = useState(45);
  const dragging = useRef(false);

  // Set problem-specific starter code when problem loads
  useEffect(() => {
    if (problem?.starter_code && problem.starter_code[language]) {
      setCode(problem.starter_code[language] as string);
    }
  }, [problem]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseDown = () => { dragging.current = true; };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitX(Math.max(25, Math.min(75, pct)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  /* Language change */
  const switchLang = (l: Language) => {
    setLanguage(l);
    persistLang(l);
    setCode(getStarterCode(l));
    setLangDropdown(false);
  };

  const handleRun = () => {
    if (!problem) return;
    setBottomTab('result');
    runMutation.mutate({ problem_id: problem.slug, language, code });
  };

  const handleSubmit = () => {
    if (!problem) return;
    setBottomTab('result');
    submitMutation.mutate({ problem_id: problem.slug, language, code });
  };

  const handleReset = () => setCode(getStarterCode(language));

  const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];

  if (isLoading || !problem) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading problem..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Failed to load problem.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline ml-1">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white text-gray-900 flex flex-col overflow-hidden">
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{problem.title}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[problem.difficulty]}`}>{problem.difficulty}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              {languages.find((l) => l.value === language)?.label}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {langDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg py-1 shadow-xl z-50 min-w-[140px]">
                {languages.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => switchLang(l.value)}
                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      language === l.value ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleReset} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" title="Reset code">
            <RotateCcw className="w-4 h-4" />
          </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={handleRun}
                disabled={runMutation.isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <Play className="w-3.5 h-3.5" /> Run
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 text-sm text-white font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Submit
              </button>
            </>
          ) : (
            <>
              <div className="relative group">
                <button
                  disabled
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-400 cursor-not-allowed"
                >
                  <Lock className="w-3 h-3" /> Run
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Log in to run code
                </div>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-sm text-white font-medium hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" /> Log in to Submit
              </button>
            </>
          )}
        </div>
      </div>

      {/* ---- Split pane ---- */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden select-none">
        {/* Left: problem description / discussion */}
        <div className="flex flex-col overflow-hidden bg-white" style={{ width: `${splitX}%` }}>
          {/* Left panel tabs */}
          <div className="flex border-b border-gray-200 shrink-0">
            <button
              onClick={() => setLeftTab('description')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                leftTab === 'description'
                  ? 'text-gray-900 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Description
            </button>
            <button
              onClick={() => setLeftTab('discussion')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                leftTab === 'discussion'
                  ? 'text-gray-900 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquareText className="w-3.5 h-3.5" /> Discussion
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {leftTab === 'description' ? (
              <ProblemDescription problem={problem} />
            ) : (
              <DiscussionSection problemId={problem.id} />
            )}
          </div>
        </div>

        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1.5 cursor-col-resize bg-gray-200 hover:bg-blue-400 transition-colors flex items-center justify-center shrink-0"
        >
          <GripVertical className="w-3 h-3 text-gray-400" />
        </div>

        {/* Right: editor + results */}
        <div className="flex flex-col overflow-hidden" style={{ width: `${100 - splitX}%` }}>
          {/* Code editor */}
          <div className="flex-1 overflow-hidden border-b border-gray-200">
            <CodeEditor code={code} onChange={setCode} language={language} />
          </div>

          {/* Bottom tabs */}
          <div className="h-[280px] flex flex-col shrink-0 bg-white">
            <div className="flex border-b border-gray-200 shrink-0">
              <button
                onClick={() => setBottomTab('testcases')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                  bottomTab === 'testcases'
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Test Cases
              </button>
              <button
                onClick={() => setBottomTab('result')}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                  bottomTab === 'result'
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Result
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {bottomTab === 'testcases' ? (
                <TestCasePanel testCases={problem.sample_test_cases} />
              ) : (
                <ResultPanel
                  runResult={runMutation.data?.data ?? null}
                  submission={submitMutation.data?.data ?? null}
                  isRunning={runMutation.isPending}
                  isSubmitting={submitMutation.isPending}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
