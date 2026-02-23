import type { LanguageConfig } from './types';
import { PART1A_CATEGORIES } from './_python_part1a';
import { PART1B_CATEGORIES } from './_python_part1b';
import { PART2_CATEGORIES } from './_python_part2';
import { PART3_CATEGORIES } from './_python_part3';
import { PART4_CATEGORIES } from './_python_part4';
import { PART5_CATEGORIES } from './_python_part5';
import { PART6_CATEGORIES } from './_python_part6';
import { PART7_CATEGORIES } from './_python_part7';

export const python: LanguageConfig = {
  id: 'python',
  label: 'Python',
  icon: '🐍',
  color: '#3776AB',
  officialUrl: 'https://docs.python.org/3/',
  tagline: 'Simple, readable, powerful',
  playgroundUrl: 'https://www.online-python.com/',
  executionApiId: 'python',
  categories: [
    ...PART1A_CATEGORIES,  // Getting Started, Data Structures
    ...PART1B_CATEGORIES,  // Control Flow, Functions
    ...PART2_CATEGORIES,   // OOP, Import/Export Data, Advanced Topics
    ...PART3_CATEGORIES,   // Built-in Functions
    ...PART4_CATEGORIES,   // List Methods, Tuple Methods
    ...PART5_CATEGORIES,   // Dictionary Methods, Set Methods
    ...PART6_CATEGORIES,   // String Methods
    ...PART7_CATEGORIES,   // Keywords
  ],
};
