import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Sparkles } from 'lucide-react';

export default function ContestDetail() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <Link
        to="/contests"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        All Contests
      </Link>

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50">
        <Trophy className="h-10 w-10 text-amber-500" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">Contest Not Available</h1>
      <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-blue-700">Coming Soon</span>
      </div>

      <p className="mx-auto mt-4 max-w-md text-gray-500">
        Contests are not available yet. Check back soon!
      </p>
    </div>
  );
}
