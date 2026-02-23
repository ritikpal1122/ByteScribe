import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useArticles } from '@/hooks/useArticles';
import { SearchBar } from '@/components/common/SearchBar';
import { TagBadge } from '@/components/common/TagBadge';
import { ArticleList } from '@/components/articles/ArticleList';
import { Pagination } from '@/components/common/Pagination';

const POPULAR_TAGS = [
  'javascript',
  'python',
  'react',
  'system-design',
  'algorithms',
  'databases',
  'devops',
  'typescript',
];

export default function ArticlesIndex() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? '1');
  const currentTag = searchParams.get('tag') ?? undefined;
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  const { data, isLoading } = useArticles(currentPage, 20, currentTag);

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  }

  function handleTagClick(tag: string) {
    const params = new URLSearchParams(searchParams);
    if (currentTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    params.delete('page');
    setSearchParams(params);
  }

  function handleSearch(value: string) {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    params.delete('page');
    setSearchParams(params);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Articles
          </h1>
          <p className="mt-1 text-gray-500">
            Explore in-depth tutorials, guides, and engineering insights.
          </p>
        </div>

        {isAuthenticated && (
          <Link
            to="/articles/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <PenLine className="h-4 w-4" />
            Write Article
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mt-8 space-y-4">
        <SearchBar
          value={search}
          onChange={handleSearch}
          placeholder="Search articles..."
          className="max-w-xl"
        />

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Article List */}
      <div className="mt-8">
        <ArticleList
          articles={data?.items ?? []}
          isLoading={isLoading}
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
