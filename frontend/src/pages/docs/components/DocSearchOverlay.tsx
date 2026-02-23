import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, ChevronRight, Lightbulb } from 'lucide-react';
import { getLanguage } from '@/data/docs';
import { DIFFICULTY_COLORS } from '../utils/colorTokens';
import type { SearchResult } from '../hooks/useDocSearch';

/**
 * Highlights all occurrences of `query` inside `text` by wrapping them
 * in <mark> elements. Falls back to the plain text if nothing matches.
 */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  if (parts.length <= 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200/80 text-inherit rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Simple map from language id to a Tailwind left-border color class */
const LANG_ACCENT_BORDERS: Record<string, string> = {
  python: 'border-l-yellow-500',
  javascript: 'border-l-amber-500',
  typescript: 'border-l-sky-500',
  cpp: 'border-l-blue-500',
  java: 'border-l-red-500',
  go: 'border-l-cyan-500',
  rust: 'border-l-orange-500',
  selenium: 'border-l-emerald-500',
  playwright: 'border-l-violet-500',
};

export default function DocSearchOverlay({
  query,
  results,
  onSelect,
}: {
  query: string;
  results: SearchResult[];
  onSelect: (langId: string, entryId: string) => void;
}) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    setFocusedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[focusedIndex]) {
        e.preventDefault();
        const r = results[focusedIndex];
        if (r) onSelect(r.langId, r.entry.id);
      }
    },
    [results, focusedIndex, onSelect],
  );

  const trimmedQuery = useMemo(() => query.trim().toLowerCase(), [query]);

  if (results.length === 0) {
    return (
      <div
        className="absolute top-full left-0 right-0 mt-1 min-w-[350px] bg-white rounded-xl border border-gray-200 shadow-lg z-50 p-6 text-center"
        onKeyDown={handleKeyDown}
      >
        <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500">
          No results for &ldquo;{query}&rdquo;
        </p>
        <div className="mt-3 flex items-start gap-2 text-left bg-gray-50 rounded-lg p-3">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 leading-relaxed">
            Try searching for a topic name, language keyword, or concept like
            &ldquo;arrays&rdquo;, &ldquo;async&rdquo;, or &ldquo;loops&rdquo;.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-full left-0 right-0 mt-1 min-w-[350px] bg-white rounded-xl border border-gray-200 shadow-lg z-50 max-h-[420px] flex flex-col"
      onKeyDown={handleKeyDown}
    >
      <div className="p-2 flex-1 overflow-y-auto">
        <p className="text-[11px] font-medium text-gray-400 px-3 py-1.5">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
        {results.map((r, i) => {
          const langData = getLanguage(r.langId);
          const isFocused = i === focusedIndex;
          const accentBorder = LANG_ACCENT_BORDERS[r.langId] ?? 'border-l-gray-400';
          const diffBadge = r.entry.difficulty
            ? DIFFICULTY_COLORS[r.entry.difficulty]
            : null;

          return (
            <button
              key={`${r.langId}-${r.entry.id}`}
              onClick={() => onSelect(r.langId, r.entry.id)}
              onMouseEnter={() => setFocusedIndex(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 border-l-2 ${
                isFocused
                  ? `bg-blue-50/80 text-blue-700 ${accentBorder}`
                  : 'text-gray-700 hover:bg-gray-50 border-l-transparent'
              }`}
            >
              <span className="text-base shrink-0">
                {langData?.icon ?? ''}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">
                    {highlightMatch(r.entry.title, trimmedQuery)}
                  </p>
                  {diffBadge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${diffBadge}`}
                    >
                      {r.entry.difficulty}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {langData?.label} &rsaquo; {r.categoryLabel}
                  {r.matchContext ? (
                    <>
                      {' -- '}
                      {highlightMatch(r.matchContext, trimmedQuery)}
                    </>
                  ) : null}
                </p>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 transition-colors duration-150 ${
                  isFocused ? 'text-blue-400' : 'text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Keyboard hint footer */}
      <div className="shrink-0 border-t border-gray-100 px-3 py-2 flex items-center gap-3 text-[11px] text-gray-400 bg-gray-50/50 rounded-b-xl">
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-mono leading-none">
            &uarr;
          </kbd>
          <kbd className="px-1 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-mono leading-none">
            &darr;
          </kbd>
          <span className="ml-0.5">to navigate</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-mono leading-none">
            Enter
          </kbd>
          <span className="ml-0.5">to select</span>
        </span>
      </div>
    </div>
  );
}
