import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestCaseInput {
  id?: string;
  input: string;
  expected_output: string;
}

interface TestCaseResult {
  input: string;
  expected_output: string;
  actual_output: string;
  passed: boolean;
}

interface TestCasePanelProps {
  testCases: TestCaseInput[];
  results?: TestCaseResult[];
  className?: string;
}

export function TestCasePanel({ testCases, results, className }: TestCasePanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  const hasResults = results && results.length > 0;
  const items = hasResults ? results : testCases;

  if (items.length === 0) {
    return (
      <div
        className={cn(
          'rounded-lg border border-gray-200 bg-white p-6 text-center',
          className
        )}
      >
        <p className="text-sm text-gray-500">
          No test cases available
        </p>
      </div>
    );
  }

  const passCount = results?.filter((r) => r.passed).length ?? 0;
  const totalCount = results?.length ?? 0;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-gray-200 bg-white',
        className
      )}
    >
      {/* Summary bar (only when results exist) */}
      {hasResults && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
          <span className="text-sm font-medium text-gray-700">
            Test Results
          </span>
          <span
            className={cn(
              'text-sm font-semibold',
              passCount === totalCount
                ? 'text-emerald-600'
                : 'text-red-600'
            )}
          >
            {passCount}/{totalCount} passed
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-0 overflow-x-auto border-b border-gray-200">
        {items.map((_, index) => {
          const result = hasResults ? results![index] : null;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors',
                activeTab === index
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {result && (
                result.passed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                )
              )}
              Case {index + 1}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Input */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            Input
          </p>
          <pre className="rounded-md bg-gray-100 p-3 text-sm text-gray-800">
            {items[activeTab]?.input ?? ''}
          </pre>
        </div>

        {/* Expected Output */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            Expected Output
          </p>
          <pre className="rounded-md bg-gray-100 p-3 text-sm text-gray-800">
            {items[activeTab]?.expected_output ?? ''}
          </pre>
        </div>

        {/* Actual Output (only when results exist) */}
        {hasResults && results![activeTab] && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              Actual Output
            </p>
            <pre
              className={cn(
                'rounded-md p-3 text-sm',
                results![activeTab].passed
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-red-50 text-red-800'
              )}
            >
              {results![activeTab].actual_output}
            </pre>
          </div>
        )}

        {/* Status badge */}
        {hasResults && results![activeTab] && (
          <div className="flex items-center gap-2 pt-1">
            {results![activeTab].passed ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Passed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                <XCircle className="h-3.5 w-3.5" />
                Failed
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
