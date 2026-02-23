import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, X } from 'lucide-react';
import { useDSASheets } from '@/hooks/useDSASheets';
import { useAuthStore } from '@/stores/authStore';

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'text-green-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600',
};

export default function SheetsIndex() {
  const { data: sheets, isLoading, error } = useDSASheets();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-gray-500">
        Failed to load DSA sheets.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">DSA Sheets</h1>
        <p className="mt-1 text-sm text-gray-500">
          Follow a structured problem list to prepare for coding interviews.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sheets?.map((sheet) => {
          const handleClick = (e: React.MouseEvent) => {
            if (!isAuthenticated) {
              e.preventDefault();
              setShowLoginPrompt(true);
            }
          };

          return (
            <Link
              key={sheet.id}
              to={`/sheets/${sheet.slug}`}
              onClick={handleClick}
              className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{sheet.icon}</span>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {sheet.name}
                </h2>
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                {sheet.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {sheet.problem_count} problems
                </span>
                <span className="text-xs text-blue-600 group-hover:underline">
                  Start solving →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Login prompt modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute right-3 top-3 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <LogIn className="h-6 w-6 text-blue-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Login Required
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to access DSA sheets, track your progress, and mark problems as completed.
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Log in
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
