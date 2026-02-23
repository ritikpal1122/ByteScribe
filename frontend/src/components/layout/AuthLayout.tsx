import { Link, Outlet } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Simplified header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <Code2 className="h-6 w-6 text-blue-600" />
            <span>LearnText</span>
          </Link>
        </div>
      </header>

      {/* Centered card content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
