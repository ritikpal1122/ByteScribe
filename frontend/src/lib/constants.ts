export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export const DIFFICULTY_COLORS = {
  beginner: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-300",
    dot: "bg-emerald-500",
  },
  intermediate: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-300",
    dot: "bg-amber-500",
  },
  advanced: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    border: "border-rose-300",
    dot: "bg-rose-500",
  },
} as const;

export type Difficulty = keyof typeof DIFFICULTY_COLORS;

export const LANGUAGE_OPTIONS = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "bash", label: "Bash" },
] as const;

export type Language = (typeof LANGUAGE_OPTIONS)[number]["value"];

export const COURSE_CATEGORIES = [
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Mobile Development",
  "DevOps",
  "Databases",
  "Algorithms",
  "System Design",
  "Security",
  "Cloud Computing",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export const SUBMISSION_STATUS = {
  passed: {
    label: "Passed",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  failed: {
    label: "Failed",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  error: {
    label: "Error",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  pending: {
    label: "Pending",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
} as const;

export const PAGINATION_DEFAULT_LIMIT = 20;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;
