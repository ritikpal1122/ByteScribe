import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Loader2,
  Plus,
  Sparkles,
  Target,
} from 'lucide-react';
import { useStudyPlans, useGenerateStudyPlan } from '@/hooks/useStudyPlans';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import type { StudyPlan } from '@/api/studyPlans';

const diffColor: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-amber-400 bg-amber-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

function PlanCard({ plan }: { plan: StudyPlan }) {
  const pct = plan.item_count > 0 ? Math.round((plan.completed_count / plan.item_count) * 100) : 0;

  return (
    <Link
      to={`/study-plan/${plan.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{plan.title}</h3>
          {plan.target_role && (
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <Target className="w-3 h-3" />
              {plan.target_role}
              {plan.target_company && ` @ ${plan.target_company}`}
            </p>
          )}
        </div>
        {plan.is_ai_generated && (
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{plan.completed_count}/{plan.item_count} problems</span>
          <span className="font-semibold text-blue-500">{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        {plan.duration_weeks && <span>{plan.duration_weeks}w plan</span>}
        <span>{new Date(plan.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </Link>
  );
}

function GenerateModal({
  onClose,
  onGenerate,
  isGenerating,
}: {
  onClose: () => void;
  onGenerate: (role: string, company?: string) => void;
  isGenerating: boolean;
}) {
  const [targetRole, setTargetRole] = useState('');
  const [targetCompany, setTargetCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) return;
    onGenerate(targetRole.trim(), targetCompany.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold">Generate with AI</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Role *</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Frontend Engineer"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Company</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              placeholder="e.g., Google (optional)"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating || !targetRole.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MyStudyPlan() {
  const navigate = useNavigate();
  const { data: paginatedPlans, isLoading } = useStudyPlans();
  const generatePlan = useGenerateStudyPlan();
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const plans = paginatedPlans?.items ?? [];

  const handleGenerate = (targetRole: string, targetCompany?: string) => {
    generatePlan.mutate(
      {
        target_role: targetRole,
        target_company: targetCompany,
        duration_weeks: 4,
        topics: ['DSA', 'System Design'],
      },
      {
        onSuccess: (res) => {
          setShowGenerateModal(false);
          navigate(`/study-plan/${res.data.id}`);
        },
        onError: () => {
          // modal stays open on error
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading study plans..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-bold tracking-tight">My Learning Paths</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGenerateModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Generate with AI
            </button>
            <Link
              to="/study-plan/create"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Path
            </Link>
          </div>
        </div>

        {/* Plans grid */}
        {plans.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No learning paths yet"
            description="Create a custom learning path or generate one with AI to start tracking your progress."
            action={() => navigate('/study-plan/create')}
            actionLabel="Create Your First Path"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>

      {/* Generate modal */}
      {showGenerateModal && (
        <GenerateModal
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerate}
          isGenerating={generatePlan.isPending}
        />
      )}
    </div>
  );
}
