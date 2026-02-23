import { Link } from 'react-router-dom';
import {
  Trophy,
  Flame,
  Zap,
  Code2,
  FileText,
  Calendar,
  TrendingUp,
  MessageCircle,
  Award,
  BookOpen,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useStats, useActivityHeatmap, useBadges } from '@/hooks/useGamification';
import { useMySheetProgress } from '@/hooks/useDSASheets';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function XPBar({ xp, xpToNext, level }: { xp: number; xpToNext: number; level: number }) {
  const pct = Math.min((xp / xpToNext) * 100, 100);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-gray-800">Level {level}</span>
        </div>
        <span className="text-sm text-gray-500">{xp.toLocaleString()} / {xpToNext.toLocaleString()} XP</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StreakCalendar({
  streakDays,
  activityDates,
}: {
  streakDays: number;
  activityDates: Set<string>;
}) {
  // Build 7 weeks (49 days) grid ending today
  const today = new Date();
  const weeks: { date: string; active: boolean }[][] = [];

  for (let w = 6; w >= 0; w--) {
    const week: { date: string; active: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + (6 - d);
      const date = new Date(today);
      date.setDate(today.getDate() - dayOffset);
      const dateStr = date.toISOString().split('T')[0];
      week.push({ date: dateStr, active: activityDates.has(dateStr) });
    }
    weeks.push(week);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-400" />
        <span className="font-semibold text-gray-800">Activity Streak</span>
        <span className="ml-auto text-sm font-bold text-orange-400">{streakDays} days</span>
      </div>
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={day.date}
                className={`w-4 h-4 rounded-sm ${day.active ? 'bg-blue-500' : 'bg-gray-100'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BadgeGrid({ badges }: { badges: { id: string; badge: { name: string; tier: string }; earned_at: string }[] }) {
  const tierColors: Record<string, string> = {
    bronze: 'text-orange-600 bg-orange-100',
    silver: 'text-gray-500 bg-gray-100',
    gold: 'text-amber-500 bg-amber-100',
    platinum: 'text-purple-500 bg-purple-100',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-400" />
        <span className="font-semibold text-gray-800">Badges</span>
        <span className="ml-auto text-xs text-gray-500">{badges.length} earned</span>
      </div>
      {badges.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No badges earned yet. Keep going!</p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {badges.map((ub) => (
            <div
              key={ub.id}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-gray-300 bg-gray-50/50"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tierColors[ub.badge.tier] || 'text-gray-400 bg-gray-100'}`}>
                <Award className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-gray-400 text-center">{ub.badge.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MyProfile page                                                     */
/* ------------------------------------------------------------------ */

export default function MyProfile() {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: heatmap } = useActivityHeatmap(7);
  const { data: badgesData } = useBadges();
  const { data: sheetProgress } = useMySheetProgress();

  if (!user) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  const xp = stats?.xp ?? 0;
  const level = Math.floor(xp / 250) + 1;
  const xpToNext = level * 250;
  const currentStreak = user.streak_days ?? 0;

  // Build activity dates set from heatmap data
  const activityDates = new Set(
    (heatmap || []).filter((d) => d.count > 0).map((d) => d.date),
  );

  const badges = badgesData?.items ?? [];

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Profile header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl font-bold text-blue-400">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.full_name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              (user.full_name || user.username).charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.full_name || user.username}</h1>
            <p className="text-gray-500">@{user.username}</p>
            {user.bio && <p className="text-gray-400 text-sm mt-1">{user.bio}</p>}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {joinedDate}</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {user.reputation ?? 0} rep</span>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        {statsLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" text="Loading stats..." />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Problems Solved', value: stats?.problems_solved ?? 0, icon: Code2, color: 'text-emerald-400' },
              { label: 'Day Streak', value: currentStreak, icon: Flame, color: 'text-orange-400' },
              { label: 'Articles Written', value: stats?.articles_written ?? 0, icon: FileText, color: 'text-sky-400' },
              { label: 'Answers Given', value: stats?.answers_given ?? 0, icon: MessageCircle, color: 'text-purple-400' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
                  <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <XPBar xp={xp} xpToNext={xpToNext} level={level} />
            <StreakCalendar streakDays={currentStreak} activityDates={activityDates} />
            <BadgeGrid badges={badges} />

            {/* DSA Sheet Progress */}
            {sheetProgress && sheetProgress.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-800">DSA Sheet Progress</span>
                </div>
                <div className="space-y-4">
                  {sheetProgress.map((sheet) => {
                    const pct = sheet.problem_count > 0
                      ? Math.round((sheet.completed_count / sheet.problem_count) * 100)
                      : 0;
                    return (
                      <Link
                        key={sheet.id}
                        to={`/sheets/${sheet.slug}`}
                        className="block group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                            {sheet.icon} {sheet.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {sheet.completed_count}/{sheet.problem_count}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 mt-0.5 block">{pct}% complete</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right column: stats summary */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                <span className="font-semibold text-gray-800">Stats Summary</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total XP</span>
                  <span className="text-sm font-semibold text-gray-800">{xp.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Reputation</span>
                  <span className="text-sm font-semibold text-gray-800">{(stats?.reputation ?? user.reputation ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Badges Earned</span>
                  <span className="text-sm font-semibold text-gray-800">{stats?.badge_count ?? badges.length}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Problems Solved</span>
                  <span className="text-sm font-semibold text-gray-800">{(stats?.problems_solved ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Level</span>
                  <span className="text-sm font-semibold text-amber-500">Level {level}</span>
                </div>
              </div>
            </div>

            {user.github_username && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800 text-sm">GitHub</span>
                </div>
                <a
                  href={`https://github.com/${user.github_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  github.com/{user.github_username}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
