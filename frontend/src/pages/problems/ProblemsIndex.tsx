import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Tag,
  Code2,
  Building2,
} from 'lucide-react';
import { useProblems } from '@/hooks/useProblems';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import type { ProblemListItem } from '@/types';

/* ------------------------------------------------------------------ */
/*  Difficulty badge                                                   */
/* ------------------------------------------------------------------ */

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyColor: Record<string, string> = {
  easy: 'text-emerald-700 bg-emerald-50',
  medium: 'text-amber-700 bg-amber-50',
  hard: 'text-red-700 bg-red-50',
};

/* ------------------------------------------------------------------ */
/*  ProblemList (table)                                                */
/* ------------------------------------------------------------------ */

function ProblemList({ problems }: { problems: ProblemListItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-3 pr-4 w-10">Status</th>
            <th className="py-3 pr-4">Title</th>
            <th className="py-3 pr-4 w-28">Difficulty</th>
            <th className="py-3 pr-4 w-28">Acceptance</th>
            <th className="py-3 pr-4">Companies</th>
            <th className="py-3 w-40">Tags</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr
              key={p.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {/* status */}
              <td className="py-3 pr-4">
                {p.user_solved ? (
                  <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded border-2 border-gray-300" />
                )}
              </td>

              {/* title */}
              <td className="py-3 pr-4">
                <Link
                  to={`/problems/${p.slug}`}
                  className="text-gray-900 hover:text-blue-600 transition-colors font-medium"
                >
                  {p.title}
                </Link>
              </td>

              {/* difficulty */}
              <td className="py-3 pr-4">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${difficultyColor[p.difficulty]}`}
                >
                  {p.difficulty}
                </span>
              </td>

              {/* acceptance */}
              <td className="py-3 pr-4 text-gray-500">{p.acceptance_rate.toFixed(1)}%</td>

              {/* companies */}
              <td className="py-3 pr-4">
                <div className="flex flex-wrap gap-1">
                  {p.companies.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium"
                    >
                      {c}
                    </span>
                  ))}
                  {p.companies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-xs text-gray-400">
                      +{p.companies.length - 3}
                    </span>
                  )}
                </div>
              </td>

              {/* tags */}
              <td className="py-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 2 && (
                    <span className="px-1.5 py-0.5 text-xs text-gray-400">
                      +{p.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProblemsIndex page                                                 */
/* ------------------------------------------------------------------ */

export default function ProblemsIndex() {
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [tag, setTag] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedTag = useDebounce(tag, 300);

  const { data, isLoading, isError, refetch } = useProblems(
    page,
    20,
    difficulty === 'all' ? undefined : difficulty,
    debouncedTag || undefined,
    debouncedSearch || undefined,
  );

  /* reset page when filters change */
  const handleDifficulty = (d: Difficulty | 'all') => { setDifficulty(d); setPage(1); };
  const handleTag = (t: string) => { setTag(t); setPage(1); };
  const handleSearch = (s: string) => { setSearch(s); setPage(1); };

  const difficulties: (Difficulty | 'all')[] = ['all', 'easy', 'medium', 'hard'];
  const difficultyLabels: Record<string, string> = { all: 'All', easy: 'Easy', medium: 'Medium', hard: 'Hard' };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading problems..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load problems.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const problems = data?.items ?? [];
  const totalPages = data?.total_pages ?? 1;
  const total = data?.total ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* ---- Header ---- */}
      <div className="flex items-center gap-3 mb-8">
        <Code2 className="w-7 h-7 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Coding Problems</h1>
        <span className="ml-2 px-3 py-0.5 rounded-full bg-gray-100 text-gray-500 text-sm font-medium">
          {total}
        </span>
      </div>

      {/* ---- Filter bar ---- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Difficulty selector */}
        <div className="flex gap-1 rounded-lg border border-gray-200 p-1">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => handleDifficulty(d)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                difficulty === d
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {difficultyLabels[d]}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by tag..."
            value={tag}
            onChange={(e) => handleTag(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-44"
          />
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* ---- Problem List ---- */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {problems.length === 0 ? (
          <EmptyState
            icon={Code2}
            title="No problems found"
            description="No problems match your current filters. Try adjusting your search."
          />
        ) : (
          <ProblemList problems={problems} />
        )}
      </div>

      {/* ---- Pagination ---- */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
