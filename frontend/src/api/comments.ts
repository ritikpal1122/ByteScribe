import client from "./client";
import { APIResponse, PaginatedResponse, PublicUser } from "../types";

export interface Comment {
  id: string;
  body: string;
  content_type: string;
  content_id: string;
  author_id: string;
  author: PublicUser;
  parent_id: string | null;
  upvotes: number;
  downvotes: number;
  user_vote: "upvote" | "downvote" | null;
  replies_count: number;
  created_at: string;
  updated_at: string;
}

export interface CommentCreate {
  body: string;
  parent_id?: string;
}

export async function getComments(params: {
  content_type: string;
  content_id: string;
  page?: number;
  per_page?: number;
  sort_by?: "newest" | "oldest" | "votes";
}): Promise<APIResponse<PaginatedResponse<Comment>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<Comment>>
  >("/comments", { params });
  return data;
}

export async function getReplies(
  commentId: string,
): Promise<APIResponse<Comment[]>> {
  const { data } = await client.get<APIResponse<Comment[]>>(
    `/comments/${commentId}/replies`,
  );
  return data;
}

export async function createComment(
  contentType: string,
  contentId: string,
  payload: CommentCreate,
): Promise<APIResponse<Comment>> {
  const { data } = await client.post<APIResponse<Comment>>(
    "/comments",
    payload,
    { params: { content_type: contentType, content_id: contentId } },
  );
  return data;
}

export async function voteComment(
  commentId: string,
  voteType: "upvote" | "downvote",
): Promise<APIResponse<Comment>> {
  const { data } = await client.post<APIResponse<Comment>>(
    `/comments/${commentId}/vote`,
    { vote_type: voteType },
  );
  return data;
}

export async function deleteComment(id: string): Promise<APIResponse<null>> {
  const { data } = await client.delete<APIResponse<null>>(`/comments/${id}`);
  return data;
}
