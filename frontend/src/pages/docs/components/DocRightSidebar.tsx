import { useMemo } from 'react';
import { List, Clock, Layers, HelpCircle, Code2 } from 'lucide-react';
import type { DocEntry } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { slugify, calcReadingTime } from '../utils/docHelpers';

export default function DocRightSidebar({
  entry,
  activeSectionId,
  onScrollTo,
  colors,
}: {
  entry: DocEntry;
  activeSectionId: string | null;
  onScrollTo: (sectionId: string) => void;
  colors: LangColorTokens;
}) {
  const sectionIds = useMemo(
    () => entry.sections.map((sec) => slugify(sec.heading)),
    [entry.sections],
  );

  const activeIndex = activeSectionId
    ? sectionIds.indexOf(activeSectionId)
    : -1;

  const totalSections = sectionIds.length;
  const completedSections = activeIndex >= 0 ? activeIndex + 1 : 0;
  const readTime = calcReadingTime(entry);
  const quizCount = entry.quiz?.length ?? 0;
  const hasChallenge = !!entry.challenge;

  return (
    <aside className="w-52 shrink-0 border-l border-gray-200 overflow-y-auto hidden xl:block bg-white">
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-3">
          <List className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-[12px] font-semibold text-gray-500">
            On this page
          </p>
        </div>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
            <Clock className="w-3 h-3" />
            {readTime} min
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
            <Layers className="w-3 h-3" />
            {totalSections}
          </span>
          {quizCount > 0 && (
            <span className={`inline-flex items-center gap-1 text-[11px] ${colors.badge} px-1.5 py-0.5 rounded`}>
              <HelpCircle className="w-3 h-3" />
              {quizCount}
            </span>
          )}
          {hasChallenge && (
            <span className={`inline-flex items-center gap-1 text-[11px] ${colors.badge} px-1.5 py-0.5 rounded`}>
              <Code2 className="w-3 h-3" />
              1
            </span>
          )}
        </div>

        <nav className="relative">
          {/* Vertical track */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100" />

          {/* Progress fill */}
          {activeIndex >= 0 && (
            <div
              className={`absolute left-0 top-0 w-px ${colors.accent} transition-all duration-300`}
              style={{
                height: `${((activeIndex + 1) / sectionIds.length) * 100}%`,
              }}
            />
          )}

          <div className="space-y-px">
            {entry.sections.map((sec, idx) => {
              const sectionId = sectionIds[idx]!;
              const isActive = activeSectionId === sectionId;
              const isPast = activeIndex >= 0 && idx < activeIndex;

              return (
                <button
                  key={sectionId}
                  onClick={() => onScrollTo(sectionId)}
                  className={`w-full text-left pl-3.5 pr-2 py-1.5 rounded-r-md text-[12px] leading-snug transition-colors flex items-center relative ${
                    isActive
                      ? `${colors.textActive} font-medium ${colors.bgSubtle}`
                      : isPast
                        ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {isActive && (
                    <span className={`absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-4 rounded-full ${colors.accent}`} />
                  )}
                  <span className="line-clamp-2">{sec.heading}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer: quiz/challenge summary */}
        {(quizCount > 0 || hasChallenge) && (
          <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
            {quizCount > 0 && (
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <HelpCircle className="w-3 h-3 shrink-0" />
                {quizCount} quiz question{quizCount > 1 ? 's' : ''}
              </p>
            )}
            {hasChallenge && (
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <Code2 className="w-3 h-3 shrink-0" />
                Practice challenge
              </p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
