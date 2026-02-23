import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LangColorTokens } from '../utils/colorTokens';
import type { FlatEntry } from '../utils/docHelpers';

export default function DocPrevNextNav({
  allEntries,
  currentEntryId,
  colors,
  onSelectEntry,
}: {
  allEntries: FlatEntry[];
  currentEntryId: string;
  colors: LangColorTokens;
  onSelectEntry: (entryId: string) => void;
}) {
  const currentIndex = allEntries.findIndex(
    (e) => e.entry.id === currentEntryId,
  );
  const prev = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const next =
    currentIndex < allEntries.length - 1
      ? allEntries[currentIndex + 1]
      : null;

  if (!prev && !next) return null;

  const total = allEntries.length;

  return (
    <div className="flex gap-4 mt-10">
      {prev ? (
        <button
          onClick={() => onSelectEntry(prev.entry.id)}
          className="flex-1 text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </div>
          <p className="text-sm font-medium text-gray-900 leading-snug">
            {prev.entry.title}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {prev.categoryLabel}
          </p>
        </button>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <button
          onClick={() => onSelectEntry(next.entry.id)}
          className="flex-1 text-right p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mb-1">
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
          <p className="text-sm font-medium text-gray-900 leading-snug">
            {next.entry.title}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {next.categoryLabel}
          </p>
        </button>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
