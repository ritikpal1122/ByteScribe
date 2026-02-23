import { useEffect } from 'react';

export function useDocTheme() {
  // Always light mode — dark mode removed for consistency with rest of app
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('learntext-docs-theme');
    } catch {}
  }, []);

  return { theme: 'light' as const, isDark: false, toggleTheme: () => {}, setTheme: () => {} };
}
