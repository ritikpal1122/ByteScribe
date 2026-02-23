import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as articlesApi from '../api/articles';
import { ArticleCreate, ArticleUpdate, ArticleVote } from '../types';

export function useArticles(
  page: number = 1,
  perPage: number = 20,
  tag?: string,
) {
  return useQuery({
    queryKey: ['articles', { page, perPage, tag }],
    queryFn: () => articlesApi.getArticles({ page, per_page: perPage, tag }),
    select: (res) => res.data,
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['articles', slug],
    queryFn: () => articlesApi.getArticle(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ArticleCreate) => articlesApi.createArticle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ArticleUpdate }) =>
      articlesApi.updateArticle(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', variables.id] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articlesApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

export function useVoteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, vote }: { id: string; vote: ArticleVote['vote'] }) =>
      articlesApi.voteArticle(id, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}
