import type { RoleConfig } from './types';
import { FRONTEND_PART1_TOPICS } from './_frontend_part1';
import { FRONTEND_PART2_TOPICS } from './_frontend_part2';

export const FRONTEND_ROLE: RoleConfig = {
  id: 'frontend',
  label: 'Frontend Developer',
  icon: '🎨',
  color: '#2563eb',
  tagline: 'HTML, CSS, JavaScript, TypeScript, React, and more',
  topics: [...FRONTEND_PART1_TOPICS, ...FRONTEND_PART2_TOPICS],
};
