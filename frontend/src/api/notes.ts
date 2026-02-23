import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  is_public: boolean;
  linked_article_id: string | null;
  linked_problem_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  tags?: string[];
  is_public?: boolean;
  linked_article_id?: string;
  linked_problem_id?: string;
}

export interface NoteUpdate {
  title?: string;
  content?: string;
  tags?: string[];
  is_public?: boolean;
}

export async function getNotes(params?: {
  page?: number;
  per_page?: number;
  search?: string;
  tag?: string;
}): Promise<APIResponse<PaginatedResponse<Note>>> {
  const { data } = await client.get<APIResponse<PaginatedResponse<Note>>>(
    "/notes",
    { params },
  );
  return data;
}

export async function getNote(id: string): Promise<APIResponse<Note>> {
  const { data } = await client.get<APIResponse<Note>>(`/notes/${id}`);
  return data;
}

export async function createNote(
  payload: NoteCreate,
): Promise<APIResponse<Note>> {
  const { data } = await client.post<APIResponse<Note>>("/notes", payload);
  return data;
}

export async function updateNote(
  id: string,
  payload: NoteUpdate,
): Promise<APIResponse<Note>> {
  const { data } = await client.put<APIResponse<Note>>(
    `/notes/${id}`,
    payload,
  );
  return data;
}

export async function deleteNote(id: string): Promise<APIResponse<null>> {
  const { data } = await client.delete<APIResponse<null>>(`/notes/${id}`);
  return data;
}
