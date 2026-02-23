import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MockInterviewMessage } from '@/types/interview';

interface MockInterviewChatProps {
  messages: MockInterviewMessage[];
  onSend: (content: string) => void;
  isLoading?: boolean;
  className?: string;
}

function MessageBubble({ message }: { message: MockInterviewMessage }) {
  const isInterviewer = message.role === 'interviewer';

  return (
    <div
      className={cn(
        'flex gap-3',
        isInterviewer ? 'justify-start' : 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isInterviewer
            ? 'bg-blue-100'
            : 'bg-emerald-100'
        )}
      >
        {isInterviewer ? (
          <Bot className="h-4 w-4 text-blue-600" />
        ) : (
          <User className="h-4 w-4 text-emerald-600" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5',
          isInterviewer
            ? 'rounded-tl-sm bg-gray-100 text-gray-900'
            : 'rounded-tr-sm bg-blue-600 text-white'
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </p>
        <p
          className={cn(
            'mt-1 text-[10px]',
            isInterviewer
              ? 'text-gray-400'
              : 'text-blue-200'
          )}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
        <Bot className="h-4 w-4 text-blue-600" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
        <div className="flex gap-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export function MockInterviewChat({
  messages,
  onSend,
  isLoading = false,
  className,
}: MockInterviewChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white',
        className
      )}
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
          <Bot className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            AI Interviewer
          </h3>
          <p className="text-xs text-gray-500">
            {isLoading ? 'Typing...' : 'Online'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex h-full items-center justify-center py-12">
            <div className="text-center">
              <Bot className="mx-auto h-10 w-10 text-gray-300" />
              <p className="mt-3 text-sm text-gray-500">
                Your mock interview will begin shortly.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Answer questions as you would in a real interview.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-gray-200 p-3"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            'bg-blue-600 text-white hover:bg-blue-700',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}
