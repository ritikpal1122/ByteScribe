import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDSASheet, useToggleSheetProgress } from '@/hooks/useDSASheets';
import { useAuthStore } from '@/stores/authStore';

const DIFF_STYLES: Record<string, string> = {
  easy: 'bg-green-50 text-green-700',
  medium: 'bg-yellow-50 text-yellow-700',
  hard: 'bg-red-50 text-red-700',
};

export default function SheetDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: sheet, isLoading, error } = useDSASheet(slug || '');
  const toggleProgress = useToggleSheetProgress();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !sheet) {
    return (
      <div className="py-20 text-center text-gray-500">
        Sheet not found.
      </div>
    );
  }

  const progressPercent = sheet.problem_count > 0
    ? Math.round((sheet.completed_count / sheet.problem_count) * 100)
    : 0;

  const handleToggle = (problemId: string) => {
    if (!isAuthenticated || !slug) return;
    toggleProgress.mutate({ sheetSlug: slug, problemId });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <Link
        to="/sheets"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        All Sheets
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{sheet.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{sheet.name}</h1>
            <p className="text-sm text-gray-500">{sheet.description}</p>
          </div>
        </div>

        {/* Progress bar — only for authenticated users */}
        {isAuthenticated ? (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {sheet.completed_count} / {sheet.problem_count} completed
              </span>
              <span className="font-medium text-blue-600">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
            <LogIn className="h-5 w-5 shrink-0 text-blue-600" />
            <p className="flex-1 text-sm text-blue-800">
              Log in to track your progress and mark problems as completed.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Log in
            </button>
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {Object.entries(sheet.sections).map(([sectionName, problems]) => {
          const sectionCompleted = problems.filter((p) => p.is_completed).length;
          return (
            <div key={sectionName} className="rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
                <h2 className="font-semibold text-gray-900">{sectionName}</h2>
                {isAuthenticated && (
                  <span className="text-xs text-gray-500">
                    {sectionCompleted}/{problems.length}
                  </span>
                )}
              </div>

              <div className="divide-y divide-gray-50">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
                  >
                    {/* Checkbox — only for authenticated users */}
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggle(problem.id)}
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                          problem.is_completed
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 hover:border-blue-400',
                        )}
                      >
                        {problem.is_completed && <Check className="h-3 w-3" />}
                      </button>
                    )}

                    {/* Problem info */}
                    <Link
                      to={`/problems/${problem.slug}`}
                      className={cn(
                        'flex-1 text-sm font-medium hover:text-blue-600',
                        isAuthenticated && problem.is_completed ? 'text-gray-400 line-through' : 'text-gray-800',
                      )}
                    >
                      {problem.title}
                    </Link>

                    {/* Difficulty badge */}
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                        DIFF_STYLES[problem.difficulty],
                      )}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
