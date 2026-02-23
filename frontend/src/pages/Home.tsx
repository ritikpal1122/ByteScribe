import { Link } from 'react-router-dom';
import {
  Code,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Map,
  Trophy,
  Zap,
  Terminal,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: Code,
    title: 'Coding Problems',
    description:
      'Practice with thousands of real interview problems across all difficulty levels.',
    accent: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.1)',
    link: '/problems',
  },
  {
    icon: BookOpen,
    title: 'Articles & Guides',
    description:
      'In-depth tutorials and guides written by experienced engineers.',
    accent: '#10b981',
    iconBg: 'rgba(16,185,129,0.1)',
    link: '/articles',
  },
  {
    icon: MessageSquare,
    title: 'Mock Interviews',
    description:
      'Simulate real interviews with AI-powered mock sessions and peer matching.',
    accent: '#8b5cf6',
    iconBg: 'rgba(139,92,246,0.1)',
    link: '/problems',
  },
  {
    icon: HelpCircle,
    title: 'Q&A Forum',
    description:
      'Ask questions, share knowledge, and learn from the community.',
    accent: '#f59e0b',
    iconBg: 'rgba(245,158,11,0.1)',
    link: '/articles',
  },
  {
    icon: Map,
    title: 'Study Plans',
    description:
      'Structured roadmaps to guide your learning journey from beginner to expert.',
    accent: '#f43f5e',
    iconBg: 'rgba(244,63,94,0.1)',
    link: '/roadmap',
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description:
      'Earn XP, badges, and climb the leaderboard as you master new skills.',
    accent: '#06b6d4',
    iconBg: 'rgba(6,182,212,0.1)',
    link: '/roadmap',
  },
];

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    num: '01',
    title: 'Pick your path',
    description: 'Choose from curated study plans tailored to your goal — FAANG prep, system design, or full-stack mastery.',
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
  {
    num: '02',
    title: 'Solve & learn',
    description: 'Work through problems with real-time feedback, detailed explanations, and AI-powered hints when you\'re stuck.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
  {
    num: '03',
    title: 'Track & level up',
    description: 'Watch your progress grow with streaks, XP, badges, and a visual roadmap showing exactly where you stand.',
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
];

/* ------------------------------------------------------------------ */
/*  Code lines for the editor                                          */
/* ------------------------------------------------------------------ */

const CODE_LINES: React.ReactNode[] = [
  <>
    <span className="text-purple-400">function</span>{' '}
    <span className="text-blue-300">twoSum</span>
    <span className="text-slate-300">(</span>
    <span className="text-orange-300">nums</span>
    <span className="text-slate-500">: number[]</span>
    <span className="text-slate-300">, </span>
    <span className="text-orange-300">target</span>
    <span className="text-slate-500">: number</span>
    <span className="text-slate-300">)</span>{' '}
    <span className="text-slate-300">{'{'}</span>
  </>,
  <>
    <span className="pl-4">
      <span className="text-purple-400">const</span>{' '}
      <span className="text-blue-300">map</span>{' '}
      <span className="text-slate-300">=</span>{' '}
      <span className="text-purple-400">new</span>{' '}
      <span className="text-green-300">Map</span>
      <span className="text-slate-300">();</span>
    </span>
  </>,
  <>
    <span className="pl-4">
      <span className="text-purple-400">for</span>{' '}
      <span className="text-slate-300">(</span>
      <span className="text-purple-400">let</span>{' '}
      <span className="text-blue-300">i</span>{' '}
      <span className="text-slate-300">= 0; i {'<'} nums.length; i++)</span>{' '}
      <span className="text-slate-300">{'{'}</span>
    </span>
  </>,
  <>
    <span className="pl-8">
      <span className="text-purple-400">if</span>{' '}
      <span className="text-slate-300">(map.</span>
      <span className="text-green-300">has</span>
      <span className="text-slate-300">(target - nums[i]))</span>
    </span>
  </>,
  <>
    <span className="pl-12">
      <span className="text-purple-400">return</span>{' '}
      <span className="text-slate-300">[map.</span>
      <span className="text-green-300">get</span>
      <span className="text-slate-300">(target - nums[i]), i];</span>
    </span>
  </>,
  <>
    <span className="pl-8">
      <span className="text-slate-300">map.</span>
      <span className="text-green-300">set</span>
      <span className="text-slate-300">(nums[i], i);</span>
    </span>
  </>,
  <>
    <span className="pl-4">
      <span className="text-slate-300">{'}'}</span>
    </span>
  </>,
  <>
    <span className="text-slate-300">{'}'}</span>
    <span className="animate-cursor-blink ml-0.5" />
  </>,
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-grid relative w-full overflow-hidden border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16 lg:px-10 lg:py-28">
          {/* Left column */}
          <div className="flex flex-col items-start">
            <div
              className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
              style={{ '--delay': '0ms' } as React.CSSProperties}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
              Introducing LearnText
            </div>

            <h1
              className="animate-fade-in-up text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl lg:text-6xl"
              style={{ '--delay': '100ms' } as React.CSSProperties}
            >
              The{' '}
              <span className="text-gradient-hero">smartest, fastest</span>{' '}
              way to master tech skills
            </h1>

            <p
              className="animate-fade-in-up mt-6 max-w-lg text-lg leading-8 text-gray-500"
              style={{ '--delay': '200ms' } as React.CSSProperties}
            >
              From your first algorithm to system design mastery — a structured
              path built for <span className="font-semibold text-gray-900">engineers who ship</span>.
            </p>

            <div
              className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-3"
              style={{ '--delay': '300ms' } as React.CSSProperties}
            >
              <Link
                to="/register"
                className="animate-pulse-glow inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <Zap className="h-4 w-4" />
                Get started now
              </Link>
              <Link
                to="/problems"
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Browse Problems
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:opacity-100" />
              </Link>
              <Link
                to="/articles"
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Read Articles
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:opacity-100" />
              </Link>
            </div>
          </div>

          {/* Right column — code editor */}
          <div className="relative">
            <div className="glow-border-subtle overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center border-b border-slate-700 bg-slate-800/50 px-2 text-xs">
                <div className="flex items-center gap-1.5 border-b-2 border-blue-400 px-3 py-2 text-slate-200">
                  <FileText className="h-3 w-3" />
                  twoSum.ts
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 text-slate-500">
                  <FileText className="h-3 w-3" />
                  utils.ts
                </div>
              </div>
              <div className="p-5 font-mono text-sm leading-7">
                {CODE_LINES.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 w-5 shrink-0 select-none text-right text-slate-600">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 bg-slate-800 px-4 py-3">
                <div className="flex items-center gap-2 text-xs">
                  <Terminal className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-green-400">All tests passed</span>
                  <span className="text-slate-500">— 3/3 test cases</span>
                  <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-green-400" />
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div
              className="animate-fade-in-up absolute -right-3 -top-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:-right-6 sm:-top-5"
              style={{ '--delay': '400ms', borderLeft: '3px solid #3b82f6' } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Your Streak</p>
                  <p className="text-lg font-bold text-gray-900">42 days</p>
                </div>
              </div>
            </div>

            <div
              className="animate-fade-in-up absolute -bottom-3 -left-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:-bottom-5 sm:-left-6"
              style={{ '--delay': '500ms', borderLeft: '3px solid #f59e0b' } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Problems Solved</p>
                  <p className="text-lg font-bold text-gray-900">1,247</p>
                </div>
              </div>
            </div>

            <div
              className="animate-fade-in-up absolute -bottom-8 right-8 hidden rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:block"
              style={{ '--delay': '600ms', borderLeft: '3px solid #10b981' } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Community</p>
                  <p className="text-lg font-bold text-gray-900">100K+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50/80">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="animated-gradient-line flex-1 max-w-[120px]" />
            <span className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              How it works
            </span>
            <div className="animated-gradient-line flex-1 max-w-[120px]" />
          </div>

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three steps to <span className="text-gradient-hero">mastery</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              No fluff, no filler. A proven system used by engineers at top companies.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="animate-fade-in-up group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg"
                style={{ '--delay': `${i * 120 + 100}ms` } as React.CSSProperties}
              >
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md"
                  style={{ background: step.gradient }}
                >
                  {step.num}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="animated-gradient-line flex-1 max-w-[120px]" />
          <span className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Features
          </span>
          <div className="animated-gradient-line flex-1 max-w-[120px]" />
        </div>

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to <span className="text-gradient-hero">succeed</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            A comprehensive toolkit designed for aspiring and senior engineers alike.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:shadow-lg"
              style={{ '--delay': `${index * 80 + 100}ms` } as React.CSSProperties}
            >
              {/* Top accent line — visible on hover */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: feature.accent }}
              />

              {/* Hover chevron */}
              <ChevronRight
                className="absolute right-5 top-7 h-4 w-4 text-gray-300 opacity-0 transition-all duration-300 group-hover:opacity-100"
              />

              {/* Icon */}
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: feature.iconBg }}
              >
                <feature.icon className="h-5 w-5" style={{ color: feature.accent }} />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>

              {/* Learn more — appears on hover */}
              <span
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100"
                style={{ color: feature.accent }}
              >
                Learn more
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28 lg:px-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-blue-300" style={{ border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.1)' }}>
            <Zap className="h-3.5 w-3.5" />
            Free forever to start
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to level up your{' '}
            <span className="text-gradient-hero">engineering skills</span>?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
            Join 100,000+ engineers already building their future. Start solving problems, reading guides, and tracking your growth today.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Zap className="h-4 w-4" />
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/problems"
              className="group/btn inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:text-white"
              style={{ border: '1px solid rgba(100,116,139,0.4)' }}
            >
              Explore problems
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:opacity-100" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
