import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  usage_count: number;
  created_at: string;
}

export interface TagCreate {
  name: string;
  description?: string;
}

export async function getTags(params?: {
  page?: number;
  per_page?: number;
  search?: string;
}): Promise<APIResponse<PaginatedResponse<Tag>>> {
  const { data } = await client.get<APIResponse<PaginatedResponse<Tag>>>(
    "/tags",
    { params },
  );
  return data;
}

export async function createTag(
  payload: TagCreate,
): Promise<APIResponse<Tag>> {
  const { data } = await client.post<APIResponse<Tag>>("/tags", payload);
  return data;
}

export async function getTag(slugOrId: string): Promise<APIResponse<Tag>> {
  const { data } = await client.get<APIResponse<Tag>>(`/tags/${slugOrId}`);
  return data;
}
