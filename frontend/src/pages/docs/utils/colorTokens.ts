/* ================================================================== */
/*  Color Tokens Per Language                                          */
/* ================================================================== */

export interface LangColorTokens {
  bg: string;
  bgSubtle: string;
  bgHover: string;
  bgActive: string;
  text: string;
  textActive: string;
  border: string;
  borderActive: string;
  accent: string;
  badge: string;
  ring: string;
  tabActive: string;
  bannerFrom: string;
  bannerTo: string;
}

export const LANG_COLORS: Record<string, LangColorTokens> = {
  python: {
    bg: 'bg-yellow-50',
    bgSubtle: 'bg-yellow-50/50',
    bgHover: 'hover:bg-yellow-50',
    bgActive: 'bg-yellow-100/70',
    text: 'text-yellow-700',
    textActive: 'text-yellow-800',
    border: 'border-yellow-200',
    borderActive: 'border-yellow-400',
    accent: 'bg-yellow-500',
    badge: 'bg-yellow-100 text-yellow-700',
    ring: 'ring-yellow-500/20',
    tabActive: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    bannerFrom: 'from-yellow-100',
    bannerTo: 'to-yellow-50',
  },
  javascript: {
    bg: 'bg-amber-50',
    bgSubtle: 'bg-amber-50/50',
    bgHover: 'hover:bg-amber-50',
    bgActive: 'bg-amber-100/70',
    text: 'text-amber-700',
    textActive: 'text-amber-800',
    border: 'border-amber-200',
    borderActive: 'border-amber-400',
    accent: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-700',
    ring: 'ring-amber-500/20',
    tabActive: 'bg-amber-100 border-amber-400 text-amber-800',
    bannerFrom: 'from-amber-100',
    bannerTo: 'to-amber-50',
  },
  cpp: {
    bg: 'bg-blue-50',
    bgSubtle: 'bg-blue-50/50',
    bgHover: 'hover:bg-blue-50',
    bgActive: 'bg-blue-100/70',
    text: 'text-blue-700',
    textActive: 'text-blue-800',
    border: 'border-blue-200',
    borderActive: 'border-blue-400',
    accent: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    ring: 'ring-blue-500/20',
    tabActive: 'bg-blue-100 border-blue-400 text-blue-800',
    bannerFrom: 'from-blue-100',
    bannerTo: 'to-blue-50',
  },
  java: {
    bg: 'bg-red-50',
    bgSubtle: 'bg-red-50/50',
    bgHover: 'hover:bg-red-50',
    bgActive: 'bg-red-100/70',
    text: 'text-red-700',
    textActive: 'text-red-800',
    border: 'border-red-200',
    borderActive: 'border-red-400',
    accent: 'bg-red-500',
    badge: 'bg-red-100 text-red-700',
    ring: 'ring-red-500/20',
    tabActive: 'bg-red-100 border-red-400 text-red-800',
    bannerFrom: 'from-red-100',
    bannerTo: 'to-red-50',
  },
  go: {
    bg: 'bg-cyan-50',
    bgSubtle: 'bg-cyan-50/50',
    bgHover: 'hover:bg-cyan-50',
    bgActive: 'bg-cyan-100/70',
    text: 'text-cyan-700',
    textActive: 'text-cyan-800',
    border: 'border-cyan-200',
    borderActive: 'border-cyan-400',
    accent: 'bg-cyan-500',
    badge: 'bg-cyan-100 text-cyan-700',
    ring: 'ring-cyan-500/20',
    tabActive: 'bg-cyan-100 border-cyan-400 text-cyan-800',
    bannerFrom: 'from-cyan-100',
    bannerTo: 'to-cyan-50',
  },
  rust: {
    bg: 'bg-orange-50',
    bgSubtle: 'bg-orange-50/50',
    bgHover: 'hover:bg-orange-50',
    bgActive: 'bg-orange-100/70',
    text: 'text-orange-700',
    textActive: 'text-orange-800',
    border: 'border-orange-200',
    borderActive: 'border-orange-400',
    accent: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-700',
    ring: 'ring-orange-500/20',
    tabActive: 'bg-orange-100 border-orange-400 text-orange-800',
    bannerFrom: 'from-orange-100',
    bannerTo: 'to-orange-50',
  },
  typescript: {
    bg: 'bg-sky-50',
    bgSubtle: 'bg-sky-50/50',
    bgHover: 'hover:bg-sky-50',
    bgActive: 'bg-sky-100/70',
    text: 'text-sky-700',
    textActive: 'text-sky-800',
    border: 'border-sky-200',
    borderActive: 'border-sky-400',
    accent: 'bg-sky-500',
    badge: 'bg-sky-100 text-sky-700',
    ring: 'ring-sky-500/20',
    tabActive: 'bg-sky-100 border-sky-400 text-sky-800',
    bannerFrom: 'from-sky-100',
    bannerTo: 'to-sky-50',
  },
  selenium: {
    bg: 'bg-emerald-50',
    bgSubtle: 'bg-emerald-50/50',
    bgHover: 'hover:bg-emerald-50',
    bgActive: 'bg-emerald-100/70',
    text: 'text-emerald-700',
    textActive: 'text-emerald-800',
    border: 'border-emerald-200',
    borderActive: 'border-emerald-400',
    accent: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
    ring: 'ring-emerald-500/20',
    tabActive: 'bg-emerald-100 border-emerald-400 text-emerald-800',
    bannerFrom: 'from-emerald-100',
    bannerTo: 'to-emerald-50',
  },
  playwright: {
    bg: 'bg-violet-50',
    bgSubtle: 'bg-violet-50/50',
    bgHover: 'hover:bg-violet-50',
    bgActive: 'bg-violet-100/70',
    text: 'text-violet-700',
    textActive: 'text-violet-800',
    border: 'border-violet-200',
    borderActive: 'border-violet-400',
    accent: 'bg-violet-500',
    badge: 'bg-violet-100 text-violet-700',
    ring: 'ring-violet-500/20',
    tabActive: 'bg-violet-100 border-violet-400 text-violet-800',
    bannerFrom: 'from-violet-100',
    bannerTo: 'to-violet-50',
  },
  git: {
    bg: 'bg-rose-50',
    bgSubtle: 'bg-rose-50/50',
    bgHover: 'hover:bg-rose-50',
    bgActive: 'bg-rose-100/70',
    text: 'text-rose-700',
    textActive: 'text-rose-800',
    border: 'border-rose-200',
    borderActive: 'border-rose-400',
    accent: 'bg-rose-500',
    badge: 'bg-rose-100 text-rose-700',
    ring: 'ring-rose-500/20',
    tabActive: 'bg-rose-100 border-rose-400 text-rose-800',
    bannerFrom: 'from-rose-100',
    bannerTo: 'to-rose-50',
  },
  docker: {
    bg: 'bg-teal-50',
    bgSubtle: 'bg-teal-50/50',
    bgHover: 'hover:bg-teal-50',
    bgActive: 'bg-teal-100/70',
    text: 'text-teal-700',
    textActive: 'text-teal-800',
    border: 'border-teal-200',
    borderActive: 'border-teal-400',
    accent: 'bg-teal-500',
    badge: 'bg-teal-100 text-teal-700',
    ring: 'ring-teal-500/20',
    tabActive: 'bg-teal-100 border-teal-400 text-teal-800',
    bannerFrom: 'from-teal-100',
    bannerTo: 'to-teal-50',
  },
  kubernetes: {
    bg: 'bg-indigo-50',
    bgSubtle: 'bg-indigo-50/50',
    bgHover: 'hover:bg-indigo-50',
    bgActive: 'bg-indigo-100/70',
    text: 'text-indigo-700',
    textActive: 'text-indigo-800',
    border: 'border-indigo-200',
    borderActive: 'border-indigo-400',
    accent: 'bg-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700',
    ring: 'ring-indigo-500/20',
    tabActive: 'bg-indigo-100 border-indigo-400 text-indigo-800',
    bannerFrom: 'from-indigo-100',
    bannerTo: 'to-indigo-50',
  },
};

export function getColors(langId: string): LangColorTokens {
  return LANG_COLORS[langId] ?? LANG_COLORS.python!;
}

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export const DIFFICULTY_DOT_COLORS: Record<string, string> = {
  beginner: 'bg-green-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-red-400',
};

export const PLAYGROUND_URLS: Record<string, string> = {
  python: 'https://www.online-python.com/',
  javascript: 'https://jsfiddle.net/',
  typescript: 'https://www.typescriptlang.org/play',
  cpp: 'https://godbolt.org/',
  java: 'https://www.jdoodle.com/online-java-compiler/',
  go: 'https://go.dev/play/',
  rust: 'https://play.rust-lang.org/',
};
