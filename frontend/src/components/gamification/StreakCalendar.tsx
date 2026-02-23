import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ActivityEntry {
  date: string; // YYYY-MM-DD
  count: number;
}

interface StreakCalendarProps {
  activities: ActivityEntry[];
  months?: number;
  className?: string;
}

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''] as const;

const INTENSITY_CLASSES = [
  'bg-gray-100', // 0 activity
  'bg-emerald-200', // low
  'bg-emerald-400', // medium
  'bg-emerald-500', // high
  'bg-emerald-700', // very high
] as const;

function getIntensityLevel(count: number, maxCount: number): number {
  if (count === 0) return 0;
  if (maxCount === 0) return 0;
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function getWeeksInRange(startDate: Date, endDate: Date): Date[][] {
  const weeks: Date[][] = [];
  const current = new Date(startDate);

  // Align to start of week (Sunday)
  current.setDate(current.getDate() - current.getDay());

  while (current <= endDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function StreakCalendar({
  activities,
  months = 12,
  className,
}: StreakCalendarProps) {
  const { weeks, activityMap, maxCount, monthLabels } = useMemo(() => {
    // Build activity map
    const map = new Map<string, number>();
    let max = 0;
    for (const entry of activities) {
      map.set(entry.date, entry.count);
      if (entry.count > max) max = entry.count;
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    startDate.setDate(1);

    const allWeeks = getWeeksInRange(startDate, endDate);

    // Build month labels with positions
    const labels: { label: string; position: number }[] = [];
    let lastMonth = -1;
    allWeeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0];
      const month = firstDayOfWeek.getMonth();
      if (month !== lastMonth) {
        labels.push({
          label: firstDayOfWeek.toLocaleDateString('en-US', { month: 'short' }),
          position: weekIndex,
        });
        lastMonth = month;
      }
    });

    return { weeks: allWeeks, activityMap: map, maxCount: max, monthLabels: labels };
  }, [activities, months]);

  const totalActivity = activities.reduce((sum, a) => sum + a.count, 0);

  return (
    <div className={cn('space-y-2', className)}>
      {/* Calendar grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          {/* Month labels */}
          <div className="flex">
            <div className="w-8 shrink-0" />
            <div className="relative flex">
              {monthLabels.map((ml, i) => (
                <span
                  key={i}
                  className="absolute text-xs text-gray-500"
                  style={{ left: `${ml.position * 14}px` }}
                >
                  {ml.label}
                </span>
              ))}
            </div>
          </div>

          {/* Day rows */}
          <div className="mt-4 flex gap-[2px]">
            {/* Day labels */}
            <div className="flex w-8 shrink-0 flex-col gap-[2px]">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="flex h-[12px] items-center text-[10px] text-gray-400"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => {
                  const dateStr = formatDate(day);
                  const count = activityMap.get(dateStr) ?? 0;
                  const level = getIntensityLevel(count, maxCount);
                  const isToday = dateStr === formatDate(new Date());

                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        'h-[12px] w-[12px] rounded-sm transition-colors',
                        INTENSITY_CLASSES[level],
                        isToday && 'ring-1 ring-gray-400'
                      )}
                      title={`${day.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}: ${count} ${count === 1 ? 'activity' : 'activities'}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {totalActivity.toLocaleString()} total activities
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Less</span>
          {INTENSITY_CLASSES.map((cls, i) => (
            <div
              key={i}
              className={cn('h-[12px] w-[12px] rounded-sm', cls)}
            />
          ))}
          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>
    </div>
  );
}
