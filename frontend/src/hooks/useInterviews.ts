import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as interviewsApi from '../api/interviews';
import { MockInterviewCreate, PeerRoomCreate } from '../types';

export function useMockSessions(
  page: number = 1,
  perPage: number = 20,
  status?: 'active' | 'completed' | 'abandoned',
) {
  return useQuery({
    queryKey: ['mock-sessions', { page, perPage, status }],
    queryFn: () =>
      interviewsApi.getMockSessions({ page, per_page: perPage, status }),
    select: (res) => res.data,
  });
}

export function useMockSession(sessionId: string) {
  return useQuery({
    queryKey: ['mock-sessions', sessionId],
    queryFn: () => interviewsApi.getMockSession(sessionId),
    select: (res) => res.data,
    enabled: !!sessionId,
  });
}

export function useCreateMockSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MockInterviewCreate) =>
      interviewsApi.createMockSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mock-sessions'] });
    },
  });
}

export function useSendMockMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      content,
    }: {
      sessionId: string;
      content: string;
    }) => interviewsApi.sendMockMessage(sessionId, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['mock-sessions', variables.sessionId],
      });
    },
  });
}

export function usePeerRooms(
  page: number = 1,
  perPage: number = 20,
  status?: 'waiting' | 'in_progress' | 'completed',
) {
  return useQuery({
    queryKey: ['peer-rooms', { page, perPage, status }],
    queryFn: () =>
      interviewsApi.getPeerRooms({ page, per_page: perPage, status }),
    select: (res) => res.data,
  });
}

export function useCreatePeerRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PeerRoomCreate) =>
      interviewsApi.createPeerRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['peer-rooms'] });
    },
  });
}

export function useJoinPeerRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => interviewsApi.joinPeerRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['peer-rooms'] });
    },
  });
}
