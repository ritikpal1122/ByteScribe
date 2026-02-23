import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, StickyNote, MessageSquare, RefreshCw, BarChart3 } from "lucide-react";
import { useStepPanelStore, type StepPanelTab } from "@/stores/stepPanelStore";
import { useStepTimer } from "@/hooks/useStepTimer";
import NotesTab from "./tabs/NotesTab";
import AIChatTab from "./tabs/AIChatTab";
import ReviewTab from "./tabs/ReviewTab";
import AnalyticsTab from "./tabs/AnalyticsTab";

const TABS: { key: StepPanelTab; label: string; icon: typeof StickyNote }[] = [
  { key: "notes", label: "Notes", icon: StickyNote },
  { key: "ai-chat", label: "AI Chat", icon: MessageSquare },
  { key: "review", label: "Review", icon: RefreshCw },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function StepDetailPanel() {
  const {
    isOpen,
    selectedStepId,
    selectedStepTitle,
    selectedStepDescription,
    roadmapId,
    roadmapTitle,
    activeTab,
    closePanel,
    setActiveTab,
  } = useStepPanelStore();

  const seconds = useStepTimer(
    isOpen ? roadmapId : "",
    isOpen ? selectedStepId : "",
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-[480px] bg-white border-l border-gray-200 shadow-xl z-[60] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex-1 min-w-0 mr-3">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {selectedStepTitle}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500 font-mono">
                  {formatTime(seconds)}
                </span>
              </div>
            </div>
            <button
              onClick={closePanel}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "notes" && (
              <NotesTab
                roadmapId={roadmapId}
                stepId={selectedStepId}
              />
            )}
            {activeTab === "ai-chat" && (
              <AIChatTab
                roadmapId={roadmapId}
                stepId={selectedStepId}
                stepTitle={selectedStepTitle}
                stepDescription={selectedStepDescription}
                roadmapTitle={roadmapTitle}
              />
            )}
            {activeTab === "review" && (
              <ReviewTab
                roadmapId={roadmapId}
                stepId={selectedStepId}
              />
            )}
            {activeTab === "analytics" && (
              <AnalyticsTab
                roadmapId={roadmapId}
                currentSeconds={seconds}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
