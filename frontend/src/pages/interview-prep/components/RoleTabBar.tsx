import { cn } from '@/lib/utils';
import type { RoleConfig } from '@/data/interview-prep/types';

interface Props {
  roles: RoleConfig[];
  activeRoleId: string;
  onSelect: (roleId: string) => void;
}

export default function RoleTabBar({ roles, activeRoleId, onSelect }: Props) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-1 pb-0 scrollbar-none">
      {roles.map((role) => {
        const isActive = role.id === activeRoleId;
        return (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className={cn(
              'flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'border-current'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
            style={isActive ? { color: role.color } : undefined}
          >
            <span className="text-base">{role.icon}</span>
            <span className="hidden sm:inline">{role.label}</span>
            <span className="sm:hidden">{role.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
