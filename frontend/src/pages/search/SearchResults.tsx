import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  FileText,
  HelpCircle,
  Code2,
  Clock,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { SearchContentType } from '@/api/search';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ResultTab = 'all' | 'article' | 'question' | 'problem';

interface DisplayResult {
  id: string;
  slug: string;
  type: 'article' | 'question' | 'problem';
  title: string;
  preview: string;
  tags: string[];
  time: string;
  meta?: string;
}

/* ------------------------------------------------------------------ */
/*  Type config                                                        */
/* ------------------------------------------------------------------ */

const typeConfig: Record<string, { icon: typeof FileText; color: string; label: string; path: string }> = {
  article: { icon: FileText, color: 'text-sky-400 bg-sky-400/10', label: 'Article', path: '/articles' },
  question: { icon: HelpCircle, color: 'text-amber-400 bg-amber-400/10', label: 'Question', path: '/questions' },
  problem: { icon: Code2, color: 'text-emerald-400 bg-emerald-400/10', label: 'Problem', path: '/problems' },
};

/* ------------------------------------------------------------------ */
/*  Result card                                                        */
/* ------------------------------------------------------------------ */

function ResultCard({ result }: { result: DisplayResult }) {
  const cfg = typeConfig[result.type] || typeConfig.article;
  const Icon = cfg.icon;

  return (
    <Link
      to={`${cfg.path}/${result.slug}`}
      className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:bg-gray-50 transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
          <Icon className="w-3 h-3" />
          {cfg.label}
        </span>
        {result.meta && (
          <span className="text-xs text-gray-600">{result.meta}</span>
        )}
        {result.time && (
          <span className="flex items-center gap-1 text-xs text-gray-600 ml-auto">
            <Clock className="w-3 h-3" />
            {result.time}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-blue-400 transition-colors mb-1.5">
        {result.title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
        {result.preview}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-gray-600" />
          {result.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs">
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: relative time                                              */
/* ------------------------------------------------------------------ */

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  return `${diffMonth}mo ago`;
}

/* ------------------------------------------------------------------ */
/*  SearchResults page                                                 */
/* ------------------------------------------------------------------ */

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [search, setSearch] = useState(queryParam);
  const [tab, setTab] = useState<ResultTab>('all');
  const debouncedSearch = useDebounce(search, 400);

  // Update URL when debounced search changes
  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ q: debouncedSearch }, { replace: true });
    }
  }, [debouncedSearch, setSearchParams]);

  const contentType: SearchContentType | undefined =
    tab === 'all' ? undefined : (tab as SearchContentType);

  const { data: searchData, isLoading } = useSearch(debouncedSearch, contentType);

  // Map API results to display results
  const results: DisplayResult[] = (searchData?.items || []).map((item) => ({
    id: item.id,
    slug: item.slug,
    type: item.content_type as 'article' | 'question' | 'problem',
    title: item.title,
    preview: item.excerpt || '',
    tags: item.tags || [],
    time: item.created_at ? timeAgo(item.created_at) : '',
  }));

  const totalCount = searchData?.total ?? results.length;

  const tabs: { id: ResultTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'article', label: 'Articles' },
    { id: 'question', label: 'Questions' },
    { id: 'problem', label: 'Problems' },
  ];

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LearnText..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {debouncedSearch.length >= 2 ? (
              <>
                {totalCount} result{totalCount !== 1 ? 's' : ''} for{' '}
                <span className="text-gray-800 font-medium">&quot;{debouncedSearch}&quot;</span>
              </>
            ) : (
              'Type at least 2 characters to search'
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" text="Searching..." />
          </div>
        ) : debouncedSearch.length < 2 ? (
          <div className="text-center py-20 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Enter a search query to find articles, questions, and problems.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No results found for &quot;{debouncedSearch}&quot;.</p>
            <p className="text-sm mt-1">Try different keywords or check the spelling.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
