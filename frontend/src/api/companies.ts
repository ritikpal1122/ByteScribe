import client from "./client";
import {
  APIResponse,
  PaginatedResponse,
  Company,
  InterviewExperience,
  InterviewExperienceCreate,
} from "../types";

export async function getCompanies(params?: {
  page?: number;
  per_page?: number;
  search?: string;
  industry?: string;
}): Promise<APIResponse<PaginatedResponse<Company>>> {
  const { data } = await client.get<APIResponse<PaginatedResponse<Company>>>(
    "/companies",
    { params },
  );
  return data;
}

export async function getCompany(
  slugOrId: string,
): Promise<APIResponse<Company>> {
  const { data } = await client.get<APIResponse<Company>>(
    `/companies/${slugOrId}`,
  );
  return data;
}

export async function createCompany(payload: {
  name: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  industry?: string;
}): Promise<APIResponse<Company>> {
  const { data } = await client.post<APIResponse<Company>>(
    "/companies",
    payload,
  );
  return data;
}

export async function createExperience(
  payload: InterviewExperienceCreate,
): Promise<APIResponse<InterviewExperience>> {
  const { data } = await client.post<APIResponse<InterviewExperience>>(
    "/interview-experiences",
    payload,
  );
  return data;
}

export async function getExperiences(params?: {
  page?: number;
  per_page?: number;
  company_id?: string;
  difficulty?: "easy" | "medium" | "hard";
  result?: "selected" | "rejected" | "pending" | "no_response";
  sort_by?: "newest" | "votes";
}): Promise<APIResponse<PaginatedResponse<InterviewExperience>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<InterviewExperience>>
  >("/interview-experiences", { params });
  return data;
}
