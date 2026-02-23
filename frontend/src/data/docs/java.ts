import type { LanguageConfig } from './types';
import { JAVA_PART1_CATEGORIES } from './_java_part1';
import { JAVA_PART2_CATEGORIES } from './_java_part2';
import { JAVA_PART3_CATEGORIES } from './_java_part3';
import { JAVA_PART4_CATEGORIES } from './_java_part4';
import { JAVA_PART5_CATEGORIES } from './_java_part5';
import { JAVA_PART6_CATEGORIES } from './_java_part6';

export const java: LanguageConfig = {
  id: 'java',
  label: 'Java',
  icon: '☕',
  color: '#ED8B00',
  officialUrl: 'https://docs.oracle.com/en/java/',
  tagline: 'Write once, run anywhere',
  playgroundUrl: 'https://www.jdoodle.com/online-java-compiler/',
  executionApiId: 'java',
  categories: [
    ...JAVA_PART1_CATEGORIES,
    ...JAVA_PART2_CATEGORIES,
    ...JAVA_PART3_CATEGORIES,
    ...JAVA_PART4_CATEGORIES,
    ...JAVA_PART5_CATEGORIES,
    ...JAVA_PART6_CATEGORIES,
  ],
};
