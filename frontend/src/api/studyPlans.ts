import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StudyPlanItem {
  id: string;
  plan_id: string;
  title: string;
  description?: string;
  section: string;
  problem_id?: string;
  difficulty?: "easy" | "medium" | "hard";
  estimated_minutes?: number;
  resource_url?: string;
  day_number: number;
  order: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  target_role?: string;
  target_company?: string;
  duration_weeks: number;
  user_id: string;
  is_ai_generated: boolean;
  is_public: boolean;
  item_count: number;
  completed_count: number;
  items: StudyPlanItem[];
  created_at: string;
  updated_at: string;
}

export interface AddItemEntry {
  problem_id?: string;
  title?: string;
  section?: string;
  difficulty?: string;
  estimated_minutes?: number;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export async function getStudyPlans(
  params?: { page?: number; per_page?: number },
): Promise<APIResponse<PaginatedResponse<StudyPlan>>> {
  const { data } = await client.get<APIResponse<PaginatedResponse<StudyPlan>>>(
    "/study-plans",
    { params },
  );
  return data;
}

export async function getStudyPlan(
  id: string,
): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.get<APIResponse<StudyPlan>>(
    `/study-plans/${id}`,
  );
  return data;
}

export async function createStudyPlan(payload: {
  title: string;
  description?: string;
  target_role?: string;
  target_company?: string;
  duration_weeks?: number;
}): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.post<APIResponse<StudyPlan>>(
    "/study-plans",
    payload,
  );
  return data;
}

export async function updateStudyPlan(
  id: string,
  payload: {
    title?: string;
    description?: string;
    target_role?: string;
    target_company?: string;
    duration_weeks?: number;
    is_public?: boolean;
  },
): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.put<APIResponse<StudyPlan>>(
    `/study-plans/${id}`,
    payload,
  );
  return data;
}

export async function deleteStudyPlan(
  id: string,
): Promise<APIResponse<null>> {
  const { data } = await client.delete<APIResponse<null>>(
    `/study-plans/${id}`,
  );
  return data;
}

export async function addItems(
  planId: string,
  items: AddItemEntry[],
): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.post<APIResponse<StudyPlan>>(
    `/study-plans/${planId}/items`,
    { items },
  );
  return data;
}

export async function removeItem(
  planId: string,
  itemId: string,
): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.delete<APIResponse<StudyPlan>>(
    `/study-plans/${planId}/items/${itemId}`,
  );
  return data;
}

export async function reorderItems(
  planId: string,
  itemIds: string[],
): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.put<APIResponse<StudyPlan>>(
    `/study-plans/${planId}/items/reorder`,
    { item_ids: itemIds },
  );
  return data;
}

export async function toggleItemComplete(
  planId: string,
  itemId: string,
): Promise<APIResponse<StudyPlanItem>> {
  const { data } = await client.put<APIResponse<StudyPlanItem>>(
    `/study-plans/${planId}/items/${itemId}/toggle`,
  );
  return data;
}

export async function generateStudyPlan(payload: {
  target_role: string;
  target_company?: string;
  duration_weeks?: number;
  topics?: string[];
}): Promise<APIResponse<StudyPlan>> {
  const { data } = await client.post<APIResponse<StudyPlan>>(
    "/study-plans/generate",
    payload,
  );
  return data;
}
