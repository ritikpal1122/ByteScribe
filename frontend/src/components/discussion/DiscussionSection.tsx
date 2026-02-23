import { useState } from 'react';
import { Loader2, MessageSquareText } from 'lucide-react';
import { useComments, useCreateComment } from '@/hooks/useComments';
import { useAuthStore } from '@/stores/authStore';
import CommentCard from './CommentCard';

interface DiscussionSectionProps {
  problemId: string;
}

export default function DiscussionSection({ problemId }: DiscussionSectionProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'votes'>('newest');
  const [page, setPage] = useState(1);
  const [body, setBody] = useState('');

  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = useComments('problem', problemId, sortBy, page);
  const createComment = useCreateComment('problem', problemId);

  const handleSubmit = () => {
    if (!body.trim()) return;
    createComment.mutate(
      { body: body.trim() },
      {
        onSuccess: () => {
          setBody('');
          setPage(1);
        },
      },
    );
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header + Sort */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MessageSquareText className="w-4 h-4" />
          Discussion
          {data && (
            <span className="text-xs text-gray-400 font-normal">({data.total})</span>
          )}
        </div>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as typeof sortBy);
            setPage(1);
          }}
          className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="votes">Most Voted</option>
        </select>
      </div>

      {/* Comment form */}
      {user ? (
        <div className="px-4 pb-3 shrink-0">
          <div className="flex gap-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts..."
              rows={2}
              className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!body.trim() || createComment.isPending}
              className="self-end px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {createComment.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Post'
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Ctrl+Enter to post</p>
        </div>
      ) : (
        <div className="px-4 pb-3 shrink-0">
          <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 text-center">
            Sign in to join the discussion
          </p>
        </div>
      )}

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Loading comments...</span>
          </div>
        ) : !data || data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <MessageSquareText className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No comments yet. Be the first to share your approach!</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {data.items.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  contentType="problem"
                  contentId={problemId}
                  currentUserId={user?.id}
                />
              ))}
            </div>

            {/* Pagination */}
            {data.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 py-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!data.has_prev}
                  className="px-3 py-1 rounded text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs text-gray-500">
                  Page {data.page} of {data.total_pages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!data.has_next}
                  className="px-3 py-1 rounded text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
