import { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import type { Comment } from '@/api/comments';
import { useReplies, useCreateComment, useDeleteComment, useVoteComment } from '@/hooks/useComments';

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function Avatar({ user }: { user: Comment['author'] }) {
  if (user.avatar_url) {
    return (
      <img
        src={user.avatar_url}
        alt={user.username}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
      {(user.display_name || user.username).charAt(0).toUpperCase()}
    </div>
  );
}

interface CommentCardProps {
  comment: Comment;
  contentType: string;
  contentId: string;
  currentUserId?: string;
  isReply?: boolean;
}

export default function CommentCard({
  comment,
  contentType,
  contentId,
  currentUserId,
  isReply = false,
}: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const createComment = useCreateComment(contentType, contentId);
  const deleteComment = useDeleteComment(contentType, contentId);
  const voteComment = useVoteComment(contentType, contentId);

  const { data: replies, isLoading: repliesLoading } = useReplies(
    comment.id,
    showReplies && !isReply,
  );

  const handleReply = () => {
    if (!replyBody.trim()) return;
    createComment.mutate(
      { body: replyBody.trim(), parent_id: comment.id },
      {
        onSuccess: () => {
          setReplyBody('');
          setShowReplyForm(false);
          setShowReplies(true);
        },
      },
    );
  };

  const handleVote = (voteType: 'upvote' | 'downvote') => {
    if (!currentUserId) return;
    voteComment.mutate({ commentId: comment.id, voteType });
  };

  const handleDelete = () => {
    if (confirm('Delete this comment?')) {
      deleteComment.mutate(comment.id);
    }
  };

  return (
    <div className={`${isReply ? 'ml-10 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Avatar user={comment.author} />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              {comment.author.display_name || comment.author.username}
            </span>
            <span className="text-xs text-gray-400">{timeAgo(comment.created_at)}</span>
          </div>
        </div>

        {/* Body */}
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ml-10">
          {comment.body}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2 ml-10">
          {/* Upvote */}
          <button
            onClick={() => handleVote('upvote')}
            disabled={!currentUserId}
            className={`flex items-center gap-1 text-xs transition-colors ${
              comment.user_vote === 'upvote'
                ? 'text-blue-600 font-semibold'
                : 'text-gray-400 hover:text-blue-600'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            {comment.upvotes > 0 && comment.upvotes}
          </button>

          {/* Downvote */}
          <button
            onClick={() => handleVote('downvote')}
            disabled={!currentUserId}
            className={`flex items-center gap-1 text-xs transition-colors ${
              comment.user_vote === 'downvote'
                ? 'text-red-500 font-semibold'
                : 'text-gray-400 hover:text-red-500'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            {comment.downvotes > 0 && comment.downvotes}
          </button>

          {/* Reply (only on top-level) */}
          {!isReply && currentUserId && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Reply
            </button>
          )}

          {/* Delete (author only) */}
          {currentUserId === comment.author_id && (
            <button
              onClick={handleDelete}
              disabled={deleteComment.isPending}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          )}
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <div className="ml-10 mt-3 flex gap-2">
            <textarea
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Write a reply..."
              rows={2}
              className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex flex-col gap-1">
              <button
                onClick={handleReply}
                disabled={!replyBody.trim() || createComment.isPending}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {createComment.isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  'Reply'
                )}
              </button>
              <button
                onClick={() => {
                  setShowReplyForm(false);
                  setReplyBody('');
                }}
                className="px-3 py-1.5 rounded-lg text-gray-500 text-xs hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Show/hide replies toggle */}
        {!isReply && comment.replies_count > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="ml-10 mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {showReplies ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            {showReplies ? 'Hide' : `Show ${comment.replies_count}`} {comment.replies_count === 1 ? 'reply' : 'replies'}
          </button>
        )}

        {/* Replies */}
        {showReplies && !isReply && (
          <div className="mt-2">
            {repliesLoading ? (
              <div className="ml-10 flex items-center gap-2 text-gray-400 text-xs py-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Loading replies...
              </div>
            ) : (
              replies?.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  contentType={contentType}
                  contentId={contentId}
                  currentUserId={currentUserId}
                  isReply
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
