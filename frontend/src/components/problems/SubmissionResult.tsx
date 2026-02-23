import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  AlertOctagon,
  HardDrive,
  FileCode,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Verdict, type Submission } from '@/types/problem';

interface SubmissionResultProps {
  submission: Submission;
  className?: string;
}

const VERDICT_CONFIG: Record<
  Verdict,
  { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }
> = {
  [Verdict.ACCEPTED]: {
    label: 'Accepted',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
    icon: CheckCircle2,
  },
  [Verdict.WRONG_ANSWER]: {
    label: 'Wrong Answer',
    color: 'text-red-700',
    bgColor: 'bg-red-50 border-red-200',
    icon: XCircle,
  },
  [Verdict.TIME_LIMIT_EXCEEDED]: {
    label: 'Time Limit Exceeded',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    icon: Clock,
  },
  [Verdict.MEMORY_LIMIT_EXCEEDED]: {
    label: 'Memory Limit Exceeded',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
    icon: HardDrive,
  },
  [Verdict.RUNTIME_ERROR]: {
    label: 'Runtime Error',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50 border-orange-200',
    icon: AlertTriangle,
  },
  [Verdict.COMPILATION_ERROR]: {
    label: 'Compilation Error',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: AlertOctagon,
  },
  [Verdict.PENDING]: {
    label: 'Pending',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50 border-gray-200',
    icon: Clock,
  },
};

export function SubmissionResult({ submission, className }: SubmissionResultProps) {
  const config = VERDICT_CONFIG[submission.verdict];
  const VerdictIcon = config.icon;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border',
        config.bgColor,
        className
      )}
    >
      {/* Verdict header */}
      <div className="flex items-center gap-3 p-4">
        <VerdictIcon className={cn('h-8 w-8', config.color)} />
        <div>
          <h3 className={cn('text-xl font-bold', config.color)}>
            {config.label}
          </h3>
          <p className="text-sm text-gray-500">
            {submission.test_cases_passed} / {submission.total_test_cases} test cases passed
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-200 sm:grid-cols-4">
        {/* Runtime */}
        <div className="flex flex-col items-center bg-white p-3">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Runtime</span>
          </div>
          <span className="mt-1 text-sm font-semibold text-gray-900">
            {submission.runtime_ms !== null ? `${submission.runtime_ms} ms` : '--'}
          </span>
        </div>

        {/* Memory */}
        <div className="flex flex-col items-center bg-white p-3">
          <div className="flex items-center gap-1 text-gray-500">
            <HardDrive className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Memory</span>
          </div>
          <span className="mt-1 text-sm font-semibold text-gray-900">
            {submission.memory_kb !== null
              ? `${(submission.memory_kb / 1024).toFixed(1)} MB`
              : '--'}
          </span>
        </div>

        {/* Language */}
        <div className="flex flex-col items-center bg-white p-3">
          <div className="flex items-center gap-1 text-gray-500">
            <FileCode className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Language</span>
          </div>
          <span className="mt-1 text-sm font-semibold capitalize text-gray-900">
            {submission.language}
          </span>
        </div>

        {/* Test Cases */}
        <div className="flex flex-col items-center bg-white p-3">
          <div className="flex items-center gap-1 text-gray-500">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Tests</span>
          </div>
          <span className="mt-1 text-sm font-semibold text-gray-900">
            {submission.test_cases_passed}/{submission.total_test_cases}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              submission.verdict === Verdict.ACCEPTED
                ? 'bg-emerald-500'
                : submission.verdict === Verdict.WRONG_ANSWER
                  ? 'bg-red-500'
                  : submission.verdict === Verdict.TIME_LIMIT_EXCEEDED ||
                      submission.verdict === Verdict.MEMORY_LIMIT_EXCEEDED
                    ? 'bg-amber-500'
                    : submission.verdict === Verdict.RUNTIME_ERROR
                      ? 'bg-orange-500'
                      : submission.verdict === Verdict.COMPILATION_ERROR
                        ? 'bg-purple-500'
                        : 'bg-gray-400'
            )}
            style={{
              width: `${
                submission.total_test_cases > 0
                  ? (submission.test_cases_passed / submission.total_test_cases) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Error output */}
      {submission.error_message && (
        <div className="border-t border-gray-200 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            Error Output
          </p>
          <pre className="max-h-48 overflow-auto rounded-md bg-gray-900 p-3 text-sm text-red-400">
            {submission.error_message}
          </pre>
        </div>
      )}
    </div>
  );
}
