import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forgotPassword, resendVerification } from '@/api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verifyLink, setVerifyLink] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNeedsVerification(false);
    setVerifyLink(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.data?.reset_link) {
        setResetLink(res.data.reset_link);
      }
      setSent(true);
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      const errorMsg = msg || 'Something went wrong. Please try again.';
      if (errorMsg.toLowerCase().includes('verify your email')) {
        setNeedsVerification(true);
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerification() {
    setResending(true);
    setVerifyLink(null);
    try {
      const res = await resendVerification(email);
      if (res.data?.verify_link) {
        setVerifyLink(res.data.verify_link);
      }
    } catch {
      // toast will show from global interceptor
    } finally {
      setResending(false);
    }
  }

  if (sent) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          If an account exists for <span className="font-medium text-gray-900">{email}</span>,
          we've sent a password reset link.
        </p>
        {resetLink && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-left">
            <p className="text-xs font-medium text-blue-700 mb-1">Dev mode — SMTP not configured</p>
            <a
              href={resetLink}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 underline break-all"
            >
              Click here to reset your password
            </a>
          </div>
        )}
        <p className="text-sm text-gray-400">
          Didn't get it? Check your spam folder or try again.
        </p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setSent(false)}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Try a different email
          </button>
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          {needsVerification && (
            <div className="mt-2">
              <button
                onClick={handleResendVerification}
                disabled={resending}
                className="font-medium text-blue-600 hover:text-blue-500 underline disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend verification email'}
              </button>
            </div>
          )}
        </div>
      )}
      {verifyLink && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <p className="text-xs font-medium text-blue-700 mb-1">Dev mode — SMTP not configured</p>
          <a
            href={verifyLink}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 underline break-all"
          >
            Click here to verify your email
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="forgot-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="forgot-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={cn(
                'block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors',
                'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                'disabled:cursor-not-allowed disabled:opacity-60',
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors',
            'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
