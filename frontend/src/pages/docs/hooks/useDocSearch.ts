import { useMemo } from 'react';
import { ALL_LANGUAGES } from '@/data/docs';
import type { DocEntry } from '@/data/docs';

export interface SearchResult {
  langId: string;
  categoryLabel: string;
  entry: DocEntry;
  matchContext: string;
}

export function useDocSearch(query: string): SearchResult[] {
  return useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: SearchResult[] = [];

    for (const l of ALL_LANGUAGES) {
      for (const cat of l.categories) {
        for (const entry of cat.entries) {
          const titleMatch = entry.title.toLowerCase().includes(q);
          let sectionMatch = '';
          if (!titleMatch) {
            for (const sec of entry.sections) {
              if (sec.heading.toLowerCase().includes(q)) {
                sectionMatch = sec.heading;
                break;
              }
              if (sec.content.toLowerCase().includes(q)) {
                sectionMatch = sec.heading;
                break;
              }
            }
          }

          if (titleMatch || sectionMatch) {
            results.push({
              langId: l.id,
              categoryLabel: cat.label,
              entry,
              matchContext: sectionMatch,
            });
          }
        }
      }
    }
    return results.slice(0, 30);
  }, [query]);
}
