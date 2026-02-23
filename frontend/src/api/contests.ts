import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

export interface Contest {
  id: string;
  title: string;
  slug: string;
  description: string;
  start_time: string;
  end_time: string;
  status: "upcoming" | "active" | "ended";
  participant_count: number;
  problem_count: number;
  created_at: string;
}

export interface ContestProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  solved_count: number;
}

export interface ContestLeaderboardEntry {
  rank: number;
  username: string;
  display_name: string;
  avatar_url: string | null;
  score: number;
  problems_solved: number;
  total_time: number;
}

export interface ContestDetail extends Contest {
  problems: ContestProblem[];
  leaderboard: ContestLeaderboardEntry[];
}

export async function getContests(params?: {
  status?: string;
  page?: number;
  per_page?: number;
}): Promise<APIResponse<PaginatedResponse<Contest>>> {
  const { data } = await client.get<APIResponse<PaginatedResponse<Contest>>>(
    "/contests",
    { params },
  );
  return data;
}

export async function getContestBySlug(
  slug: string,
): Promise<APIResponse<ContestDetail>> {
  const { data } = await client.get<APIResponse<ContestDetail>>(
    `/contests/${slug}`,
  );
  return data;
}
