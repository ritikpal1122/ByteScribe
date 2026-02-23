import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as spacedRepetitionApi from '../api/spacedRepetition';

export function useDueCards() {
  return useQuery({
    queryKey: ['sr-due-cards'],
    queryFn: () => spacedRepetitionApi.getDueCards(),
    select: (res) => res.data,
  });
}

export function useReviewCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, quality }: { cardId: string; quality: number }) =>
      spacedRepetitionApi.reviewCard(cardId, quality),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sr-due-cards'] });
      queryClient.invalidateQueries({ queryKey: ['sr-stats'] });
    },
  });
}

export function useReviewStats() {
  return useQuery({
    queryKey: ['sr-stats'],
    queryFn: () => spacedRepetitionApi.getReviewStats(),
    select: (res) => res.data,
  });
}
