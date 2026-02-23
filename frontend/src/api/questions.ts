import client from "./client";
import {
  APIResponse,
  PaginatedResponse,
  Question,
  QuestionCreate,
  QuestionListItem,
  Answer,
  AnswerCreate,
  VoteRequest,
} from "../types";

export async function getQuestions(params?: {
  page?: number;
  per_page?: number;
  tag?: string;
  search?: string;
  sort_by?: "newest" | "votes" | "unanswered" | "active";
  is_resolved?: boolean;
}): Promise<APIResponse<PaginatedResponse<QuestionListItem>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<QuestionListItem>>
  >("/questions", { params });
  return data;
}

export async function getQuestion(
  slugOrId: string,
): Promise<APIResponse<Question>> {
  const { data } = await client.get<APIResponse<Question>>(
    `/questions/${slugOrId}`,
  );
  return data;
}

export async function createQuestion(
  payload: QuestionCreate,
): Promise<APIResponse<Question>> {
  const { data } = await client.post<APIResponse<Question>>(
    "/questions",
    payload,
  );
  return data;
}

export async function updateQuestion(
  id: string,
  payload: Partial<QuestionCreate>,
): Promise<APIResponse<Question>> {
  const { data } = await client.put<APIResponse<Question>>(
    `/questions/${id}`,
    payload,
  );
  return data;
}

export async function createAnswer(
  payload: AnswerCreate,
): Promise<APIResponse<Answer>> {
  const { data } = await client.post<APIResponse<Answer>>(
    `/questions/${payload.question_id}/answers`,
    { body: payload.body },
  );
  return data;
}

export async function getAnswers(
  questionId: string,
  params?: {
    page?: number;
    per_page?: number;
    sort_by?: "votes" | "newest" | "oldest";
  },
): Promise<APIResponse<PaginatedResponse<Answer>>> {
  const { data } = await client.get<APIResponse<PaginatedResponse<Answer>>>(
    `/questions/${questionId}/answers`,
    { params },
  );
  return data;
}

export async function acceptAnswer(
  questionId: string,
  answerId: string,
): Promise<APIResponse<Answer>> {
  const { data } = await client.post<APIResponse<Answer>>(
    `/questions/${questionId}/answers/${answerId}/accept`,
  );
  return data;
}

export async function vote(
  targetType: "question" | "answer",
  targetId: string,
  payload: VoteRequest,
): Promise<APIResponse<{ upvotes: number; downvotes: number }>> {
  const { data } = await client.post<
    APIResponse<{ upvotes: number; downvotes: number }>
  >(`/${targetType}s/${targetId}/vote`, payload);
  return data;
}
