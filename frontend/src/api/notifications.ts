import client from "./client";
import { APIResponse, PaginatedResponse } from "../types";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export async function getNotifications(params?: {
  page?: number;
  unread_only?: boolean;
}): Promise<APIResponse<PaginatedResponse<Notification>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<Notification>>
  >("/notifications", { params });
  return data;
}

export async function getUnreadCount(): Promise<
  APIResponse<{ count: number }>
> {
  const { data } = await client.get<APIResponse<{ count: number }>>(
    "/notifications/unread-count",
  );
  return data;
}

export async function markAsRead(id: string): Promise<APIResponse<null>> {
  const { data } = await client.put<APIResponse<null>>(
    `/notifications/${id}/read`,
  );
  return data;
}

export async function markAllAsRead(): Promise<
  APIResponse<{ count: number }>
> {
  const { data } = await client.put<APIResponse<{ count: number }>>(
    "/notifications/read-all",
  );
  return data;
}
