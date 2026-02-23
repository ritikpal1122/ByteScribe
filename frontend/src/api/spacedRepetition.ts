import client from "./client";
import { APIResponse } from "../types";

export interface DueCard {
  id: string;
  problem_id: string;
  problem_title: string;
  problem_slug: string;
  problem_difficulty: "easy" | "medium" | "hard";
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
  last_reviewed_at: string | null;
}

export interface ReviewResult {
  id: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
}

export interface ReviewStats {
  due_today: number;
  total_cards: number;
  mastered: number;
  upcoming_week: number;
}

export async function getDueCards(): Promise<APIResponse<DueCard[]>> {
  const { data } = await client.get<APIResponse<DueCard[]>>(
    "/spaced-repetition/due",
  );
  return data;
}

export async function reviewCard(
  cardId: string,
  quality: number,
): Promise<APIResponse<ReviewResult>> {
  const { data } = await client.post<APIResponse<ReviewResult>>(
    `/spaced-repetition/${cardId}/review`,
    { quality },
  );
  return data;
}

export async function getReviewStats(): Promise<APIResponse<ReviewStats>> {
  const { data } = await client.get<APIResponse<ReviewStats>>(
    "/spaced-repetition/stats",
  );
  return data;
}
