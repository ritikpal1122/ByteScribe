import { Link2 } from 'lucide-react';
import type { DocSection } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import { renderInlineCode } from '../utils/docHelpers';
import CodeBlock from './CodeBlock';
import { TipCallout, WarningCallout, NoteCallout, AnalogyCallout } from './TipCallout';
import DiagramBlock from './diagrams/DiagramBlock';

export default function DocSectionBlock({
  section,
  sectionId,
  sectionIndex,
  langId,
  colors,
}: {
  section: DocSection;
  sectionId: string;
  sectionIndex: number;
  langId: string;
  colors: LangColorTokens;
}) {
  const paragraphs = section.content.split('\n\n').filter(Boolean);
  const numberStr = String(sectionIndex + 1).padStart(2, '0');

  return (
    <div id={sectionId} className="scroll-mt-20">
      {/* ── Section Heading ── */}
      <a
        href={`#${sectionId}`}
        className="group block no-underline mt-10 mb-5"
      >
        <h2
          className={`text-xl font-bold text-gray-900 pl-4 border-l-[3px] ${colors.borderActive} flex items-center gap-2.5 py-1 transition-colors`}
        >
          <span className={`${colors.text} font-mono text-sm`}>
            {numberStr}.
          </span>
          <span>{section.heading}</span>
          <Link2 className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0" />
        </h2>
      </a>

      {/* ── Analogy Callout ── */}
      {section.analogy && <AnalogyCallout analogy={section.analogy} />}

      {/* ── Paragraphs ── */}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-[15.5px] text-gray-600 leading-[1.9] mb-4 tracking-[-0.01em]"
        >
          {renderInlineCode(p)}
        </p>
      ))}

      {/* ── Diagram ── */}
      {section.diagram && <DiagramBlock diagram={section.diagram} />}

      {/* ── Code Block ── */}
      {section.code && (
        <CodeBlock
          code={section.code}
          langId={langId}
          output={section.output}
          highlightLines={section.codeHighlightLines}
        />
      )}

      {/* ── Callouts ── */}
      {section.tip && <TipCallout tip={section.tip} />}
      {section.warning && <WarningCallout warning={section.warning} />}
      {section.note && <NoteCallout note={section.note} />}
    </div>
  );
}
