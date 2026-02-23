import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as codeReviewsApi from '../api/codeReviews';

export function useCodeReview(submissionId: string | undefined) {
  return useQuery({
    queryKey: ['code-review', submissionId],
    queryFn: () => codeReviewsApi.getReview(submissionId!),
    select: (res) => res.data,
    enabled: !!submissionId,
  });
}

export function useRequestReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submissionId: string) =>
      codeReviewsApi.requestReview(submissionId),
    onSuccess: (data, submissionId) => {
      queryClient.invalidateQueries({ queryKey: ['code-review', submissionId] });
    },
  });
}
