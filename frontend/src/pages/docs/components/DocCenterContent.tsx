import { useMemo } from 'react';
import { ChevronRight, CheckCircle2, Home, Clock, Layers, Tag } from 'lucide-react';
import type { LanguageConfig } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { DIFFICULTY_COLORS } from '../utils/colorTokens';
import { slugify, findEntryById, flattenEntries, calcReadingTime } from '../utils/docHelpers';
import DocSectionBlock from './DocSectionBlock';
import DocPrevNextNav from './DocPrevNextNav';
import DocWelcomeScreen from './DocWelcomeScreen';
import QuizBlock from './QuizBlock';
import ChallengeBlock from './ChallengeBlock';

export default function DocCenterContent({
  lang,
  colors,
  selectedEntryId,
  contentRef,
  onSelectEntry,
  scrollProgress,
  isEntryCompleted,
  onMarkCompleted,
  completedCount,
  lastVisitedId,
}: {
  lang: LanguageConfig;
  colors: LangColorTokens;
  selectedEntryId: string | null;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onSelectEntry: (entryId: string) => void;
  scrollProgress: number;
  isEntryCompleted: (entryId: string) => boolean;
  onMarkCompleted: (entryId: string) => void;
  completedCount: number;
  lastVisitedId: string | null;
}) {
  const found = selectedEntryId
    ? findEntryById(lang.categories, selectedEntryId)
    : null;

  const allEntries = useMemo(
    () => flattenEntries(lang.categories),
    [lang],
  );

  if (!found) {
    return (
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <DocWelcomeScreen
          lang={lang}
          colors={colors}
          completedCount={completedCount}
          onSelectEntry={onSelectEntry}
          lastVisitedId={lastVisitedId}
        />
      </div>
    );
  }

  const { category, entry } = found;
  const completed = isEntryCompleted(entry.id);
  const readTime = calcReadingTime(entry);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Reading progress bar */}
      <div className="h-0.5 bg-gray-100 shrink-0">
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: lang.color,
          }}
        />
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs mb-6 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${colors.bgSubtle} ${colors.text} font-medium`}
            >
              <Home className="w-3 h-3" />
              {lang.label}
            </span>
            <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 font-medium">
              {category.label}
            </span>
            <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
              {entry.title}
            </span>
          </nav>

          {/* Title area */}
          <div className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {entry.title}
              </h1>

              {/* Metadata badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}
                >
                  <span>{lang.icon}</span>
                  {lang.label}
                </span>

                {entry.difficulty && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span
                      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${DIFFICULTY_COLORS[entry.difficulty]}`}
                    >
                      {entry.difficulty}
                    </span>
                  </>
                )}

                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <Layers className="w-3.5 h-3.5" />
                  {entry.sections.length} section
                  {entry.sections.length !== 1 ? 's' : ''}
                </span>

                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime} min read
                </span>

                {completed && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  </>
                )}
              </div>

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  <Tag className="w-3 h-3 text-gray-300" />
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full mb-6 bg-gray-200" />

          {/* Sections */}
          {entry.sections.map((sec, idx) => {
            const sectionId = slugify(sec.heading);
            return (
              <DocSectionBlock
                key={sectionId}
                section={sec}
                sectionId={sectionId}
                sectionIndex={idx}
                langId={lang.id}
                colors={colors}
              />
            );
          })}

          {/* Quiz */}
          {entry.quiz && entry.quiz.length > 0 && (
            <QuizBlock
              questions={entry.quiz}
              entryId={entry.id}
              langId={lang.id}
              colors={colors}
            />
          )}

          {/* Challenge */}
          {entry.challenge && (
            <ChallengeBlock
              challenge={entry.challenge}
              entryId={entry.id}
              langId={lang.id}
              colors={colors}
              difficulty={entry.difficulty}
            />
          )}

          {/* Prev/Next navigation */}
          <DocPrevNextNav
            allEntries={allEntries}
            currentEntryId={entry.id}
            colors={colors}
            onSelectEntry={onSelectEntry}
          />

          {/* Mark as complete */}
          <div className="flex justify-center mt-10 mb-16">
            {completed ? (
              <div className="flex items-center gap-2 text-sm text-white font-medium px-6 py-3 rounded-lg bg-green-600">
                <CheckCircle2 className="w-4.5 h-4.5" />
                Marked as complete
              </div>
            ) : (
              <button
                onClick={() => onMarkCompleted(entry.id)}
                className={`flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-lg border ${colors.border} bg-white ${colors.text} hover:shadow-sm transition-all`}
              >
                <CheckCircle2 className="w-4.5 h-4.5" />
                Mark as complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
