import { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  Send,
  Loader2,
  Sun,
  Moon,
  ChevronDown,
  Minus,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
  onLanguageChange?: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
  className?: string;
}

const LANGUAGES = [
  { value: 'python', label: 'Python 3' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
] as const;

const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20] as const;

export function CodeEditor({
  code,
  language,
  onChange,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
  className,
}: CodeEditorProps) {
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const currentLanguage = LANGUAGES.find((l) => l.value === language) ?? LANGUAGES[0];

  const adjustFontSize = (delta: number) => {
    setFontSize((prev) => {
      const currentIndex = FONT_SIZES.indexOf(prev as (typeof FONT_SIZES)[number]);
      const newIndex = Math.max(0, Math.min(FONT_SIZES.length - 1, currentIndex + delta));
      return FONT_SIZES[newIndex];
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-200',
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {currentLanguage.label}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {isLanguageOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsLanguageOpen(false)}
                />
                <div className="absolute left-0 top-full z-20 mt-1 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => {
                        onLanguageChange?.(lang.value);
                        setIsLanguageOpen(false);
                      }}
                      className={cn(
                        'block w-full px-3 py-1.5 text-left text-sm transition-colors',
                        lang.value === language
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Font size control */}
          <div className="flex items-center gap-1 rounded-md border border-gray-300">
            <button
              type="button"
              onClick={() => adjustFontSize(-1)}
              className="rounded-l-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              title="Decrease font size"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[2rem] text-center text-xs tabular-nums text-gray-600">
              {fontSize}
            </span>
            <button
              type="button"
              onClick={() => adjustFontSize(1)}
              className="rounded-r-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              title="Increase font size"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
            className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title={theme === 'vs-dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'vs-dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={theme}
          onChange={(value) => onChange(value ?? '')}
          options={{
            fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            bracketPairColorization: { enabled: true },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
          }}
        />
      </div>

      {/* Bottom action bar */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-3 py-2">
        <p className="text-xs text-gray-500">
          Press Ctrl+Enter to run
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRun}
            disabled={isRunning || isSubmitting}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
              'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors',
              'bg-emerald-600 hover:bg-emerald-700',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
