import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as companiesApi from '../api/companies';
import { InterviewExperienceCreate } from '../types';

export function useCompanies(
  page: number = 1,
  perPage: number = 20,
  search?: string,
  industry?: string,
) {
  return useQuery({
    queryKey: ['companies', { page, perPage, search, industry }],
    queryFn: () =>
      companiesApi.getCompanies({ page, per_page: perPage, search, industry }),
    select: (res) => res.data,
  });
}

export function useCompany(slug: string) {
  return useQuery({
    queryKey: ['companies', slug],
    queryFn: () => companiesApi.getCompany(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useExperiences(params?: {
  page?: number;
  per_page?: number;
  company_id?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  result?: 'selected' | 'rejected' | 'pending' | 'no_response';
  sort_by?: 'newest' | 'votes';
}) {
  return useQuery({
    queryKey: ['experiences', params],
    queryFn: () => companiesApi.getExperiences(params),
    select: (res) => res.data,
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: InterviewExperienceCreate) =>
      companiesApi.createExperience(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}
