import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Lock,
  Globe,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { useNote, useCreateNote, useUpdateNote } from '@/hooks/useNotes';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

/* ------------------------------------------------------------------ */
/*  Simple markdown preview renderer                                   */
/* ------------------------------------------------------------------ */

function MarkdownPreview({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  lines.forEach((line, idx) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={idx} className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-3">
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

    if (inCodeBlock) { codeLines.push(line); return; }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={idx} className="text-2xl font-bold text-gray-900 mt-4 mb-2">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={idx} className="text-xl font-semibold text-gray-800 mt-4 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={idx} className="text-lg font-semibold text-gray-700 mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={idx} className="border-l-4 border-blue-500 pl-4 py-1 my-2 text-gray-400 italic">{line.slice(2)}</blockquote>,
      );
    } else if (line.startsWith('- ')) {
      elements.push(<li key={idx} className="text-gray-400 text-sm ml-4 list-disc">{line.slice(2)}</li>);
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
/*  NoteEditor page                                                    */
/* ------------------------------------------------------------------ */

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { data: existingNote, isLoading: noteLoading } = useNote(id ?? '');
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [visDropdown, setVisDropdown] = useState(false);
  const [content, setContent] = useState('');
  const [initialized, setInitialized] = useState(!isEditing);

  // Load existing note data when editing
  useEffect(() => {
    if (isEditing && existingNote && !initialized) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setIsPublic(existingNote.is_public);
      setInitialized(true);
    }
  }, [isEditing, existingNote, initialized]);

  const isSaving = createNote.isPending || updateNote.isPending;

  const handleSave = () => {
    if (isEditing && id) {
      updateNote.mutate(
        { id, payload: { title, content, is_public: isPublic } },
        { onSuccess: () => navigate(`/notes/${id}`) },
      );
    } else {
      createNote.mutate(
        { title, content, is_public: isPublic },
        { onSuccess: (res) => navigate(`/notes/${res.data.id}`) },
      );
    }
  };

  const visOptions = [
    { value: false, label: 'Private', icon: Lock },
    { value: true, label: 'Public', icon: Globe },
  ] as const;

  const selectedVis = visOptions.find((v) => v.value === isPublic)!;
  const VisIcon = selectedVis.icon;

  if (isEditing && noteLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading note..." />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/notes"
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-400 focus:outline-none w-80"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Save status */}
          <div className="flex items-center gap-1.5 text-xs">
            {isSaving && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="text-gray-500">Saving...</span>
              </>
            )}
            {(createNote.isSuccess || updateNote.isSuccess) && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-gray-500">Saved</span>
              </>
            )}
          </div>

          {/* Visibility selector */}
          <div className="relative">
            <button
              onClick={() => setVisDropdown(!visDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <VisIcon className="w-3.5 h-3.5" />
              {selectedVis.label}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {visDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-gray-100 border border-gray-300 rounded-lg py-1 shadow-xl z-50 min-w-[140px]">
                {visOptions.map((opt) => {
                  const OptIcon = opt.icon;
                  return (
                    <button
                      key={String(opt.value)}
                      onClick={() => { setIsPublic(opt.value); setVisDropdown(false); }}
                      className={`w-full flex items-center gap-2 text-left px-3 py-1.5 text-sm transition-colors ${
                        isPublic === opt.value ? 'text-blue-400 bg-gray-200' : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <OptIcon className="w-3.5 h-3.5" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div className="w-1/2 flex flex-col border-r border-gray-200">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
            <Edit3 className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Markdown Editor</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full resize-none bg-white text-gray-800 font-mono text-sm p-6 focus:outline-none leading-relaxed"
            placeholder="Start writing in Markdown..."
          />
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preview</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {content.trim() ? (
              <MarkdownPreview content={content} />
            ) : (
              <p className="text-gray-600 text-sm italic">Start typing to see a preview...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
