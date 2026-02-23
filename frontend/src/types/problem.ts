import { PublicUser } from "./user";

export enum Verdict {
  ACCEPTED = "accepted",
  WRONG_ANSWER = "wrong_answer",
  TIME_LIMIT_EXCEEDED = "time_limit_exceeded",
  MEMORY_LIMIT_EXCEEDED = "memory_limit_exceeded",
  RUNTIME_ERROR = "runtime_error",
  COMPILATION_ERROR = "compilation_error",
  PENDING = "pending",
}

export interface TestCase {
  id: string;
  input: string;
  expected_output: string;
  is_sample: boolean;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  author: PublicUser;
  tags: string[];
  constraints: string;
  input_format: string;
  output_format: string;
  time_limit_ms: number;
  memory_limit_mb: number;
  sample_test_cases: TestCase[];
  submission_count: number;
  accepted_count: number;
  acceptance_rate: number;
  user_solved: boolean;
  hints?: string;
  editorial?: string;
  starter_code?: Record<string, string>;
  companies: string[];
  created_at: string;
  updated_at: string;
}

export interface ProblemCreate {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
  constraints: string;
  input_format: string;
  output_format: string;
  time_limit_ms?: number;
  memory_limit_mb?: number;
  test_cases: Omit<TestCase, "id">[];
  companies?: string[];
}

export interface ProblemListItem {
  id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  submission_count: number;
  accepted_count: number;
  acceptance_rate: number;
  user_solved: boolean;
  companies: string[];
  created_at: string;
}

export interface Submission {
  id: string;
  problem_id: string;
  user: PublicUser;
  language: string;
  code: string;
  verdict: Verdict;
  runtime_ms: number | null;
  memory_kb: number | null;
  test_cases_passed: number;
  total_test_cases: number;
  error_message: string | null;
  created_at: string;
}

export interface SubmissionCreate {
  problem_id: string;
  language: string;
  code: string;
}

export interface RunCodeRequest {
  problem_id: string;
  language: string;
  code: string;
  custom_input?: string;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exit_code: number;
  runtime_ms: number;
  memory_kb: number;
  test_results: {
    input: string;
    expected_output: string;
    actual_output: string;
    passed: boolean;
  }[];
}
