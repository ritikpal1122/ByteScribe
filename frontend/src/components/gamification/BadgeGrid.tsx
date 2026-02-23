import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserBadge, Badge } from '@/types/gamification';

interface BadgeItem {
  badge: Badge;
  earned_at?: string;
}

interface BadgeGridProps {
  badges: BadgeItem[];
  className?: string;
}

const TIER_STYLES = {
  bronze: {
    ring: 'ring-amber-700/40',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    label: 'text-amber-700',
  },
  silver: {
    ring: 'ring-gray-400/40',
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    label: 'text-gray-600',
  },
  gold: {
    ring: 'ring-yellow-500/40',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    label: 'text-yellow-700',
  },
  platinum: {
    ring: 'ring-blue-500/40',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    label: 'text-blue-700',
  },
} as const;

function BadgeCard({ badge, earned_at }: BadgeItem) {
  const isLocked = !earned_at;
  const tierStyle = TIER_STYLES[badge.tier];

  return (
    <div
      className={cn(
        'relative flex flex-col items-center rounded-xl border p-4 text-center transition-shadow',
        isLocked
          ? 'border-gray-200 bg-gray-50 opacity-60'
          : cn(tierStyle.border, tierStyle.bg, 'shadow-sm hover:shadow-md')
      )}
    >
      {/* Badge icon */}
      <div
        className={cn(
          'relative flex h-16 w-16 items-center justify-center rounded-full',
          isLocked
            ? 'bg-gray-200'
            : cn('ring-2', tierStyle.ring, 'bg-white')
        )}
      >
        {isLocked ? (
          <Lock className="h-6 w-6 text-gray-400" />
        ) : (
          <img
            src={badge.icon_url}
            alt={badge.name}
            className="h-10 w-10 object-contain"
          />
        )}
      </div>

      {/* Badge name */}
      <h3
        className={cn(
          'mt-3 text-sm font-semibold',
          isLocked
            ? 'text-gray-500'
            : 'text-gray-900'
        )}
      >
        {badge.name}
      </h3>

      {/* Description */}
      <p className="mt-1 text-xs text-gray-500">
        {badge.description}
      </p>

      {/* Tier label */}
      <span
        className={cn(
          'mt-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
          isLocked
            ? 'bg-gray-200 text-gray-500'
            : cn(tierStyle.bg, tierStyle.label)
        )}
      >
        {badge.tier}
      </span>

      {/* Earned date */}
      {earned_at && (
        <p className="mt-2 text-[10px] text-gray-400">
          Earned {new Date(earned_at).toLocaleDateString()}
        </p>
      )}

      {/* Locked requirement */}
      {isLocked && (
        <p className="mt-2 text-[10px] italic text-gray-400">
          {badge.requirement_description}
        </p>
      )}
    </div>
  );
}

export function BadgeGrid({ badges, className }: BadgeGridProps) {
  // Sort: earned first, then by tier (platinum > gold > silver > bronze)
  const tierOrder = { platinum: 0, gold: 1, silver: 2, bronze: 3 };
  const sorted = [...badges].sort((a, b) => {
    const aEarned = a.earned_at ? 0 : 1;
    const bEarned = b.earned_at ? 0 : 1;
    if (aEarned !== bEarned) return aEarned - bEarned;
    return tierOrder[a.badge.tier] - tierOrder[b.badge.tier];
  });

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className
      )}
    >
      {sorted.map((item) => (
        <BadgeCard
          key={item.badge.id}
          badge={item.badge}
          earned_at={item.earned_at}
        />
      ))}
    </div>
  );
}
