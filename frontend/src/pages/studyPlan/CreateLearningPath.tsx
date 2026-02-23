import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateStudyPlan } from '@/hooks/useStudyPlans';
import { useProblems } from '@/hooks/useProblems';
import type { ProblemListItem } from '@/types';

const STEPS = ['Details', 'Add Problems', 'Organize', 'Review'];

const diffColor: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  hard: 'text-red-400 bg-red-400/10',
};

interface SelectedProblem {
  problem_id: string;
  title: string;
  difficulty: string;
  section: string;
}

export default function CreateLearningPath() {
  const navigate = useNavigate();
  const createPlan = useCreateStudyPlan();

  // Step state
  const [step, setStep] = useState(0);

  // Step 1: Plan details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [durationWeeks, setDurationWeeks] = useState(4);

  // Step 2: Problem picker
  const [searchQuery, setSearchQuery] = useState('');
  const [diffFilter, setDiffFilter] = useState<'easy' | 'medium' | 'hard' | undefined>();
  const [selected, setSelected] = useState<SelectedProblem[]>([]);

  // Step 3: Organize
  const [newSection, setNewSection] = useState('');

  const { data: problemsData, isLoading: problemsLoading } = useProblems(
    1,
    50,
    diffFilter,
    undefined,
    searchQuery || undefined,
  );

  const problems = problemsData?.items ?? [];

  const selectedIds = useMemo(() => new Set(selected.map((s) => s.problem_id)), [selected]);

  const sections = useMemo(() => {
    const map = new Map<string, SelectedProblem[]>();
    for (const item of selected) {
      const list = map.get(item.section) || [];
      list.push(item);
      map.set(item.section, list);
    }
    return map;
  }, [selected]);

  // Handlers
  const toggleProblem = (p: ProblemListItem) => {
    if (selectedIds.has(p.id)) {
      setSelected((prev) => prev.filter((s) => s.problem_id !== p.id));
    } else {
      setSelected((prev) => [
        ...prev,
        { problem_id: p.id, title: p.title, difficulty: p.difficulty, section: 'General' },
      ]);
    }
  };

  const removeSelected = (id: string) => {
    setSelected((prev) => prev.filter((s) => s.problem_id !== id));
  };

  const changeProblemSection = (problemId: string, section: string) => {
    setSelected((prev) =>
      prev.map((s) => (s.problem_id === problemId ? { ...s, section } : s)),
    );
  };

  const addSection = () => {
    if (!newSection.trim()) return;
    // Just adding a section means moving at least one item — for now just store it
    setNewSection('');
    toast.success(`Section "${newSection.trim()}" ready to use`);
  };

  const canNext = () => {
    if (step === 0) return title.trim().length > 0;
    if (step === 1) return selected.length > 0;
    return true;
  };

  const handleSubmit = () => {
    const items = selected.map((s, idx) => ({
      title: s.title,
      problem_id: s.problem_id,
      difficulty: s.difficulty,
      section: s.section,
      day_number: 1,
      order: idx,
    }));

    createPlan.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
        target_role: targetRole.trim() || undefined,
        target_company: targetCompany.trim() || undefined,
        duration_weeks: durationWeeks,
      },
      {
        onSuccess: (res) => {
          toast.success('Learning path created!');
          navigate(`/study-plan/${res.data.id}`);
        },
        onError: () => {
          toast.error('Failed to create learning path');
        },
      },
    );
  };

  const sectionNames = useMemo(() => {
    const names = new Set<string>();
    for (const s of selected) names.add(s.section);
    return Array.from(names);
  }, [selected]);

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/study-plan')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <BookOpen className="w-7 h-7 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight">Create Learning Path</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => idx < step && setStep(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  idx === step
                    ? 'bg-blue-600 text-white'
                    : idx < step
                      ? 'bg-blue-100 text-blue-700 cursor-pointer'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {idx < step ? <Check className="w-3.5 h-3.5" /> : <span>{idx + 1}</span>}
                <span className="hidden sm:inline">{label}</span>
              </button>
              {idx < STEPS.length - 1 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        {/* Step 1: Details */}
        {step === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-semibold">Plan Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My DSA Interview Prep"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="What is this learning path about?"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Frontend Engineer"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Company</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g., Google"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
              <input
                type="number"
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Math.max(1, Math.min(52, parseInt(e.target.value) || 1)))}
                min={1}
                max={52}
                className="w-32 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        )}

        {/* Step 2: Problem Picker */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div className="flex gap-2">
                {(['easy', 'medium', 'hard'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiffFilter(diffFilter === d ? undefined : d)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      diffFilter === d
                        ? diffColor[d]
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected count */}
            {selected.length > 0 && (
              <div className="text-sm text-gray-500">
                {selected.length} problem{selected.length > 1 ? 's' : ''} selected
              </div>
            )}

            {/* Problem list */}
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {problemsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : problems.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-10">No problems found</div>
              ) : (
                problems.map((p) => {
                  const isSelected = selectedIds.has(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProblem(p)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                        isSelected ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{p.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {p.tags?.slice(0, 3).map((t) => (
                            <span key={t} className="text-xs text-gray-400">{t}</span>
                          ))}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          diffColor[p.difficulty] || ''
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Step 3: Organize into sections */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Section</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  placeholder="e.g., Week 1: Arrays"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  onKeyDown={(e) => e.key === 'Enter' && addSection()}
                />
                <button
                  onClick={addSection}
                  disabled={!newSection.trim()}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {Array.from(sections.entries()).map(([sectionName, items]) => (
              <div key={sectionName} className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{sectionName}</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.problem_id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-100 bg-gray-50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 truncate">{item.title}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[item.difficulty] || ''}`}>
                        {item.difficulty}
                      </span>
                      <select
                        value={item.section}
                        onChange={(e) => changeProblemSection(item.problem_id, e.target.value)}
                        className="text-xs rounded border border-gray-200 px-2 py-1 bg-white"
                      >
                        {sectionNames.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                        {newSection.trim() && !sectionNames.includes(newSection.trim()) && (
                          <option value={newSection.trim()}>{newSection.trim()}</option>
                        )}
                      </select>
                      <button
                        onClick={() => removeSelected(item.problem_id)}
                        className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {selected.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-10">
                No problems selected. Go back and add some.
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-semibold">Review Your Learning Path</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name</span>
                <p className="font-medium text-gray-900">{title}</p>
              </div>
              <div>
                <span className="text-gray-500">Duration</span>
                <p className="font-medium text-gray-900">{durationWeeks} week{durationWeeks > 1 ? 's' : ''}</p>
              </div>
              {targetRole && (
                <div>
                  <span className="text-gray-500">Target Role</span>
                  <p className="font-medium text-gray-900">{targetRole}</p>
                </div>
              )}
              {targetCompany && (
                <div>
                  <span className="text-gray-500">Target Company</span>
                  <p className="font-medium text-gray-900">{targetCompany}</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {selected.length} problem{selected.length !== 1 ? 's' : ''} across {sections.size} section{sections.size !== 1 ? 's' : ''}
              </h3>
              {Array.from(sections.entries()).map(([sectionName, items]) => (
                <div key={sectionName} className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{sectionName}</p>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div key={item.problem_id} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="truncate">{item.title}</span>
                        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[item.difficulty] || ''}`}>
                          {item.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => (step === 0 ? navigate('/study-plan') : setStep(step - 1))}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={createPlan.isPending}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {createPlan.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Create Path
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
