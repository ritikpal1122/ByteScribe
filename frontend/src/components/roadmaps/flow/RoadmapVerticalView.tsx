import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  List,
} from 'lucide-react';
import type { RoadmapNode } from '@/api/roadmaps';
import { COLOR_SCHEMES } from './constants';
import { useCompletionFx } from './useCompletionFx';
import {
  playCompleteSound,
  playUncompleteSound,
  playComboSound,
  playSectionCompleteSound,
} from './sounds';
import ParticleCanvas, { type ParticleCanvasHandle } from './ParticleCanvas';
import CompletionFx from './CompletionFx';
import StepDetailPanel from '../StepDetailPanel';
import { useStepPanelStore } from '@/stores/stepPanelStore';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RoadmapVerticalViewProps {
  sections: RoadmapNode[];
  roadmapId: string;
  onToggle: (nodeId: string, isCompleted: boolean) => void;
  roadmapTitle?: string;
  dueStepIds?: Set<string>;
  isAuthenticated?: boolean;
  onLoginRequired?: () => void;
}

type ColorScheme = (typeof COLOR_SCHEMES)[number];

/* ------------------------------------------------------------------ */
/*  MiniTableOfContents                                                */
/* ------------------------------------------------------------------ */

function MiniTableOfContents({
  sections,
}: {
  sections: RoadmapNode[];
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 w-48">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-3">
        <div className="flex items-center gap-2 mb-3 px-1">
          <List className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sections
          </span>
        </div>
        <nav className="space-y-0.5">
          {sections.map((section, idx) => {
            const children = section.children ?? [];
            const done = children.filter((c) => c.is_completed).length;
            const total = children.length;
            const cs = COLOR_SCHEMES[idx % COLOR_SCHEMES.length];
            const isComplete = total > 0 && done === total;

            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isComplete ? 'bg-emerald-400' : cs.spineDot
                  }`}
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 truncate flex-1">
                  {section.title}
                </span>
                {total > 0 && (
                  <span className="text-[10px] text-gray-400 shrink-0">
                    {done}/{total}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionCard                                                        */
/* ------------------------------------------------------------------ */

function SectionCard({
  section,
  index,
  colorScheme,
}: {
  section: RoadmapNode;
  index: number;
  colorScheme: ColorScheme;
}) {
  const children = section.children ?? [];
  const done = children.filter((c) => c.is_completed).length;
  const total = children.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isComplete = total > 0 && done === total;

  return (
    <motion.div
      id={`section-${section.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative mx-auto w-full max-w-lg border-l-4 ${colorScheme.border} ${colorScheme.bg} rounded-xl shadow-sm p-5 ${
        isComplete ? 'animate-section-glow' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white bg-gradient-to-br ${colorScheme.gradient}`}
        >
          {index + 1}
        </span>
        <h3 className={`text-base font-semibold ${colorScheme.text} flex-1 min-w-0 truncate`}>
          {section.title}
        </h3>
        {total > 0 && (
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${colorScheme.badge} shrink-0`}
          >
            {done}/{total}
          </span>
        )}
      </div>

      {section.description && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {section.description}
        </p>
      )}

      {total > 0 && (
        <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${colorScheme.gradient}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  StepCard                                                           */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  side,
  stepIndex,
  colorScheme,
  isDueForReview,
  onToggle,
  onBurst,
  onOpenPanel,
}: {
  step: RoadmapNode;
  side: 'left' | 'right';
  stepIndex: number;
  colorScheme: ColorScheme;
  isDueForReview: boolean;
  onToggle: (nodeId: string, isCompleted: boolean) => void;
  onBurst: (screenX: number, screenY: number, completing: boolean) => void;
  onOpenPanel: (stepId: string, title: string, description: string) => void;
}) {
  const connectorClass = `step-connector-${side} ${
    step.is_completed ? 'step-connector-completed' : ''
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: stepIndex * 0.06, ease: 'easeOut' }}
      className={connectorClass}
      style={
        { '--connector-color': step.is_completed ? '#86efac' : colorScheme.connector } as React.CSSProperties
      }
    >
      <div
        className={`w-full max-w-[320px] rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 hover:shadow-md group relative ${
          step.is_completed
            ? 'bg-emerald-50 border-emerald-300 animate-node-glow'
            : isDueForReview
            ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 ring-opacity-75'
            : 'bg-white border-gray-200 hover:border-gray-300'
        } ${side === 'left' ? 'ml-auto' : 'mr-auto'}`}
        onClick={() => onOpenPanel(step.id, step.title, step.description)}
      >
        <div className="flex items-start gap-3">
          <button
            className="shrink-0 mt-0.5"
            onClick={(e) => {
              e.stopPropagation();
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const completing = !step.is_completed;
              onBurst(cx, cy, completing);
              onToggle(step.id, completing);
            }}
          >
            {step.is_completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium leading-tight ${
                step.is_completed ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}
            >
              {step.title}
            </p>
            {step.description && (
              <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
                {step.description}
              </p>
            )}
          </div>
        </div>

        {step.resource_url && (
          <a
            href={step.resource_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            Open Resource
          </a>
        )}

        {isDueForReview && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-sm animate-amber-pulse">
            <Clock className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SpineDot                                                           */
/* ------------------------------------------------------------------ */

function SpineDot({
  isSection,
  colorScheme,
  isComplete,
}: {
  isSection: boolean;
  colorScheme: ColorScheme;
  isComplete?: boolean;
}) {
  const size = isSection ? 'w-5 h-5' : 'w-3 h-3';
  const bg = isComplete ? 'bg-emerald-400' : colorScheme.spineDot;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${size} rounded-full ${bg} ring-4 ring-white shadow-sm transition-colors duration-300`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RoadmapVerticalView (main export)                                  */
/* ------------------------------------------------------------------ */

export default function RoadmapVerticalView({
  sections,
  roadmapId,
  onToggle,
  roadmapTitle = '',
  dueStepIds = new Set<string>(),
  isAuthenticated = false,
  onLoginRequired,
}: RoadmapVerticalViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<ParticleCanvasHandle>(null);
  const prevCompletion = useRef<Record<string, boolean[]>>({});

  const { isOpen, openPanel } = useStepPanelStore();

  const { xpToasts, combo, sectionBanner, triggerCompletion, triggerSectionComplete } =
    useCompletionFx();

  // Burst effect
  const handleBurst = useCallback(
    (screenX: number, screenY: number, completing: boolean) => {
      if (completing) {
        particleRef.current?.burst(screenX, screenY, '#22c55e');
        const currentCombo = triggerCompletion(screenX, screenY);
        playCompleteSound();
        if (currentCombo >= 2) playComboSound(currentCombo);
      } else {
        playUncompleteSound();
      }

      if (containerRef.current && completing) {
        containerRef.current.classList.add('animate-shake');
        setTimeout(() => containerRef.current?.classList.remove('animate-shake'), 300);
      }
    },
    [triggerCompletion],
  );

  // Open step detail panel
  const handleOpenPanel = useCallback(
    (stepId: string, title: string, description: string) => {
      if (!isAuthenticated) {
        onLoginRequired?.();
        return;
      }
      openPanel({ stepId, stepTitle: title, stepDescription: description, roadmapId, roadmapTitle });
    },
    [openPanel, roadmapId, roadmapTitle, isAuthenticated, onLoginRequired],
  );

  // Detect section completion transitions
  useEffect(() => {
    sections.forEach((section) => {
      const children = section.children ?? [];
      if (children.length === 0) return;
      const key = section.id;
      const current = children.map((c) => c.is_completed);
      const prev = prevCompletion.current[key] ?? [];

      const nowAllDone = current.every(Boolean);
      const prevAllDone = prev.length > 0 && prev.every(Boolean);

      if (nowAllDone && !prevAllDone) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          particleRef.current?.confetti(rect.left + rect.width / 2, rect.top + rect.height / 3);
        }
        triggerSectionComplete(section.title);
        playSectionCompleteSound();
      }

      prevCompletion.current[key] = current;
    });
  }, [sections, triggerSectionComplete]);

  // Track medium screens for single-column mode
  const [isMedium, setIsMedium] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    setIsMedium(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMedium(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Mini TOC */}
      <MiniTableOfContents sections={sections} />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'mr-[480px]' : ''
        }`}
      >
        <div className="relative py-8">
          {/* The vertical spine line */}
          <div
            className={`absolute top-0 bottom-0 roadmap-spine ${
              isMedium ? 'left-4 w-0.5' : 'left-1/2 -translate-x-1/2 w-0.5'
            } lg:left-1/2 lg:-translate-x-1/2`}
          />

          {/* Sections + Steps */}
          <div className="relative space-y-10">
            {sections.map((section, sectionIdx) => {
              const cs = COLOR_SCHEMES[sectionIdx % COLOR_SCHEMES.length];
              const children = section.children ?? [];
              const allDone =
                children.length > 0 && children.every((c) => c.is_completed);

              return (
                <div key={section.id} className="space-y-5">
                  {/* Section waypoint: spine dot + card */}
                  <div className="relative">
                    {/* Spine dot for section */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 z-10 ${
                        isMedium
                          ? 'left-4 -translate-x-1/2'
                          : 'left-1/2 -translate-x-1/2'
                      } lg:left-1/2 lg:-translate-x-1/2`}
                    >
                      <SpineDot
                        isSection
                        colorScheme={cs}
                        isComplete={allDone}
                      />
                    </div>

                    {/* Section card */}
                    <div
                      className={`${
                        isMedium ? 'pl-12' : 'px-4'
                      } lg:px-0`}
                    >
                      <SectionCard
                        section={section}
                        index={sectionIdx}
                        colorScheme={cs}
                      />
                    </div>
                  </div>

                  {/* Step branches */}
                  {children.map((step, stepIdx) => {
                    const side: 'left' | 'right' =
                      isMedium ? 'right' : stepIdx % 2 === 0 ? 'left' : 'right';

                    return (
                      <div key={step.id} className="relative">
                        {/* Spine dot for step */}
                        <div
                          className={`absolute top-6 z-10 ${
                            isMedium
                              ? 'left-4 -translate-x-1/2'
                              : 'left-1/2 -translate-x-1/2'
                          } lg:left-1/2 lg:-translate-x-1/2`}
                        >
                          <SpineDot
                            isSection={false}
                            colorScheme={cs}
                            isComplete={step.is_completed}
                          />
                        </div>

                        {/* Step card in grid */}
                        {isMedium ? (
                          /* Tablet: single column, steps always on right */
                          <div className="pl-12 pr-4">
                            <StepCard
                              step={step}
                              side="right"
                              stepIndex={stepIdx}
                              colorScheme={cs}
                              isDueForReview={dueStepIds.has(step.id)}
                              onToggle={onToggle}
                              onBurst={handleBurst}
                              onOpenPanel={handleOpenPanel}
                            />
                          </div>
                        ) : (
                          /* Desktop: 3-column grid, alternating left/right */
                          <div className="grid grid-cols-[1fr_48px_1fr] items-start gap-0 px-4 lg:px-0">
                            {/* Left column */}
                            <div className={side === 'left' ? '' : ''}>
                              {side === 'left' && (
                                <StepCard
                                  step={step}
                                  side="left"
                                  stepIndex={stepIdx}
                                  colorScheme={cs}
                                  isDueForReview={dueStepIds.has(step.id)}
                                  onToggle={onToggle}
                                  onBurst={handleBurst}
                                  onOpenPanel={handleOpenPanel}
                                />
                              )}
                            </div>

                            {/* Center spine spacer */}
                            <div />

                            {/* Right column */}
                            <div>
                              {side === 'right' && (
                                <StepCard
                                  step={step}
                                  side="right"
                                  stepIndex={stepIdx}
                                  colorScheme={cs}
                                  isDueForReview={dueStepIds.has(step.id)}
                                  onToggle={onToggle}
                                  onBurst={handleBurst}
                                  onOpenPanel={handleOpenPanel}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Particle overlay — fixed to viewport */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        <ParticleCanvas ref={particleRef} />
      </div>

      {/* XP toasts, combo counter, section banners */}
      <CompletionFx
        xpToasts={xpToasts}
        combo={combo}
        sectionBanner={sectionBanner}
        containerRef={containerRef}
      />

      {/* Step detail panel — fixed */}
      <StepDetailPanel />
    </div>
  );
}
