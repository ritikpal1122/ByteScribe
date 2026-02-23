import client from "./client";
import { APIResponse, PaginatedResponse, PublicUser } from "../types";

export type SearchContentType =
  | "article"
  | "question"
  | "problem"
  | "company"
  | "experience";

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_type: SearchContentType;
  author: PublicUser | null;
  tags: string[];
  score: number;
  created_at: string;
}

export async function search(
  query: string,
  contentTypes?: SearchContentType[],
  page?: number,
  perPage?: number,
): Promise<APIResponse<PaginatedResponse<SearchResult>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<SearchResult>>
  >("/search", {
    params: {
      q: query,
      content_types: contentTypes?.join(","),
      page,
      per_page: perPage,
    },
  });
  return data;
}
