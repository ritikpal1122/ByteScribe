import type { LanguageConfig } from './types';
import { GIT_PART1_CATEGORIES } from './_git_part1';
import { GIT_PART2_CATEGORIES } from './_git_part2';
import { GIT_PART3_CATEGORIES } from './_git_part3';
import { GIT_PART4A_CATEGORIES } from './_git_part4_a';
import { GIT_PART4B_CATEGORIES } from './_git_part4_b';
import { GIT_PART4C_CATEGORIES } from './_git_part4_c';

export const git: LanguageConfig = {
  id: 'git',
  label: 'Git',
  icon: '\u{1F500}',
  color: '#F05032',
  officialUrl: 'https://git-scm.com/doc',
  tagline: 'Distributed version control for every project',
  categories: [
    ...GIT_PART1_CATEGORIES,   // Getting Started, Basic Commands
    ...GIT_PART2_CATEGORIES,   // Branching & Merging, Remote Operations
    ...GIT_PART3_CATEGORIES,   // Undoing Changes, Advanced Git
    ...GIT_PART4A_CATEGORIES,  // Tags, Hooks & Automation
    ...GIT_PART4B_CATEGORIES,  // Git Internals & Workflows
    ...GIT_PART4C_CATEGORIES,  // Collaboration
  ],
};
