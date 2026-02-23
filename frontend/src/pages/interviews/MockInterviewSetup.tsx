import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Play,
  Code2,
  Database,
  Globe,
  Cpu,
  BarChart3,
  Clock,
  Loader2,
} from 'lucide-react';
import { useCreateMockSession } from '@/hooks/useInterviews';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Topic {
  id: string;
  label: string;
  icon: typeof Code2;
  description: string;
  interview_type: 'technical' | 'behavioral' | 'system_design' | 'mixed';
}

const topics: Topic[] = [
  { id: 'dsa', label: 'Data Structures & Algorithms', icon: Code2, description: 'Arrays, trees, graphs, DP, and more', interview_type: 'technical' },
  { id: 'sysdesign', label: 'System Design', icon: Database, description: 'Scalable system architecture', interview_type: 'system_design' },
  { id: 'frontend', label: 'Frontend', icon: Globe, description: 'React, CSS, performance, accessibility', interview_type: 'technical' },
  { id: 'backend', label: 'Backend', icon: Cpu, description: 'APIs, databases, microservices', interview_type: 'technical' },
  { id: 'behavioral', label: 'Behavioral', icon: BarChart3, description: 'STAR method, leadership principles', interview_type: 'behavioral' },
];

const difficulties = ['easy', 'medium', 'hard'] as const;
const durations = [15, 30, 45, 60];

const diffLabels: Record<string, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

/* ------------------------------------------------------------------ */
/*  MockInterviewSetup page                                            */
/* ------------------------------------------------------------------ */

export default function MockInterviewSetup() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const createSession = useCreateMockSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedDuration, setSelectedDuration] = useState(30);

  const diffColors: Record<string, string> = {
    easy: 'border-emerald-500/50 bg-emerald-400/10 text-emerald-400',
    medium: 'border-amber-500/50 bg-amber-400/10 text-amber-400',
    hard: 'border-red-500/50 bg-red-400/10 text-red-400',
  };

  const handleStart = () => {
    if (!selectedTopic) return;
    createSession.mutate(
      {
        topic: selectedTopic.label,
        difficulty: selectedDifficulty,
        interview_type: selectedTopic.interview_type,
      },
      {
        onSuccess: (res) => {
          navigate(`/interviews/mock/${res.data.id}`);
        },
      },
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 mb-4">Please log in to start a mock interview.</p>
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Bot className="w-7 h-7 text-blue-400" />
          <h1 className="text-3xl font-bold tracking-tight">Mock Interview</h1>
        </div>
        <p className="text-gray-500 mb-10">Practice with an AI interviewer. Select your topic and difficulty to begin.</p>

        {/* Topic selection */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Select Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                    selectedTopic?.id === topic.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${selectedTopic?.id === topic.id ? 'text-blue-400' : 'text-gray-500'}`} />
                  <div>
                    <p className={`font-medium text-sm ${selectedTopic?.id === topic.id ? 'text-blue-600' : 'text-gray-800'}`}>
                      {topic.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Difficulty</h2>
          <div className="flex gap-3">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all capitalize ${
                  selectedDifficulty === d ? diffColors[d] : 'border-gray-200 bg-white text-gray-400 hover:text-gray-800'
                }`}
              >
                {diffLabels[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Duration</h2>
          <div className="flex gap-3">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDuration(d)}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  selectedDuration === d
                    ? 'border-blue-500 bg-blue-500/10 text-blue-600'
                    : 'border-gray-200 bg-white text-gray-400 hover:text-gray-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {d} min
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={!selectedTopic || createSession.isPending}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {createSession.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Starting...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Interview
            </>
          )}
        </button>

        {selectedTopic === null && (
          <p className="text-center text-xs text-gray-600 mt-3">Select a topic to get started</p>
        )}
      </div>
    </div>
  );
}
