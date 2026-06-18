'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { createClient } from '@/lib/supabase/client';

// Google "G" SVG logo
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

interface LoginFormProps {
  initialNext?: string;
  errorParam?: string;
}

export default function LoginForm({ initialNext, errorParam }: LoginFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const nextUrl = initialNext ?? `/${locale}`;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  // ── Email / Password login ────────────────────────────────────────
  async function onSubmit(data: LoginFormData) {
    setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push(`/${locale}`);
      router.refresh();
    }
  }

  // ── Google OAuth login ────────────────────────────────────────────
  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(nextUrl)}`,
      },
    });
    if (error) {
      setError('Google login failed. Please try again.');
      setGoogleLoading(false);
    }
    // On success, browser is redirected by Supabase - no need to do anything
  }

  return (
    <div className="w-full">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(11,28,61,0.12)]">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange" />

        <div className="px-8 py-8">
          {/* Logo + heading */}
          <div className="mb-7 text-center">
            <Image
              src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708127/DHYEYA_LOGO_ENGLISH_BLUE.jpg_pa8b8v.jpg"
              alt="Dhyeya IAS Greater Noida"
              width={160}
              height={48}
              className="mx-auto mb-4 h-12 w-auto object-contain"
            />
            <h1 className="text-2xl font-bold text-brand-blue">Welcome Back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to access your study portal
            </p>
          </div>

          {/* Error banner */}
          {(error || errorParam) && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error || 'Authentication failed. Please try again.'}
            </div>
          )}

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || isSubmitting}
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-slate-50 hover:shadow-md disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or sign in with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email / Password form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="w-full rounded-xl border border-border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Link
                  href={`/${locale}/forgot-password`}
                  className="text-xs font-medium text-brand-blue hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className="w-full rounded-xl border border-border bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || googleLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-blue/90 hover:shadow-md disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href={`/${locale}/signup`}
              className="font-semibold text-brand-blue hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
