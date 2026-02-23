import client from "./client";
import { APIResponse } from "../types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StepNote {
  id: string;
  content: string;
  code_snippet: string | null;
  language: string | null;
  updated_at: string | null;
}

export interface StepReview {
  id: string;
  step_id: string;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
  last_reviewed_at: string | null;
  quality: number | null;
}

export interface RoadmapAnalytics {
  time_per_step: { step_id: string; title: string; total_seconds: number }[];
  total_time_seconds: number;
  daily_activity: { date: string; seconds: number }[];
  average_pace: number;
  estimated_remaining: number;
  total_steps: number;
  completed_steps: number;
}

export interface AIChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

// Notes
export async function getStepNote(
  roadmapId: string,
  stepId: string,
): Promise<APIResponse<StepNote | null>> {
  const { data } = await client.get<APIResponse<StepNote | null>>(
    `/roadmaps/${roadmapId}/steps/${stepId}/notes`,
  );
  return data;
}

export async function upsertStepNote(
  roadmapId: string,
  stepId: string,
  payload: { content: string; code_snippet?: string | null; language?: string | null },
): Promise<APIResponse<StepNote>> {
  const { data } = await client.put<APIResponse<StepNote>>(
    `/roadmaps/${roadmapId}/steps/${stepId}/notes`,
    payload,
  );
  return data;
}

export async function deleteStepNote(
  roadmapId: string,
  stepId: string,
): Promise<APIResponse<null>> {
  const { data } = await client.delete<APIResponse<null>>(
    `/roadmaps/${roadmapId}/steps/${stepId}/notes`,
  );
  return data;
}

// AI Chat
export async function sendStepChat(
  roadmapId: string,
  stepId: string,
  payload: {
    messages: AIChatMessage[];
    step_title: string;
    step_description: string;
    roadmap_title: string;
  },
): Promise<APIResponse<{ reply: string }>> {
  const { data } = await client.post<APIResponse<{ reply: string }>>(
    `/roadmaps/${roadmapId}/steps/${stepId}/ai-chat`,
    payload,
  );
  return data;
}

// Reviews
export async function getDueReviews(
  roadmapId: string,
): Promise<APIResponse<StepReview[]>> {
  const { data } = await client.get<APIResponse<StepReview[]>>(
    `/roadmaps/${roadmapId}/reviews/due`,
  );
  return data;
}

export async function getStepReview(
  roadmapId: string,
  stepId: string,
): Promise<APIResponse<StepReview | null>> {
  const { data } = await client.get<APIResponse<StepReview | null>>(
    `/roadmaps/${roadmapId}/steps/${stepId}/review`,
  );
  return data;
}

export async function reviewStep(
  roadmapId: string,
  stepId: string,
  quality: number,
): Promise<APIResponse<StepReview>> {
  const { data } = await client.post<APIResponse<StepReview>>(
    `/roadmaps/${roadmapId}/steps/${stepId}/review`,
    { quality },
  );
  return data;
}

// Time logging
export async function logStepTime(
  roadmapId: string,
  stepId: string,
  durationSeconds: number,
): Promise<APIResponse<{ id: string; duration_seconds: number }>> {
  const { data } = await client.post<
    APIResponse<{ id: string; duration_seconds: number }>
  >(`/roadmaps/${roadmapId}/steps/${stepId}/time-log`, {
    duration_seconds: durationSeconds,
  });
  return data;
}

// Analytics
export async function getRoadmapAnalytics(
  roadmapId: string,
): Promise<APIResponse<RoadmapAnalytics>> {
  const { data } = await client.get<APIResponse<RoadmapAnalytics>>(
    `/roadmaps/${roadmapId}/analytics`,
  );
  return data;
}
