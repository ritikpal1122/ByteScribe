import { useState, useMemo } from 'react';
import { ChevronRight, CheckCircle2, Search } from 'lucide-react';
import type { LanguageConfig } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { DIFFICULTY_DOT_COLORS } from '../utils/colorTokens';
import { getIcon } from '../utils/docHelpers';

export default function DocLeftSidebar({
  lang,
  colors,
  selectedEntryId,
  onSelectEntry,
  collapsedCategories,
  onToggleCategory,
  isEntryCompleted,
  completedCount,
}: {
  lang: LanguageConfig;
  colors: LangColorTokens;
  selectedEntryId: string | null;
  onSelectEntry: (entryId: string) => void;
  collapsedCategories: Set<string>;
  onToggleCategory: (catId: string) => void;
  isEntryCompleted: (entryId: string) => boolean;
  completedCount: number;
}) {
  const [filter, setFilter] = useState('');

  const totalEntries = lang.categories.reduce(
    (sum, c) => sum + c.entries.length,
    0,
  );
  const progressPct = totalEntries > 0 ? (completedCount / totalEntries) * 100 : 0;

  const filteredCategories = useMemo(() => {
    if (!filter.trim()) return lang.categories;
    const q = filter.toLowerCase();
    return lang.categories
      .map((cat) => ({
        ...cat,
        entries: cat.entries.filter((e) =>
          e.title.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.entries.length > 0);
  }, [lang.categories, filter]);

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
      {/* Language header */}
      <div className="shrink-0 px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
            <span className="text-base">{lang.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 leading-tight">
              {lang.label}
            </p>
            {lang.tagline && (
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5 truncate">
                {lang.tagline}
              </p>
            )}
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-gray-400 font-medium">
              Progress
            </span>
            <span className="text-[11px] text-gray-500 tabular-nums font-medium">
              {completedCount}/{totalEntries}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors.accent} rounded-full transition-all duration-500`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter input */}
      <div className="shrink-0 px-3 py-2 border-b border-gray-50">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter topics..."
            className="w-full pl-7 pr-2 py-1.5 text-[12px] text-gray-700 placeholder:text-gray-300 bg-gray-50/80 border border-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Category list */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 overscroll-contain scrollbar-thin">
        {filteredCategories.map((cat) => {
          const Icon = getIcon(cat.icon);
          const isCollapsed = collapsedCategories.has(cat.id);
          const catCompletedCount = cat.entries.filter((e) =>
            isEntryCompleted(e.id),
          ).length;

          return (
            <div key={cat.id} className="mb-0.5">
              <button
                onClick={() => onToggleCategory(cat.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left hover:bg-gray-50 transition-colors"
              >
                <ChevronRight
                  className={`w-3 h-3 text-gray-400 shrink-0 transition-transform duration-150 ${
                    !isCollapsed ? 'rotate-90' : ''
                  }`}
                />
                <Icon className={`w-4 h-4 ${colors.text} shrink-0`} />
                <span className="text-[13px] font-medium text-gray-700 flex-1 truncate">
                  {cat.label}
                </span>
                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-500 tabular-nums shrink-0">
                  {catCompletedCount > 0 && (
                    <span className="text-green-600">{catCompletedCount}/</span>
                  )}
                  {cat.entries.length}
                </span>
              </button>

              {!isCollapsed && (
                <div className="ml-4 pl-3 mt-0.5 mb-1.5 border-l border-gray-100">
                  {cat.entries.map((entry) => {
                    const isActive = selectedEntryId === entry.id;
                    const done = isEntryCompleted(entry.id);
                    const diffDot = entry.difficulty
                      ? DIFFICULTY_DOT_COLORS[entry.difficulty]
                      : null;
                    const hasInteractive = !!(entry.quiz?.length || entry.challenge);
                    return (
                      <button
                        key={entry.id}
                        onClick={() => onSelectEntry(entry.id)}
                        className={`w-full text-left px-2 py-[5px] rounded-md text-[13px] leading-snug flex items-center gap-1.5 transition-colors relative ${
                          isActive
                            ? `${colors.bgActive} ${colors.textActive} font-medium`
                            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        {/* Active accent bar */}
                        {isActive && (
                          <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full ${colors.accent}`} />
                        )}
                        {/* Status indicator */}
                        {done ? (
                          <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                        ) : diffDot ? (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${diffDot} shrink-0`}
                          />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200 shrink-0" />
                        )}
                        <span className="truncate flex-1">{entry.title}</span>
                        {/* Interactive content cue */}
                        {hasInteractive && (
                          <span className={`w-1 h-1 rounded-full ${isActive ? colors.accent : 'bg-gray-300'} shrink-0`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {filteredCategories.length === 0 && filter.trim() && (
          <p className="text-[12px] text-gray-400 text-center py-6">
            No topics match "{filter}"
          </p>
        )}
      </nav>
    </aside>
  );
}
