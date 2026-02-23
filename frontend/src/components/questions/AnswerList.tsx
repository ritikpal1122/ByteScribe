import { Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VoteButtons } from '@/components/common/VoteButtons';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { UserAvatar } from '@/components/common/UserAvatar';
import { TimeAgo } from '@/components/common/TimeAgo';
import type { Answer } from '@/types/question';

interface AnswerListProps {
  answers: Answer[];
  questionAuthorId: string;
  currentUserId?: string;
  onVote: (answerId: string, vote: 'up' | 'down') => void;
  onAccept?: (answerId: string) => void;
  className?: string;
}

interface AnswerItemProps {
  answer: Answer;
  isQuestionAuthor: boolean;
  onVote: (vote: 'up' | 'down') => void;
  onAccept?: () => void;
}

function AnswerItem({ answer, isQuestionAuthor, onVote, onAccept }: AnswerItemProps) {
  return (
    <article
      id={`answer-${answer.id}`}
      className={cn(
        'rounded-xl border bg-white p-5',
        answer.is_accepted
          ? 'border-emerald-300 ring-1 ring-emerald-200'
          : 'border-gray-200'
      )}
    >
      <div className="flex gap-4">
        {/* Votes */}
        <div className="hidden shrink-0 flex-col items-center gap-3 sm:flex">
          <VoteButtons
            upvotes={answer.upvotes}
            downvotes={answer.downvotes}
            userVote={answer.user_vote}
            onVote={onVote}
            size="md"
          />

          {/* Accept button or indicator */}
          {answer.is_accepted ? (
            <div className="flex flex-col items-center" title="Accepted answer">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <span className="mt-0.5 text-xs font-medium text-emerald-600">
                Accepted
              </span>
            </div>
          ) : isQuestionAuthor && onAccept ? (
            <button
              onClick={onAccept}
              className="flex flex-col items-center text-gray-400 transition-colors hover:text-emerald-500"
              title="Mark as accepted answer"
            >
              <CheckCircle2 className="h-8 w-8" />
              <span className="mt-0.5 text-xs font-medium">Accept</span>
            </button>
          ) : null}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Accepted badge (mobile) */}
          {answer.is_accepted && (
            <div className="mb-3 flex items-center gap-1.5 sm:hidden">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">
                Accepted Answer
              </span>
            </div>
          )}

          {/* Answer body */}
          <MarkdownRenderer content={answer.body} />

          {/* Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4">
            {/* Comment count */}
            <button className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700">
              <MessageSquare className="h-4 w-4" />
              Add a comment
            </button>

            {/* Author info */}
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2">
              <div className="text-right text-xs text-gray-500">
                <span>answered</span>
                <br />
                <TimeAgo date={answer.created_at} className="text-xs" />
              </div>
              <Link
                to={`/users/${answer.author.username}`}
                className="flex items-center gap-2"
              >
                <UserAvatar
                  src={answer.author.avatar_url}
                  name={answer.author.full_name}
                  size="sm"
                />
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    {answer.author.full_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {answer.author.reputation.toLocaleString()} reputation
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function AnswerList({
  answers,
  questionAuthorId,
  currentUserId,
  onVote,
  onAccept,
  className,
}: AnswerListProps) {
  const isQuestionAuthor = currentUserId === questionAuthorId;

  // Sort: accepted first, then by votes
  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.is_accepted && !b.is_accepted) return -1;
    if (!a.is_accepted && b.is_accepted) return 1;
    return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
  });

  if (sortedAnswers.length === 0) {
    return (
      <div className={cn('py-8 text-center', className)}>
        <p className="text-lg font-medium text-gray-600">
          No answers yet
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Be the first to answer this question.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-xl font-semibold text-gray-900">
        {sortedAnswers.length} {sortedAnswers.length === 1 ? 'Answer' : 'Answers'}
      </h2>

      {sortedAnswers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          isQuestionAuthor={isQuestionAuthor}
          onVote={(vote) => onVote(answer.id, vote)}
          onAccept={onAccept ? () => onAccept(answer.id) : undefined}
        />
      ))}
    </div>
  );
}
