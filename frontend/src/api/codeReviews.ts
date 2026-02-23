import client from "./client";
import { APIResponse } from "../types";

export interface CodeReviewData {
  id: string;
  submission_id: string;
  time_complexity: string;
  space_complexity: string;
  overall_rating: number;
  summary: string;
  strengths: string[];
  improvements: string[];
}

export async function requestReview(
  submissionId: string,
): Promise<APIResponse<CodeReviewData>> {
  const { data } = await client.post<APIResponse<CodeReviewData>>(
    `/code-reviews/${submissionId}`,
  );
  return data;
}

export async function getReview(
  submissionId: string,
): Promise<APIResponse<CodeReviewData | null>> {
  const { data } = await client.get<APIResponse<CodeReviewData | null>>(
    `/code-reviews/${submissionId}`,
  );
  return data;
}
