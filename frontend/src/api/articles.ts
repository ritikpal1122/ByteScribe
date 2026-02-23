import client from "./client";
import {
  APIResponse,
  PaginatedResponse,
  Article,
  ArticleCreate,
  ArticleUpdate,
  ArticleListItem,
  ArticleVote,
} from "../types";

export async function getArticles(params?: {
  page?: number;
  per_page?: number;
  tag?: string;
  search?: string;
  sort_by?: "newest" | "popular" | "trending";
}): Promise<APIResponse<PaginatedResponse<ArticleListItem>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<ArticleListItem>>
  >("/articles", { params });
  return data;
}

export async function getArticle(
  slugOrId: string,
): Promise<APIResponse<Article>> {
  const { data } = await client.get<APIResponse<Article>>(
    `/articles/${slugOrId}`,
  );
  return data;
}

export async function createArticle(
  payload: ArticleCreate,
): Promise<APIResponse<Article>> {
  const { data } = await client.post<APIResponse<Article>>(
    "/articles",
    payload,
  );
  return data;
}

export async function updateArticle(
  id: string,
  payload: ArticleUpdate,
): Promise<APIResponse<Article>> {
  const { data } = await client.put<APIResponse<Article>>(
    `/articles/${id}`,
    payload,
  );
  return data;
}

export async function deleteArticle(id: string): Promise<APIResponse<null>> {
  const { data } = await client.delete<APIResponse<null>>(`/articles/${id}`);
  return data;
}

export async function voteArticle(
  id: string,
  vote: ArticleVote["vote"],
): Promise<APIResponse<{ upvotes: number; downvotes: number }>> {
  const { data } = await client.post<
    APIResponse<{ upvotes: number; downvotes: number }>
  >(`/articles/${id}/vote`, { vote });
  return data;
}
