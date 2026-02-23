import type { LanguageConfig } from './types';
import { TS_PART1_CATEGORIES } from './_typescript_part1';
import { TS_PART2_CATEGORIES } from './_typescript_part2';
import { TS_PART3_CATEGORIES } from './_typescript_part3';
import { TS_PART4_CATEGORIES } from './_typescript_part4';
import { TS_PART5_CATEGORIES } from './_typescript_part5';
import { TS_PART6_CATEGORIES } from './_typescript_part6';
import { TS_PART7_CATEGORIES } from './_typescript_part7';

export const typescript: LanguageConfig = {
  id: 'typescript',
  label: 'TypeScript',
  icon: '🔷',
  color: '#3178C6',
  officialUrl: 'https://www.typescriptlang.org/docs/',
  tagline: 'JavaScript with syntax for types',
  playgroundUrl: 'https://www.typescriptlang.org/play',
  executionApiId: 'typescript',
  categories: [
    ...TS_PART1_CATEGORIES,  // Getting Started, Basic Types
    ...TS_PART2_CATEGORIES,  // Interfaces, Classes
    ...TS_PART3_CATEGORIES,  // Generics, Advanced Types
    ...TS_PART4_CATEGORIES,  // Utility Types
    ...TS_PART5_CATEGORIES,  // Modules & Namespaces, Async Patterns
    ...TS_PART6_CATEGORIES,  // React & TypeScript, Patterns & Best Practices
    ...TS_PART7_CATEGORIES,  // TypeScript 5.x Features, Config & Tooling
  ],
};
