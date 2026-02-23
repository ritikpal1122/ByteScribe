import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as notificationApi from '../api/notifications';
import { useAuthStore } from '../stores/authStore';

export function useNotifications(page = 1) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['notifications', page],
    queryFn: () => notificationApi.getNotifications({ page }),
    select: (res) => res.data,
    enabled: isAuthenticated,
  });
}

export function useUnreadCount() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationApi.getUnreadCount(),
    select: (res) => res.data.count,
    refetchInterval: isAuthenticated ? 30000 : false,
    enabled: isAuthenticated,
  });
}

export function useMarkAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notificationApi.markAsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notificationApi.markAllAsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
