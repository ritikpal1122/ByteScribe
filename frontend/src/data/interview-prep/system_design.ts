import type { RoleConfig } from './types';
import { SD_PART1_TOPICS } from './_system_design_part1';
import { SD_PART2_TOPICS } from './_system_design_part2';

export const SYSTEM_DESIGN_ROLE: RoleConfig = {
  id: 'system-design',
  label: 'System Design',
  icon: '🏗️',
  color: '#7c3aed',
  tagline: 'Scalability, distributed systems, caching, and real-world architectures',
  topics: [...SD_PART1_TOPICS, ...SD_PART2_TOPICS],
};
