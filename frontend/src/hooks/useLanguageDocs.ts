import { useQuery } from '@tanstack/react-query';
import {
  getLanguageDocs,
  getLanguageCategories,
} from '@/api/languageDocs';

export function useLanguageDocs(
  language: string,
  params?: { category?: string; search?: string },
) {
  return useQuery({
    queryKey: ['language-docs', language, params?.category, params?.search],
    queryFn: () => getLanguageDocs(language, params),
    enabled: !!language,
    staleTime: 1000 * 60 * 30, // docs rarely change — cache 30 min
  });
}

export function useLanguageCategories(language: string) {
  return useQuery({
    queryKey: ['language-docs-categories', language],
    queryFn: () => getLanguageCategories(language),
    enabled: !!language,
    staleTime: 1000 * 60 * 30,
  });
}
