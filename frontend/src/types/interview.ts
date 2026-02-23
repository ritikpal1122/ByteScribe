import { PublicUser } from "./user";

export interface MockInterviewSession {
  id: string;
  user: PublicUser;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  interview_type: "technical" | "behavioral" | "system_design" | "mixed";
  status: "active" | "completed" | "abandoned";
  messages: MockInterviewMessage[];
  score: number | null;
  feedback: string | null;
  duration_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface MockInterviewCreate {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  interview_type: "technical" | "behavioral" | "system_design" | "mixed";
}

export interface MockInterviewMessage {
  id: string;
  session_id: string;
  role: "interviewer" | "candidate";
  content: string;
  created_at: string;
}

export interface PeerRoom {
  id: string;
  name: string;
  host: PublicUser;
  participants: PublicUser[];
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  status: "waiting" | "in_progress" | "completed";
  max_participants: number;
  problem_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PeerRoomCreate {
  name: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  max_participants?: number;
  problem_id?: string;
}
