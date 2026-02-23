import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/common/EmptyState';
import { QuestionCard } from './QuestionCard';
import type { QuestionListItem } from '@/types/question';

interface QuestionListProps {
  questions: QuestionListItem[];
  isLoading?: boolean;
  onAskQuestion?: () => void;
  className?: string;
}

function QuestionSkeleton() {
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

          {/* Body */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-5/6 rounded bg-gray-100" />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-full bg-gray-100" />
            <div className="h-5 w-20 rounded-full bg-gray-100" />
            <div className="h-5 w-14 rounded-full bg-gray-100" />
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
            <div className="h-4 w-16 rounded bg-gray-100" />
            <div className="h-4 w-20 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuestionList({
  questions,
  isLoading = false,
  onAskQuestion,
  className,
}: QuestionListProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <QuestionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <EmptyState
        icon={HelpCircle}
        title="No questions yet"
        description="Be the first to ask a question and get help from the community."
        action={onAskQuestion}
        actionLabel="Ask a Question"
        className={className}
      />
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
