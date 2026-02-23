export type {
  DocSection,
  DocEntry,
  DocCategory,
  LanguageConfig,
  QuizQuestion,
  PracticeChallenge,
  LearningPath,
} from './types';

import { python } from './python';
import { javascript } from './javascript';
import { typescript } from './typescript';
import { cpp } from './cpp';
// import { java } from './java';
import { go } from './go';
// import { rust } from './rust';
import { selenium } from './selenium';
import { playwright } from './playwright';
import { git } from './git';
import { docker } from './docker';
import { kubernetes } from './kubernetes';
import type { LanguageConfig } from './types';

export const ALL_LANGUAGES: LanguageConfig[] = [
  python,
  javascript,
  typescript,
  cpp,
  // java,
  go,
  // rust,
  selenium,
  playwright,
  git,
  docker,
  kubernetes,
];

export function getLanguage(id: string): LanguageConfig | undefined {
  return ALL_LANGUAGES.find((l) => l.id === id);
}
