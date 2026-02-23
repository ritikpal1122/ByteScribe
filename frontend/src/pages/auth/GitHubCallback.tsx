import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { githubCallback } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { getMe } from '@/api/auth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { AlertTriangle } from 'lucide-react';

export default function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      setError('No authorization code received from GitHub. Please try again.');
      return;
    }

    // Prevent double-fire from React StrictMode (OAuth codes are single-use)
    if (hasRun.current) return;
    hasRun.current = true;

    async function handleCallback(authCode: string) {
      try {
        const res = await githubCallback(authCode);

        setTokens(res.data.access_token, res.data.refresh_token);

        // Fetch the user profile
        const userRes = await getMe();

        setUser(userRes.data);
        navigate('/', { replace: true });
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : 'GitHub authentication failed. Please try again.';
        setError(message);
      }
    }

    handleCallback(code);
  }, [searchParams, navigate, setTokens, setUser]);

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            Authentication Failed
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {error}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Back to Login
            </button>
            <button
              onClick={() => navigate('/', { replace: true })}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <LoadingSpinner size="lg" text="Authenticating with GitHub..." />
    </div>
  );
}
