export interface DailyActivity {
  date: string;
  problems_solved: number;
  articles_read: number;
  questions_asked: number;
  answers_given: number;
  xp_earned: number;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_url: string;
  category: "problem" | "article" | "question" | "streak" | "community" | "special";
  tier: "bronze" | "silver" | "gold" | "platinum";
  requirement_description: string;
  requirement_count: number;
}

export interface UserBadge {
  id: string;
  badge: Badge;
  earned_at: string;
}

export interface UserStreak {
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  streak_start_date: string;
  is_active_today: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  reputation: number;
  problems_solved: number;
  streak_days: number;
  badge_count: number;
}
