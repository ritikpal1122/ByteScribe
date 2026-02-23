import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit3,
  Clock,
  Lock,
  Globe,
  Share2,
  Tag,
} from 'lucide-react';
import { useNote } from '@/hooks/useNotes';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

/* ------------------------------------------------------------------ */
/*  Simple markdown-to-JSX renderer                                    */
/* ------------------------------------------------------------------ */

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  lines.forEach((line, idx) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={idx} className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4">
            <code className="text-sm text-gray-700 font-mono whitespace-pre">{codeLines.join('\n')}</code>
          </pre>,
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={idx} className="text-xl font-semibold text-gray-800 mt-6 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={idx} className="text-lg font-semibold text-gray-700 mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={idx} className="border-l-4 border-blue-500 pl-4 py-1 my-3 text-gray-400 italic">
          {line.slice(2)}
        </blockquote>,
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={idx} className="text-gray-400 text-sm ml-4 list-disc">{line.slice(2)}</li>,
      );
    } else if (line.startsWith('---')) {
      elements.push(<hr key={idx} className="border-gray-200 my-6" />);
    } else if (line.trim() === '') {
      elements.push(<div key={idx} className="h-2" />);
    } else {
      elements.push(
        <p key={idx} className="text-gray-400 text-sm leading-relaxed">
          {line.split('`').map((seg, j) =>
            j % 2 === 1 ? (
              <code key={j} className="px-1.5 py-0.5 bg-gray-100 rounded text-blue-600 text-xs font-mono">{seg}</code>
            ) : (
              <span key={j} dangerouslySetInnerHTML={{ __html: seg.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800">$1</strong>') }} />
            ),
          )}
        </p>,
      );
    }
  });

  return <div>{elements}</div>;
}

/* ------------------------------------------------------------------ */
/*  Visibility badge                                                   */
/* ------------------------------------------------------------------ */

function VisibilityBadge({ isPublic }: { isPublic: boolean }) {
  const Icon = isPublic ? Globe : Lock;
  const colors = isPublic
    ? 'text-emerald-400 bg-emerald-400/10'
    : 'text-gray-400 bg-gray-100';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors}`}>
      <Icon className="w-3 h-3" />
      {isPublic ? 'Public' : 'Private'}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  NoteDetail page                                                    */
/* ------------------------------------------------------------------ */

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading, isError, refetch } = useNote(id ?? '');

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading note..." />
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load note.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          to="/notes"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notes
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-3xl font-bold tracking-tight">{note.title}</h1>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-400 hover:text-gray-800 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <Link
                to={`/notes/${id}/edit`}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <VisibilityBadge isPublic={note.is_public} />
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Last updated {new Date(note.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            {note.tags.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-gray-600" />
                {note.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <MarkdownRenderer content={note.content} />
        </div>
      </div>
    </div>
  );
}
