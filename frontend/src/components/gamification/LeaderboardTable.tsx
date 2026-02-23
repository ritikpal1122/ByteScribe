import { Link } from 'react-router-dom';
import { Trophy, Flame, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/common/UserAvatar';
import type { LeaderboardEntry } from '@/types/gamification';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  className?: string;
}

const RANK_STYLES: Record<number, { bg: string; text: string; icon: string }> = {
  1: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: 'text-yellow-500',
  },
  2: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    icon: 'text-gray-400',
  },
  3: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: 'text-amber-600',
  },
};

function RankDisplay({ rank }: { rank: number }) {
  const style = RANK_STYLES[rank];

  if (style) {
    return (
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full',
          style.bg
        )}
      >
        {rank === 1 ? (
          <Trophy className={cn('h-5 w-5', style.icon)} />
        ) : (
          <Medal className={cn('h-5 w-5', style.icon)} />
        )}
      </div>
    );
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center text-sm font-semibold tabular-nums text-gray-500">
      {rank}
    </span>
  );
}

export function LeaderboardTable({ entries, className }: LeaderboardTableProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-gray-200 bg-white',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="w-16 px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                User
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                XP
              </th>
              <th className="hidden px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 sm:table-cell">
                Problems
              </th>
              <th className="hidden px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 md:table-cell">
                Streak
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const rankStyle = RANK_STYLES[entry.rank];

              return (
                <tr
                  key={entry.user_id}
                  className={cn(
                    'border-b border-gray-100 transition-colors hover:bg-gray-50',
                    rankStyle && rankStyle.bg
                  )}
                >
                  {/* Rank */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <RankDisplay rank={entry.rank} />
                    </div>
                  </td>

                  {/* User */}
                  <td className="px-4 py-3">
                    <Link
                      to={`/users/${entry.username}`}
                      className="flex items-center gap-3 transition-colors hover:text-blue-600"
                    >
                      <UserAvatar
                        src={entry.avatar_url}
                        name={entry.full_name}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p
                          className={cn(
                            'truncate font-medium',
                            rankStyle
                              ? rankStyle.text
                              : 'text-gray-900'
                          )}
                        >
                          {entry.full_name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          @{entry.username}
                        </p>
                      </div>
                    </Link>
                  </td>

                  {/* XP / Reputation */}
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold tabular-nums text-gray-900">
                      {entry.reputation.toLocaleString()}
                    </span>
                  </td>

                  {/* Problems Solved */}
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <span className="tabular-nums text-gray-600">
                      {entry.problems_solved}
                    </span>
                  </td>

                  {/* Streak */}
                  <td className="hidden px-4 py-3 text-right md:table-cell">
                    <span className="inline-flex items-center gap-1 tabular-nums text-gray-600">
                      <Flame className="h-4 w-4 text-orange-500" />
                      {entry.streak_days}d
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
