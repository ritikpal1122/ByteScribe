import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Zap,
  Trophy,
  Calendar,
  Frown,
  Smile,
} from 'lucide-react';
import { useDueCards, useReviewCard, useReviewStats } from '@/hooks/useSpacedRepetition';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { DueCard } from '@/api/spacedRepetition';

/* ------------------------------------------------------------------ */
/*  Difficulty badge gradient map                                      */
/* ------------------------------------------------------------------ */

const diffGradient: Record<string, string> = {
  easy: 'bg-gradient-to-r from-emerald-500 to-green-400 text-white',
  medium: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white',
  hard: 'bg-gradient-to-r from-red-500 to-rose-400 text-white',
};

/* ------------------------------------------------------------------ */
/*  Predicted interval helper                                          */
/* ------------------------------------------------------------------ */

function predictInterval(card: DueCard, quality: number): string {
  if (quality === 0) return '1d';
  const mult = quality === 2 ? 1.2 : quality === 3 ? 2.5 : 4;
  const days = Math.max(1, Math.round(card.interval_days * mult));
  return days >= 30 ? `${Math.round(days / 30)}mo` : `${days}d`;
}

/* ------------------------------------------------------------------ */
/*  StatsHeader — gradient tinted cards                                */
/* ------------------------------------------------------------------ */

const statConfigs = [
  {
    key: 'due_today',
    icon: Calendar,
    label: 'Due Today',
    gradient: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    key: 'total_cards',
    icon: Brain,
    label: 'Total Cards',
    gradient: 'from-purple-500/10 to-purple-600/5',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    key: 'mastered',
    icon: Trophy,
    label: 'Mastered',
    gradient: 'from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    key: 'upcoming_week',
    icon: Zap,
    label: 'This Week',
    gradient: 'from-green-500/10 to-green-600/5',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
] as const;

function StatsHeader() {
  const { data: stats } = useReviewStats();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
      {statConfigs.map((cfg, idx) => {
        const Icon = cfg.icon;
        const value = (stats as Record<string, number> | undefined)?.[cfg.key] ?? 0;
        return (
          <div
            key={cfg.key}
            className={`animate-fade-in-up rounded-xl bg-gradient-to-br ${cfg.gradient} border border-gray-200/60 p-4 shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default`}
            style={{ '--delay': `${idx * 80}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`rounded-lg ${cfg.iconBg} p-1.5`}>
                <Icon className={`h-4 w-4 ${cfg.iconColor}`} />
              </div>
              <span className="text-xs text-gray-500 font-medium">{cfg.label}</span>
            </div>
            <p className="text-3xl font-extrabold text-gray-900">{value}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flashcard — 3D flip with gradient border glow                      */
/* ------------------------------------------------------------------ */

function Flashcard({
  card,
  onRate,
  isReviewing,
}: {
  card: DueCard;
  onRate: (quality: number) => void;
  isReviewing: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  const ratingButtons = [
    {
      quality: 0,
      label: 'Again',
      icon: RotateCcw,
      gradient: 'from-red-500 to-rose-500',
      hoverGradient: 'hover:from-red-600 hover:to-rose-600',
    },
    {
      quality: 2,
      label: 'Hard',
      icon: Frown,
      gradient: 'from-amber-500 to-orange-500',
      hoverGradient: 'hover:from-amber-600 hover:to-orange-600',
    },
    {
      quality: 3,
      label: 'Good',
      icon: Smile,
      gradient: 'from-emerald-500 to-green-500',
      hoverGradient: 'hover:from-emerald-600 hover:to-green-600',
    },
    {
      quality: 5,
      label: 'Easy',
      icon: Zap,
      gradient: 'from-blue-500 to-indigo-500',
      hoverGradient: 'hover:from-blue-600 hover:to-indigo-600',
    },
  ];

  return (
    <div className="mx-auto max-w-xl animate-fade-in-up perspective-1000">
      <div
        className={`relative transition-transform duration-[600ms] preserve-3d ${flipped ? 'rotate-y-180' : ''}`}
        style={{ minHeight: '340px' }}
      >
        {/* ---- Front face ---- */}
        <div className="absolute inset-0 backface-hidden">
          <div className="rounded-2xl bg-white shadow-xl border border-gray-200/60 overflow-hidden h-full"
            style={{ boxShadow: '0 8px 32px rgba(99, 102, 241, 0.10), 0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <div className="p-8 text-center flex flex-col items-center justify-center h-full">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold capitalize mb-5 shadow-sm ${
                  diffGradient[card.problem_difficulty] ?? 'bg-gray-200 text-gray-700'
                }`}
              >
                {card.problem_difficulty}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {card.problem_title}
              </h2>
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                  {card.interval_days} day{card.interval_days !== 1 ? 's' : ''} interval
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                  {card.repetitions} rep{card.repetitions !== 1 ? 's' : ''}
                </span>
              </div>

              <button
                onClick={() => setFlipped(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Reveal Answer <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ---- Back face ---- */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="rounded-2xl bg-white shadow-xl border border-gray-200/60 overflow-hidden h-full"
            style={{ boxShadow: '0 8px 32px rgba(99, 102, 241, 0.10), 0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <div className="p-8 flex flex-col items-center justify-center h-full">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                How well do you remember?
              </p>
              <Link
                to={`/problems/${card.problem_slug}`}
                className="text-sm text-blue-600 hover:underline mb-8"
              >
                Go to problem →
              </Link>

              {/* Rating buttons */}
              <div className="grid grid-cols-4 gap-3 w-full max-w-md">
                {ratingButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.quality}
                      onClick={() => onRate(btn.quality)}
                      disabled={isReviewing}
                      className={`rounded-xl bg-gradient-to-b ${btn.gradient} ${btn.hoverGradient} px-3 py-4 text-center text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100`}
                    >
                      <Icon className="h-5 w-5 mx-auto mb-1.5" />
                      <span className="text-xs font-bold block">{btn.label}</span>
                      <span className="text-[10px] opacity-80 block mt-0.5">
                        {predictInterval(card, btn.quality)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function ReviewSession() {
  const { data: cards, isLoading } = useDueCards();
  const reviewMutation = useReviewCard();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRate = (quality: number) => {
    const card = cards?.[currentIndex];
    if (!card) return;
    reviewMutation.mutate(
      { cardId: card.id, quality },
      {
        onSuccess: () => {
          setCurrentIndex((prev) => prev + 1);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  const totalDue = cards?.length ?? 0;
  const currentCard = cards?.[currentIndex];
  const allDone = !currentCard || currentIndex >= totalDue;
  const progressPct = totalDue > 0 ? (Math.min(currentIndex, totalDue) / totalDue) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-7 w-7 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Spaced Repetition Review</h1>
        </div>
        <p className="text-gray-500">
          Review problems at optimal intervals to strengthen your memory.
        </p>
      </div>

      <StatsHeader />

      {/* Gradient progress bar */}
      {totalDue > 0 && (
        <div className="mb-8 animate-fade-in-up" style={{ '--delay': '320ms' } as React.CSSProperties}>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className="font-medium">Progress</span>
            <span className="font-semibold text-gray-700">
              {Math.min(currentIndex, totalDue)}/{totalDue} — {progressPct.toFixed(0)}%
            </span>
          </div>
          <div className="relative h-3 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)',
              }}
            />
          </div>
        </div>
      )}

      {/* Card or empty state */}
      {allDone ? (
        <div className="text-center py-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 mb-5 animate-scale-in shadow-lg">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            {totalDue === 0
              ? 'No cards due for review. Solve more problems to build your deck.'
              : "You've reviewed all due cards. Great work!"}
          </p>
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse-glow"
          >
            Solve Problems <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <Flashcard
          key={currentCard.id}
          card={currentCard}
          onRate={handleRate}
          isReviewing={reviewMutation.isPending}
        />
      )}
    </div>
  );
}
