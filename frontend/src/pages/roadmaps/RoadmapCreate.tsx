import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Save,
  BookOpen,
  Code2,
  Video,
  FolderKanban,
  ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type StepType = 'article' | 'problem' | 'video' | 'project';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
}

interface RoadmapSection {
  id: string;
  title: string;
  steps: RoadmapStep[];
  collapsed: boolean;
}

/* ------------------------------------------------------------------ */
/*  Step type config                                                   */
/* ------------------------------------------------------------------ */

const stepTypes: { value: StepType; label: string; icon: typeof BookOpen }[] = [
  { value: 'article', label: 'Article', icon: BookOpen },
  { value: 'problem', label: 'Problem', icon: Code2 },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'project', label: 'Project', icon: FolderKanban },
];

/* ------------------------------------------------------------------ */
/*  RoadmapCreate page                                                 */
/* ------------------------------------------------------------------ */

let nextId = 1;
const uid = () => String(nextId++);

export default function RoadmapCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState<RoadmapSection[]>([
    {
      id: uid(),
      title: 'Getting Started',
      collapsed: false,
      steps: [
        { id: uid(), title: '', description: '', type: 'article' },
      ],
    },
  ]);

  /* Section helpers */
  const addSection = () => {
    setSections([...sections, { id: uid(), title: '', collapsed: false, steps: [{ id: uid(), title: '', description: '', type: 'article' }] }]);
  };

  const updateSectionTitle = (sId: string, val: string) => {
    setSections(sections.map((s) => (s.id === sId ? { ...s, title: val } : s)));
  };

  const toggleSection = (sId: string) => {
    setSections(sections.map((s) => (s.id === sId ? { ...s, collapsed: !s.collapsed } : s)));
  };

  const removeSection = (sId: string) => {
    setSections(sections.filter((s) => s.id !== sId));
  };

  /* Step helpers */
  const addStep = (sId: string) => {
    setSections(sections.map((s) =>
      s.id === sId ? { ...s, steps: [...s.steps, { id: uid(), title: '', description: '', type: 'article' }] } : s,
    ));
  };

  const updateStep = (sId: string, stepId: string, field: keyof RoadmapStep, value: string) => {
    setSections(sections.map((s) =>
      s.id === sId
        ? { ...s, steps: s.steps.map((st) => (st.id === stepId ? { ...st, [field]: value } : st)) }
        : s,
    ));
  };

  const removeStep = (sId: string, stepId: string) => {
    setSections(sections.map((s) =>
      s.id === sId ? { ...s, steps: s.steps.filter((st) => st.id !== stepId) } : s,
    ));
  };

  const totalSteps = sections.reduce((sum, s) => sum + s.steps.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        to="/roadmaps"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Roadmaps
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Roadmap</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4" />
          Publish Roadmap
        </button>
      </div>

      {/* Meta fields */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Roadmap Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., DSA Mastery Path"
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this roadmap covers..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
          />
        </div>
        <p className="text-xs text-gray-500">{totalSteps} step{totalSteps !== 1 ? 's' : ''} across {sections.length} section{sections.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, sIdx) => (
          <div key={section.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Section header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-200">
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
              <button onClick={() => toggleSection(section.id)}>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${section.collapsed ? '-rotate-90' : ''}`} />
              </button>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                placeholder={`Section ${sIdx + 1} title`}
                className="flex-1 bg-transparent text-gray-900 font-semibold placeholder-gray-400 focus:outline-none"
              />
              <span className="text-xs text-gray-500">{section.steps.length} steps</span>
              <button
                onClick={() => removeSection(section.id)}
                className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Steps */}
            {!section.collapsed && (
              <div className="p-4 space-y-3">
                {section.steps.map((step, stIdx) => {
                  const StepIcon = stepTypes.find((t) => t.value === step.type)?.icon || BookOpen;
                  return (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <GripVertical className="w-4 h-4 text-gray-400 mt-2.5 cursor-grab shrink-0" />
                      <span className="text-xs text-gray-400 mt-2.5 shrink-0 w-5">{stIdx + 1}.</span>

                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateStep(section.id, step.id, 'title', e.target.value)}
                          placeholder="Step title"
                          className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => updateStep(section.id, step.id, 'description', e.target.value)}
                          placeholder="Brief description"
                          className="w-full bg-transparent text-xs text-gray-500 placeholder-gray-400 focus:outline-none"
                        />
                      </div>

                      {/* Type selector */}
                      <select
                        value={step.type}
                        onChange={(e) => updateStep(section.id, step.id, 'type', e.target.value)}
                        className="bg-white border border-gray-300 text-xs text-gray-600 rounded px-2 py-1 focus:outline-none mt-1"
                      >
                        {stepTypes.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeStep(section.id, step.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors mt-1 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={() => addStep(section.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors px-3 py-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Step
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add section */}
      <button
        onClick={addSection}
        className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors px-4 py-3 border border-dashed border-gray-300 rounded-xl w-full justify-center hover:border-blue-400"
      >
        <Plus className="w-4 h-4" />
        Add Section
      </button>
    </div>
  );
}
