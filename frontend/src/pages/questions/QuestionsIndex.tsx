import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useQuestions } from '@/hooks/useQuestions';
import { SearchBar } from '@/components/common/SearchBar';
import { TagBadge } from '@/components/common/TagBadge';
import { QuestionList } from '@/components/questions/QuestionList';
import { Pagination } from '@/components/common/Pagination';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'votes', label: 'Most Votes' },
  { value: 'unanswered', label: 'Unanswered' },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]['value'];

const POPULAR_TAGS = [
  'javascript',
  'python',
  'react',
  'algorithms',
  'system-design',
  'databases',
  'css',
  'node.js',
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QuestionsIndex() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? '1');
  const currentTag = searchParams.get('tag') ?? undefined;
  const currentSort = (searchParams.get('sort') as SortOption) || 'newest';
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  const { data, isLoading } = useQuestions(currentPage, 20, currentTag);

  /* ── Helpers ─────────────────────────────────────────────── */

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }

  function handlePageChange(page: number) {
    updateParams({ page: String(page) });
  }

  function handleTagClick(tag: string) {
    updateParams({
      tag: currentTag === tag ? null : tag,
      page: null,
    });
  }

  function handleSortChange(sort: SortOption) {
    updateParams({ sort, page: null });
  }

  function handleSearch(value: string) {
    setSearch(value);
    updateParams({
      q: value.trim() || null,
      page: null,
    });
  }

  /* ── Render ──────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Questions
          </h1>
          <p className="mt-1 text-gray-500">
            Ask questions, share knowledge, and learn from the community.
          </p>
        </div>

        {isAuthenticated && (
          <Link
            to="/questions/ask"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Ask Question
          </Link>
        )}
      </div>

      {/* Search + Sort */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={handleSearch}
          placeholder="Search questions..."
          className="flex-1 sm:max-w-xl"
        />

        {/* Sort tabs */}
        <div className="flex items-center rounded-lg border border-gray-200">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg',
                currentSort === option.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tag filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => (
          <TagBadge
            key={tag}
            name={tag}
            onClick={() => handleTagClick(tag)}
            className={
              currentTag === tag
                ? 'ring-2 ring-blue-500 ring-offset-1'
                : ''
            }
          />
        ))}
      </div>

      {/* Question List */}
      <div className="mt-8">
        <QuestionList
          questions={data?.items ?? []}
          isLoading={isLoading}
          onAskQuestion={
            isAuthenticated ? () => (window.location.href = '/questions/ask') : undefined
          }
        />
      </div>

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="mt-8">
          <Pagination
            page={currentPage}
            totalPages={data.total_pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
