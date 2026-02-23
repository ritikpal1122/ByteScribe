import { cn } from '@/lib/utils';

interface RoadmapProgressProps {
  completed: number;
  total: number;
  variant?: 'bar' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { circle: 64, stroke: 4, text: 'text-xs', bar: 'h-1.5' },
  md: { circle: 96, stroke: 6, text: 'text-sm', bar: 'h-2.5' },
  lg: { circle: 128, stroke: 8, text: 'text-base', bar: 'h-3.5' },
} as const;

function CircularProgress({
  completed,
  total,
  size = 'md',
  showLabel = true,
}: {
  completed: number;
  total: number;
  size: 'sm' | 'md' | 'lg';
  showLabel: boolean;
}) {
  const config = SIZE_MAP[size];
  const radius = (config.circle - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = total > 0 ? (completed / total) * 100 : 0;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.circle}
        height={config.circle}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          cx={config.circle / 2}
          cy={config.circle / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={config.circle / 2}
          cy={config.circle / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-600 transition-all duration-700 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold tabular-nums text-gray-900', config.text)}>
            {Math.round(percent)}%
          </span>
          <span className="text-[10px] text-gray-500">
            {completed}/{total}
          </span>
        </div>
      )}
    </div>
  );
}

function BarProgress({
  completed,
  total,
  size = 'md',
  showLabel = true,
}: {
  completed: number;
  total: number;
  size: 'sm' | 'md' | 'lg';
  showLabel: boolean;
}) {
  const config = SIZE_MAP[size];
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className={cn('font-medium text-gray-700', config.text)}>
            {completed} of {total} steps
          </span>
          <span className={cn('font-semibold tabular-nums text-blue-600', config.text)}>
            {Math.round(percent)}%
          </span>
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-gray-200', config.bar)}>
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function RoadmapProgress({
  completed,
  total,
  variant = 'circular',
  size = 'md',
  showLabel = true,
  className,
}: RoadmapProgressProps) {
  return (
    <div className={cn('inline-flex', variant === 'bar' && 'w-full', className)}>
      {variant === 'circular' ? (
        <CircularProgress
          completed={completed}
          total={total}
          size={size}
          showLabel={showLabel}
        />
      ) : (
        <BarProgress
          completed={completed}
          total={total}
          size={size}
          showLabel={showLabel}
        />
      )}
    </div>
  );
}
