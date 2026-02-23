import { PublicUser } from "./user";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  cover_image_url: string | null;
  author: PublicUser;
  tags: string[];
  upvotes: number;
  downvotes: number;
  view_count: number;
  comment_count: number;
  is_published: boolean;
  is_featured: boolean;
  user_vote: "up" | "down" | null;
  is_bookmarked: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleCreate {
  title: string;
  content: string;
  summary: string;
  cover_image_url?: string;
  tags?: string[];
  is_published?: boolean;
}

export interface ArticleUpdate {
  title?: string;
  content?: string;
  summary?: string;
  cover_image_url?: string;
  tags?: string[];
  is_published?: boolean;
}

export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover_image_url: string | null;
  author: PublicUser;
  tags: string[];
  upvotes: number;
  downvotes: number;
  view_count: number;
  comment_count: number;
  is_published: boolean;
  is_featured: boolean;
  user_vote: "up" | "down" | null;
  is_bookmarked: boolean;
  created_at: string;
}

export interface ArticleVote {
  article_id: string;
  vote: "up" | "down";
}
