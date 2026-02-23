import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as roadmapsApi from '../api/roadmaps';

export function useRoadmaps(
  page: number = 1,
  perPage: number = 20,
  difficulty?: 'beginner' | 'intermediate' | 'advanced',
  search?: string,
) {
  return useQuery({
    queryKey: ['roadmaps', { page, perPage, difficulty, search }],
    queryFn: () =>
      roadmapsApi.getRoadmaps({ page, per_page: perPage, difficulty, search }),
    select: (res) => res.data,
  });
}

export function useRoadmap(slug: string) {
  return useQuery({
    queryKey: ['roadmaps', slug],
    queryFn: () => roadmapsApi.getRoadmap(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useUpdateRoadmapProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roadmapId,
      nodeId,
      isCompleted,
    }: {
      roadmapId: string;
      nodeId: string;
      isCompleted: boolean;
    }) => roadmapsApi.updateProgress(roadmapId, nodeId, isCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
}
