import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Bot,
  User,
  Send,
  Square,
  Clock,
  Loader2,
} from 'lucide-react';
import { useMockSession, useSendMockMessage } from '@/hooks/useInterviews';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { MockInterviewMessage } from '@/types';

/* ------------------------------------------------------------------ */
/*  MockInterviewChat component                                        */
/* ------------------------------------------------------------------ */

function MockInterviewChat({
  messages,
  onSend,
  isSending,
}: {
  messages: MockInterviewMessage[];
  onSend: (msg: string) => void;
  isSending: boolean;
}) {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = () => {
    if (!input.trim() || isSending) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'candidate';
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                !isUser ? 'bg-blue-500/20' : 'bg-gray-200'
              }`}>
                {!isUser ? (
                  <Bot className="w-4 h-4 text-blue-400" />
                ) : (
                  <User className="w-4 h-4 text-gray-700" />
                )}
              </div>
              <div className={`max-w-[75%] rounded-xl px-4 py-3 ${
                !isUser
                  ? 'bg-gray-50 text-gray-800'
                  : 'bg-blue-600/20 text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs text-gray-600 mt-1.5">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={2}
            placeholder="Type your response..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className="px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MockInterviewSession page                                          */
/* ------------------------------------------------------------------ */

export default function MockInterviewSession() {
  const { id } = useParams<{ id: string }>();
  const { data: session, isLoading, isError, refetch } = useMockSession(id ?? '');
  const sendMessage = useSendMockMessage();

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSend = (content: string) => {
    if (!id) return;
    sendMessage.mutate({ sessionId: id, content });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading interview session..." />
      </div>
    );
  }

  if (isError || !session) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load session.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-sm">
            Mock Interview - {session.topic} ({session.difficulty})
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(elapsed)}</span>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-600/30 transition-colors">
            <Square className="w-3.5 h-3.5" />
            End Interview
          </button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-hidden">
        <MockInterviewChat
          messages={session.messages}
          onSend={handleSend}
          isSending={sendMessage.isPending}
        />
      </div>
    </div>
  );
}
