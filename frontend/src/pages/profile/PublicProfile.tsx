import { useParams, Link } from 'react-router-dom';
import {
  Trophy,
  Flame,
  Zap,
  Code2,
  FileText,
  Calendar,
  TrendingUp,
  Github,
  Award,
  BookOpen,
} from 'lucide-react';
import { usePublicProfile } from '@/hooks/useUsers';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

/* ------------------------------------------------------------------ */
/*  PublicProfile page                                                 */
/* ------------------------------------------------------------------ */

export default function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading, isError } = usePublicProfile(username || '');

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen text-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-gray-500">The profile you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const xp = profile.xp ?? 0;
  const level = Math.floor(xp / 250) + 1;

  const activityDatesSet = new Set(profile.activity_dates || []);

  // Build 12 weeks grid from activity dates
  const today = new Date();
  const weeks: { date: string; active: boolean }[][] = [];
  for (let w = 11; w >= 0; w--) {
    const week: { date: string; active: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = w * 7 + (6 - d);
      const date = new Date(today);
      date.setDate(today.getDate() - dayOffset);
      const dateStr = date.toISOString().split('T')[0];
      week.push({ date: dateStr, active: activityDatesSet.has(dateStr) });
    }
    weeks.push(week);
  }

  const joinedDate = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : '';

  const tierColors: Record<string, string> = {
    bronze: 'text-orange-600 bg-orange-100',
    silver: 'text-gray-500 bg-gray-100',
    gold: 'text-amber-500 bg-amber-100',
    platinum: 'text-purple-500 bg-purple-100',
  };

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Profile header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center text-4xl font-bold text-blue-400 shrink-0">
            {(profile.display_name || profile.username).charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{profile.display_name || profile.username}</h1>
            <p className="text-gray-500 mb-2">@{profile.username}</p>
            {profile.bio && (
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{profile.bio}</p>
            )}

            <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {joinedDate}</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {profile.reputation ?? 0} rep</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Level {level}</span>
              {profile.github_username && (
                <a href={`https://github.com/${profile.github_username}`} className="flex items-center gap-1 text-gray-400 hover:text-gray-800 transition-colors">
                  <Github className="w-3.5 h-3.5" /> {profile.github_username}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Problems Solved', value: profile.problems_solved ?? 0, icon: Code2, color: 'text-emerald-400' },
            { label: 'Day Streak', value: profile.streak?.current_streak ?? 0, icon: Flame, color: 'text-orange-400' },
            { label: 'Articles Written', value: profile.articles_written ?? 0, icon: FileText, color: 'text-sky-400' },
            { label: 'Reputation', value: profile.reputation ?? 0, icon: Trophy, color: 'text-amber-400' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Streak heatmap */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="font-semibold text-gray-800">Contribution Activity</span>
            {profile.streak && (
              <span className="ml-auto text-xs text-gray-500">
                Longest streak: {profile.streak.longest_streak} days
              </span>
            )}
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day.date}
                    className={`w-3.5 h-3.5 rounded-sm ${day.active ? 'bg-blue-500' : 'bg-gray-100'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* DSA Sheet Progress */}
        {profile.sheet_progress && profile.sheet_progress.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-800">DSA Sheet Progress</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.sheet_progress.map((sheet: { id: string; name: string; slug: string; icon: string; problem_count: number; completed_count: number }) => {
                const pct = sheet.problem_count > 0
                  ? Math.round((sheet.completed_count / sheet.problem_count) * 100)
                  : 0;
                return (
                  <Link
                    key={sheet.id}
                    to={`/sheets/${sheet.slug}`}
                    className="block group p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badges */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Badges
              <span className="ml-auto text-xs text-gray-500">{profile.badges?.length ?? 0} earned</span>
            </h3>
            {profile.badges && profile.badges.length > 0 ? (
              <div className="grid grid-cols-4 gap-3">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-1.5 p-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tierColors[badge.tier] || 'text-gray-400 bg-gray-100'}`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-gray-400 text-center">{badge.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No badges earned yet.</p>
            )}
          </div>

          {/* Streak details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Streak Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Current Streak</span>
                <span className="text-sm font-semibold text-orange-500">{profile.streak?.current_streak ?? 0} days</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Longest Streak</span>
                <span className="text-sm font-semibold text-gray-800">{profile.streak?.longest_streak ?? 0} days</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Total XP</span>
                <span className="text-sm font-semibold text-gray-800">{xp.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Level</span>
                <span className="text-sm font-semibold text-amber-500">Level {level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
