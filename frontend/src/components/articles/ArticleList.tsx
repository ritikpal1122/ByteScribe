import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/common/EmptyState';
import { ArticleCard } from './ArticleCard';
import type { ArticleListItem } from '@/types/article';

interface ArticleListProps {
  articles: ArticleListItem[];
  isLoading: boolean;
  className?: string;
}

function ArticleCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex gap-4">
        {/* Vote skeleton */}
        <div className="hidden shrink-0 sm:block">
          <div className="h-16 w-10 rounded-lg bg-gray-200" />
        </div>

        {/* Content skeleton */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Title */}
          <div className="h-5 w-3/4 rounded bg-gray-200" />

          {/* Summary */}
          <div className="space-y-1.5">
            <div className="h-3.5 w-full rounded bg-gray-100" />
            <div className="h-3.5 w-5/6 rounded bg-gray-100" />
          </div>

          {/* Tags */}
          <div className="flex gap-1.5">
            <div className="h-5 w-14 rounded-full bg-gray-100" />
            <div className="h-5 w-18 rounded-full bg-gray-100" />
            <div className="h-5 w-12 rounded-full bg-gray-100" />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-3.5 w-24 rounded bg-gray-100" />
            <div className="h-3.5 w-16 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleList({
  articles,
  isLoading,
  className,
}: ArticleListProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No articles yet"
        description="Be the first to share your knowledge. Write an article to help the community learn something new."
        className={className}
      />
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
