import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArticle, useUpdateArticle } from '@/hooks/useArticles';
import { ArticleEditor } from '@/components/articles/ArticleEditor';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { ArticleCreate as ArticleFormData } from '@/types/article';

export default function ArticleEdit() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: article, isLoading, isError } = useArticle(slug ?? '');
  const updateMutation = useUpdateArticle();

  function handleSubmit(data: ArticleFormData) {
    if (!article) return;

    updateMutation.mutate(
      {
        id: article.id,
        payload: {
          title: data.title,
          content: data.content,
          summary: data.summary,
          cover_image_url: data.cover_image_url,
          tags: data.tags,
          is_published: data.is_published,
        },
      },
      {
        onSuccess: (res) => {
          const updatedSlug = res.data.slug;
          navigate(`/articles/${updatedSlug}`, { replace: true });
        },
      },
    );
  }

  /* ── Loading ─────────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" text="Loading article..." />
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
          The article you are trying to edit does not exist or has been removed.
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back link */}
      <Link
        to={`/articles/${slug}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Article
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Edit Article
      </h1>
      <p className="mt-2 text-gray-600">
        Update your article content and settings.
      </p>

      {/* Error */}
      {updateMutation.isError && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {updateMutation.error instanceof Error
            ? updateMutation.error.message
            : 'Failed to update article. Please try again.'}
        </div>
      )}

      {/* Editor */}
      <div className="mt-8">
        <ArticleEditor
          initialData={{
            title: article.title,
            content: article.content,
            summary: article.summary,
            cover_image_url: article.cover_image_url ?? undefined,
            tags: article.tags,
            is_published: article.is_published,
          }}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />
      </div>
    </div>
  );
}
