import { BarChart3, Clock, HardDrive, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { TagBadge } from '@/components/common/TagBadge';
import type { Problem } from '@/types/problem';

interface ProblemDescriptionProps {
  problem: Problem;
  className?: string;
}

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
} as const;

export function ProblemDescription({ problem, className }: ProblemDescriptionProps) {
  // Filter out placeholder test cases (from lean seed scripts)
  const realTestCases = problem.sample_test_cases.filter(
    (tc) => tc.input !== 'sample_input' && tc.expected_output !== 'sample_output'
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {problem.title}
          </h1>
          <span
            className={cn(
              'rounded-full px-3 py-0.5 text-xs font-semibold capitalize',
              DIFFICULTY_STYLES[problem.difficulty]
            )}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4" />
            {problem.acceptance_rate.toFixed(1)}% acceptance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-medium tabular-nums">
              {problem.submission_count.toLocaleString()}
            </span>
            submissions
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {problem.time_limit_ms}ms
          </span>
          <span className="flex items-center gap-1.5">
            <HardDrive className="h-4 w-4" />
            {problem.memory_limit_mb}MB
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <MarkdownRenderer content={problem.description} />
      </div>

      {/* Input Format */}
      {problem.input_format && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            Input Format
          </h3>
          <MarkdownRenderer content={problem.input_format} />
        </div>
      )}

      {/* Output Format */}
      {problem.output_format && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            Output Format
          </h3>
          <MarkdownRenderer content={problem.output_format} />
        </div>
      )}

      {/* Constraints */}
      {problem.constraints && problem.constraints !== 'See problem statement.' && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            Constraints
          </h3>
          <MarkdownRenderer content={problem.constraints} />
        </div>
      )}

      {/* Sample Test Cases */}
      {realTestCases.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">
            Examples
          </h3>
          {realTestCases.map((tc, index) => (
            <div
              key={tc.id}
              className="rounded-lg border border-gray-200 bg-gray-50"
            >
              <div className="border-b border-gray-200 px-4 py-2">
                <span className="text-sm font-medium text-gray-700">
                  Example {index + 1}
                </span>
              </div>
              <div className="grid gap-4 p-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Input
                  </p>
                  <pre className="rounded-md bg-gray-900 p-3 text-sm text-gray-100">
                    {tc.input}
                  </pre>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Expected Output
                  </p>
                  <pre className="rounded-md bg-gray-900 p-3 text-sm text-gray-100">
                    {tc.expected_output}
                  </pre>
                </div>
              </div>
              {tc.explanation && (
                <div className="border-t border-gray-200 px-4 py-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Explanation
                  </p>
                  <p className="text-sm text-gray-700">
                    {tc.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {problem.tags.length > 0 && (
        <div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            Topics
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {problem.tags.map((tag) => (
              <TagBadge key={tag} name={tag} slug={tag} />
            ))}
          </div>
        </div>
      )}

      {/* Company tags */}
      {problem.companies.length > 0 && (
        <div>
          <h3 className="mb-2 flex items-center gap-1.5 text-base font-semibold text-gray-900">
            <Building2 className="h-4 w-4" />
            Companies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {problem.companies.map((company) => (
              <span
                key={company}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
