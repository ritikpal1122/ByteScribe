import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as problemsApi from '../api/problems';
import { RunCodeRequest, SubmissionCreate } from '../types';

export function useProblems(
  page: number = 1,
  perPage: number = 20,
  difficulty?: 'easy' | 'medium' | 'hard',
  tag?: string,
  search?: string,
  company?: string,
  sortBy?: 'newest' | 'acceptance' | 'difficulty',
  status?: 'solved' | 'unsolved' | 'attempted',
) {
  return useQuery({
    queryKey: ['problems', { page, perPage, difficulty, tag, search, company, sortBy, status }],
    queryFn: () =>
      problemsApi.getProblems({
        page,
        per_page: perPage,
        difficulty,
        tag,
        search,
        company,
        sort_by: sortBy,
        status,
      }),
    select: (res) => res.data,
  });
}

export function useProblem(slug: string) {
  return useQuery({
    queryKey: ['problems', slug],
    queryFn: () => problemsApi.getProblem(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useRunCode() {
  return useMutation({
    mutationFn: (payload: RunCodeRequest) => problemsApi.runCode(payload),
  });
}

export function useSubmitSolution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmissionCreate) =>
      problemsApi.submitSolution(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
      queryClient.invalidateQueries({
        queryKey: ['submissions', variables.problem_id],
      });
    },
  });
}

export function useSubmissions(problemSlug: string) {
  return useQuery({
    queryKey: ['submissions', problemSlug],
    queryFn: () => problemsApi.getSubmissions(problemSlug),
    select: (res) => res.data,
    enabled: !!problemSlug,
  });
}
