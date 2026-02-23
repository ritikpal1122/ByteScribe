import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/roadmapSteps";

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export function useStepNote(roadmapId: string, stepId: string) {
  return useQuery({
    queryKey: ["roadmap-step-note", roadmapId, stepId],
    queryFn: () => api.getStepNote(roadmapId, stepId),
    select: (res) => res.data,
    enabled: !!roadmapId && !!stepId,
  });
}

export function useUpsertStepNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      roadmapId,
      stepId,
      content,
      code_snippet,
      language,
    }: {
      roadmapId: string;
      stepId: string;
      content: string;
      code_snippet?: string | null;
      language?: string | null;
    }) => api.upsertStepNote(roadmapId, stepId, { content, code_snippet, language }),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["roadmap-step-note", vars.roadmapId, vars.stepId],
      });
    },
  });
}

export function useDeleteStepNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roadmapId, stepId }: { roadmapId: string; stepId: string }) =>
      api.deleteStepNote(roadmapId, stepId),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({
        queryKey: ["roadmap-step-note", vars.roadmapId, vars.stepId],
      });
    },
  });
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export function useStepReview(roadmapId: string, stepId: string) {
  return useQuery({
    queryKey: ["roadmap-step-review", roadmapId, stepId],
    queryFn: () => api.getStepReview(roadmapId, stepId),
    select: (res) => res.data,
    enabled: !!roadmapId && !!stepId,
  });
}

export function useDueReviews(roadmapId: string) {
  return useQuery({
    queryKey: ["roadmap-due-reviews", roadmapId],
    queryFn: () => api.getDueReviews(roadmapId),
    select: (res) => res.data,
    enabled: !!roadmapId,
  });
}

export function useReviewStep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      roadmapId,
      stepId,
      quality,
    }: {
      roadmapId: string;
      stepId: string;
      quality: number;
    }) => api.reviewStep(roadmapId, stepId, quality),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["roadmap-step-review", vars.roadmapId, vars.stepId] });
      qc.invalidateQueries({ queryKey: ["roadmap-due-reviews", vars.roadmapId] });
      qc.invalidateQueries({ queryKey: ["roadmaps"] });
    },
  });
}

// ---------------------------------------------------------------------------
// Time logging + analytics
// ---------------------------------------------------------------------------

export function useLogTime() {
  return useMutation({
    mutationFn: ({
      roadmapId,
      stepId,
      durationSeconds,
    }: {
      roadmapId: string;
      stepId: string;
      durationSeconds: number;
    }) => api.logStepTime(roadmapId, stepId, durationSeconds),
  });
}

export function useRoadmapAnalytics(roadmapId: string) {
  return useQuery({
    queryKey: ["roadmap-analytics", roadmapId],
    queryFn: () => api.getRoadmapAnalytics(roadmapId),
    select: (res) => res.data,
    enabled: !!roadmapId,
  });
}
