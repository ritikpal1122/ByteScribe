import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPBarProps {
  xp: number;
  level?: number;
  className?: string;
}

function getXPForLevel(level: number): number {
  // Each level requires progressively more XP: 100, 250, 450, 700, 1000, ...
  return Math.floor(100 * Math.pow(level, 1.5));
}

function getLevelFromXP(xp: number): { level: number; currentLevelXP: number; nextLevelXP: number } {
  let level = 1;
  let accumulated = 0;

  while (true) {
    const needed = getXPForLevel(level);
    if (accumulated + needed > xp) {
      return {
        level,
        currentLevelXP: xp - accumulated,
        nextLevelXP: needed,
      };
    }
    accumulated += needed;
    level++;
  }
}

export function XPBar({ xp, level: overrideLevel, className }: XPBarProps) {
  const computed = getLevelFromXP(xp);
  const level = overrideLevel ?? computed.level;
  const currentLevelXP = computed.currentLevelXP;
  const nextLevelXP = computed.nextLevelXP;
  const percent = nextLevelXP > 0 ? (currentLevelXP / nextLevelXP) * 100 : 0;

  return (
    <div className={cn('space-y-2', className)}>
      {/* Level and XP display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <Zap className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900">
              Level {level}
            </span>
          </div>
        </div>
        <span className="text-sm tabular-nums text-gray-500">
          {currentLevelXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        >
          {/* Animated shimmer */}
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      {/* Total XP */}
      <p className="text-xs text-gray-500">
        Total XP: <span className="font-semibold tabular-nums text-gray-700">{xp.toLocaleString()}</span>
      </p>
    </div>
  );
}
