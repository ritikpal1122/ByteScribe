import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  Search,
  ListChecks,
  ArrowRight,
  Clock,
  Code2,
  Server,
  Layout,
  Database,
  Shield,
  Smartphone,
  Brain,
  Layers,
  Trophy,
  Network,
  Cpu,
  BookOpen,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { useRoadmaps } from '@/hooks/useRoadmaps';
import { useDebounce } from '@/hooks/useDebounce';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { cn } from '@/lib/utils';
import type { RoadmapListItem } from '@/api/roadmaps';

/* ------------------------------------------------------------------ */
/*  Icon & color config per roadmap category                           */
/* ------------------------------------------------------------------ */

type IconType = typeof Code2;

const categoryConfig: Record<string, { icon: IconType; gradient: string; bg: string; accent: string; glow: string }> = {
  'data-structures':  { icon: Code2,      gradient: 'from-violet-500 to-purple-600',  bg: 'bg-violet-50',  accent: 'text-violet-600',  glow: 'shadow-violet-500/20' },
  'frontend':         { icon: Layout,     gradient: 'from-blue-500 to-cyan-500',      bg: 'bg-blue-50',    accent: 'text-blue-600',    glow: 'shadow-blue-500/20' },
  'backend':          { icon: Server,     gradient: 'from-emerald-500 to-teal-600',   bg: 'bg-emerald-50', accent: 'text-emerald-600', glow: 'shadow-emerald-500/20' },
  'system-design':    { icon: Network,    gradient: 'from-orange-500 to-amber-500',   bg: 'bg-orange-50',  accent: 'text-orange-600',  glow: 'shadow-orange-500/20' },
  'devops':           { icon: Layers,     gradient: 'from-cyan-500 to-blue-600',      bg: 'bg-cyan-50',    accent: 'text-cyan-600',    glow: 'shadow-cyan-500/20' },
  'machine-learning': { icon: Brain,      gradient: 'from-pink-500 to-rose-600',      bg: 'bg-pink-50',    accent: 'text-pink-600',    glow: 'shadow-pink-500/20' },
  'full-stack':       { icon: Cpu,        gradient: 'from-indigo-500 to-violet-600',  bg: 'bg-indigo-50',  accent: 'text-indigo-600',  glow: 'shadow-indigo-500/20' },
  'cybersecurity':    { icon: Shield,     gradient: 'from-red-500 to-rose-600',       bg: 'bg-red-50',     accent: 'text-red-600',     glow: 'shadow-red-500/20' },
  'mobile':           { icon: Smartphone, gradient: 'from-teal-500 to-emerald-500',   bg: 'bg-teal-50',    accent: 'text-teal-600',    glow: 'shadow-teal-500/20' },
  'database':         { icon: Database,   gradient: 'from-amber-500 to-orange-600',   bg: 'bg-amber-50',   accent: 'text-amber-600',   glow: 'shadow-amber-500/20' },
  'competitive':      { icon: Trophy,     gradient: 'from-yellow-500 to-amber-500',   bg: 'bg-yellow-50',  accent: 'text-yellow-600',  glow: 'shadow-yellow-500/20' },
  'api-design':       { icon: Network,    gradient: 'from-sky-500 to-blue-600',       bg: 'bg-sky-50',     accent: 'text-sky-600',     glow: 'shadow-sky-500/20' },
};

function getCategoryKey(title: string): string {
  const l = title.toLowerCase();
  if (l.includes('data structure') || l.includes('algorithm')) return 'data-structures';
  if (l.includes('frontend')) return 'frontend';
  if (l.includes('backend')) return 'backend';
  if (l.includes('system design')) return 'system-design';
  if (l.includes('devops') || l.includes('cloud')) return 'devops';
  if (l.includes('machine learning')) return 'machine-learning';
  if (l.includes('full stack')) return 'full-stack';
  if (l.includes('cybersecurity') || l.includes('security')) return 'cybersecurity';
  if (l.includes('mobile')) return 'mobile';
  if (l.includes('database')) return 'database';
  if (l.includes('competitive')) return 'competitive';
  if (l.includes('api') || l.includes('microservice')) return 'api-design';
  return 'data-structures';
}

/* ------------------------------------------------------------------ */
/*  Difficulty config                                                   */
/* ------------------------------------------------------------------ */

const diffConfig: Record<string, { label: string; color: string; dot: string; filterBg: string }> = {
  beginner:     { label: 'Beginner',     color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', filterBg: 'bg-emerald-500' },
  intermediate: { label: 'Intermediate', color: 'text-amber-700 bg-amber-50 border-amber-200',     dot: 'bg-amber-500',   filterBg: 'bg-amber-500' },
  advanced:     { label: 'Advanced',     color: 'text-red-700 bg-red-50 border-red-200',           dot: 'bg-red-500',     filterBg: 'bg-red-500' },
};

const DIFFICULTY_FILTERS = [
  { value: '', label: 'All Levels', emoji: '🎯' },
  { value: 'beginner', label: 'Beginner', emoji: '🌱' },
  { value: 'intermediate', label: 'Intermediate', emoji: '🔥' },
  { value: 'advanced', label: 'Advanced', emoji: '🚀' },
] as const;

/* ------------------------------------------------------------------ */
/*  Animated RoadmapCard                                               */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

function RoadmapCard({ roadmap, index }: { roadmap: RoadmapListItem; index: number }) {
  const key = getCategoryKey(roadmap.title);
  const config = categoryConfig[key] || categoryConfig['data-structures'];
  const diff = diffConfig[roadmap.difficulty] || diffConfig.beginner;
  const Icon = config.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      layoutId={roadmap.id}
    >
      <Link
        to={`/roadmaps/${roadmap.slug}`}
        className="group relative flex flex-col h-full rounded-2xl border border-gray-200/80 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* Gradient header */}
        <div className={cn('relative h-24 bg-gradient-to-br overflow-hidden', config.gradient)}>
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10" />

          {/* Icon */}
          <motion.div
            className="absolute bottom-4 left-5 flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Estimated hours badge */}
          {roadmap.estimated_hours > 0 && (
            <div className="absolute top-3 left-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-medium text-white">
              <Clock className="w-3 h-3" />
              {roadmap.estimated_hours}h
            </div>
          )}

          {/* Progress badge */}
          {roadmap.progress_percentage > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.06, type: 'spring', stiffness: 200 }}
              className="absolute top-3 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm text-[11px] font-bold text-white"
            >
              <TrendingUp className="w-3 h-3" />
              {roadmap.progress_percentage}%
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 pt-4">
          {/* Title */}
          <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
            {roadmap.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-4">
            {roadmap.description}
          </p>

          {/* Tags row */}
          <div className="flex items-center gap-2 flex-wrap mt-auto mb-4">
            <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border', diff.color)}>
              <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', diff.dot)} />
              {diff.label}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <ListChecks className="w-3.5 h-3.5" />
              {roadmap.total_nodes} steps
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={cn('h-full rounded-full bg-gradient-to-r', config.gradient)}
                initial={{ width: 0 }}
                animate={{ width: `${roadmap.progress_percentage}%` }}
                transition={{ delay: 0.4 + index * 0.06, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <motion.div
              className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors"
              whileHover={{ x: 3 }}
            >
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating particle background (subtle)                              */
/* ------------------------------------------------------------------ */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/20"
          initial={{
            x: `${15 + i * 15}%`,
            y: '100%',
            opacity: 0,
          }}
          animate={{
            y: '-10%',
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty state with animation                                         */
/* ------------------------------------------------------------------ */

function AnimatedEmptyState({ search }: { search: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100"
      >
        <Map className="w-7 h-7 text-gray-400" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">No roadmaps found</h3>
      <p className="text-sm text-gray-500">
        {search ? 'Try a different search query.' : 'No roadmaps available for this difficulty level.'}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton loader                                                    */
/* ------------------------------------------------------------------ */

function CardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden"
    >
      <div className="h-24 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
      <div className="p-5 pt-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  RoadmapsIndex page                                                 */
/* ------------------------------------------------------------------ */

export default function RoadmapsIndex() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, refetch } = useRoadmaps(
    page,
    20,
    (difficulty as 'beginner' | 'intermediate' | 'advanced') || undefined,
    debouncedSearch || undefined,
  );

  const roadmaps = data?.items ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 overflow-hidden"
      >
        <FloatingParticles />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 mb-3"
          >
            <motion.div
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Map className="w-5.5 h-5.5 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Learning Roadmaps</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-blue-100 text-sm max-w-lg leading-relaxed ml-14"
          >
            Follow curated, step-by-step paths to master new skills. Track your progress and level up from beginner to expert.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-6 mt-5 ml-14"
          >
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Sparkles className="w-4 h-4" />
              <span><strong className="text-white">{roadmaps.length || '...'}</strong> Paths</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <BookOpen className="w-4 h-4" />
              <span><strong className="text-white">3</strong> Difficulty Levels</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 right-20 w-24 h-24 rounded-full bg-white/5" />
      </motion.div>

      {/* Filters bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8"
      >
        {/* Search */}
        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search roadmaps..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Difficulty pills */}
        <div className="flex items-center gap-1.5 bg-gray-100/80 rounded-xl p-1">
          {DIFFICULTY_FILTERS.map((f) => (
            <motion.button
              key={f.value}
              onClick={() => { setDifficulty(f.value); setPage(1); }}
              className={cn(
                'relative px-3.5 py-2 rounded-lg text-xs font-medium transition-all',
                difficulty === f.value
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              )}
              whileTap={{ scale: 0.95 }}
            >
              {difficulty === f.value && (
                <motion.div
                  layoutId="activeDifficultyFilter"
                  className="absolute inset-0 bg-gray-900 rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{f.emoji}</span>
                {f.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} index={i} />
          ))}
        </div>
      ) : isError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-500"
        >
          Failed to load roadmaps.{' '}
          <button onClick={() => refetch()} className="text-blue-600 hover:underline font-medium">
            Retry
          </button>
        </motion.div>
      ) : roadmaps.length === 0 ? (
        <AnimatedEmptyState search={search} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${difficulty}-${debouncedSearch}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Results count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mb-5"
            >
              Showing <strong className="text-gray-700">{roadmaps.length}</strong> roadmap{roadmaps.length !== 1 ? 's' : ''}
              {difficulty && <span className="ml-1">for <strong className="text-gray-700 capitalize">{difficulty}</strong> level</span>}
            </motion.p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {roadmaps.map((rm, i) => (
                <RoadmapCard key={rm.id} roadmap={rm} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </motion.div>
      )}
    </div>
  );
}
