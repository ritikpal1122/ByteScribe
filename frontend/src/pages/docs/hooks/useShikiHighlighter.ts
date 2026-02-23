import { useState, useEffect, useRef, useCallback } from 'react';
import type { Highlighter, BundledLanguage, BundledTheme } from 'shiki';

let cachedHighlighter: Highlighter | null = null;
let loadingPromise: Promise<Highlighter> | null = null;

const SUPPORTED_LANGS: BundledLanguage[] = [
  'python',
  'javascript',
  'typescript',
  'cpp',
  'java',
  'go',
  'rust',
  'bash',
  'json',
  'html',
  'css',
  'sql',
  'yaml',
  'toml',
  'markdown',
];

const LIGHT_THEME: BundledTheme = 'github-light';
const DARK_THEME: BundledTheme = 'one-dark-pro';

async function loadHighlighter(): Promise<Highlighter> {
  if (cachedHighlighter) return cachedHighlighter;
  if (loadingPromise) return loadingPromise;

  loadingPromise = import('shiki').then(async ({ createHighlighter }) => {
    const highlighter = await createHighlighter({
      themes: [LIGHT_THEME, DARK_THEME],
      langs: SUPPORTED_LANGS,
    });
    cachedHighlighter = highlighter;
    return highlighter;
  });

  return loadingPromise;
}

/* Map our langId strings to shiki-recognized language names */
function mapLangId(langId: string): BundledLanguage {
  const map: Record<string, BundledLanguage> = {
    python: 'python',
    javascript: 'javascript',
    typescript: 'typescript',
    cpp: 'cpp',
    java: 'java',
    go: 'go',
    rust: 'rust',
  };
  return map[langId] ?? 'javascript';
}

export interface HighlightResult {
  html: string;
  loading: boolean;
}

export function useShikiHighlighter(
  code: string,
  langId: string,
  isDark: boolean = false,
): HighlightResult {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const highlight = useCallback(async () => {
    try {
      setLoading(true);
      const highlighter = await loadHighlighter();
      if (!mountedRef.current) return;

      const result = highlighter.codeToHtml(code, {
        lang: mapLangId(langId),
        theme: isDark ? DARK_THEME : DARK_THEME, // Always dark for code blocks
      });

      if (mountedRef.current) {
        setHtml(result);
        setLoading(false);
      }
    } catch {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [code, langId, isDark]);

  useEffect(() => {
    highlight();
  }, [highlight]);

  return { html, loading };
}

export { SUPPORTED_LANGS, LIGHT_THEME, DARK_THEME, mapLangId };
