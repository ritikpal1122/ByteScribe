import client from "./client";
import {
  APIResponse,
  PaginatedResponse,
  UserStreak,
  UserBadge,
  LeaderboardEntry,
  DailyActivity,
} from "../types";

export interface ActivityHeatmapEntry {
  date: string;
  count: number;
  problems_solved: number;
  articles_read: number;
}

export interface UserStats {
  xp: number;
  reputation: number;
  problems_solved: number;
  articles_written: number;
  answers_given: number;
  badge_count: number;
  total_submissions: number;
  total_accepted: number;
  acceptance_rate: number;
  by_language: Record<string, number>;
  by_difficulty: Record<string, number>;
}

export async function getStreak(): Promise<APIResponse<UserStreak>> {
  const { data } = await client.get<APIResponse<UserStreak>>(
    "/gamification/streak",
  );
  return data;
}

export async function getBadges(params?: {
  page?: number;
  per_page?: number;
}): Promise<APIResponse<PaginatedResponse<UserBadge>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<UserBadge>>
  >("/gamification/badges", { params });
  return data;
}

export async function getLeaderboard(params?: {
  page?: number;
  per_page?: number;
  period?: "daily" | "weekly" | "monthly" | "all_time";
  sort_by?: "reputation" | "problems_solved" | "streak";
}): Promise<APIResponse<PaginatedResponse<LeaderboardEntry>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<LeaderboardEntry>>
  >("/gamification/leaderboard", { params });
  return data;
}

export async function getDailyActivity(params?: {
  start_date?: string;
  end_date?: string;
}): Promise<APIResponse<DailyActivity[]>> {
  const { data } = await client.get<APIResponse<DailyActivity[]>>(
    "/gamification/activity",
    { params },
  );
  return data;
}

export async function getActivityHeatmap(
  weeks: number = 7,
): Promise<APIResponse<ActivityHeatmapEntry[]>> {
  const { data } = await client.get<APIResponse<ActivityHeatmapEntry[]>>(
    "/gamification/activity-heatmap",
    { params: { weeks } },
  );
  return data;
}

export async function getStats(): Promise<APIResponse<UserStats>> {
  const { data } = await client.get<APIResponse<UserStats>>(
    "/gamification/stats",
  );
  return data;
}
