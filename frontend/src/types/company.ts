import { PublicUser } from "./user";

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  industry: string | null;
  experience_count: number;
  problem_count: number;
  created_at: string;
}

export interface InterviewExperience {
  id: string;
  company: Company;
  author: PublicUser;
  title: string;
  body: string;
  role_applied: string;
  experience_type: "on_campus" | "off_campus" | "referral" | "other";
  difficulty: "easy" | "medium" | "hard";
  result: "selected" | "rejected" | "pending" | "no_response";
  interview_date: string | null;
  rounds: string[];
  tags: string[];
  upvotes: number;
  downvotes: number;
  user_vote: "up" | "down" | null;
  created_at: string;
  updated_at: string;
}

export interface InterviewExperienceCreate {
  company_id: string;
  title: string;
  body: string;
  role_applied: string;
  experience_type: "on_campus" | "off_campus" | "referral" | "other";
  difficulty: "easy" | "medium" | "hard";
  result: "selected" | "rejected" | "pending" | "no_response";
  interview_date?: string;
  rounds?: string[];
  tags?: string[];
}
