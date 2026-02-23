import { PublicUser } from "./user";

export interface Question {
  id: string;
  title: string;
  slug: string;
  body: string;
  author: PublicUser;
  tags: string[];
  upvotes: number;
  downvotes: number;
  view_count: number;
  answer_count: number;
  is_resolved: boolean;
  accepted_answer_id: string | null;
  user_vote: "up" | "down" | null;
  is_bookmarked: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuestionCreate {
  title: string;
  body: string;
  tags?: string[];
}

export interface QuestionListItem {
  id: string;
  title: string;
  slug: string;
  body: string;
  author: PublicUser;
  tags: string[];
  upvotes: number;
  downvotes: number;
  view_count: number;
  answer_count: number;
  is_resolved: boolean;
  user_vote: "up" | "down" | null;
  is_bookmarked: boolean;
  created_at: string;
}

export interface Answer {
  id: string;
  body: string;
  author: PublicUser;
  question_id: string;
  upvotes: number;
  downvotes: number;
  is_accepted: boolean;
  user_vote: "up" | "down" | null;
  created_at: string;
  updated_at: string;
}

export interface AnswerCreate {
  body: string;
  question_id: string;
}

export interface VoteRequest {
  vote: "up" | "down";
}
