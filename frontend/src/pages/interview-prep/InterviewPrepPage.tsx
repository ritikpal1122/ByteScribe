import { useState, useMemo } from 'react';
import { BookOpen, Users, FolderOpen, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALL_ROLES, getTotalQuestionCount } from '@/data/interview-prep';
import RoleTabBar from './components/RoleTabBar';
import TopicSidebar from './components/TopicSidebar';
import QuestionList from './components/QuestionList';
import { useInterviewProgress } from './hooks/useInterviewProgress';

export default function InterviewPrepPage() {
  const [activeRoleId, setActiveRoleId] = useState(ALL_ROLES[0].id);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isReviewed, toggleReviewed, getCount } = useInterviewProgress();

  const activeRole = useMemo(
    () => ALL_ROLES.find((r) => r.id === activeRoleId) ?? ALL_ROLES[0],
    [activeRoleId]
  );

  const totalQuestions = getTotalQuestionCount();
  const totalTopics = ALL_ROLES.reduce((s, r) => s + r.topics.length, 0);

  const handleRoleChange = (roleId: string) => {
    setActiveRoleId(roleId);
    setActiveTopic(null);
    setSidebarOpen(false);
  };

  const handleTopicSelect = (topicId: string | null) => {
    setActiveTopic(topicId);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-900">
          Interview Preparation Hub
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Master technical interviews with curated questions and detailed answers
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {totalQuestions}+ Questions
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {ALL_ROLES.length} Roles
          </span>
          <span className="flex items-center gap-1">
            <FolderOpen className="h-3.5 w-3.5" />
            {totalTopics}+ Topics
          </span>
        </div>
      </div>

      {/* Role tabs */}
      <RoleTabBar
        roles={ALL_ROLES}
        activeRoleId={activeRoleId}
        onSelect={handleRoleChange}
      />

      {/* Body: sidebar + questions */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg lg:hidden"
          aria-label="Toggle topics"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Sidebar — desktop always visible, mobile as overlay */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 z-30 lg:relative lg:z-0',
            sidebarOpen ? 'block' : 'hidden lg:block'
          )}
        >
          <TopicSidebar
            topics={activeRole.topics}
            activeTopic={activeTopic}
            onSelect={handleTopicSelect}
            getReviewedCount={getCount}
            roleColor={activeRole.color}
          />
        </div>

        {/* Overlay backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Question list */}
        <QuestionList
          topics={activeRole.topics}
          activeTopic={activeTopic}
          isReviewed={isReviewed}
          onToggleReview={toggleReviewed}
          roleColor={activeRole.color}
        />
      </div>
    </div>
  );
}
