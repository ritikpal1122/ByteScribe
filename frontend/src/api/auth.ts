import client from "./client";
import { APIResponse, User } from "../types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  display_name: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  verify_link?: string;
}

export async function register(
  payload: RegisterRequest,
): Promise<APIResponse<RegisterResponse>> {
  const { data } = await client.post<APIResponse<RegisterResponse>>(
    "/auth/register",
    payload,
  );
  return data;
}

export async function login(
  payload: LoginRequest,
): Promise<APIResponse<AuthTokens>> {
  const { data } = await client.post<APIResponse<AuthTokens>>(
    "/auth/login",
    payload,
  );
  return data;
}

export async function verifyEmail(
  token: string,
): Promise<APIResponse<{ id: string; username: string }>> {
  const { data } = await client.post<
    APIResponse<{ id: string; username: string }>
  >("/auth/verify-email", { token });
  return data;
}

export async function resendVerification(
  email: string,
): Promise<APIResponse<{ verify_link?: string } | null>> {
  const { data } = await client.post<APIResponse<{ verify_link?: string } | null>>(
    "/auth/resend-verification",
    { email },
  );
  return data;
}

export async function forgotPassword(
  email: string,
): Promise<APIResponse<{ reset_link?: string } | null>> {
  const { data } = await client.post<APIResponse<{ reset_link?: string } | null>>(
    "/auth/forgot-password",
    { email },
  );
  return data;
}

export async function resetPassword(
  token: string,
  new_password: string,
): Promise<APIResponse<null>> {
  const { data } = await client.post<APIResponse<null>>(
    "/auth/reset-password",
    { token, new_password },
  );
  return data;
}

export async function refreshTokens(
  refreshToken: string,
): Promise<APIResponse<AuthTokens>> {
  const { data } = await client.post<APIResponse<AuthTokens>>(
    "/auth/refresh",
    { refresh_token: refreshToken },
  );
  return data;
}

export async function logout(): Promise<APIResponse<null>> {
  const { data } = await client.post<APIResponse<null>>("/auth/logout");
  return data;
}

export async function getMe(): Promise<APIResponse<User>> {
  const { data } = await client.get<APIResponse<User>>("/auth/me");
  return data;
}

export async function githubCallback(
  code: string,
): Promise<APIResponse<AuthTokens>> {
  const { data } = await client.post<APIResponse<AuthTokens>>(
    "/auth/github/callback",
    { code },
  );
  return data;
}
