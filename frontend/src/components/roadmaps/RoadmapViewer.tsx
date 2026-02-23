import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapStep {
  id: string;
  title: string;
  description?: string;
  resources?: { label: string; url: string }[];
}

interface Roadmap {
  id: string;
  title: string;
  description?: string;
  steps: RoadmapStep[];
}

interface RoadmapViewerProps {
  roadmap: Roadmap;
  progress?: Set<string>;
  onToggleStep?: (stepId: string) => void;
  className?: string;
}

export function RoadmapViewer({
  roadmap,
  progress = new Set(),
  onToggleStep,
  className,
}: RoadmapViewerProps) {
  const completedCount = roadmap.steps.filter((s) => progress.has(s.id)).length;
  const totalCount = roadmap.steps.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {roadmap.title}
        </h2>
        {roadmap.description && (
          <p className="mt-1.5 text-sm text-gray-600">
            {roadmap.description}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            Progress
          </span>
          <span className="tabular-nums text-gray-500">
            {completedCount} / {totalCount} steps ({progressPercent.toFixed(0)}%)
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {roadmap.steps.map((step, index) => {
          const isCompleted = progress.has(step.id);
          const isLast = index === roadmap.steps.length - 1;

          return (
            <div key={step.id} className="relative flex gap-4">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onToggleStep?.(step.id)}
                  disabled={!onToggleStep}
                  className={cn(
                    'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all',
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                      : 'border-2 border-gray-300 bg-white text-gray-400',
                    onToggleStep && 'cursor-pointer hover:scale-110'
                  )}
                  aria-label={isCompleted ? `Mark "${step.title}" as incomplete` : `Mark "${step.title}" as complete`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                {!isLast && (
                  <div
                    className={cn(
                      'w-0.5 flex-1',
                      isCompleted
                        ? 'bg-emerald-300'
                        : 'bg-gray-200'
                    )}
                  />
                )}
              </div>

              {/* Step content */}
              <div className={cn('pb-8', isLast && 'pb-0')}>
                <h3
                  className={cn(
                    'pt-1 text-base font-semibold',
                    isCompleted
                      ? 'text-emerald-700 line-through decoration-emerald-300'
                      : 'text-gray-900'
                  )}
                >
                  Step {index + 1}: {step.title}
                </h3>
                {step.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {step.description}
                  </p>
                )}
                {step.resources && step.resources.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {step.resources.map((resource) => (
                      <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 transition-colors hover:text-blue-700"
                      >
                        <ChevronRight className="h-3 w-3" />
                        {resource.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
