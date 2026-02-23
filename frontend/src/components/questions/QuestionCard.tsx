import { Link } from 'react-router-dom';
import { ChevronUp, MessageSquare, Eye, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/common/UserAvatar';
import { TagBadge } from '@/components/common/TagBadge';
import { TimeAgo } from '@/components/common/TimeAgo';
import type { QuestionListItem } from '@/types/question';

interface QuestionCardProps {
  question: QuestionListItem;
  className?: string;
}

export function QuestionCard({ question, className }: QuestionCardProps) {
  const voteScore = question.upvotes - question.downvotes;

  return (
    <article
      className={cn(
        'group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md',
        question.is_resolved && 'border-l-4 border-l-emerald-500',
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
          {/* Title with resolved indicator */}
          <div className="flex items-start gap-2">
            {question.is_resolved && (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            )}
            <Link
              to={`/questions/${question.slug}`}
              className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600"
            >
              {question.title}
            </Link>
          </div>

          {/* Body snippet */}
          {question.body && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
              {question.body.replace(/[#*`_~\[\]]/g, '').slice(0, 200)}
            </p>
          )}

          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {question.tags.map((tag) => (
                <TagBadge key={tag} name={tag} slug={tag} />
              ))}
            </div>
          )}

          {/* Footer: author, date, stats */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {/* Author */}
            <Link
              to={`/users/${question.author.username}`}
              className="flex items-center gap-2 transition-colors hover:text-gray-700"
            >
              <UserAvatar
                src={question.author.avatar_url}
                name={question.author.full_name}
                size="sm"
              />
              <span className="font-medium">{question.author.full_name}</span>
            </Link>

            {/* Date */}
            <TimeAgo date={question.created_at} />

            {/* Stats */}
            <div className="flex items-center gap-3">
              {/* Answers */}
              <span
                className={cn(
                  'flex items-center gap-1',
                  question.is_resolved && 'font-medium text-emerald-600'
                )}
              >
                <MessageSquare className="h-4 w-4" />
                {question.answer_count}
                <span className="hidden xs:inline">
                  {question.answer_count === 1 ? 'answer' : 'answers'}
                </span>
              </span>

              {/* Views */}
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {question.view_count}
              </span>

              {/* Mobile vote score */}
              <span className="flex items-center gap-1 sm:hidden">
                <ChevronUp className="h-4 w-4" />
                {voteScore}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
