export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CodeExample {
  language: string;
  label?: string;
  code: string;
  output?: string;
}

export interface InterviewQuestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  answer: string;
  codeExamples?: CodeExample[];
  tips?: string[];
  commonMistakes?: string[];
  followUps?: string[];
  tags?: string[];
  keyTakeaway?: string;
}

export interface InterviewTopic {
  id: string;
  label: string;
  icon: string;
  description?: string;
  questions: InterviewQuestion[];
}

export interface RoleConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  tagline: string;
  topics: InterviewTopic[];
}
