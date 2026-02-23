import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  onVote: (vote: 'up' | 'down') => void;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: { icon: 'h-4 w-4', button: 'p-0.5', text: 'text-xs' },
  md: { icon: 'h-5 w-5', button: 'p-1', text: 'text-sm' },
  lg: { icon: 'h-6 w-6', button: 'p-1.5', text: 'text-base' },
} as const;

export function VoteButtons({
  upvotes,
  downvotes,
  userVote,
  onVote,
  size = 'md',
}: VoteButtonsProps) {
  const score = upvotes - downvotes;
  const styles = SIZE_MAP[size];

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={() => onVote('up')}
        className={cn(
          'rounded-md transition-colors',
          styles.button,
          userVote === 'up'
            ? 'bg-emerald-100 text-emerald-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
        )}
        aria-label={userVote === 'up' ? 'Remove upvote' : 'Upvote'}
        aria-pressed={userVote === 'up'}
      >
        <ChevronUp className={styles.icon} />
      </button>

      <span
        className={cn(
          'font-semibold tabular-nums',
          styles.text,
          userVote === 'up' && 'text-emerald-600',
          userVote === 'down' && 'text-red-600',
          !userVote && 'text-gray-700'
        )}
      >
        {score}
      </span>

      <button
        onClick={() => onVote('down')}
        className={cn(
          'rounded-md transition-colors',
          styles.button,
          userVote === 'down'
            ? 'bg-red-100 text-red-600'
            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
        )}
        aria-label={userVote === 'down' ? 'Remove downvote' : 'Downvote'}
        aria-pressed={userVote === 'down'}
      >
        <ChevronDown className={styles.icon} />
      </button>
    </div>
  );
}
