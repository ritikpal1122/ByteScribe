import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { API_URL } from '@/lib/constants';

interface GitHubLoginButtonProps {
  text?: string;
  className?: string;
}

export function GitHubLoginButton({
  text = 'Continue with GitHub',
  className,
}: GitHubLoginButtonProps) {
  function handleClick() {
    window.location.href = `${API_URL}/auth/github`;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors',
        'hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2',
        className
      )}
    >
      <Github className="h-5 w-5" />
      {text}
    </button>
  );
}
