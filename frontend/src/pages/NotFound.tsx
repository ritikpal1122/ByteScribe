import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  404 Not Found page                                                 */
/* ------------------------------------------------------------------ */

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-gray-900">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="relative mx-auto w-48 h-48 mb-8">
          {/* Background circles */}
          <div className="absolute inset-0 rounded-full bg-blue-500/5" />
          <div className="absolute inset-4 rounded-full bg-blue-500/5" />
          <div className="absolute inset-8 rounded-full bg-blue-500/10" />
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-20 h-20 text-blue-400/60" />
          </div>
          {/* 404 text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-blue-400/20 select-none">404</span>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold tracking-tight mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Check the URL or head back to familiar territory.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Search suggestion */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-3">Or try searching for what you need:</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search LearnText..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent((e.target as HTMLInputElement).value.trim())}`;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
