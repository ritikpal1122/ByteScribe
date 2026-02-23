import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  resource_url: string | null;
  order: number;
  is_completed: boolean;
  is_due_for_review?: boolean;
  children: RoadmapNode[];
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  nodes: RoadmapNode[];
  total_nodes: number;
  completed_nodes: number;
  progress_percentage: number;
  due_review_count?: number;
  created_at: string;
  updated_at: string;
}

export interface RoadmapListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  total_nodes: number;
  completed_nodes: number;
  progress_percentage: number;
  created_at: string;
}

export interface RoadmapCreate {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours?: number;
  nodes: Omit<RoadmapNode, "id" | "is_completed" | "children"> & {
    children?: Omit<RoadmapNode, "id" | "is_completed" | "children">[];
  }[];
}

export async function getRoadmaps(params?: {
  page?: number;
  per_page?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  search?: string;
}): Promise<APIResponse<PaginatedResponse<RoadmapListItem>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<RoadmapListItem>>
  >("/roadmaps", { params });
  return data;
}

export async function getRoadmap(
  slugOrId: string,
): Promise<APIResponse<Roadmap>> {
  const { data } = await client.get<APIResponse<Roadmap>>(
    `/roadmaps/${slugOrId}`,
  );
  return data;
}

export async function createRoadmap(
  payload: RoadmapCreate,
): Promise<APIResponse<Roadmap>> {
  const { data } = await client.post<APIResponse<Roadmap>>(
    "/roadmaps",
    payload,
  );
  return data;
}

export async function updateProgress(
  slug: string,
  nodeId: string,
  isCompleted: boolean,
): Promise<APIResponse<{ completed_nodes: number; progress_percentage: number }>> {
  const { data } = await client.post<
    APIResponse<{ completed_nodes: number; progress_percentage: number }>
  >(`/roadmaps/${slug}/progress`, {
    step_id: nodeId,
    is_completed: isCompleted,
  });
  return data;
}
