import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as commentsApi from '../api/comments';
import type { CommentCreate } from '../api/comments';

export function useComments(
  contentType: string,
  contentId: string,
  sortBy: 'newest' | 'oldest' | 'votes' = 'newest',
  page: number = 1,
  perPage: number = 20,
) {
  return useQuery({
    queryKey: ['comments', contentType, contentId, { sortBy, page, perPage }],
    queryFn: () =>
      commentsApi.getComments({
        content_type: contentType,
        content_id: contentId,
        sort_by: sortBy,
        page,
        per_page: perPage,
      }),
    select: (res) => res.data,
    enabled: !!contentId,
  });
}

export function useReplies(commentId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['comments', 'replies', commentId],
    queryFn: () => commentsApi.getReplies(commentId),
    select: (res) => res.data,
    enabled: !!commentId && enabled,
  });
}

export function useCreateComment(contentType: string, contentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommentCreate) =>
      commentsApi.createComment(contentType, contentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', contentType, contentId],
      });
      // Also invalidate replies if this was a reply
      queryClient.invalidateQueries({
        queryKey: ['comments', 'replies'],
      });
    },
  });
}

export function useDeleteComment(contentType: string, contentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentsApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', contentType, contentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['comments', 'replies'],
      });
    },
  });
}

export function useVoteComment(contentType: string, contentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      voteType,
    }: {
      commentId: string;
      voteType: 'upvote' | 'downvote';
    }) => commentsApi.voteComment(commentId, voteType),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', contentType, contentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['comments', 'replies'],
      });
    },
  });
}
