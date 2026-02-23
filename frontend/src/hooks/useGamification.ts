import { useQuery } from '@tanstack/react-query';
import * as gamificationApi from '../api/gamification';

export function useLeaderboard(
  page: number = 1,
  perPage: number = 20,
  period?: 'daily' | 'weekly' | 'monthly' | 'all_time',
  sortBy?: 'reputation' | 'problems_solved' | 'streak',
) {
  return useQuery({
    queryKey: ['leaderboard', { page, perPage, period, sortBy }],
    queryFn: () =>
      gamificationApi.getLeaderboard({
        page,
        per_page: perPage,
        period,
        sort_by: sortBy,
      }),
    select: (res) => res.data,
  });
}

export function useStreak() {
  return useQuery({
    queryKey: ['streak'],
    queryFn: () => gamificationApi.getStreak(),
    select: (res) => res.data,
  });
}

export function useBadges(page: number = 1, perPage: number = 20) {
  return useQuery({
    queryKey: ['badges', { page, perPage }],
    queryFn: () => gamificationApi.getBadges({ page, per_page: perPage }),
    select: (res) => res.data,
  });
}

export function useDailyActivity(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['daily-activity', { startDate, endDate }],
    queryFn: () =>
      gamificationApi.getDailyActivity({
        start_date: startDate,
        end_date: endDate,
      }),
    select: (res) => res.data,
  });
}

export function useActivityHeatmap(weeks: number = 7) {
  return useQuery({
    queryKey: ['activity-heatmap', weeks],
    queryFn: () => gamificationApi.getActivityHeatmap(weeks),
    select: (res) => res.data,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ['gamification-stats'],
    queryFn: () => gamificationApi.getStats(),
    select: (res) => res.data,
  });
}
