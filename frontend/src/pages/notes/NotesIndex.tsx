import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  FileText,
  Lock,
  Globe,
  Clock,
  MoreHorizontal,
} from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import type { Note } from '@/api/notes';

/* ------------------------------------------------------------------ */
/*  Visibility badge                                                   */
/* ------------------------------------------------------------------ */

function VisibilityBadge({ isPublic }: { isPublic: boolean }) {
  if (isPublic) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-400/10">
        <Globe className="w-3 h-3" />
        Public
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-gray-400 bg-gray-100">
      <Lock className="w-3 h-3" />
      Private
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Relative time helper                                               */
/* ------------------------------------------------------------------ */

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  return date.toLocaleDateString();
}

/* ------------------------------------------------------------------ */
/*  Note card                                                          */
/* ------------------------------------------------------------------ */

function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      to={`/notes/${note.id}`}
      className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:bg-gray-50 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400 shrink-0" />
          <h3 className="text-gray-900 font-semibold text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
            {note.title}
          </h3>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="p-1 rounded text-gray-600 hover:text-gray-700 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
        {note.content.slice(0, 150)}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <VisibilityBadge isPublic={note.is_public} />
          {note.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs">
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          {formatRelativeTime(note.updated_at)}
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  NotesIndex page                                                    */
/* ------------------------------------------------------------------ */

export default function NotesIndex() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, refetch } = useNotes(
    page,
    20,
    debouncedSearch || undefined,
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 mb-4">Please log in to view your notes.</p>
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Log In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading notes..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load notes.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const notes = data?.items ?? [];
  const totalPages = data?.total_pages ?? 1;
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
            <span className="ml-1 px-3 py-0.5 rounded-full bg-gray-100 text-gray-400 text-sm font-medium">
              {total}
            </span>
          </div>
          <Link
            to="/notes/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Note
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        {/* Grid */}
        {notes.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No notes yet"
            description="Create your first note to start organizing your learning."
            action={() => { window.location.href = '/notes/new'; }}
            actionLabel="Create Note"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}
