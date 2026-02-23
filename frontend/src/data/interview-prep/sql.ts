import type { RoleConfig } from './types';
import { SQL_PART1_TOPICS } from './_sql_part1';
import { SQL_PART2_TOPICS } from './_sql_part2';

export const SQL_ROLE: RoleConfig = {
  id: 'sql',
  label: 'SQL Developer',
  icon: '🗄️',
  color: '#ea580c',
  tagline: 'Queries, joins, indexing, transactions, and database administration',
  topics: [...SQL_PART1_TOPICS, ...SQL_PART2_TOPICS],
};
