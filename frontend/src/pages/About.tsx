import { Link } from 'react-router-dom';
import { Code2, Users, Target, Zap, BookOpen, Globe, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

const VALUES = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description:
      'We believe quality tech education should be accessible to everyone, regardless of background or budget.',
  },
  {
    icon: Zap,
    title: 'Practice First',
    description:
      'Theory is important, but real growth comes from solving problems, building projects, and learning by doing.',
  },
  {
    icon: Users,
    title: 'Community Powered',
    description:
      'Our community of developers share knowledge, mentor each other, and grow together.',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning',
    description:
      'Curated roadmaps, DSA sheets, and spaced repetition help you learn systematically — not randomly.',
  },
];

const STATS = [
  { value: '50+', label: 'Learning Roadmaps' },
  { value: '150+', label: 'Coding Problems' },
  { value: '7', label: 'Language Docs' },
  { value: '1000+', label: 'Active Learners' },
];

export default function About() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
          <Code2 className="w-4 h-4" />
          About Us
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Building the future of tech education
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          LearnText is an all-in-one platform for developers to learn, practice, and master
          programming — from data structures to system design, with interactive tools and
          a supportive community.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-5 bg-white border border-gray-200 rounded-xl"
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          What we believe in
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <v.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-10 border border-blue-100">
        <Globe className="w-8 h-8 text-blue-600 mx-auto mb-4" />
        {isAuthenticated ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">You're already part of the community!</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Keep up the great work. Head over to problems and continue your practice streak.
            </p>
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Problems <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Join our growing community</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Whether you're a beginner or preparing for FAANG interviews, we've got the tools and
              content to accelerate your journey.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
