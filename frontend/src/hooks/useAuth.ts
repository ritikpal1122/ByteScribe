import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import * as authApi from '../api/auth';

export function useAuth() {
  const store = useAuthStore();

  const fetchUser = useCallback(async () => {
    try {
      const res = await authApi.getMe();
      store.setUser(res.data);
    } catch {
      store.setUser(null);
      store.logout();
    }
  }, [store]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login({ email, password });
      store.setTokens(res.data.access_token, res.data.refresh_token);
      // Fetch the user profile after setting tokens
      const userRes = await authApi.getMe();
      store.setUser(userRes.data);
      return res;
    },
    [store],
  );

  const register = useCallback(
    async (email: string, username: string, fullName: string, password: string) => {
      // Registration no longer returns tokens — user must verify email first
      const res = await authApi.register({
        email,
        username,
        display_name: fullName,
        password,
      });
      return res;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors during logout - clear local state regardless
    } finally {
      store.logout();
    }
  }, [store]);

  // Initialize auth on mount: restore tokens and fetch user
  useEffect(() => {
    store.initialize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When tokens are set but user is not loaded yet, fetch the user
  useEffect(() => {
    if (store.accessToken && !store.user) {
      fetchUser();
    }
  }, [store.accessToken, store.user, fetchUser]);

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    login,
    register,
    logout,
    fetchUser,
  };
}
