import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as studyPlanApi from '../api/studyPlans';
import type { AddItemEntry } from '../api/studyPlans';

export function useStudyPlans(page = 1, perPage = 20) {
  return useQuery({
    queryKey: ['study-plans', { page, perPage }],
    queryFn: () => studyPlanApi.getStudyPlans({ page, per_page: perPage }),
    select: (res) => res.data,
  });
}

export function useStudyPlan(id: string) {
  return useQuery({
    queryKey: ['study-plans', id],
    queryFn: () => studyPlanApi.getStudyPlan(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useCreateStudyPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studyPlanApi.createStudyPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
    },
  });
}

export function useUpdateStudyPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & Parameters<typeof studyPlanApi.updateStudyPlan>[1]) =>
      studyPlanApi.updateStudyPlan(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
      queryClient.invalidateQueries({ queryKey: ['study-plans', variables.id] });
    },
  });
}

export function useDeleteStudyPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studyPlanApi.deleteStudyPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
    },
  });
}

export function useAddItems() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, items }: { planId: string; items: AddItemEntry[] }) =>
      studyPlanApi.addItems(planId, items),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
      queryClient.invalidateQueries({ queryKey: ['study-plans', variables.planId] });
    },
  });
}

export function useRemoveItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, itemId }: { planId: string; itemId: string }) =>
      studyPlanApi.removeItem(planId, itemId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
      queryClient.invalidateQueries({ queryKey: ['study-plans', variables.planId] });
    },
  });
}

export function useToggleItemComplete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, itemId }: { planId: string; itemId: string }) =>
      studyPlanApi.toggleItemComplete(planId, itemId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
      queryClient.invalidateQueries({ queryKey: ['study-plans', variables.planId] });
    },
  });
}

export function useGenerateStudyPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studyPlanApi.generateStudyPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['study-plans'] });
    },
  });
}
