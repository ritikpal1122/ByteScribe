import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { verifyEmail } from '@/api/auth';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token.');
      return;
    }

    verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.message);
      })
      .catch((err) => {
        setStatus('error');
        setMessage(
          err?.response?.data?.message ||
            'Verification failed. The link may have expired.',
        );
      });
  }, [token]);

  return (
    <div className="w-full space-y-6 text-center">
      {status === 'loading' && (
        <>
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">
            Verifying your email...
          </h1>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Email verified!</h1>
          <p className="text-sm text-gray-500">{message}</p>
          <Link
            to="/login"
            className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Log in to your account
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Verification failed
          </h1>
          <p className="text-sm text-gray-500">{message}</p>
          <div className="flex flex-col items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-blue-600 hover:text-blue-500"
            >
              Go to Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Create a new account
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
