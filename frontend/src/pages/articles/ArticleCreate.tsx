import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCreateArticle } from '@/hooks/useArticles';
import { ArticleEditor } from '@/components/articles/ArticleEditor';
import type { ArticleCreate as ArticleCreatePayload } from '@/types/article';

export default function ArticleCreate() {
  const navigate = useNavigate();
  const createMutation = useCreateArticle();

  function handleSubmit(data: ArticleCreatePayload) {
    createMutation.mutate(data, {
      onSuccess: (res) => {
        const slug = res.data.slug;
        navigate(`/articles/${slug}`, { replace: true });
      },
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back link */}
      <Link
        to="/articles"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Articles
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Write an Article
      </h1>
      <p className="mt-2 text-gray-600">
        Share your knowledge with the community. Use Markdown to format your
        content.
      </p>

      {/* Error */}
      {createMutation.isError && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {createMutation.error instanceof Error
            ? createMutation.error.message
            : 'Failed to create article. Please try again.'}
        </div>
      )}

      {/* Editor */}
      <div className="mt-8">
        <ArticleEditor
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      </div>
    </div>
  );
}
