import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, Lightbulb, AlertTriangle, MessageSquare, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InterviewQuestion } from '@/data/interview-prep/types';
import DifficultyBadge from './DifficultyBadge';

interface Props {
  question: InterviewQuestion;
  isReviewed: boolean;
  onToggleReview: () => void;
  roleColor: string;
}

export default function QuestionCard({
  question,
  isReviewed,
  onToggleReview,
  roleColor,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border bg-white transition-shadow',
        expanded ? 'shadow-md' : 'shadow-sm hover:shadow-md',
        isReviewed ? 'border-l-4' : ''
      )}
      style={isReviewed ? { borderLeftColor: roleColor } : undefined}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <div
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            isReviewed ? 'border-current bg-current' : 'border-gray-300'
          )}
          style={isReviewed ? { borderColor: roleColor, backgroundColor: roleColor } : undefined}
        >
          {isReviewed && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
        <span className="flex-1 text-sm font-medium text-gray-900">
          {question.title}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-gray-400 transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4">
          {/* Answer */}
          <div className="prose prose-sm max-w-none text-gray-700 [&>h4]:mt-3 [&>h4]:mb-1 [&>h4]:text-sm [&>h4]:font-semibold [&>h4]:text-gray-900 [&>ul]:my-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:my-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>p]:mb-2 [&>p:last-child]:mb-0">
            <ReactMarkdown>{question.answer}</ReactMarkdown>
          </div>

          {/* Code examples */}
          {question.codeExamples && question.codeExamples.length > 0 && (
            <div className="mt-4 space-y-3">
              {question.codeExamples.map((ex, i) => (
                <div key={i}>
                  {ex.label && (
                    <p className="mb-1 text-xs font-medium text-gray-500">
                      {ex.label}
                    </p>
                  )}
                  <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{ex.code}</code>
                  </pre>
                  {ex.output && (
                    <pre className="mt-1 overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs text-gray-600">
                      <code>// Output: {ex.output}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          {question.tips && question.tips.length > 0 && (
            <div className="mt-4 rounded-lg bg-blue-50 px-4 py-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <Lightbulb className="h-3.5 w-3.5" />
                Tips
              </div>
              <ul className="space-y-1">
                {question.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-blue-700">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common mistakes */}
          {question.commonMistakes && question.commonMistakes.length > 0 && (
            <div className="mt-3 rounded-lg bg-amber-50 px-4 py-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" />
                Common Mistakes
              </div>
              <ul className="space-y-1">
                {question.commonMistakes.map((m, i) => (
                  <li key={i} className="text-sm text-amber-700">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Follow-ups */}
          {question.followUps && question.followUps.length > 0 && (
            <div className="mt-3 rounded-lg bg-gray-50 px-4 py-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                <MessageSquare className="h-3.5 w-3.5" />
                Follow-up Questions
              </div>
              <ul className="space-y-1">
                {question.followUps.map((f, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    &bull; {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key takeaway */}
          {question.keyTakeaway && (
            <p className="mt-3 text-sm font-medium text-gray-500 italic">
              Key takeaway: {question.keyTakeaway}
            </p>
          )}

          {/* Mark as reviewed */}
          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleReview();
              }}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isReviewed
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'text-white hover:opacity-90'
              )}
              style={!isReviewed ? { backgroundColor: roleColor } : undefined}
            >
              <Check className="h-4 w-4" />
              {isReviewed ? 'Reviewed' : 'Mark as Reviewed'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
