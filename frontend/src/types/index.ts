// Shared generic types
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

// Re-export all domain types
export * from "./user";
export * from "./article";
export * from "./question";
export * from "./problem";
export * from "./company";
export * from "./interview";
export * from "./gamification";
export * from "./dsaSheet";
