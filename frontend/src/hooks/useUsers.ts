import { useQuery } from '@tanstack/react-query';
import * as usersApi from '../api/users';

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: ['users', username],
    queryFn: () => usersApi.getPublicProfile(username),
    select: (res) => res.data,
    enabled: !!username,
  });
}
