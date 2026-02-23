export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  github_username: string | null;
  role: "user" | "admin" | "moderator";
  reputation: number;
  streak_days: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PublicUser {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  github_username: string | null;
  role: "user" | "admin" | "moderator";
  reputation: number;
  streak_days: number;
  created_at: string;
}

export interface UserUpdate {
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  github_username?: string;
}
