import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as questionsApi from '../api/questions';
import { QuestionCreate, AnswerCreate, VoteRequest } from '../types';

export function useQuestions(
  page: number = 1,
  perPage: number = 20,
  tag?: string,
) {
  return useQuery({
    queryKey: ['questions', { page, perPage, tag }],
    queryFn: () => questionsApi.getQuestions({ page, per_page: perPage, tag }),
    select: (res) => res.data,
  });
}

export function useQuestion(slug: string) {
  return useQuery({
    queryKey: ['questions', slug],
    queryFn: () => questionsApi.getQuestion(slug),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: QuestionCreate) => questionsApi.createQuestion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useCreateAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AnswerCreate) => questionsApi.createAnswer(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({
        queryKey: ['questions', variables.question_id],
      });
    },
  });
}

export function useAcceptAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      answerId,
    }: {
      questionId: string;
      answerId: string;
    }) => questionsApi.acceptAnswer(questionId, answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      targetType,
      targetId,
      vote,
    }: {
      targetType: 'question' | 'answer';
      targetId: string;
      vote: VoteRequest['vote'];
    }) => questionsApi.vote(targetType, targetId, { vote }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
