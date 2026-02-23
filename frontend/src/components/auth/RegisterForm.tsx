import { useState, useMemo, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, User, AtSign, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { resendVerification } from '@/api/auth';
import { GitHubLoginButton } from './GitHubLoginButton';

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-amber-500' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-500' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-emerald-500' };
  return { score, label: 'Very strong', color: 'bg-emerald-600' };
}

export function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [verifyLink, setVerifyLink] = useState<string | null>(null);

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!username.trim()) {
      errors.username = 'Username is required.';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.username =
        'Username can only contain letters, numbers, hyphens, and underscores.';
    }

    if (!fullName.trim()) {
      errors.fullName = 'Display name is required.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await register(email, username, fullName, password);
      setRegisteredEmail(email);
      if (res.data?.verify_link) {
        setVerifyLink(res.data.verify_link);
      }
      setRegistered(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setResendMsg(null);
    try {
      const res = await resendVerification(registeredEmail);
      if (res.data?.verify_link) {
        setVerifyLink(res.data.verify_link);
      }
      setResendMsg('Verification email sent! Check your inbox.');
    } catch {
      setResendMsg('Failed to resend. Please try again.');
    } finally {
      setResending(false);
    }
  }

  if (registered) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Check your email
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          We've sent a verification link to<br />
          <span className="font-medium text-gray-900">{registeredEmail}</span>
        </p>
        <p className="text-sm text-gray-500">
          Click the link in the email to verify your account, then you can log in.
        </p>
        {verifyLink && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-left">
            <p className="text-xs font-medium text-blue-700 mb-1">Dev mode — SMTP not configured</p>
            <a
              href={verifyLink}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 underline break-all"
            >
              Click here to verify your email
            </a>
          </div>
        )}
        <div className="space-y-3">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
          >
            {resending ? 'Sending...' : "Didn't receive it? Resend"}
          </button>
          {resendMsg && (
            <p className="text-xs text-gray-500">{resendMsg}</p>
          )}
        </div>
        <Link
          to="/login"
          className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-500"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const inputClasses = cn(
    'block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors',
    'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
    'disabled:cursor-not-allowed disabled:opacity-60'
  );

  const inputErrorClasses = cn(
    'block w-full rounded-lg border border-red-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition-colors',
    'focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20',
    'disabled:cursor-not-allowed disabled:opacity-60'
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Join the community and start learning
        </p>
      </div>

      {/* Error toast */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={fieldErrors.email ? inputErrorClasses : inputClasses}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-xs text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="register-username"
              type="text"
              required
              autoComplete="username"
              placeholder="your-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className={fieldErrors.username ? inputErrorClasses : inputClasses}
            />
          </div>
          {fieldErrors.username && (
            <p className="text-xs text-red-600">
              {fieldErrors.username}
            </p>
          )}
        </div>

        {/* Display Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Display name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="register-fullname"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              className={fieldErrors.fullName ? inputErrorClasses : inputClasses}
            />
          </div>
          {fieldErrors.fullName && (
            <p className="text-xs text-red-600">
              {fieldErrors.fullName}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="register-password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={fieldErrors.password ? inputErrorClasses : inputClasses}
            />
          </div>
          {fieldErrors.password && (
            <p className="text-xs text-red-600">
              {fieldErrors.password}
            </p>
          )}

          {/* Password strength indicator */}
          {password.length > 0 && (
            <div className="space-y-1 pt-1">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors',
                      i < passwordStrength.score
                        ? passwordStrength.color
                        : 'bg-gray-200'
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="register-confirm-password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className={
                fieldErrors.confirmPassword ? inputErrorClasses : inputClasses
              }
            />
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-red-600">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors',
            'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-60'
          )}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      {/* Separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">
            or continue with
          </span>
        </div>
      </div>

      {/* GitHub */}
      <GitHubLoginButton />

      {/* Login link */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
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
