import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { DIAGRAM_COLORS, DiagramContainer } from './diagramUtils';

interface AlgorithmStep {
  description: string;
  state: Record<string, unknown>;
  highlightLine?: number;
}

interface AlgorithmStepsData {
  steps: AlgorithmStep[];
  title?: string;
  stateKeys?: string[];
}

export default function AlgorithmStepsDiagram({
  data,
  caption,
}: {
  data: Record<string, unknown>;
  caption?: string;
}) {
  const d = data as unknown as AlgorithmStepsData;
  const steps = d.steps ?? [];
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) return null;

  const step = steps[currentStep]!;
  const stateKeys = d.stateKeys ?? Object.keys(step.state);
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <DiagramContainer caption={caption}>
      {d.title && (
        <p className="text-xs font-semibold text-gray-600 mb-3 text-center">
          {d.title}
        </p>
      )}
      <div className="space-y-3">
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: DIAGRAM_COLORS.primary }}
          />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Step {currentStep + 1} of {steps.length}</span>
          {step.highlightLine !== undefined && (
            <span className="font-mono text-yellow-600">
              Line {step.highlightLine}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-sm text-gray-700">{step.description}</p>
        </div>

        {/* State display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {stateKeys.map((key) => {
            const val = step.state[key];
            return (
              <div
                key={key}
                className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
              >
                <span className="text-[10px] uppercase tracking-wider text-blue-500 font-semibold block">
                  {key}
                </span>
                <span className="text-sm font-mono font-bold text-gray-800">
                  {typeof val === 'object' ? JSON.stringify(val) : String(val ?? 'N/A')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentStep(0)}
            disabled={currentStep === 0}
            className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <SkipBack className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={currentStep >= steps.length - 1}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-30 transition-colors"
          >
            {currentStep >= steps.length - 1 ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep >= steps.length - 1}
            className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <SkipForward className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </DiagramContainer>
  );
}
