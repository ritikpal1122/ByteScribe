import client from './client';

export interface LanguageDocEntry {
  id: string;
  language: string;
  category: string;
  title: string;
  content: string;
  code_example: string | null;
  order: number;
}

export async function getLanguageDocs(
  language: string,
  params?: { category?: string; search?: string },
) {
  const { data } = await client.get<{ success: boolean; data: LanguageDocEntry[] }>(
    `/language-docs/${language}`,
    { params },
  );
  return data.data;
}

export async function getLanguageCategories(language: string) {
  const { data } = await client.get<{ success: boolean; data: string[] }>(
    `/language-docs/${language}/categories`,
  );
  return data.data;
}

export async function getSupportedLanguages() {
  const { data } = await client.get<{ success: boolean; data: string[] }>(
    '/language-docs/',
  );
  return data.data;
}
