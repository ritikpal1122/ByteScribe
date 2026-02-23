import { useQuery } from '@tanstack/react-query';
import * as contestsApi from '../api/contests';

export function useContests(
  status?: string,
  page: number = 1,
  perPage: number = 20,
) {
  return useQuery({
    queryKey: ['contests', { status, page, perPage }],
    queryFn: () =>
      contestsApi.getContests({ status, page, per_page: perPage }),
    select: (res) => res.data,
  });
}

export function useContestDetail(slug: string) {
  return useQuery({
    queryKey: ['contests', slug],
    queryFn: () => contestsApi.getContestBySlug(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}
