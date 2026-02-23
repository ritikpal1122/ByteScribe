import type { LanguageConfig } from './types';
import { RUST_PART1_CATEGORIES } from './_rust_part1';
import { RUST_PART2_CATEGORIES } from './_rust_part2';
import { RUST_PART3_CATEGORIES } from './_rust_part3';
import { RUST_PART4_CATEGORIES } from './_rust_part4';
import { RUST_PART5_CATEGORIES } from './_rust_part5';
import { RUST_PART6_CATEGORIES } from './_rust_part6';
import { RUST_PART7_CATEGORIES } from './_rust_part7';
import { RUST_PART8_CATEGORIES } from './_rust_part8';

export const rust: LanguageConfig = {
  id: 'rust',
  label: 'Rust',
  icon: '🦀',
  color: '#DEA584',
  officialUrl: 'https://doc.rust-lang.org/book/',
  tagline: 'Reliable and efficient systems language',
  playgroundUrl: 'https://play.rust-lang.org/',
  executionApiId: 'rust',
  categories: [
    ...RUST_PART1_CATEGORIES,
    ...RUST_PART2_CATEGORIES,
    ...RUST_PART3_CATEGORIES,
    ...RUST_PART4_CATEGORIES,
    ...RUST_PART5_CATEGORIES,
    ...RUST_PART6_CATEGORIES,
    ...RUST_PART7_CATEGORIES,
    ...RUST_PART8_CATEGORIES,
  ],
};
