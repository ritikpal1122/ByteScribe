import type { RoleConfig } from './types';
import { SDET_PART1_TOPICS } from './_sdet_part1';
import { SDET_PART2_TOPICS } from './_sdet_part2';

export const SDET_ROLE: RoleConfig = {
  id: 'sdet',
  label: 'SDET',
  icon: '🧪',
  color: '#0891b2',
  tagline: 'Testing Strategy, Automation, Performance, Security, and more',
  topics: [...SDET_PART1_TOPICS, ...SDET_PART2_TOPICS],
};
