import { create } from "zustand";

export type StepPanelTab = "notes" | "ai-chat" | "review" | "analytics";

interface StepPanelState {
  isOpen: boolean;
  selectedStepId: string;
  selectedStepTitle: string;
  selectedStepDescription: string;
  roadmapId: string;
  roadmapTitle: string;
  activeTab: StepPanelTab;
  openPanel: (params: {
    stepId: string;
    stepTitle: string;
    stepDescription: string;
    roadmapId: string;
    roadmapTitle: string;
  }) => void;
  closePanel: () => void;
  setActiveTab: (tab: StepPanelTab) => void;
}

export const useStepPanelStore = create<StepPanelState>((set) => ({
  isOpen: false,
  selectedStepId: "",
  selectedStepTitle: "",
  selectedStepDescription: "",
  roadmapId: "",
  roadmapTitle: "",
  activeTab: "notes",
  openPanel: ({ stepId, stepTitle, stepDescription, roadmapId, roadmapTitle }) =>
    set({
      isOpen: true,
      selectedStepId: stepId,
      selectedStepTitle: stepTitle,
      selectedStepDescription: stepDescription,
      roadmapId,
      roadmapTitle,
      activeTab: "notes",
    }),
  closePanel: () => set({ isOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
