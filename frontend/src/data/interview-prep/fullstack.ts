import type { RoleConfig } from './types';
import { FULLSTACK_PART1_TOPICS } from './_fullstack_part1';
import { FULLSTACK_PART2_TOPICS } from './_fullstack_part2';

export const FULLSTACK_ROLE: RoleConfig = {
  id: 'fullstack',
  label: 'Full Stack Developer',
  icon: '🔗',
  color: '#7c3aed',
  tagline: 'Architecture, Auth, Data Flow, Deployment, and more',
  topics: [...FULLSTACK_PART1_TOPICS, ...FULLSTACK_PART2_TOPICS],
};
