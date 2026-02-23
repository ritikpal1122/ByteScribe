import { Trophy, Clock, Code2, Users, Sparkles } from 'lucide-react';

export default function ContestsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50">
          <Trophy className="h-10 w-10 text-amber-500" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">Contests</h1>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700">Coming Soon</span>
        </div>

        <p className="mx-auto mt-4 max-w-md text-gray-500">
          Compete with developers worldwide in timed coding challenges.
          Climb the leaderboard, earn badges, and prove your skills.
        </p>
      </div>

      {/* Feature preview cards */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <Clock className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Timed Challenges</h3>
          <p className="mt-1 text-xs text-gray-500">
            Solve problems under time pressure with real-time scoring.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Live Leaderboard</h3>
          <p className="mt-1 text-xs text-gray-500">
            See where you stand among participants in real time.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
            <Code2 className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Weekly Contests</h3>
          <p className="mt-1 text-xs text-gray-500">
            New contests every week with varying difficulty levels.
          </p>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="mt-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">Stay tuned</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    </div>
  );
}
