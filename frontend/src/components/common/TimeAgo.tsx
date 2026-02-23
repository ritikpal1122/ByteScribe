import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimeAgoProps {
  date: string | Date;
  className?: string;
}

export function TimeAgo({ date, className }: TimeAgoProps) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <time
      dateTime={parsedDate.toISOString()}
      title={parsedDate.toLocaleString()}
      className={cn('text-sm text-gray-500', className)}
    >
      {timeAgo}
    </time>
  );
}
