/* ================================================================== */
/*  Shared types for static language documentation                     */
/* ================================================================== */

/* ---- Diagram Definitions ---- */

export interface MermaidDiagram {
  kind: 'mermaid';
  code: string;
  caption?: string;
}

export type CustomDiagramType =
  | 'linked-list'
  | 'binary-tree'
  | 'hash-map'
  | 'stack'
  | 'queue'
  | 'array'
  | 'memory-layout'
  | 'graph'
  | 'heap'
  | 'algorithm-steps';

export interface CustomDiagram {
  kind: 'custom';
  type: CustomDiagramType;
  data: Record<string, unknown>;
  caption?: string;
}

export type DiagramDefinition = MermaidDiagram | CustomDiagram;

/* ---- Doc Section ---- */

export interface DocSection {
  heading: string;
  content: string;
  code?: string;
  output?: string;
  tip?: string;
  warning?: string;
  note?: string;
  diagram?: DiagramDefinition;
  codeHighlightLines?: number[];
  analogy?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticeChallenge {
  prompt: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
}

export interface DocEntry {
  id: string;
  title: string;
  sections: DocSection[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  readingTimeMinutes?: number;
  relatedEntryIds?: string[];
  crossLanguageId?: string;
  quiz?: QuizQuestion[];
  challenge?: PracticeChallenge;
  tags?: string[];
  cheatSheetSummary?: string;
  signature?: string;
}

export interface DocCategory {
  id: string;
  label: string;
  icon: string;
  entries: DocEntry[];
  description?: string;
}

export interface LearningPath {
  id: string;
  label: string;
  description: string;
  entryIds: string[];
  estimatedHours: number;
}

export interface LanguageConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  officialUrl: string;
  tagline: string;
  categories: DocCategory[];
  playgroundUrl?: string;
  executionApiId?: string;
  learningPaths?: LearningPath[];
}
