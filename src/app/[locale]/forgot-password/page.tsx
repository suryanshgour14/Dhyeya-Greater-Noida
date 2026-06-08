'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError('Please enter your email address.'); return; }
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/${locale}/reset-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708127/DHYEYA_LOGO_ENGLISH_BLUE.jpg_pa8b8v.jpg"
            alt="Dhyeya IAS Greater Noida"
            width={160}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(11,28,61,0.12)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange" />

          <div className="px-8 py-8">
            {sent ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-brand-blue">Check your email</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  We&apos;ve sent a password reset link to <strong>{email}</strong>.
                  Check your inbox and click the link to set a new password.
                </p>
                <p className="mb-4 text-xs text-muted-foreground">
                  Didn&apos;t receive it? Check spam, or{' '}
                  <button onClick={() => setSent(false)} className="font-semibold text-brand-blue hover:underline">
                    try again
                  </button>
                </p>
                <Link
                  href={`/${locale}/login`}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-brand-blue">Forgot Password?</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your registered email and we&apos;ll send you a reset link.
                  </p>
                </div>

                {error && (
                  <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-slate-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/60 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-blue/90 disabled:opacity-60"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {loading ? 'Sending link…' : 'Send Reset Link'}
                  </button>
                </form>

                <div className="mt-6 flex justify-center">
                  <Link
                    href={`/${locale}/login`}
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-blue"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
