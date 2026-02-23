import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, MessageSquare, Bookmark, BookmarkCheck } from 'lucide-react';
import { useQuestion, useVote, useCreateAnswer, useAcceptAnswer } from '@/hooks/useQuestions';
import { useAuth } from '@/hooks/useAuth';
import { getAnswers } from '@/api/questions';
import { VoteButtons } from '@/components/common/VoteButtons';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';
import { TagBadge } from '@/components/common/TagBadge';
import { UserAvatar } from '@/components/common/UserAvatar';
import { TimeAgo } from '@/components/common/TimeAgo';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { AnswerList } from '@/components/questions/AnswerList';
import { AnswerForm } from '@/components/questions/AnswerForm';
import type { Answer } from '@/types/question';

/* ------------------------------------------------------------------ */
/*  Skeleton                                                           */
/* ------------------------------------------------------------------ */

function QuestionSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-3/4 rounded-lg bg-gray-200" />
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="space-y-1.5">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-100" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-gray-100"
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QuestionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAuthenticated } = useAuth();

  const { data: question, isLoading, isError } = useQuestion(slug ?? '');
  const voteMutation = useVote();
  const answerMutation = useCreateAnswer();
  const acceptMutation = useAcceptAnswer();

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answersLoading, setAnswersLoading] = useState(false);

  /* Fetch answers when question loads */
  useEffect(() => {
    if (!question) return;
    let cancelled = false;

    async function fetchAnswers() {
      setAnswersLoading(true);
      try {
        const res = await getAnswers(question!.id, { sort_by: 'votes' });
        if (!cancelled) setAnswers(res.data.items);
      } catch {
        /* swallow */
      } finally {
        if (!cancelled) setAnswersLoading(false);
      }
    }

    fetchAnswers();
    return () => {
      cancelled = true;
    };
  }, [question]);

  /* ── Handlers ────────────────────────────────────────────── */

  function handleQuestionVote(vote: 'up' | 'down') {
    if (!question || !isAuthenticated) return;
    voteMutation.mutate({ targetType: 'question', targetId: question.id, vote });
  }

  function handleAnswerVote(answerId: string, vote: 'up' | 'down') {
    if (!isAuthenticated) return;
    voteMutation.mutate({ targetType: 'answer', targetId: answerId, vote });
  }

  function handleAcceptAnswer(answerId: string) {
    if (!question) return;
    acceptMutation.mutate(
      { questionId: question.id, answerId },
      {
        onSuccess: () => {
          setAnswers((prev) =>
            prev.map((a) => ({
              ...a,
              is_accepted: a.id === answerId,
            })),
          );
        },
      },
    );
  }

  async function handleSubmitAnswer(body: string) {
    if (!question) return;
    answerMutation.mutate(
      { body, question_id: question.id },
      {
        onSuccess: (res) => {
          setAnswers((prev) => [...prev, res.data]);
        },
      },
    );
  }

  /* ── Loading ─────────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <QuestionSkeleton />
      </div>
    );
  }

  /* ── Error / Not Found ───────────────────────────────────── */

  if (isError || !question) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Question not found
        </h1>
        <p className="mt-2 text-gray-600">
          The question you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/questions"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to questions
        </Link>
      </div>
    );
  }

  /* ── Render ──────────────────────────────────────────────── */

  const isQuestionAuthor = user?.id === question.author.id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back link */}
      <Link
        to="/questions"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        All Questions
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {question.title}
      </h1>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <TimeAgo date={question.created_at} />
        <span className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {question.view_count.toLocaleString()} views
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {question.answer_count} answers
        </span>
        {question.is_resolved && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Resolved
          </span>
        )}
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Question body */}
      <div className="flex gap-6">
        {/* Vote sidebar */}
        <aside className="hidden shrink-0 sm:block">
          <div className="sticky top-24">
            <VoteButtons
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              userVote={question.user_vote}
              onVote={handleQuestionVote}
              size="lg"
            />
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Mobile votes */}
          <div className="mb-4 sm:hidden">
            <VoteButtons
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              userVote={question.user_vote}
              onVote={handleQuestionVote}
              size="sm"
            />
          </div>

          <MarkdownRenderer content={question.body} />

          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <TagBadge key={tag} name={tag} slug={tag} />
              ))}
            </div>
          )}

          {/* Author card */}
          <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3">
              <div className="text-right text-xs text-gray-500">
                <span>asked</span>
                <br />
                <TimeAgo date={question.created_at} className="text-xs" />
              </div>
              <Link
                to={`/users/${question.author.username}`}
                className="flex items-center gap-2"
              >
                <UserAvatar
                  src={question.author.avatar_url}
                  name={question.author.full_name}
                  size="sm"
                />
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    {question.author.full_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {question.author.reputation.toLocaleString()} reputation
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Answers ──────────────────────────────────────────── */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        {answersLoading ? (
          <LoadingSpinner size="md" text="Loading answers..." className="py-12" />
        ) : (
          <AnswerList
            answers={answers}
            questionAuthorId={question.author.id}
            currentUserId={user?.id}
            onVote={handleAnswerVote}
            onAccept={isQuestionAuthor ? handleAcceptAnswer : undefined}
          />
        )}
      </div>

      {/* ── Answer Form ──────────────────────────────────────── */}
      {isAuthenticated ? (
        <div className="mt-10 border-t border-gray-200 pt-8">
          <AnswerForm
            onSubmit={handleSubmitAnswer}
            isLoading={answerMutation.isPending}
          />
        </div>
      ) : (
        <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 px-6 py-8 text-center">
          <p className="text-sm text-gray-600">
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>{' '}
            to post an answer.
          </p>
        </div>
      )}
    </div>
  );
}
