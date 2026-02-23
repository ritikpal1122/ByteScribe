import { Link } from 'react-router-dom';
import { ChevronUp, MessageSquare, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/common/UserAvatar';
import { TagBadge } from '@/components/common/TagBadge';
import { TimeAgo } from '@/components/common/TimeAgo';
import type { ArticleListItem } from '@/types/article';

interface ArticleCardProps {
  article: ArticleListItem;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const voteScore = article.upvotes - article.downvotes;

  return (
    <article
      className={cn(
        'group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex gap-4">
        {/* Vote score */}
        <div className="hidden shrink-0 flex-col items-center pt-1 sm:flex">
          <div
            className={cn(
              'flex flex-col items-center rounded-lg border px-2.5 py-2',
              voteScore > 0
                ? 'border-emerald-200 bg-emerald-50'
                : voteScore < 0
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
            )}
          >
            <ChevronUp
              className={cn(
                'h-4 w-4',
                voteScore > 0
                  ? 'text-emerald-600'
                  : 'text-gray-400'
              )}
            />
            <span
              className={cn(
                'text-sm font-semibold tabular-nums',
                voteScore > 0
                  ? 'text-emerald-700'
                  : voteScore < 0
                    ? 'text-red-600'
                    : 'text-gray-600'
              )}
            >
              {voteScore}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <Link
            to={`/articles/${article.slug}`}
            className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600"
          >
            {article.title}
          </Link>

          {/* Summary */}
          {article.summary && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
              {article.summary}
            </p>
          )}

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <TagBadge key={tag} name={tag} slug={tag} />
              ))}
            </div>
          )}

          {/* Footer: author, date, stats */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {/* Author */}
            <Link
              to={`/users/${article.author.username}`}
              className="flex items-center gap-2 transition-colors hover:text-gray-700"
            >
              <UserAvatar
                src={article.author.avatar_url}
                name={article.author.full_name}
                size="sm"
              />
              <span className="font-medium">{article.author.full_name}</span>
            </Link>

            {/* Date */}
            <TimeAgo date={article.created_at} />

            {/* Stats */}
            <div className="flex items-center gap-3">
              {/* Comments */}
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {article.comment_count}
              </span>

              {/* Views */}
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {article.view_count}
              </span>

              {/* Mobile vote score */}
              <span className="flex items-center gap-1 sm:hidden">
                <ChevronUp className="h-4 w-4" />
                {voteScore}
              </span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {article.cover_image_url && (
          <div className="hidden shrink-0 lg:block">
            <img
              src={article.cover_image_url}
              alt=""
              className="h-24 w-36 rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </article>
  );
}
