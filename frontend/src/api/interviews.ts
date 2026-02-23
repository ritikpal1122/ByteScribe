import client from "./client";
import {
  APIResponse,
  PaginatedResponse,
  MockInterviewSession,
  MockInterviewCreate,
  MockInterviewMessage,
  PeerRoom,
  PeerRoomCreate,
} from "../types";

export async function createMockSession(
  payload: MockInterviewCreate,
): Promise<APIResponse<MockInterviewSession>> {
  const { data } = await client.post<APIResponse<MockInterviewSession>>(
    "/mock-interviews",
    payload,
  );
  return data;
}

export async function sendMockMessage(
  sessionId: string,
  content: string,
): Promise<APIResponse<MockInterviewMessage>> {
  const { data } = await client.post<APIResponse<MockInterviewMessage>>(
    `/mock-interviews/${sessionId}/messages`,
    { content },
  );
  return data;
}

export async function getMockSessions(params?: {
  page?: number;
  per_page?: number;
  status?: "active" | "completed" | "abandoned";
}): Promise<APIResponse<PaginatedResponse<MockInterviewSession>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<MockInterviewSession>>
  >("/mock-interviews", { params });
  return data;
}

export async function getMockSession(
  sessionId: string,
): Promise<APIResponse<MockInterviewSession>> {
  const { data } = await client.get<APIResponse<MockInterviewSession>>(
    `/mock-interviews/${sessionId}`,
  );
  return data;
}

export async function createPeerRoom(
  payload: PeerRoomCreate,
): Promise<APIResponse<PeerRoom>> {
  const { data } = await client.post<APIResponse<PeerRoom>>(
    "/peer-rooms",
    payload,
  );
  return data;
}

export async function joinPeerRoom(
  roomId: string,
): Promise<APIResponse<PeerRoom>> {
  const { data } = await client.post<APIResponse<PeerRoom>>(
    `/peer-rooms/${roomId}/join`,
  );
  return data;
}

export async function getPeerRooms(params?: {
  page?: number;
  per_page?: number;
  status?: "waiting" | "in_progress" | "completed";
}): Promise<APIResponse<PaginatedResponse<PeerRoom>>> {
  const { data } = await client.get<
    APIResponse<PaginatedResponse<PeerRoom>>
  >("/peer-rooms", { params });
  return data;
}
