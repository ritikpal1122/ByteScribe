import type { LanguageConfig } from './types';
import { GO_PART1_CATEGORIES } from './_go_part1';
import { GO_PART2_CATEGORIES } from './_go_part2';
import { GO_PART3_CATEGORIES } from './_go_part3';
import { GO_PART4_CATEGORIES } from './_go_part4';
import { GO_PART5_CATEGORIES } from './_go_part5';
import { GO_PART6_CATEGORIES } from './_go_part6';
import { GO_PART7_CATEGORIES } from './_go_part7';

export const go: LanguageConfig = {
  id: 'go',
  label: 'Go',
  icon: '🐹',
  color: '#00ADD8',
  officialUrl: 'https://go.dev/doc/',
  tagline: 'Simple, reliable, efficient',
  playgroundUrl: 'https://go.dev/play/',
  executionApiId: 'go',
  categories: [
    ...GO_PART1_CATEGORIES,
    ...GO_PART2_CATEGORIES,
    ...GO_PART3_CATEGORIES,
    ...GO_PART4_CATEGORIES,
    ...GO_PART5_CATEGORIES,
    ...GO_PART6_CATEGORIES,
    ...GO_PART7_CATEGORIES,
  ],
};
