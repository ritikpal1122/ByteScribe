import { useState, useEffect, useRef, useCallback } from 'react';
import type { LanguageConfig } from '@/data/docs';
import { slugify, findEntryById } from '../utils/docHelpers';

export function useDocNavigation(lang: LanguageConfig) {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set(),
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset on language change
  useEffect(() => {
    const firstEntry = lang.categories[0]?.entries[0];
    setSelectedEntryId(firstEntry?.id ?? null);
    setCollapsedCategories(new Set());
    setActiveSectionId(null);
    setScrollProgress(0);
  }, [lang]);

  // Scroll progress tracking
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = container!;
      const max = scrollHeight - clientHeight;
      setScrollProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    }

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [selectedEntryId]);

  // IntersectionObserver for TOC tracking
  useEffect(() => {
    const container = contentRef.current;
    if (!container || !selectedEntryId) return;

    const found = findEntryById(lang.categories, selectedEntryId);
    if (!found) return;

    const sectionIds = found.entry.sections.map((s) => slugify(s.heading));
    const elements = sectionIds
      .map((id) => container.querySelector(`#${CSS.escape(id)}`))
      .filter(Boolean) as Element[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        root: container,
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedEntryId, lang]);

  const handleSelectEntry = useCallback((entryId: string) => {
    setSelectedEntryId(entryId);
    setActiveSectionId(null);
    setScrollProgress(0);
    setTimeout(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, []);

  const handleToggleCategory = useCallback((catId: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  }, []);

  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = contentRef.current?.querySelector(
      `#${CSS.escape(sectionId)}`,
    );
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return {
    selectedEntryId,
    setSelectedEntryId,
    activeSectionId,
    scrollProgress,
    collapsedCategories,
    contentRef,
    handleSelectEntry,
    handleToggleCategory,
    handleScrollToSection,
  };
}
