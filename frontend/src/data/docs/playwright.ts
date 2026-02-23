import type { LanguageConfig } from './types';
import { PW_PART1_CATEGORIES } from './_playwright_part1';
import { PW_PART2_CATEGORIES } from './_playwright_part2';
import { PW_PART3_CATEGORIES } from './_playwright_part3';

export const playwright: LanguageConfig = {
  id: 'playwright',
  label: 'Playwright',
  icon: '🎭',
  color: '#2EAD33',
  officialUrl: 'https://playwright.dev/python/docs/intro',
  tagline: 'Modern end-to-end testing for web apps',
  executionApiId: 'python',
  categories: [
    ...PW_PART1_CATEGORIES,
    ...PW_PART2_CATEGORIES,
    ...PW_PART3_CATEGORIES,
  ],
};
