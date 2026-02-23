import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowUpDown, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TagBadge } from '@/components/common/TagBadge';
import { EmptyState } from '@/components/common/EmptyState';
import type { ProblemListItem } from '@/types/problem';

interface ProblemListProps {
  problems: ProblemListItem[];
  isLoading?: boolean;
  className?: string;
}

type SortField = 'title' | 'difficulty' | 'acceptance_rate';
type SortDirection = 'asc' | 'desc';

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
} as const;

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 } as const;

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-gray-100">
      <td className="px-4 py-3">
        <div className="mx-auto h-5 w-5 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-48 rounded bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-16 rounded-full bg-gray-200" />
      </td>
      <td className="px-4 py-3">
        <div className="h-5 w-12 rounded bg-gray-200" />
      </td>
      <td className="hidden px-4 py-3 lg:table-cell">
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-full bg-gray-100" />
          <div className="h-5 w-16 rounded-full bg-gray-100" />
        </div>
      </td>
    </tr>
  );
}

export function ProblemList({ problems, isLoading = false, className }: ProblemListProps) {
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sortedProblems = [...problems].sort((a, b) => {
    let cmp = 0;
    switch (sortField) {
      case 'title':
        cmp = a.title.localeCompare(b.title);
        break;
      case 'difficulty':
        cmp = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
        break;
      case 'acceptance_rate':
        cmp = a.acceptance_rate - b.acceptance_rate;
        break;
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  if (!isLoading && problems.length === 0) {
    return (
      <EmptyState
        icon={Code2}
        title="No problems found"
        description="There are no problems matching your filters. Try adjusting your search criteria."
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-gray-200 bg-white',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-12 px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => toggleSort('title')}
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors hover:text-gray-700"
                >
                  Title
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => toggleSort('difficulty')}
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors hover:text-gray-700"
                >
                  Difficulty
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => toggleSort('acceptance_rate')}
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-500 transition-colors hover:text-gray-700"
                >
                  Acceptance
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 lg:table-cell">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
              : sortedProblems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      {problem.user_solved && (
                        <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" />
                      )}
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3">
                      <Link
                        to={`/problems/${problem.slug}`}
                        className="font-medium text-gray-900 transition-colors hover:text-blue-600"
                      >
                        {problem.title}
                      </Link>
                    </td>

                    {/* Difficulty */}
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
                          DIFFICULTY_STYLES[problem.difficulty]
                        )}
                      >
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Acceptance */}
                    <td className="px-4 py-3">
                      <span className="text-sm tabular-nums text-gray-600">
                        {problem.acceptance_rate.toFixed(1)}%
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.slice(0, 3).map((tag) => (
                          <TagBadge key={tag} name={tag} slug={tag} />
                        ))}
                        {problem.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{problem.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
