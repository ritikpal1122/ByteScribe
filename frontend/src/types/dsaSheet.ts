export interface DSASheet {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  problem_count: number;
}

export interface DSASheetProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  is_completed: boolean;
  order: number;
}

export interface DSASheetDetail extends DSASheet {
  completed_count: number;
  sections: Record<string, DSASheetProblem[]>;
}
