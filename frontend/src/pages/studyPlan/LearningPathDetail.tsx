import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Edit3,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import {
  useStudyPlan,
  useToggleItemComplete,
  useRemoveItem,
  useAddItems,
  useDeleteStudyPlan,
  useUpdateStudyPlan,
} from '@/hooks/useStudyPlans';
import { useProblems } from '@/hooks/useProblems';
import type { StudyPlanItem } from '@/api/studyPlans';
import type { ProblemListItem } from '@/types';

const diffColor: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  hard: 'text-red-400 bg-red-400/10',
  Easy: 'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-amber-400 bg-amber-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

export default function LearningPathDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plan, isLoading } = useStudyPlan(id!);
  const toggleItem = useToggleItemComplete();
  const removeItemMut = useRemoveItem();
  const addItemsMut = useAddItems();
  const deletePlan = useDeleteStudyPlan();
  const updatePlan = useUpdateStudyPlan();

  const [editMode, setEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Add modal state
  const [searchQuery, setSearchQuery] = useState('');
  const [addSection, setAddSection] = useState('General');
  const [selectedToAdd, setSelectedToAdd] = useState<ProblemListItem[]>([]);
  const { data: problemsData, isLoading: problemsLoading } = useProblems(
    1, 50, undefined, undefined, searchQuery || undefined,
  );

  // Group items by section
  const sectionMap = useMemo(() => {
    if (!plan?.items) return new Map<string, StudyPlanItem[]>();
    const map = new Map<string, StudyPlanItem[]>();
    for (const item of plan.items) {
      const section = item.section || 'General';
      const list = map.get(section) || [];
      list.push(item);
      map.set(section, list);
    }
    return map;
  }, [plan?.items]);

  // Initialize expanded sections
  useMemo(() => {
    if (sectionMap.size > 0 && expandedSections.size === 0) {
      setExpandedSections(new Set(sectionMap.keys()));
    }
  }, [sectionMap.size]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading learning path..." />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex flex-col items-center py-20 text-gray-500">
        <p>Learning path not found.</p>
        <button onClick={() => navigate('/study-plan')} className="mt-4 text-blue-500 hover:underline text-sm">
          Back to Study Plans
        </button>
      </div>
    );
  }

  const pct = plan.item_count > 0 ? Math.round((plan.completed_count / plan.item_count) * 100) : 0;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const handleToggle = (itemId: string) => {
    toggleItem.mutate(
      { planId: id!, itemId },
      {
        onError: () => toast.error('Failed to toggle item'),
      },
    );
  };

  const handleRemoveItem = (itemId: string) => {
    removeItemMut.mutate(
      { planId: id!, itemId },
      {
        onSuccess: () => toast.success('Item removed'),
        onError: () => toast.error('Failed to remove item'),
      },
    );
  };

  const handleDelete = () => {
    if (!confirm('Delete this learning path? This cannot be undone.')) return;
    deletePlan.mutate(id!, {
      onSuccess: () => {
        toast.success('Learning path deleted');
        navigate('/study-plan');
      },
      onError: () => toast.error('Failed to delete'),
    });
  };

  const handleAddProblems = () => {
    if (selectedToAdd.length === 0) return;
    addItemsMut.mutate(
      {
        planId: id!,
        items: selectedToAdd.map((p) => ({
          problem_id: p.id,
          section: addSection,
          difficulty: p.difficulty,
        })),
      },
      {
        onSuccess: () => {
          toast.success(`Added ${selectedToAdd.length} problem(s)`);
          setShowAddModal(false);
          setSelectedToAdd([]);
          setSearchQuery('');
        },
        onError: () => toast.error('Failed to add problems'),
      },
    );
  };

  const existingProblemIds = new Set(plan.items?.map((i) => i.problem_id).filter(Boolean));

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/study-plan')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <BookOpen className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight flex-1">{plan.title}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`p-2 rounded-lg transition-colors ${editMode ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            {editMode && (
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {plan.description && (
          <p className="text-sm text-gray-500 ml-12 mb-6">{plan.description}</p>
        )}

        {/* Stats bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{plan.item_count} problems</span>
              <span>{plan.completed_count} completed</span>
              {plan.duration_weeks && <span>{plan.duration_weeks} week plan</span>}
              {plan.target_role && <span className="text-gray-400">{plan.target_role}</span>}
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-500">{pct}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Edit mode: add problems button */}
        {editMode && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors w-full justify-center mb-6"
          >
            <Plus className="w-4 h-4" />
            Add Problems
          </button>
        )}

        {/* Sections */}
        {sectionMap.size === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500 text-sm">
            No items yet. {editMode ? 'Click "Add Problems" above to get started.' : 'Enable edit mode to add problems.'}
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from(sectionMap.entries()).map(([sectionName, items]) => {
              const sectionCompleted = items.filter((i) => i.is_completed).length;
              const isExpanded = expandedSections.has(sectionName);

              return (
                <div key={sectionName} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(sectionName)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm font-semibold text-gray-800 flex-1">{sectionName}</span>
                    <span className="text-xs text-gray-400">
                      {sectionCompleted}/{items.length}
                    </span>
                  </button>

                  {/* Section items */}
                  {isExpanded && (
                    <div className="divide-y divide-gray-50">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                            item.is_completed ? 'bg-gray-50/50 opacity-60' : 'hover:bg-gray-50/50'
                          }`}
                        >
                          <button
                            onClick={() => handleToggle(item.id)}
                            className="shrink-0"
                            disabled={toggleItem.isPending}
                          >
                            {item.is_completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500 transition-colors" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            {item.problem_id ? (
                              <Link
                                to={`/problems/${item.problem_id}`}
                                className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                                  item.is_completed ? 'text-gray-400 line-through' : 'text-gray-800'
                                }`}
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <p className={`text-sm font-medium ${item.is_completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                {item.title}
                              </p>
                            )}
                          </div>
                          {item.difficulty && (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[item.difficulty] || ''}`}>
                              {item.difficulty}
                            </span>
                          )}
                          {editMode && (
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Problems Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Add Problems</h3>
              <button onClick={() => { setShowAddModal(false); setSelectedToAdd([]); setSearchQuery(''); }} className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-gray-100 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Section</label>
                <input
                  type="text"
                  value={addSection}
                  onChange={(e) => setAddSection(e.target.value)}
                  placeholder="e.g., Arrays"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-1"
                />
              </div>
            </div>

            {/* Problem list */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {problemsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : (
                (problemsData?.items ?? []).map((p) => {
                  const already = existingProblemIds.has(p.id);
                  const isSelected = selectedToAdd.some((s) => s.id === p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (already) return;
                        if (isSelected) {
                          setSelectedToAdd((prev) => prev.filter((s) => s.id !== p.id));
                        } else {
                          setSelectedToAdd((prev) => [...prev, p]);
                        }
                      }}
                      disabled={already}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                        already ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
                      } ${isSelected ? 'bg-blue-50/50' : ''}`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-blue-600 border-blue-600' : already ? 'bg-gray-200 border-gray-200' : 'border-gray-300'
                        }`}
                      >
                        {(isSelected || already) && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="flex-1 text-sm text-gray-800 truncate">{p.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[p.difficulty] || ''}`}>
                        {p.difficulty}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">{selectedToAdd.length} selected</span>
              <button
                onClick={handleAddProblems}
                disabled={selectedToAdd.length === 0 || addItemsMut.isPending}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {addItemsMut.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Add to Path
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
