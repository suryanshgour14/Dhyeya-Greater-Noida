'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import {
  LogOut, Loader2, ChevronRight,
  GraduationCap, ShoppingBag, Trophy, Settings,
  BookOpen, FileText, CheckCircle2, Clock, Calendar, TrendingUp,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// ─── Types (serializable props from the server) ───────────────────────────────
interface Product {
  id: string;
  title: string;
  title_hi: string | null;
  type: string;
  ref_slug: string | null;
  price_inr: number;
}
interface Enrollment {
  id: string;
  granted_at: string;
  expires_at: string | null;
  products: Product | null;
}
interface Attempt {
  id: string;
  test_id: string;
  score: number | null;
  total_correct: number | null;
  total_wrong: number | null;
  total_skipped: number | null;
  time_taken_sec: number | null;
  submitted_at: string | null;
  created_at: string;
  status: string;
}
interface Test {
  id: string;
  title: string;
  exam_type: string | null;
  marks_per_q: number | null;
}

type Tab = 'courses' | 'purchases' | 'results' | 'settings';

interface Props {
  user: User;
  locale: string;
  initialTab: Tab;
  enrollments: Enrollment[];
  attempts: Attempt[];
  tests: Test[];
}

const TABS: { id: Tab; label: string; icon: typeof GraduationCap }[] = [
  { id: 'courses',   label: 'My Courses',       icon: GraduationCap },
  { id: 'purchases', label: 'My Purchases',     icon: ShoppingBag },
  { id: 'results',   label: 'My Results',       icon: Trophy },
  { id: 'settings',  label: 'Account Settings', icon: Settings },
];

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtTime(sec: number | null) {
  if (!sec) return '—';
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
}

export default function DashboardClient({ user, locale, initialTab, enrollments, attempts, tests }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  const displayName = (user.user_metadata?.name as string) || user.email?.split('@')[0] || 'Aspirant';
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const joinedDate = new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const provider = user.app_metadata?.provider === 'google' ? 'Google' : 'Email / Password';

  const courses = enrollments.filter((e) => e.products?.type === 'course');
  const testMap = new Map(tests.map((t) => [t.id, t]));

  async function handleLogout() {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
              {avatarLetter}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-60"
          >
            {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            {loggingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Welcome card */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-brand-blue p-6 text-white">
          <p className="mb-1 text-sm font-medium text-brand-gold">Welcome back 👋</p>
          <h1 className="mb-1 text-2xl font-bold">{displayName}</h1>
          <p className="text-sm text-slate-300">Member since {joinedDate}</p>
        </div>

        {/* Tab nav */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-white p-1 shadow-sm scrollbar-hide">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                tab === id ? 'bg-brand-blue text-white' : 'text-muted-foreground hover:bg-brand-blue/5 hover:text-brand-blue'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── My Courses ─────────────────────────────────────────────────────── */}
        {tab === 'courses' && (
          courses.length === 0 ? (
            <EmptyState
              icon={<GraduationCap className="h-12 w-12 text-slate-300" />}
              title="No courses yet"
              subtitle="Enroll in a course to get started."
              action={{ label: 'Browse Courses', href: `/${locale}/courses` }}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((e) => {
                const p = e.products!;
                const expired = e.expires_at && new Date(e.expires_at) < new Date();
                return (
                  <div key={e.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold leading-tight text-slate-800">
                          {locale === 'hi' && p.title_hi ? p.title_hi : p.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {e.expires_at ? `${expired ? 'Expired' : 'Valid till'} ${fmtDate(e.expires_at)}` : 'Lifetime access'}
                        </p>
                      </div>
                    </div>
                    {!expired && p.ref_slug && (
                      <Link
                        href={`/${locale}/courses/${p.ref_slug}`}
                        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                      >
                        View Course <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── My Purchases ───────────────────────────────────────────────────── */}
        {tab === 'purchases' && (
          enrollments.length === 0 ? (
            <EmptyState
              icon={<ShoppingBag className="h-12 w-12 text-slate-300" />}
              title="No purchases yet"
              subtitle="Browse our courses and tests to get started."
              action={{ label: 'Browse Courses', href: `/${locale}/courses` }}
            />
          ) : (
            <div className="space-y-4">
              {enrollments.map((row) => {
                const p = row.products;
                if (!p) return null;
                const expired = row.expires_at && new Date(row.expires_at) < new Date();
                const isCourse = p.type === 'course';
                const href = isCourse ? `/${locale}/courses/${p.ref_slug}` : `/${locale}/tests`;
                return (
                  <div key={row.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isCourse ? 'bg-blue-50' : 'bg-amber-50'}`}>
                        {isCourse ? <BookOpen className="h-5 w-5 text-blue-600" /> : <FileText className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div>
                        <p className="font-semibold leading-tight text-slate-800">
                          {locale === 'hi' && p.title_hi ? p.title_hi : p.title}
                        </p>
                        <p className="mt-0.5 text-xs capitalize text-slate-400">{p.type}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Calendar className="h-3 w-3" /> Enrolled {fmtDate(row.granted_at)}
                          </span>
                          {row.expires_at ? (
                            <span className={`flex items-center gap-1 ${expired ? 'text-red-500' : 'text-slate-500'}`}>
                              <Clock className="h-3 w-3" /> {expired ? 'Expired' : 'Expires'} {fmtDate(row.expires_at)}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle2 className="h-3 w-3" /> Lifetime access
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="hidden text-right sm:block">
                        <p className="text-sm font-bold text-slate-800">₹{p.price_inr.toLocaleString('en-IN')}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${expired ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                          {expired ? 'EXPIRED' : 'ACTIVE'}
                        </span>
                      </div>
                      {!expired && (
                        <Link href={href} className="whitespace-nowrap rounded-xl bg-brand-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700">
                          {isCourse ? 'View Course' : 'Go to Tests'}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── My Results ─────────────────────────────────────────────────────── */}
        {tab === 'results' && (
          attempts.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-12 w-12 text-slate-300" />}
              title="No test results yet"
              subtitle="Attempt a test to see your results here."
              action={{ label: 'Browse Tests', href: `/${locale}/tests` }}
            />
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-500">{attempts.length} test{attempts.length !== 1 ? 's' : ''} completed</p>
              {attempts.map((attempt) => {
                const test = testMap.get(attempt.test_id);
                const totalQ = (attempt.total_correct ?? 0) + (attempt.total_wrong ?? 0) + (attempt.total_skipped ?? 0);
                const maxMarks = totalQ * (test?.marks_per_q ?? 2);
                const pct = maxMarks > 0 ? Math.round(((attempt.score ?? 0) / maxMarks) * 100) : 0;
                const scoreColor = pct >= 60 ? 'text-green-600' : pct >= 40 ? 'text-amber-600' : 'text-red-500';
                return (
                  <div key={attempt.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h2 className="truncate font-bold text-slate-800">{test?.title ?? 'Unknown Test'}</h2>
                        {test?.exam_type && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{test.exam_type}</span>
                        )}
                        {attempt.status === 'auto_submitted' && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Auto-submitted</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{fmtDate(attempt.submitted_at ?? attempt.created_at)}</p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3.5 w-3.5 text-brand-gold" />
                          <span className={`text-sm font-bold ${scoreColor}`}>{attempt.score ?? 0}</span>
                          <span className="text-slate-400">/ {maxMarks}</span>
                          <span className={`ml-0.5 font-semibold ${scoreColor}`}>({pct}%)</span>
                        </span>
                        <span className="font-semibold text-green-600">✓ {attempt.total_correct ?? 0} correct</span>
                        <span className="font-semibold text-red-500">✗ {attempt.total_wrong ?? 0} wrong</span>
                        <span className="text-slate-400">— {attempt.total_skipped ?? 0} skipped</span>
                        <span className="flex items-center gap-1 text-slate-500"><Clock className="h-3.5 w-3.5" />{fmtTime(attempt.time_taken_sec)}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <Link href={`/${locale}/tests/${attempt.test_id}/result/${attempt.id}`} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
                        <TrendingUp className="h-4 w-4" /> Result &amp; Analysis
                      </Link>
                      <Link href={`/${locale}/tests/${attempt.test_id}/attempt`} className="flex items-center gap-1.5 rounded-xl border border-brand-blue px-4 py-2 text-sm font-bold text-brand-blue transition-colors hover:bg-blue-50">
                        Retest <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── Account Settings ───────────────────────────────────────────────── */}
        {tab === 'settings' && (
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-foreground">Account Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Name', value: displayName },
                { label: 'Email', value: user.email ?? '—' },
                { label: 'Phone', value: (user.user_metadata?.phone as string) || '—' },
                { label: 'Login method', value: provider },
                { label: 'Member since', value: joinedDate },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              To update your name, phone or password, contact support at{' '}
              <Link href={`/${locale}/contact`} className="font-semibold text-brand-blue hover:underline">the contact page</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Shared empty state ────────────────────────────────────────────────────────
function EmptyState({ icon, title, subtitle, action }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: { label: string; href: string };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto mb-4 flex justify-center">{icon}</div>
      <p className="text-lg font-semibold text-slate-600">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
      <Link href={action.href} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700">
        {action.label} <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
