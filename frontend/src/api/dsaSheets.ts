import client from "./client";
import { APIResponse } from "../types";
import { DSASheet, DSASheetDetail } from "../types/dsaSheet";

export async function getSheets(): Promise<APIResponse<DSASheet[]>> {
  const { data } = await client.get<APIResponse<DSASheet[]>>("/dsa-sheets");
  return data;
}

export async function getSheet(
  slug: string,
): Promise<APIResponse<DSASheetDetail>> {
  const { data } = await client.get<APIResponse<DSASheetDetail>>(
    `/dsa-sheets/${slug}`,
  );
  return data;
}

export interface SheetProgressSummary {
  id: string;
  name: string;
  slug: string;
  icon: string;
  problem_count: number;
  completed_count: number;
}

export async function getMySheetProgress(): Promise<APIResponse<SheetProgressSummary[]>> {
  const { data } = await client.get<APIResponse<SheetProgressSummary[]>>("/dsa-sheets/my-progress");
  return data;
}

export async function toggleProgress(
  sheetSlug: string,
  problemId: string,
): Promise<APIResponse<{ is_completed: boolean }>> {
  const { data } = await client.put<
    APIResponse<{ is_completed: boolean }>
  >(`/dsa-sheets/${sheetSlug}/problems/${problemId}/progress`);
  return data;
}
