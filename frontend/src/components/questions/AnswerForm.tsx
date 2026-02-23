import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownEditor } from '@/components/common/MarkdownEditor';

interface AnswerFormProps {
  onSubmit: (body: string) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export function AnswerForm({ onSubmit, isLoading = false, className }: AnswerFormProps) {
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || isLoading) return;
    await onSubmit(body);
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div>
        <label
          htmlFor="answer-body"
          className="mb-2 block text-lg font-semibold text-gray-900"
        >
          Your Answer
        </label>
        <MarkdownEditor
          value={body}
          onChange={setBody}
          placeholder="Write your answer here... Use Markdown for formatting."
          minHeight="200px"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Supports Markdown formatting. Be detailed and helpful.
        </p>
        <button
          type="submit"
          disabled={!body.trim() || isLoading}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors',
            'bg-blue-600 hover:bg-blue-700',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Post Answer
            </>
          )}
        </button>
      </div>
    </form>
  );
}
