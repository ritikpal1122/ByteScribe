import type { LanguageConfig } from './types';
import { JS_PART1_CATEGORIES } from './_javascript_part1';
import { JS_PART2_CATEGORIES } from './_javascript_part2';
import { JS_PART3_CATEGORIES } from './_javascript_part3';
import { JS_PART4_CATEGORIES } from './_javascript_part4';
import { JS_PART5_CATEGORIES } from './_javascript_part5';
import { JS_PART6_CATEGORIES } from './_javascript_part6';
import { JS_PART7_CATEGORIES } from './_javascript_part7';

export const javascript: LanguageConfig = {
  id: 'javascript',
  label: 'JavaScript',
  icon: '⚡',
  color: '#F7DF1E',
  officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  tagline: 'The language of the web',
  playgroundUrl: 'https://jsfiddle.net/',
  executionApiId: 'javascript',
  categories: [
    ...JS_PART1_CATEGORIES,  // Getting Started, Data Types
    ...JS_PART2_CATEGORIES,  // Control Flow, Functions
    ...JS_PART3_CATEGORIES,  // Objects & Classes, Modules & Async
    ...JS_PART4_CATEGORIES,  // Array Methods
    ...JS_PART5_CATEGORIES,  // String Methods
    ...JS_PART6_CATEGORIES,  // Built-in Objects, DOM Basics
    ...JS_PART7_CATEGORIES,  // Modern JavaScript (ES2020+)
  ],
};
