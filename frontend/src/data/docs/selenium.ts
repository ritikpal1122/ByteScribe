import type { LanguageConfig } from './types';
import { SELENIUM_PART1_CATEGORIES } from './_selenium_part1';
import { SELENIUM_PART2_CATEGORIES } from './_selenium_part2';
import { SELENIUM_PART3_CATEGORIES } from './_selenium_part3';

export const selenium: LanguageConfig = {
  id: 'selenium',
  label: 'Selenium',
  icon: '🔗',
  color: '#43B02A',
  officialUrl: 'https://www.selenium.dev/documentation/',
  tagline: 'Browser automation for testing and web scraping',
  executionApiId: 'python',
  categories: [
    ...SELENIUM_PART1_CATEGORIES,
    ...SELENIUM_PART2_CATEGORIES,
    ...SELENIUM_PART3_CATEGORIES,
  ],
};
