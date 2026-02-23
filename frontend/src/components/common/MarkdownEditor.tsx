import { useState, useCallback, useRef } from 'react';
import {
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  Heading2,
  List,
  Eye,
  Edit3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from './MarkdownRenderer';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

interface ToolbarAction {
  icon: typeof Bold;
  label: string;
  prefix: string;
  suffix: string;
  block?: boolean;
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { icon: Bold, label: 'Bold', prefix: '**', suffix: '**' },
  { icon: Italic, label: 'Italic', prefix: '_', suffix: '_' },
  { icon: Code, label: 'Inline code', prefix: '`', suffix: '`' },
  { icon: LinkIcon, label: 'Link', prefix: '[', suffix: '](url)' },
  { icon: Heading2, label: 'Heading', prefix: '## ', suffix: '', block: true },
  { icon: List, label: 'List', prefix: '- ', suffix: '', block: true },
];

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content in Markdown...',
  minHeight = '200px',
}: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyAction = useCallback(
    (action: ToolbarAction) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = value.substring(start, end);

      let newText: string;
      let cursorOffset: number;

      if (action.block) {
        // For block-level actions, insert at line start
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const before = value.substring(0, lineStart);
        const after = value.substring(lineStart);
        newText = before + action.prefix + after;
        cursorOffset = start + action.prefix.length;
      } else if (selected) {
        newText =
          value.substring(0, start) +
          action.prefix +
          selected +
          action.suffix +
          value.substring(end);
        cursorOffset = end + action.prefix.length + action.suffix.length;
      } else {
        newText =
          value.substring(0, start) +
          action.prefix +
          action.suffix +
          value.substring(end);
        cursorOffset = start + action.prefix.length;
      }

      onChange(newText);

      // Restore focus and cursor position
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorOffset, cursorOffset);
      });
    },
    [value, onChange]
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <div className="flex items-center gap-0.5">
          {TOOLBAR_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => applyAction(action)}
              disabled={preview}
              title={action.label}
              className={cn(
                'rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700',
                preview && 'cursor-not-allowed opacity-50'
              )}
            >
              <action.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Preview toggle */}
        <div className="flex items-center rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className={cn(
              'flex items-center gap-1.5 rounded-l-lg px-3 py-1 text-xs font-medium transition-colors',
              !preview
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <Edit3 className="h-3 w-3" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setPreview(true)}
            className={cn(
              'flex items-center gap-1.5 rounded-r-lg px-3 py-1 text-xs font-medium transition-colors',
              preview
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <Eye className="h-3 w-3" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview area */}
      {preview ? (
        <div className="p-4" style={{ minHeight }}>
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-sm text-gray-400">
              Nothing to preview
            </p>
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full resize-y bg-transparent p-4 font-mono text-sm text-gray-900 placeholder-gray-400 outline-none"
        />
      )}
    </div>
  );
}
