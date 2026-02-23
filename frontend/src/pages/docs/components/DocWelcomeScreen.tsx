import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, Target } from 'lucide-react';
import type { LanguageConfig } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { DIFFICULTY_DOT_COLORS } from '../utils/colorTokens';

export default function DocWelcomeScreen({
  lang,
  colors,
  completedCount,
  onSelectEntry,
  lastVisitedId,
}: {
  lang: LanguageConfig;
  colors: LangColorTokens;
  completedCount: number;
  onSelectEntry: (entryId: string) => void;
  lastVisitedId: string | null;
}) {
  const totalEntries = lang.categories.reduce(
    (sum, c) => sum + c.entries.length,
    0,
  );
  const progressPct = totalEntries > 0 ? Math.round((completedCount / totalEntries) * 100) : 0;

  const popularTopics = lang.categories
    .filter((c) => c.entries.length > 0)
    .slice(0, 8)
    .map((c) => ({ category: c.label, entry: c.entries[0]! }));

  const stats = [
    { icon: BookOpen, value: lang.categories.length, label: 'Categories' },
    { icon: Target, value: totalEntries, label: 'Topics' },
    { icon: TrendingUp, value: `${progressPct}%`, label: 'Complete' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12 overflow-y-auto">
      {/* Icon */}
      <div className="mb-6">
        <div
          className={`w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}
        >
          <span className="text-4xl">{lang.icon}</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1.5">
        {lang.label} Documentation
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-md leading-relaxed">
        {lang.tagline}
      </p>

      {/* Stat cards */}
      <div className="flex items-stretch gap-3 mb-8">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 px-5 py-3 rounded-lg border border-gray-200 bg-gray-50/50 min-w-[100px]"
          >
            <Icon className="w-4 h-4 text-gray-400 mb-0.5" />
            <span className="text-lg font-bold text-gray-900">{value}</span>
            <span className="text-[11px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Continue where you left off */}
      {lastVisitedId && (
        <button
          onClick={() => onSelectEntry(lastVisitedId)}
          className={`group mb-8 flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border ${colors.border} ${colors.bg} ${colors.text} hover:shadow-sm transition-all`}
        >
          Continue where you left off
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}

      {/* Popular topics */}
      <div className="w-full max-w-2xl mb-8">
        <p className="text-xs font-semibold text-gray-400 mb-3">
          Popular Topics
        </p>
        <div className="grid grid-cols-2 gap-2">
          {popularTopics.map(({ category, entry }) => (
            <button
              key={entry.id}
              onClick={() => onSelectEntry(entry.id)}
              className="group text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {entry.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-[11px] text-gray-400 truncate">
                      {category}
                    </p>
                    {entry.difficulty && (
                      <>
                        <span className="w-0.5 h-0.5 rounded-full bg-gray-300 shrink-0" />
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${DIFFICULTY_DOT_COLORS[entry.difficulty] ?? 'bg-gray-300'}`}
                        />
                        <span className="text-[10px] text-gray-400 capitalize">
                          {entry.difficulty}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 mt-0.5 shrink-0 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Select a topic from the sidebar to get started</span>
      </div>
      <p className="text-[11px] text-gray-400 mt-3">
        Press{' '}
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono">
          Ctrl+K
        </kbd>{' '}
        to search
      </p>
    </div>
  );
}
