import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ListChecks,
  Clock,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  RefreshCw,
  Lock,
  LogIn,
  X,
} from 'lucide-react';
import { useRoadmap, useUpdateRoadmapProgress } from '@/hooks/useRoadmaps';
import { useAuthStore } from '@/stores/authStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import RoadmapVerticalView from '@/components/roadmaps/flow/RoadmapVerticalView';
import type { RoadmapNode } from '@/api/roadmaps';

/* ------------------------------------------------------------------ */
/*  LoginPromptModal                                                   */
/* ------------------------------------------------------------------ */

function LoginPromptModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-6 pt-6 pb-8 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Sign in to Continue</h3>
            <p className="text-blue-100 text-sm mt-1">
              Track your progress, mark steps as complete, and more.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-3">
            <button
              onClick={() => navigate('/login', { state: { from: `/roadmaps/${slug}` } })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => navigate('/register', { state: { from: `/roadmaps/${slug}` } })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors"
            >
              Create Account
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
            >
              Continue browsing
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionAccordion                                                   */
/* ------------------------------------------------------------------ */

function SectionAccordion({
  node,
  roadmapId,
  onToggle,
}: {
  node: RoadmapNode;
  roadmapId: string;
  onToggle: (nodeId: string, isCompleted: boolean) => void;
}) {
  const [open, setOpen] = useState(true);
  const children = node.children ?? [];
  const done = children.filter((s) => s.is_completed).length;
  const total = children.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          <h3 className="font-semibold text-gray-900">{node.title}</h3>
          {total > 0 && <span className="text-xs text-gray-500">{done}/{total} completed</span>}
        </div>
        {total > 0 && (
          <div className="flex items-center gap-3">
            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
          </div>
        )}
      </button>

      {open && children.length > 0 && (
        <div className="px-5 py-3 space-y-1 bg-white">
          {children.map((step) => (
            <div
              key={step.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <button
                className="mt-0.5 shrink-0"
                onClick={() => onToggle(step.id, !step.is_completed)}
              >
                {step.is_completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-sm font-medium ${step.is_completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {step.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {step.resource_url && (
                <a
                  href={step.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-2.5 py-1 rounded-md bg-gray-100 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open Resource
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {open && children.length === 0 && node.description && (
        <div className="px-5 py-3 bg-white">
          <p className="text-sm text-gray-500">{node.description}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  useMediaQuery                                                      */
/* ------------------------------------------------------------------ */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/* ------------------------------------------------------------------ */
/*  RoadmapDetail page                                                 */
/* ------------------------------------------------------------------ */

export default function RoadmapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuthStore();
  const { data: roadmap, isLoading, isError, refetch } = useRoadmap(slug ?? '');
  const updateProgress = useUpdateRoadmapProgress();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Compute set of step IDs due for review — must be before early returns (Rules of Hooks)
  const sections = roadmap?.nodes ?? [];
  const dueStepIds = useMemo(() => {
    const ids = new Set<string>();
    sections.forEach((section) => {
      (section.children ?? []).forEach((step) => {
        if (step.is_due_for_review) ids.add(step.id);
      });
    });
    return ids;
  }, [sections]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading roadmap..." />
      </div>
    );
  }

  if (isError || !roadmap) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load roadmap.{' '}
        <button onClick={() => refetch()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const pct = roadmap.progress_percentage;

  const handleToggle = (nodeId: string, isCompleted: boolean) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    updateProgress.mutate({ roadmapId: roadmap.slug, nodeId, isCompleted });
  };

  const dueReviewCount = roadmap.due_review_count ?? dueStepIds.size;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        to="/roadmaps"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Roadmaps
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">{roadmap.title}</h1>
        <p className="text-gray-500 mb-4">{roadmap.description}</p>

        <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
          <span className="flex items-center gap-1"><ListChecks className="w-4 h-4" /> {roadmap.total_nodes} steps</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> ~{roadmap.estimated_hours}h</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
            roadmap.difficulty === 'beginner' ? 'text-emerald-700 bg-emerald-50' :
            roadmap.difficulty === 'intermediate' ? 'text-amber-700 bg-amber-50' :
            'text-red-700 bg-red-50'
          }`}>
            {roadmap.difficulty}
          </span>
          {dueReviewCount > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-amber-700 bg-amber-50">
              <RefreshCw className="w-3 h-3" />
              {dueReviewCount} step{dueReviewCount !== 1 ? 's' : ''} due for review
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Your Progress</span>
          </div>
          <span className="text-sm font-semibold text-blue-600">{pct}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isAuthenticated
            ? `${roadmap.completed_nodes} of ${roadmap.total_nodes} steps completed`
            : 'Sign in to track your progress'}
        </p>
      </div>

      {/* Sections — vertical spine on desktop, accordion on mobile */}
      {isDesktop ? (
        <RoadmapVerticalView
          sections={sections}
          roadmapId={roadmap.id}
          onToggle={handleToggle}
          roadmapTitle={roadmap.title}
          dueStepIds={dueStepIds}
          isAuthenticated={isAuthenticated}
          onLoginRequired={() => setShowLoginPrompt(true)}
        />
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <SectionAccordion
              key={section.id}
              node={section}
              roadmapId={roadmap.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* Login prompt modal */}
      {showLoginPrompt && (
        <LoginPromptModal onClose={() => setShowLoginPrompt(false)} />
      )}
    </div>
  );
}
