import client from "./client";
import { APIResponse } from "../types";

export interface PublicProfileData {
  username: string;
  display_name: string;
  bio: string | null;
  xp: number;
  reputation: number;
  problems_solved: number;
  articles_written: number;
  github_username: string | null;
  streak: {
    current_streak: number;
    longest_streak: number;
  };
  badges: {
    id: string;
    name: string;
    icon: string;
    tier: string;
    earned_at: string;
  }[];
  activity_dates: string[];
  created_at: string;
}

export async function getPublicProfile(
  username: string,
): Promise<APIResponse<PublicProfileData>> {
  const { data } = await client.get<APIResponse<PublicProfileData>>(
    `/users/${username}`,
  );
  return data;
}
