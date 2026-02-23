import { useQuery } from '@tanstack/react-query';
import * as searchApi from '../api/search';
import type { SearchContentType } from '../api/search';

export function useSearch(
  query: string,
  contentType?: SearchContentType,
  page: number = 1,
  perPage: number = 20,
) {
  return useQuery({
    queryKey: ['search', query, contentType, page],
    queryFn: () =>
      searchApi.search(
        query,
        contentType ? [contentType] : undefined,
        page,
        perPage,
      ),
    select: (res) => res.data,
    enabled: query.length >= 2,
  });
}
