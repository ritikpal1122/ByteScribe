import { useState } from 'react';
import {
  Trophy,
  Medal,
  Flame,
  Zap,
  Code2,
  Crown,
} from 'lucide-react';
import { useLeaderboard } from '@/hooks/useGamification';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import type { LeaderboardEntry } from '@/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Period = 'daily' | 'weekly' | 'monthly' | 'all_time';

/* ------------------------------------------------------------------ */
/*  LeaderboardTable                                                   */
/* ------------------------------------------------------------------ */

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-amber-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-700" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-sm font-mono text-gray-500 w-5 text-center">{rank}</span>;
}

function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase tracking-wide">
            <th className="py-3 px-4 w-16">Rank</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4 w-24 text-right">Reputation</th>
            <th className="py-3 px-4 w-24 text-right hidden md:table-cell">Solved</th>
            <th className="py-3 px-4 w-20 text-right hidden md:table-cell">Streak</th>
            <th className="py-3 px-4 w-20 text-right hidden sm:table-cell">Badges</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.user_id}
              className={`border-b border-gray-200/60 transition-colors ${
                entry.rank <= 3 ? 'bg-gray-50' : 'hover:bg-gray-100/40'
              }`}
            >
              <td className="py-3 px-4">
                <RankBadge rank={entry.rank} />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  {entry.avatar_url ? (
                    <img src={entry.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank === 1 ? 'bg-amber-400/20 text-amber-400' :
                      entry.rank === 2 ? 'bg-gray-400/20 text-gray-700' :
                      entry.rank === 3 ? 'bg-amber-600/20 text-amber-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {entry.full_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{entry.full_name}</p>
                    <p className="text-xs text-gray-500">@{entry.username}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="flex items-center justify-end gap-1 font-semibold text-amber-400">
                  <Zap className="w-3.5 h-3.5" />
                  {entry.reputation.toLocaleString()}
                </span>
              </td>
              <td className="py-3 px-4 text-right hidden md:table-cell">
                <span className="flex items-center justify-end gap-1 text-gray-400">
                  <Code2 className="w-3.5 h-3.5 text-gray-600" />
                  {entry.problems_solved}
                </span>
              </td>
              <td className="py-3 px-4 text-right hidden md:table-cell">
                <span className="flex items-center justify-end gap-1 text-orange-400">
                  <Flame className="w-3.5 h-3.5" />
                  {entry.streak_days}
                </span>
              </td>
              <td className="py-3 px-4 text-right hidden sm:table-cell text-gray-400">
                {entry.badge_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Leaderboard page                                                   */
/* ------------------------------------------------------------------ */

export default function Leaderboard() {
  const [period, setPeriod] = useState<Period>('weekly');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useLeaderboard(page, 20, period);

  const periods: { value: Period; label: string }[] = [
    { value: 'daily', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'all_time', label: 'All Time' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading leaderboard..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load leaderboard.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const entries = data?.items ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-7 h-7 text-amber-400" />
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        </div>
        <p className="text-gray-500 mb-8">See how you stack up against other learners.</p>

        {/* Period filter */}
        <div className="flex items-center gap-1 bg-white rounded-lg p-1 mb-8 w-fit">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => { setPeriod(p.value); setPage(1); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                period === p.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No entries yet"
            description="Be the first to earn a spot on the leaderboard!"
          />
        ) : (
          <>
            {/* Top 3 podium */}
            {entries.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[entries[1], entries[0], entries[2]].map((entry, idx) => {
                  const podiumOrder = [2, 1, 3];
                  const isFirst = podiumOrder[idx] === 1;
                  return (
                    <div
                      key={entry.user_id}
                      className={`flex flex-col items-center p-5 rounded-xl border transition-all ${
                        isFirst
                          ? 'bg-amber-400/5 border-amber-500/30 -mt-4'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      {entry.avatar_url ? (
                        <img src={entry.avatar_url} alt="" className="w-14 h-14 rounded-full object-cover mb-2" />
                      ) : (
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-2 ${
                          isFirst ? 'bg-amber-400/20 text-amber-400' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {entry.full_name.charAt(0)}
                        </div>
                      )}
                      <RankBadge rank={podiumOrder[idx]} />
                      <p className="font-semibold text-gray-800 mt-1 text-sm">{entry.full_name}</p>
                      <p className="text-xs text-gray-500">@{entry.username}</p>
                      <p className="flex items-center gap-1 text-amber-400 font-bold text-sm mt-2">
                        <Zap className="w-3.5 h-3.5" />
                        {entry.reputation.toLocaleString()} XP
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <LeaderboardTable entries={entries} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
