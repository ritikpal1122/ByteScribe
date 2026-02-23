import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  name: string;
  color?: string;
  slug?: string;
  onClick?: () => void;
  className?: string;
}

const DEFAULT_COLORS = [
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-pink-100', text: 'text-pink-700' },
] as const;

function hashStringToIndex(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % DEFAULT_COLORS.length;
}

export function TagBadge({ name, color, slug, onClick, className }: TagBadgeProps) {
  const colorIndex = hashStringToIndex(name);
  const defaultColor = DEFAULT_COLORS[colorIndex];

  const baseClasses = cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
    color
      ? color
      : `${defaultColor.bg} ${defaultColor.text}`,
    (slug || onClick) && 'cursor-pointer hover:opacity-80',
    className
  );

  if (slug) {
    return (
      <Link to={`/tags/${slug}`} className={baseClasses}>
        {name}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClasses}>
        {name}
      </button>
    );
  }

  return <span className={baseClasses}>{name}</span>;
}
