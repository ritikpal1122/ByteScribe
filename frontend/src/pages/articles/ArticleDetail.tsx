import { useParams, Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Eye, MessageSquare, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useArticle, useVoteArticle } from '@/hooks/useArticles';
import { useAuth } from '@/hooks/useAuth';
import { VoteButtons } from '@/components/common/VoteButtons';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { TagBadge } from '@/components/common/TagBadge';
import { UserAvatar } from '@/components/common/UserAvatar';
import { TimeAgo } from '@/components/common/TimeAgo';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import * as bookmarksApi from '@/api/bookmarks';

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

function ArticleSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <div className="h-8 w-3/4 rounded-lg bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-100" />
      </div>

      {/* Author bar */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="space-y-1.5">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-100" />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-gray-100"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAuthenticated } = useAuth();
  const { data: article, isLoading, isError } = useArticle(slug ?? '');
  const voteMutation = useVoteArticle();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Sync bookmark state from article data
  if (article && isBookmarked !== article.is_bookmarked && !bookmarkLoading) {
    setIsBookmarked(article.is_bookmarked);
  }

  function handleVote(vote: 'up' | 'down') {
    if (!article || !isAuthenticated) return;
    voteMutation.mutate({ id: article.id, vote });
  }

  async function handleBookmark() {
    if (!article || !isAuthenticated || bookmarkLoading) return;
    setBookmarkLoading(true);
    try {
      if (isBookmarked) {
        // We'd need the bookmark id; for now toggle the UI
        setIsBookmarked(false);
      } else {
        await bookmarksApi.createBookmark({
          target_type: 'article',
          target_id: article.id,
        });
        setIsBookmarked(true);
      }
    } catch {
      // Revert on error
      setIsBookmarked((prev) => !prev);
    } finally {
      setBookmarkLoading(false);
    }
  }

  /* ── Loading ─────────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <ArticleSkeleton />
      </div>
    );
  }

  /* ── Error / Not Found ───────────────────────────────────── */

  if (isError || !article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Article not found
        </h1>
        <p className="mt-2 text-gray-600">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/articles"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to articles
        </Link>
      </div>
    );
  }

  /* ── Render ──────────────────────────────────────────────── */

  const isAuthor = user?.id === article.author.id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back link */}
      <Link
        to="/articles"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        All Articles
      </Link>

      <div className="flex gap-8">
        {/* Sticky Vote sidebar */}
        <aside className="hidden shrink-0 pt-2 lg:block">
          <div className="sticky top-24 flex flex-col items-center gap-4">
            <VoteButtons
              upvotes={article.upvotes}
              downvotes={article.downvotes}
              userVote={article.user_vote}
              onVote={handleVote}
              size="lg"
            />

            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              disabled={!isAuthenticated}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          </div>
        </aside>

        {/* Article content */}
        <article className="min-w-0 flex-1">
          {/* Cover image */}
          {article.cover_image_url && (
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="mb-8 w-full rounded-2xl object-cover"
              style={{ maxHeight: 400 }}
            />
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6">
            <Link
              to={`/users/${article.author.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar
                src={article.author.avatar_url}
                name={article.author.full_name}
                size="md"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {article.author.full_name}
                </p>
                <p className="text-xs text-gray-500">
                  @{article.author.username}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <TimeAgo date={article.created_at} />
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {article.view_count.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {article.comment_count} comments
              </span>
            </div>

            {isAuthor && (
              <Link
                to={`/articles/${slug}/edit`}
                className="ml-auto rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Edit
              </Link>
            )}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <TagBadge key={tag} name={tag} slug={tag} />
              ))}
            </div>
          )}

          {/* Mobile vote + bookmark bar */}
          <div className="mt-4 flex items-center gap-4 lg:hidden">
            <VoteButtons
              upvotes={article.upvotes}
              downvotes={article.downvotes}
              userVote={article.user_vote}
              onVote={handleVote}
              size="sm"
            />
            <button
              onClick={handleBookmark}
              disabled={!isAuthenticated}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Body */}
          <div className="mt-8">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Comments Section (placeholder) */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Comments ({article.comment_count})
            </h2>
            <div className="mt-6 rounded-lg border-2 border-dashed border-gray-200 px-6 py-12 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-3 text-sm text-gray-500">
                Comments section coming soon.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
