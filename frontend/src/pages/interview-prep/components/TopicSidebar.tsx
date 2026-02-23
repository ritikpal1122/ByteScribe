import { cn } from '@/lib/utils';
import type { InterviewTopic } from '@/data/interview-prep/types';

interface Props {
  topics: InterviewTopic[];
  activeTopic: string | null;
  onSelect: (topicId: string | null) => void;
  getReviewedCount: (questionIds: string[]) => number;
  roleColor: string;
}

export default function TopicSidebar({
  topics,
  activeTopic,
  onSelect,
  getReviewedCount,
  roleColor,
}: Props) {
  const totalQuestions = topics.reduce((s, t) => s + t.questions.length, 0);
  const totalReviewed = topics.reduce(
    (s, t) => s + getReviewedCount(t.questions.map((q) => q.id)),
    0
  );
  const pct = totalQuestions > 0 ? Math.round((totalReviewed / totalQuestions) * 100) : 0;

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-gray-50/50">
      {/* Progress header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-gray-500">
            {totalReviewed}/{totalQuestions}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, backgroundColor: roleColor }}
          />
        </div>
      </div>

      {/* All topics button */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            'mb-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
            activeTopic === null
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:bg-white hover:text-gray-900'
          )}
        >
          All Topics
          <span className="ml-1 text-xs text-gray-400">({totalQuestions})</span>
        </button>

        {/* Individual topics */}
        {topics.map((topic) => {
          const isActive = activeTopic === topic.id;
          const reviewed = getReviewedCount(topic.questions.map((q) => q.id));
          const total = topic.questions.length;
          return (
            <button
              key={topic.id}
              onClick={() => onSelect(topic.id)}
              className={cn(
                'mb-0.5 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                isActive
                  ? 'bg-white font-medium text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              )}
            >
              <span className="truncate">{topic.label}</span>
              <span className="ml-2 shrink-0 text-xs text-gray-400">
                {reviewed > 0 ? `${reviewed}/` : ''}
                {total}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
