import type { RoleConfig } from './types';
import { BACKEND_PART1_TOPICS } from './_backend_part1';
import { BACKEND_PART2_TOPICS } from './_backend_part2';

export const BACKEND_ROLE: RoleConfig = {
  id: 'backend',
  label: 'Backend Developer',
  icon: '⚙️',
  color: '#059669',
  tagline: 'APIs, Databases, System Design, Security, and more',
  topics: [...BACKEND_PART1_TOPICS, ...BACKEND_PART2_TOPICS],
};
