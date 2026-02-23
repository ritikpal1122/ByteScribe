import { RefreshCw, Calendar, Repeat, Brain } from "lucide-react";
import { useStepReview, useReviewStep } from "@/hooks/useRoadmapSteps";

interface ReviewTabProps {
  roadmapId: string;
  stepId: string;
}

const QUALITY_BUTTONS = [
  { label: "Again", quality: 0, color: "bg-red-500 hover:bg-red-600" },
  { label: "Hard", quality: 2, color: "bg-orange-500 hover:bg-orange-600" },
  { label: "Good", quality: 3, color: "bg-blue-500 hover:bg-blue-600" },
  { label: "Easy", quality: 5, color: "bg-emerald-500 hover:bg-emerald-600" },
];

export default function ReviewTab({ roadmapId, stepId }: ReviewTabProps) {
  const { data: review, isLoading } = useStepReview(roadmapId, stepId);
  const reviewStep = useReviewStep();

  const handleReview = (quality: number) => {
    reviewStep.mutate({ roadmapId, stepId, quality });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10 text-gray-400 text-sm">
        Loading review...
      </div>
    );
  }

  if (!review) {
    return (
      <div className="p-4">
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <RefreshCw className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-600">No review card yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Complete this step to start tracking reviews
          </p>
        </div>
      </div>
    );
  }

  const isDue = new Date(review.next_review_date) <= new Date();

  return (
    <div className="p-4 space-y-4">
      {/* Status card */}
      <div className={`rounded-xl p-4 ${isDue ? "bg-amber-50 border border-amber-200" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className={`w-4 h-4 ${isDue ? "text-amber-600" : "text-gray-500"}`} />
          <span className={`text-sm font-semibold ${isDue ? "text-amber-700" : "text-gray-700"}`}>
            {isDue ? "Due for Review!" : "Review Scheduled"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Next Review</p>
              <p className="text-xs font-medium text-gray-700">
                {new Date(review.next_review_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Repeat className="w-3.5 h-3.5 text-gray-400" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Interval</p>
              <p className="text-xs font-medium text-gray-700">
                {review.interval_days} day{review.interval_days !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-3.5 h-3.5 text-gray-400" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Ease Factor</p>
              <p className="text-xs font-medium text-gray-700">
                {review.ease_factor.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase">Repetitions</p>
              <p className="text-xs font-medium text-gray-700">
                {review.repetitions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review buttons (show when due) */}
      {isDue && (
        <div>
          <p className="text-xs text-gray-500 mb-2">
            How well do you remember this topic?
          </p>
          <div className="grid grid-cols-4 gap-2">
            {QUALITY_BUTTONS.map((btn) => (
              <button
                key={btn.quality}
                onClick={() => handleReview(btn.quality)}
                disabled={reviewStep.isPending}
                className={`${btn.color} text-white text-xs font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Last reviewed */}
      {review.last_reviewed_at && (
        <p className="text-[10px] text-gray-400 text-center">
          Last reviewed: {new Date(review.last_reviewed_at).toLocaleString()}
        </p>
      )}
    </div>
  );
}
