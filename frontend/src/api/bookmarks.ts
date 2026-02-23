import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

export interface Bookmark {
  id: string;
  target_type: "article" | "question" | "problem" | "experience";
  target_id: string;
  target_title: string;
  target_slug: string;
  created_at: string;
}

export interface BookmarkCreate {
  target_type: "article" | "question" | "problem" | "experience";
  target_id: string;
}

export async function getBookmarks(params?: {
  page?: number;
  per_page?: number;
  target_type?: "article" | "question" | "problem" | "experience";
}): Promise<APIResponse<PaginatedResponse<Bookmark>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<Bookmark>>
  >("/bookmarks", { params });
  return data;
}

export async function createBookmark(
  payload: BookmarkCreate,
): Promise<APIResponse<Bookmark>> {
  const { data } = await client.post<APIResponse<Bookmark>>(
    "/bookmarks",
    payload,
  );
  return data;
}

export async function deleteBookmark(id: string): Promise<APIResponse<null>> {
  const { data } = await client.delete<APIResponse<null>>(`/bookmarks/${id}`);
  return data;
}
