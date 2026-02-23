import type { RoleConfig } from './types';
import { DEVOPS_PART1_TOPICS } from './_devops_part1';
import { DEVOPS_PART2_TOPICS } from './_devops_part2';

export const DEVOPS_ROLE: RoleConfig = {
  id: 'devops',
  label: 'DevOps',
  icon: '🚀',
  color: '#ea580c',
  tagline: 'CI/CD, Docker, Kubernetes, Cloud, and more',
  topics: [...DEVOPS_PART1_TOPICS, ...DEVOPS_PART2_TOPICS],
};
