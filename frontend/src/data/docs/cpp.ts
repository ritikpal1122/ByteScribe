import type { LanguageConfig } from './types';
import { CPP_PART1_CATEGORIES } from './_cpp_part1';
import { CPP_PART2_CATEGORIES } from './_cpp_part2';
import { CPP_PART3_CATEGORIES } from './_cpp_part3';
import { CPP_PART4_CATEGORIES } from './_cpp_part4';
import { CPP_PART5_CATEGORIES } from './_cpp_part5';
import { CPP_PART6_CATEGORIES } from './_cpp_part6';

export const cpp: LanguageConfig = {
  id: 'cpp',
  label: 'C++',
  icon: '⚙️',
  color: '#00599C',
  officialUrl: 'https://en.cppreference.com/',
  tagline: 'Performance meets abstraction',
  playgroundUrl: 'https://godbolt.org/',
  executionApiId: 'cpp',
  categories: [
    ...CPP_PART1_CATEGORIES,
    ...CPP_PART2_CATEGORIES,
    ...CPP_PART3_CATEGORIES,
    ...CPP_PART4_CATEGORIES,
    ...CPP_PART5_CATEGORIES,
    ...CPP_PART6_CATEGORIES,
  ],
};
