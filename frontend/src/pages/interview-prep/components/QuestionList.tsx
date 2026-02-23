import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InterviewQuestion, InterviewTopic, Difficulty } from '@/data/interview-prep/types';
import QuestionCard from './QuestionCard';

const FILTERS: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

interface Props {
  topics: InterviewTopic[];
  activeTopic: string | null;
  isReviewed: (id: string) => boolean;
  onToggleReview: (id: string) => void;
  roleColor: string;
}

export default function QuestionList({
  topics,
  activeTopic,
  isReviewed,
  onToggleReview,
  roleColor,
}: Props) {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  const filtered = useMemo(() => {
    const src = activeTopic
      ? topics.filter((t) => t.id === activeTopic)
      : topics;

    const results: { topic: InterviewTopic; questions: InterviewQuestion[] }[] = [];

    for (const topic of src) {
      const qs = topic.questions.filter((q) => {
        if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
        if (search) {
          const s = search.toLowerCase();
          return (
            q.title.toLowerCase().includes(s) ||
            q.tags?.some((t) => t.toLowerCase().includes(s))
          );
        }
        return true;
      });
      if (qs.length > 0) {
        results.push({ topic, questions: qs });
      }
    }
    return results;
  }, [topics, activeTopic, search, difficulty]);

  const totalShown = filtered.reduce((s, g) => s + g.questions.length, 0);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-gray-200 bg-white px-5 py-3">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full min-w-0 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Difficulty filter pills */}
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setDifficulty(f.value)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                difficulty === f.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions grouped by topic */}
      <div className="px-5 py-4">
        {totalShown === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            No questions match your filters.
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map(({ topic, questions }) => (
              <div key={topic.id}>
                {/* Topic heading (show when viewing all) */}
                {!activeTopic && (
                  <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {topic.label}
                    <span className="ml-1 normal-case font-normal">
                      ({questions.length})
                    </span>
                  </h3>
                )}
                <div className="space-y-3">
                  {questions.map((q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      isReviewed={isReviewed(q.id)}
                      onToggleReview={() => onToggleReview(q.id)}
                      roleColor={roleColor}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
