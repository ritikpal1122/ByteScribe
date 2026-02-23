import { Link } from 'react-router-dom';
import { Code2, Github, Twitter } from 'lucide-react';

const FOOTER_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/legal', label: 'Terms & Privacy' },
] as const;

const SOCIAL_LINKS = [
  { href: 'https://github.com/learntext', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com/learntext', label: 'Twitter', icon: Twitter },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">
              LearnText
            </span>
            <span className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
