import { Clock, TrendingUp, BarChart3, Zap } from "lucide-react";
import { useRoadmapAnalytics } from "@/hooks/useRoadmapSteps";

interface AnalyticsTabProps {
  roadmapId: string;
  currentSeconds: number;
}

function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AnalyticsTab({ roadmapId, currentSeconds }: AnalyticsTabProps) {
  const { data: analytics, isLoading } = useRoadmapAnalytics(roadmapId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10 text-gray-400 text-sm">
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-4 text-center py-8">
        <BarChart3 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-400">No analytics data yet</p>
      </div>
    );
  }

  const maxStepTime = Math.max(
    1,
    ...analytics.time_per_step.map((s) => s.total_seconds),
  );

  // Build 30-day grid
  const dailyMap = new Map(
    analytics.daily_activity.map((d) => [d.date, d.seconds]),
  );
  const today = new Date();
  const days: { date: string; seconds: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.push({ date: key, seconds: dailyMap.get(key) ?? 0 });
  }
  const maxDaily = Math.max(1, ...days.map((d) => d.seconds));

  const estDays =
    analytics.average_pace > 0
      ? Math.ceil(analytics.estimated_remaining / (analytics.average_pace * 3)) // ~3 steps per session
      : null;

  return (
    <div className="p-4 space-y-5">
      {/* Current session */}
      <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
        <Clock className="w-5 h-5 text-blue-600" />
        <div>
          <p className="text-[10px] text-blue-500 uppercase font-medium">Current Session</p>
          <p className="text-lg font-mono font-bold text-blue-700">
            {formatTime(currentSeconds)}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold text-gray-800">
            {formatDuration(analytics.total_time_seconds)}
          </p>
          <p className="text-[10px] text-gray-400 uppercase">Total Time</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold text-gray-800">
            {analytics.completed_steps}/{analytics.total_steps}
          </p>
          <p className="text-[10px] text-gray-400 uppercase">Steps Done</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold text-gray-800">
            {formatDuration(analytics.average_pace)}
          </p>
          <p className="text-[10px] text-gray-400 uppercase">Avg/Step</p>
        </div>
      </div>

      {/* Pace prediction */}
      {estDays !== null && analytics.estimated_remaining > 0 && (
        <div className="flex items-center gap-2 bg-purple-50 rounded-lg px-3 py-2">
          <Zap className="w-4 h-4 text-purple-600" />
          <p className="text-xs text-purple-700">
            At your pace, ~<strong>{estDays}</strong> day{estDays !== 1 ? "s" : ""} remaining
          </p>
        </div>
      )}

      {/* Time per step */}
      {analytics.time_per_step.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Time per Step
          </h4>
          <div className="space-y-1.5">
            {analytics.time_per_step
              .sort((a, b) => b.total_seconds - a.total_seconds)
              .slice(0, 10)
              .map((step) => (
                <div key={step.step_id} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 w-20 truncate shrink-0">
                    {step.title}
                  </span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all"
                      style={{
                        width: `${(step.total_seconds / maxStepTime) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 w-10 text-right shrink-0">
                    {formatDuration(step.total_seconds)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 30-day activity heatmap */}
      <div>
        <h4 className="text-xs font-semibold text-gray-600 mb-2">
          30-Day Activity
        </h4>
        <div className="grid grid-cols-10 gap-1">
          {days.map((day) => {
            const intensity = day.seconds / maxDaily;
            let bg = "bg-gray-100";
            if (day.seconds > 0) {
              if (intensity > 0.75) bg = "bg-emerald-500";
              else if (intensity > 0.5) bg = "bg-emerald-400";
              else if (intensity > 0.25) bg = "bg-emerald-300";
              else bg = "bg-emerald-200";
            }
            return (
              <div
                key={day.date}
                className={`w-full aspect-square rounded-sm ${bg}`}
                title={`${day.date}: ${formatDuration(day.seconds)}`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[9px] text-gray-400">Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-100" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-300" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <span className="text-[9px] text-gray-400">More</span>
        </div>
      </div>
    </div>
  );
}
