import { useMemo, useState, useEffect } from 'react';
import {
  TrendingUp,
  Code2,
  Flame,
  Award,
  Calendar,
  BarChart3,
  Target,
  ArrowUpRight,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useStats, useActivityHeatmap, useStreak } from '@/hooks/useGamification';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

/* ------------------------------------------------------------------ */
/*  StatCard — gradient tinted with hover elevation                    */
/* ------------------------------------------------------------------ */

const statGradients: Record<string, string> = {
  blue: 'from-blue-500/10 to-blue-600/5',
  amber: 'from-amber-500/10 to-amber-600/5',
  orange: 'from-orange-500/10 to-orange-600/5',
  purple: 'from-purple-500/10 to-purple-600/5',
  green: 'from-green-500/10 to-green-600/5',
  indigo: 'from-indigo-500/10 to-indigo-600/5',
  teal: 'from-teal-500/10 to-teal-600/5',
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  tint,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
  tint: string;
  delay?: number;
}) {
  return (
    <div
      className={`animate-fade-in-up rounded-xl bg-gradient-to-br ${statGradients[tint] ?? 'from-gray-500/10 to-gray-600/5'} border border-gray-200/60 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2 ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm text-gray-500 font-medium">{label}</span>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
      </div>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GitHub-style Calendar Heatmap with hover tooltips                   */
/* ------------------------------------------------------------------ */

function GitHubHeatmap({
  data,
}: {
  data: { date: string; count: number }[];
}) {
  const [hovered, setHovered] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const { weeks, monthLabels, maxCount, totalContributions } = useMemo(() => {
    const countMap = new Map<string, number>();
    data.forEach((d) => countMap.set(d.date, d.count));

    const today = new Date();
    const days: { date: string; count: number; dow: number }[] = [];

    const start = new Date(today);
    start.setDate(start.getDate() - 52 * 7);
    start.setDate(start.getDate() - start.getDay());

    const cursor = new Date(start);
    while (cursor <= today) {
      const iso = cursor.toISOString().split('T')[0];
      days.push({
        date: iso,
        count: countMap.get(iso) ?? 0,
        dow: cursor.getDay(),
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    const weeks: { date: string; count: number; dow: number }[][] = [];
    let currentWeek: typeof days = [];
    for (const day of days) {
      if (day.dow === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    const monthLabels: { label: string; col: number }[] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;
    weeks.forEach((week, colIdx) => {
      const firstDay = week[0];
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: months[month], col: colIdx });
        lastMonth = month;
      }
    });

    const maxCount = Math.max(...days.map((d) => d.count), 1);
    const totalContributions = days.reduce((sum, d) => sum + d.count, 0);

    return { weeks, monthLabels, maxCount, totalContributions };
  }, [data]);

  function intensity(count: number): string {
    if (count === 0) return 'bg-gray-100';
    const pct = count / maxCount;
    if (pct < 0.2) return 'bg-green-200';
    if (pct < 0.4) return 'bg-green-300';
    if (pct < 0.6) return 'bg-green-400';
    if (pct < 0.8) return 'bg-green-500';
    return 'bg-green-700';
  }

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const cellSize = 13;
  const cellGap = 3;

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
  }

  return (
    <div className="relative overflow-x-auto">
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold text-gray-900">{totalContributions}</span> contributions in the last year
      </p>
      <div className="inline-block">
        {/* Month labels */}
        <div className="flex ml-8 mb-1" style={{ gap: `${cellGap}px` }}>
          {weeks.map((_, colIdx) => {
            const ml = monthLabels.find((m) => m.col === colIdx);
            return (
              <div
                key={colIdx}
                className="text-[10px] text-gray-400"
                style={{ width: `${cellSize}px`, textAlign: 'left' }}
              >
                {ml?.label ?? ''}
              </div>
            );
          })}
        </div>

        {/* Grid */}
        <div className="flex">
          <div className="flex flex-col mr-1" style={{ gap: `${cellGap}px` }}>
            {dayLabels.map((label, i) => (
              <div
                key={i}
                className="text-[10px] text-gray-400 flex items-center justify-end pr-1"
                style={{ height: `${cellSize}px`, width: '28px' }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex" style={{ gap: `${cellGap}px` }}>
            {weeks.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col" style={{ gap: `${cellGap}px` }}>
                {Array.from({ length: 7 }, (_, dow) => {
                  const day = week.find((d) => d.dow === dow);
                  if (!day) {
                    return (
                      <div
                        key={dow}
                        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                      />
                    );
                  }
                  return (
                    <div
                      key={dow}
                      className={`rounded-sm ${intensity(day.count)} hover:brightness-110 hover:ring-1 hover:ring-gray-300 transition-all cursor-pointer`}
                      style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const parent = e.currentTarget.closest('.relative')?.getBoundingClientRect();
                        if (parent) {
                          setHovered({
                            date: day.date,
                            count: day.count,
                            x: rect.left - parent.left + rect.width / 2,
                            y: rect.top - parent.top - 8,
                          });
                        }
                      }}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 ml-8">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="h-3 w-3 rounded-sm bg-gray-100" />
            <div className="h-3 w-3 rounded-sm bg-green-200" />
            <div className="h-3 w-3 rounded-sm bg-green-300" />
            <div className="h-3 w-3 rounded-sm bg-green-400" />
            <div className="h-3 w-3 rounded-sm bg-green-500" />
            <div className="h-3 w-3 rounded-sm bg-green-700" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium shadow-lg whitespace-nowrap"
          style={{
            left: `${hovered.x}px`,
            top: `${hovered.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <span className="font-bold">{hovered.count} {hovered.count === 1 ? 'activity' : 'activities'}</span>
          {' '}on {formatDate(hovered.date)}
          <div
            className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45"
            style={{ transform: 'translateX(-50%) rotate(45deg)' }}
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Difficulty Distribution Donut — animated on mount                  */
/* ------------------------------------------------------------------ */

function DifficultyDonut({
  byDifficulty,
}: {
  byDifficulty: Record<string, number>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const easy = byDifficulty.easy ?? 0;
  const medium = byDifficulty.medium ?? 0;
  const hard = byDifficulty.hard ?? 0;
  const total = easy + medium + hard;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-gray-400">
        No solved problems yet
      </div>
    );
  }

  const easyPct = (easy / total) * 100;
  const medPct = (medium / total) * 100;
  const hardPct = (hard / total) * 100;

  const gradient = `conic-gradient(
    #10b981 0% ${easyPct}%,
    #f59e0b ${easyPct}% ${easyPct + medPct}%,
    #ef4444 ${easyPct + medPct}% 100%
  )`;

  return (
    <div
      className={`flex items-center gap-8 transition-all duration-500 ${
        mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    >
      {/* Donut */}
      <div className="relative shrink-0" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))' }}>
        <div
          className="rounded-full"
          style={{
            width: '140px',
            height: '140px',
            background: gradient,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full bg-white flex items-center justify-center"
              style={{ width: '90px', height: '90px', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)' }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{total}</p>
                <p className="text-[10px] text-gray-500">Solved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 min-w-[120px]">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="text-sm text-gray-600">Easy</span>
          <span className="text-sm font-semibold text-gray-900 ml-auto">{easy}</span>
          <span className="text-xs text-gray-400">({easyPct.toFixed(0)}%)</span>
        </div>
        <div className="flex items-center gap-3 min-w-[120px]">
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="text-sm text-gray-600">Medium</span>
          <span className="text-sm font-semibold text-gray-900 ml-auto">{medium}</span>
          <span className="text-xs text-gray-400">({medPct.toFixed(0)}%)</span>
        </div>
        <div className="flex items-center gap-3 min-w-[120px]">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600">Hard</span>
          <span className="text-sm font-semibold text-gray-900 ml-auto">{hard}</span>
          <span className="text-xs text-gray-400">({hardPct.toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Language Breakdown — animated bars with gradient fills + tooltip    */
/* ------------------------------------------------------------------ */

const LANG_GRADIENTS: Record<string, string> = {
  python: 'from-blue-400 to-blue-600',
  javascript: 'from-yellow-400 to-amber-500',
  typescript: 'from-blue-500 to-blue-700',
  java: 'from-orange-400 to-orange-600',
  cpp: 'from-purple-400 to-purple-600',
  c: 'from-gray-500 to-gray-700',
  go: 'from-cyan-400 to-cyan-600',
  rust: 'from-red-500 to-red-700',
};

function LanguageBreakdown({
  byLanguage,
}: {
  byLanguage: Record<string, number>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const entries = Object.entries(byLanguage).sort(([, a], [, b]) => b - a);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-400">
        No submissions yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(([lang, count], idx) => {
        const pct = (count / total) * 100;
        const gradient = LANG_GRADIENTS[lang] ?? 'from-gray-400 to-gray-500';
        return (
          <div key={lang} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-700 capitalize">{lang}</span>
              <span className="text-xs text-gray-500 font-medium">
                {count} ({pct.toFixed(1)}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
                style={{
                  width: mounted ? `${pct}%` : '0%',
                  transitionDelay: `${idx * 150}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Acceptance Rate Ring — stroke-draw animation + glow                */
/* ------------------------------------------------------------------ */

function AcceptanceRing({
  accepted,
  total,
}: {
  accepted: number;
  total: number;
}) {
  const rate = total > 0 ? (accepted / total) * 100 : 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rate / 100) * circumference;

  const color = rate >= 70 ? '#10b981' : rate >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="10"
          />
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 65 65)"
            className="animate-stroke-draw"
            style={{
              '--circumference': circumference,
              filter: `drop-shadow(0 0 6px ${color})`,
            } as React.CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-gray-900">{rate.toFixed(1)}%</p>
            <p className="text-[10px] text-gray-500">Acceptance</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <p className="text-gray-500">Accepted</p>
          <p className="font-bold text-gray-900 text-lg">{accepted}</p>
        </div>
        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-bold text-gray-900 text-lg">{total}</p>
        </div>
        <p className="text-xs text-gray-400">{accepted} of {total} accepted</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard                                                     */
/* ------------------------------------------------------------------ */

export default function AnalyticsDashboard() {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: heatmap, isLoading: heatmapLoading } = useActivityHeatmap(52);
  const { data: streak } = useStreak();

  if (statsLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-7 w-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        </div>
        <p className="text-gray-500">
          Track your progress and coding activity.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Code2}
          label="Problems Solved"
          value={stats?.problems_solved ?? 0}
          color="bg-blue-50 text-blue-600"
          tint="blue"
          delay={0}
        />
        <StatCard
          icon={TrendingUp}
          label="Total XP"
          value={(stats?.xp ?? 0).toLocaleString()}
          color="bg-amber-50 text-amber-600"
          tint="amber"
          delay={80}
        />
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`${streak?.current_streak ?? 0} days`}
          color="bg-orange-50 text-orange-600"
          tint="orange"
          delay={160}
        />
        <StatCard
          icon={Award}
          label="Badges Earned"
          value={stats?.badge_count ?? 0}
          color="bg-purple-50 text-purple-600"
          tint="purple"
          delay={240}
        />
      </div>

      {/* Additional stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Target}
          label="Reputation"
          value={(stats?.reputation ?? 0).toLocaleString()}
          color="bg-green-50 text-green-600"
          tint="green"
          delay={320}
        />
        <StatCard
          icon={Calendar}
          label="Articles Written"
          value={stats?.articles_written ?? 0}
          color="bg-indigo-50 text-indigo-600"
          tint="indigo"
          delay={400}
        />
        <StatCard
          icon={TrendingUp}
          label="Answers Given"
          value={stats?.answers_given ?? 0}
          color="bg-teal-50 text-teal-600"
          tint="teal"
          delay={480}
        />
      </div>

      {/* GitHub-style Activity Heatmap */}
      <div className="rounded-xl border border-gray-200/60 bg-white p-6 mb-6 shadow-sm animate-fade-in-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Activity Heatmap
        </h2>
        {heatmapLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : heatmap?.length ? (
          <GitHubHeatmap data={heatmap} />
        ) : (
          <p className="text-sm text-gray-400 py-8 text-center">
            No activity data yet. Start solving problems!
          </p>
        )}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Difficulty Distribution */}
        <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-sm animate-fade-in-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Difficulty Distribution
          </h2>
          <DifficultyDonut byDifficulty={stats?.by_difficulty ?? {}} />
        </div>

        {/* Acceptance Rate */}
        <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-sm animate-fade-in-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Acceptance Rate
          </h2>
          <AcceptanceRing
            accepted={stats?.total_accepted ?? 0}
            total={stats?.total_submissions ?? 0}
          />
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="rounded-xl border border-gray-200/60 bg-white p-6 mb-6 shadow-sm animate-fade-in-up" style={{ '--delay': '500ms' } as React.CSSProperties}>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Language Breakdown
        </h2>
        <LanguageBreakdown byLanguage={stats?.by_language ?? {}} />
      </div>

      {/* Streak info */}
      {streak && (
        <div
          className="rounded-xl border border-gray-200/60 bg-gradient-to-br from-orange-50/50 to-amber-50/30 p-6 shadow-sm animate-fade-in-up"
          style={{ '--delay': '600ms' } as React.CSSProperties}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Streak Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg bg-orange-100 p-3 ${(streak.current_streak ?? 0) > 7 ? 'animate-fire-pulse' : ''}`}>
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-xl font-bold text-gray-900">
                  {streak.current_streak} days
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-100 p-3">
                <Award className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Longest Streak</p>
                <p className="text-xl font-bold text-gray-900">
                  {streak.longest_streak} days
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
