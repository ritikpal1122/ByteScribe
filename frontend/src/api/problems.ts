import client from "./client";
import {
  APIResponse,
  PaginatedResponse,
  Problem,
  ProblemCreate,
  ProblemListItem,
  Submission,
  SubmissionCreate,
  RunCodeRequest,
  RunResult,
} from "../types";

export async function getProblems(params?: {
  page?: number;
  per_page?: number;
  difficulty?: "easy" | "medium" | "hard";
  tag?: string;
  company?: string;
  search?: string;
  sort_by?: "newest" | "acceptance" | "difficulty";
  status?: "solved" | "unsolved" | "attempted";
}): Promise<APIResponse<PaginatedResponse<ProblemListItem>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<ProblemListItem>>
  >("/problems", { params });
  return data;
}

export async function getProblem(
  slugOrId: string,
): Promise<APIResponse<Problem>> {
  const { data } = await client.get<APIResponse<Problem>>(
    `/problems/${slugOrId}`,
  );
  return data;
}

export async function createProblem(
  payload: ProblemCreate,
): Promise<APIResponse<Problem>> {
  const { data } = await client.post<APIResponse<Problem>>(
    "/problems",
    payload,
  );
  return data;
}

export async function runCode(
  payload: RunCodeRequest,
): Promise<APIResponse<RunResult>> {
  const { data } = await client.post<APIResponse<RunResult>>(
    `/problems/${payload.problem_id}/run`,
    {
      language: payload.language,
      code: payload.code,
      custom_input: payload.custom_input,
    },
  );
  return data;
}

export async function submitSolution(
  payload: SubmissionCreate,
): Promise<APIResponse<Submission>> {
  const { data } = await client.post<APIResponse<Submission>>(
    `/problems/${payload.problem_id}/submit`,
    {
      language: payload.language,
      code: payload.code,
    },
  );
  return data;
}

export async function getSubmissions(
  problemId: string,
  params?: {
    page?: number;
    per_page?: number;
  },
): Promise<APIResponse<PaginatedResponse<Submission>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<Submission>>
  >(`/problems/${problemId}/submissions`, { params });
  return data;
}
