import { cn } from '@/lib/utils';
import type { Difficulty } from '@/data/interview-prep/types';

const CONFIG: Record<Difficulty, { label: string; bg: string; text: string }> = {
  beginner: { label: 'Beginner', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  intermediate: { label: 'Intermediate', bg: 'bg-amber-100', text: 'text-amber-700' },
  advanced: { label: 'Advanced', bg: 'bg-red-100', text: 'text-red-700' },
};

interface Props {
  difficulty: Difficulty;
  className?: string;
}

export default function DifficultyBadge({ difficulty, className }: Props) {
  const c = CONFIG[difficulty];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        c.bg,
        c.text,
        className
      )}
    >
      {c.label}
    </span>
  );
}
