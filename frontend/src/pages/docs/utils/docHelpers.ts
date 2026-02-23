import React from 'react';
import type { DocCategory, DocEntry } from '@/data/docs';
import {
  BookOpen,
  Rocket,
  Database,
  GitBranch,
  Cpu,
  Package,
  Sparkles,
  Layers,
  Clock,
  Code2,
} from 'lucide-react';

/* ================================================================== */
/*  Icon Map                                                           */
/* ================================================================== */

const ICON_MAP: Record<string, typeof BookOpen> = {
  Rocket,
  Database,
  GitBranch,
  Brackets: Code2,
  Layers,
  Cpu,
  Package,
  Sparkles,
  Clock,
  Code2,
  BookOpen,
};

export function getIcon(name: string) {
  return ICON_MAP[name] ?? BookOpen;
}

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function findEntryById(
  categories: DocCategory[],
  entryId: string,
): { category: DocCategory; entry: DocEntry } | null {
  for (const cat of categories) {
    const entry = cat.entries.find((e) => e.id === entryId);
    if (entry) return { category: cat, entry };
  }
  return null;
}

export interface FlatEntry {
  entry: DocEntry;
  categoryLabel: string;
}

export function flattenEntries(categories: DocCategory[]): FlatEntry[] {
  return categories.flatMap((cat) =>
    cat.entries.map((entry) => ({ entry, categoryLabel: cat.label })),
  );
}

export function calcReadingTime(entry: DocEntry): number {
  if (entry.readingTimeMinutes) return entry.readingTimeMinutes;
  let wordCount = 0;
  let codeLines = 0;
  for (const sec of entry.sections) {
    wordCount += sec.content.split(/\s+/).length;
    if (sec.code) codeLines += sec.code.split('\n').length;
  }
  // ~200 words/min for text, ~30 lines/min for code
  return Math.max(1, Math.round(wordCount / 200 + codeLines / 30));
}

/* ================================================================== */
/*  Inline Code Renderer                                               */
/* ================================================================== */

/**
 * Splits text on backtick-enclosed segments and wraps code portions
 * in styled <code> elements. Returns an array of React nodes.
 *
 * Example: "Use `map()` to transform" =>
 *   ["Use ", <code>map()</code>, " to transform"]
 */
export function renderInlineCode(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return React.createElement(
        'code',
        {
          key: i,
          className:
            'bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[13px] font-mono',
        },
        part.slice(1, -1),
      );
    }
    return part;
  });
}
