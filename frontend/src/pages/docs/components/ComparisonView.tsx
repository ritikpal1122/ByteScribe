import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ALL_LANGUAGES, getLanguage } from '@/data/docs';
import { CROSS_LANGUAGE_CONCEPTS, findConceptByEntryId } from '../utils/crossLanguageMap';
import { getColors } from '../utils/colorTokens';
import { findEntryById, slugify } from '../utils/docHelpers';
import CodeBlock from './CodeBlock';
import { TipCallout, WarningCallout, NoteCallout } from './TipCallout';

export default function ComparisonView({
  initialLangA,
  initialLangB,
  initialConceptId,
  onBack,
}: {
  initialLangA: string;
  initialLangB: string;
  initialConceptId?: string;
  onBack: () => void;
}) {
  const [langAId, setLangAId] = useState(initialLangA);
  const [langBId, setLangBId] = useState(initialLangB);
  const [selectedConcept, setSelectedConcept] = useState(
    initialConceptId ?? CROSS_LANGUAGE_CONCEPTS[0]?.conceptId ?? '',
  );

  const concept = CROSS_LANGUAGE_CONCEPTS.find(
    (c) => c.conceptId === selectedConcept,
  );

  const langA = getLanguage(langAId);
  const langB = getLanguage(langBId);

  const entryA = useMemo(() => {
    if (!langA || !concept) return null;
    const entryId = concept.entries[langAId];
    return entryId ? findEntryById(langA.categories, entryId) : null;
  }, [langA, concept, langAId]);

  const entryB = useMemo(() => {
    if (!langB || !concept) return null;
    const entryId = concept.entries[langBId];
    return entryId ? findEntryById(langB.categories, entryId) : null;
  }, [langB, concept, langBId]);

  const colorsA = getColors(langAId);
  const colorsB = getColors(langBId);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Docs
        </button>

        <div className="flex-1" />

        {/* Language selectors */}
        <select
          value={langAId}
          onChange={(e) => setLangAId(e.target.value)}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${colorsA.border} ${colorsA.bg} ${colorsA.textActive}`}
        >
          {ALL_LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.icon} {l.label}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-400 font-medium">vs</span>

        <select
          value={langBId}
          onChange={(e) => setLangBId(e.target.value)}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${colorsB.border} ${colorsB.bg} ${colorsB.textActive}`}
        >
          {ALL_LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.icon} {l.label}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        {/* Concept selector */}
        <select
          value={selectedConcept}
          onChange={(e) => setSelectedConcept(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
        >
          {CROSS_LANGUAGE_CONCEPTS.map((c) => (
            <option key={c.conceptId} value={c.conceptId}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Two-panel comparison */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel A */}
        <div className="flex-1 overflow-y-auto border-r border-gray-200 px-6 py-6">
          <div className="max-w-xl mx-auto">
            <div className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full mb-4 ${colorsA.badge}`}>
              <span>{langA?.icon}</span>
              {langA?.label}
            </div>
            {entryA ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {entryA.entry.title}
                </h2>
                {entryA.entry.sections.map((sec, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      {sec.heading}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {sec.content}
                    </p>
                    {sec.code && (
                      <CodeBlock code={sec.code} langId={langAId} output={sec.output} />
                    )}
                    {sec.tip && <TipCallout tip={sec.tip} />}
                    {sec.warning && <WarningCallout warning={sec.warning} />}
                    {sec.note && <NoteCallout note={sec.note} />}
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No entry for this concept in {langA?.label}
              </p>
            )}
          </div>
        </div>

        {/* Panel B */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-xl mx-auto">
            <div className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full mb-4 ${colorsB.badge}`}>
              <span>{langB?.icon}</span>
              {langB?.label}
            </div>
            {entryB ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {entryB.entry.title}
                </h2>
                {entryB.entry.sections.map((sec, idx) => (
                  <div key={idx} className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      {sec.heading}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {sec.content}
                    </p>
                    {sec.code && (
                      <CodeBlock code={sec.code} langId={langBId} output={sec.output} />
                    )}
                    {sec.tip && <TipCallout tip={sec.tip} />}
                    {sec.warning && <WarningCallout warning={sec.warning} />}
                    {sec.note && <NoteCallout note={sec.note} />}
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">
                No entry for this concept in {langB?.label}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
