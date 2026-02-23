import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Building2,
  Briefcase,
  ClipboardList,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  AddExperience page                                                 */
/* ------------------------------------------------------------------ */

export default function AddExperience() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [result, setResult] = useState('');
  const [body, setBody] = useState('');

  const interviewTypes = ['Onsite', 'Phone Screen', 'Online Assessment', 'Virtual Onsite', 'Take Home'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const results = ['Offer', 'Rejected', 'Pending', 'Withdrew'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        to="/companies"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Share Interview Experience</h1>
      <p className="text-gray-500 mb-8">Help others prepare by sharing your interview experience. All submissions are anonymous by default.</p>

      <div className="space-y-6">
        {/* Company */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Building2 className="w-4 h-4 text-gray-400" />
            Company
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google"
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 text-gray-400" />
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer L4"
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        {/* Type & Difficulty row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <ClipboardList className="w-4 h-4 text-gray-400" />
              Interview Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none"
            >
              <option value="" disabled>Select type</option>
              {interviewTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              Difficulty
            </label>
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                    difficulty === d
                      ? d === 'Easy'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : d === 'Medium'
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-red-50 border-red-300 text-red-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
            Result
          </label>
          <div className="flex gap-2 flex-wrap">
            {results.map((r) => (
              <button
                key={r}
                onClick={() => setResult(r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  result === r
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interview Details
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            placeholder="Describe your interview experience in detail. Include the interview rounds, questions asked, difficulty level, and any tips for future candidates..."
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none leading-relaxed"
          />
          <p className="mt-1.5 text-xs text-gray-500">Markdown is supported. Minimum 100 characters recommended.</p>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Your submission will be reviewed before publishing.</p>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            <Send className="w-4 h-4" />
            Submit Experience
          </button>
        </div>
      </div>
    </div>
  );
}
