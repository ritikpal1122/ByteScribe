import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Code2 } from 'lucide-react';
import type { LanguageConfig } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { DIFFICULTY_COLORS } from '../utils/colorTokens';

export default function CheatSheetView({
  lang,
  colors,
  onSelectEntry,
}: {
  lang: LanguageConfig;
  colors: LangColorTokens;
  onSelectEntry: (entryId: string) => void;
}) {
  const [filter, setFilter] = useState('');
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  const q = filter.toLowerCase();

  const filteredCategories = lang.categories
    .map((cat) => ({
      ...cat,
      entries: cat.entries.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.cheatSheetSummary && e.cheatSheetSummary.toLowerCase().includes(q)) ||
          (e.tags && e.tags.some((t) => t.toLowerCase().includes(q))),
      ),
    }))
    .filter((cat) => cat.entries.length > 0);

  const toggleExpand = (entryId: string) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) next.delete(entryId);
      else next.add(entryId);
      return next;
    });
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Code2 className={`w-6 h-6 ${colors.text}`} />
          <h2 className="text-xl font-bold text-gray-900">
            {lang.label} Cheat Sheet
          </h2>
          <div className="flex-1" />
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter..."
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-48"
            />
          </div>
        </div>

        {/* Cards by category */}
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {cat.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cat.entries.map((entry) => {
                const isExpanded = expandedEntries.has(entry.id);
                const firstCodeSection = entry.sections.find((s) => s.code);

                return (
                  <div
                    key={entry.id}
                    className={`rounded-lg border border-gray-200 hover:border-gray-300 transition-all overflow-hidden`}
                  >
                    <button
                      onClick={() => toggleExpand(entry.id)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {entry.title}
                          </p>
                          {entry.difficulty && (
                            <span
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${DIFFICULTY_COLORS[entry.difficulty]}`}
                            >
                              {entry.difficulty}
                            </span>
                          )}
                        </div>
                        {entry.signature && (
                          <p className="text-xs font-mono text-gray-500 truncate mt-0.5">
                            {entry.signature}
                          </p>
                        )}
                        {entry.cheatSheetSummary && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {entry.cheatSheetSummary}
                          </p>
                        )}
                      </div>
                    </button>

                    {isExpanded && firstCodeSection && (
                      <div className="border-t border-gray-100">
                        <pre className="px-4 py-3 text-xs font-mono text-gray-700 bg-gray-50 overflow-x-auto whitespace-pre">
                          <code>{firstCodeSection.code}</code>
                        </pre>
                        <div className="px-4 py-2 border-t border-gray-100">
                          <button
                            onClick={() => onSelectEntry(entry.id)}
                            className={`text-xs font-medium ${colors.text} hover:underline`}
                          >
                            View full documentation
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">No entries match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
