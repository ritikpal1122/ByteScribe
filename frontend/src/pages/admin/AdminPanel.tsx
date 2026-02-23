import { useState } from 'react';
import {
  Shield,
  Users,
  FileText,
  Code2,
  HelpCircle,
  Activity,
  Settings,
  BarChart3,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

type Tab = 'overview' | 'users' | 'problems' | 'articles' | 'reports';

function TabButton({
  active,
  label,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function OverviewTab() {
  const cards = [
    { label: 'Total Users', value: '—', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Problems', value: '—', icon: Code2, color: 'bg-green-50 text-green-600' },
    { label: 'Articles', value: '—', icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { label: 'Questions', value: '—', icon: HelpCircle, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`rounded-lg p-2 ${c.color}`}>
                <c.icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-gray-500">{c.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <p className="text-sm text-gray-400">
          Admin analytics and activity feed will be displayed here once the
          admin API endpoints are connected.
        </p>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
      <p className="text-sm text-gray-500 mb-4">
        Search, view, and manage user accounts.
      </p>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-400">
        User management table will be implemented with admin API integration.
      </div>
    </div>
  );
}

function ProblemsTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem Management</h3>
      <p className="text-sm text-gray-500 mb-4">
        Create, edit, and manage coding problems and test cases.
      </p>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-400">
        Problem management interface will be implemented with admin API integration.
      </div>
    </div>
  );
}

function ArticlesTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Moderation</h3>
      <p className="text-sm text-gray-500 mb-4">
        Review and moderate articles, questions, and comments.
      </p>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-400">
        Content moderation interface will be implemented with admin API integration.
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports & Analytics</h3>
      <p className="text-sm text-gray-500 mb-4">
        View platform-wide statistics and reports.
      </p>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-400">
        Platform reports and analytics will be shown here.
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>('overview');

  const tabs: { value: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'users', label: 'Users', icon: Users },
    { value: 'problems', label: 'Problems', icon: Code2 },
    { value: 'articles', label: 'Content', icon: FileText },
    { value: 'reports', label: 'Reports', icon: Activity },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-7 w-7 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <p className="text-gray-500">
          Manage platform content, users, and settings.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <TabButton
            key={t.value}
            active={tab === t.value}
            label={t.label}
            icon={t.icon}
            onClick={() => setTab(t.value)}
          />
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && <OverviewTab />}
      {tab === 'users' && <UsersTab />}
      {tab === 'problems' && <ProblemsTab />}
      {tab === 'articles' && <ArticlesTab />}
      {tab === 'reports' && <ReportsTab />}
    </div>
  );
}
