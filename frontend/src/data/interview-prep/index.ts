import type { RoleConfig } from './types';
import { FRONTEND_ROLE } from './frontend';
import { BACKEND_ROLE } from './backend';
import { FULLSTACK_ROLE } from './fullstack';
import { DEVOPS_ROLE } from './devops';
import { SDET_ROLE } from './sdet';
import { SQL_ROLE } from './sql';
import { SYSTEM_DESIGN_ROLE } from './system_design';

export const ALL_ROLES: RoleConfig[] = [
  FRONTEND_ROLE,
  BACKEND_ROLE,
  FULLSTACK_ROLE,
  DEVOPS_ROLE,
  SDET_ROLE,
  SQL_ROLE,
  SYSTEM_DESIGN_ROLE,
];

export function getRole(id: string): RoleConfig | undefined {
  return ALL_ROLES.find((r) => r.id === id);
}

export function getTotalQuestionCount(): number {
  return ALL_ROLES.reduce(
    (sum, role) =>
      sum + role.topics.reduce((s, t) => s + t.questions.length, 0),
    0
  );
}
