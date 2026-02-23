import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Code2,
  MessageSquare,
  CheckCircle2,
  Circle,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Calendar,
  Briefcase,
  Plus,
} from 'lucide-react';
import { useCompany, useExperiences } from '@/hooks/useCompanies';
import { useProblems } from '@/hooks/useProblems';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import type { InterviewExperience, ProblemListItem } from '@/types';

/* ------------------------------------------------------------------ */
/*  Styling helpers                                                    */
/* ------------------------------------------------------------------ */

const diffColor: Record<string, string> = {
  easy: 'text-emerald-700 bg-emerald-50',
  medium: 'text-amber-700 bg-amber-50',
  hard: 'text-red-700 bg-red-50',
};

const resultConfig: Record<string, { icon: typeof ThumbsUp; color: string; label: string }> = {
  selected: { icon: ThumbsUp, color: 'text-emerald-600', label: 'Selected' },
  rejected: { icon: ThumbsDown, color: 'text-red-500', label: 'Rejected' },
  pending: { icon: Minus, color: 'text-amber-500', label: 'Pending' },
  no_response: { icon: Minus, color: 'text-gray-500', label: 'No Response' },
};

const experienceTypeLabels: Record<string, string> = {
  on_campus: 'On Campus',
  off_campus: 'Off Campus',
  referral: 'Referral',
  other: 'Other',
};

/* ------------------------------------------------------------------ */
/*  CompanyDetail page                                                 */
/* ------------------------------------------------------------------ */

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [tab, setTab] = useState<'problems' | 'experiences'>('problems');

  const { data: company, isLoading: companyLoading, isError: companyError, refetch: refetchCompany } = useCompany(slug ?? '');
  const { data: problemsData, isLoading: problemsLoading } = useProblems(1, 20, undefined, undefined, undefined, slug);
  const { data: experiencesData, isLoading: experiencesLoading } = useExperiences(
    company ? { company_id: company.id } : undefined,
  );

  if (companyLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading company..." />
      </div>
    );
  }

  if (companyError || !company) {
    return (
      <div className="text-center py-20 text-gray-500">
        Failed to load company.{' '}
        <button onClick={() => refetchCompany()} className="text-blue-600 hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const problems = problemsData?.items ?? [];
  const experiences = experiencesData?.items ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        to="/companies"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      {/* Company header */}
      <div className="flex items-center gap-5 mb-8">
        {company.logo_url ? (
          <img src={company.logo_url} alt={company.name} className="w-16 h-16 rounded-2xl object-contain" />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold">
            {company.name.charAt(0)}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{company.name}</h1>
          <p className="text-gray-500 mt-1">{company.description ?? ''}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <Code2 className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xl font-bold text-gray-900">{company.problem_count}</p>
            <p className="text-xs text-gray-500">Problems</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xl font-bold text-gray-900">{company.experience_count}</p>
            <p className="text-xs text-gray-500">Experiences</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
        <button
          onClick={() => setTab('problems')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            tab === 'problems' ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Problems
        </button>
        <button
          onClick={() => setTab('experiences')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            tab === 'experiences' ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Interview Experiences
        </button>
      </div>

      {/* Tab content */}
      {tab === 'problems' && (
        <>
          {problemsLoading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner size="md" text="Loading problems..." />
            </div>
          ) : problems.length === 0 ? (
            <EmptyState icon={Code2} title="No problems yet" description="No problems are tagged for this company." />
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-3 px-4 w-10">Status</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4 w-28">Difficulty</th>
                    <th className="py-3 px-4 w-28">Acceptance</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        {p.user_solved ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                      </td>
                      <td className="py-3 px-4">
                        <Link to={`/problems/${p.slug}`} className="text-gray-900 hover:text-blue-600 font-medium transition-colors">
                          {p.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{p.acceptance_rate.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === 'experiences' && (
        <div className="space-y-4">
          <div className="flex justify-end mb-2">
            <Link
              to={`/companies/${slug}/add-experience`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </Link>
          </div>

          {experiencesLoading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner size="md" text="Loading experiences..." />
            </div>
          ) : experiences.length === 0 ? (
            <EmptyState icon={MessageSquare} title="No experiences yet" description="Be the first to share your interview experience!" />
          ) : (
            experiences.map((exp) => {
              const rc = resultConfig[exp.result] ?? resultConfig.pending;
              const ResultIcon = rc.icon;
              return (
                <div key={exp.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{exp.role_applied}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${diffColor[exp.difficulty]}`}>{exp.difficulty}</span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{experienceTypeLabels[exp.experience_type] ?? exp.experience_type}</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${rc.color}`}>
                      <ResultIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{rc.label}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">{exp.body}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    {exp.interview_date && (
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {exp.interview_date}</span>
                    )}
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {exp.role_applied}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {exp.upvotes} upvotes</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
