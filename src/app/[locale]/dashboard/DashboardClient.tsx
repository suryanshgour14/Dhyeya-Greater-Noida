'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import {
  BookOpen, ClipboardList, Bell, Download,
  LogOut, User as UserIcon, ChevronRight, Loader2,
  GraduationCap, Trophy, FileText, HelpCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const QUICK_LINKS = [
  { icon: BookOpen,      label: 'Study Material',    href: '/student-zone/resources',     color: 'bg-brand-blue/10 text-brand-blue' },
  { icon: ClipboardList, label: 'Test Series',        href: '/test-series',                color: 'bg-brand-gold/10 text-amber-600' },
  { icon: Bell,          label: 'Notifications',      href: '/student-zone/notifications', color: 'bg-brand-orange/10 text-brand-orange' },
  { icon: Download,      label: 'Download Brochure',  href: '/student-zone/brochure',      color: 'bg-emerald-50 text-emerald-600' },
  { icon: GraduationCap, label: 'My Courses',         href: '/courses',                    color: 'bg-violet-50 text-violet-600' },
  { icon: Trophy,        label: 'Results',            href: '/results',                    color: 'bg-sky-50 text-sky-600' },
  { icon: FileText,      label: 'Exam Info',          href: '/student-zone/exam-info',     color: 'bg-rose-50 text-rose-600' },
  { icon: HelpCircle,    label: 'FAQs',               href: '/student-zone/faqs',          color: 'bg-slate-100 text-slate-600' },
];

interface Props {
  user: User;
  locale: string;
}

export default function DashboardClient({ user, locale }: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  const displayName = (user.user_metadata?.name as string) || user.email?.split('@')[0] || 'Aspirant';
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const joinedDate = new Date(user.created_at).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

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

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Welcome card */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-brand-blue p-6 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }}
            aria-hidden
          />
          <p className="mb-1 text-sm font-medium text-brand-gold">Welcome back 👋</p>
          <h1 className="mb-1 text-2xl font-bold">{displayName}</h1>
          <p className="text-sm text-slate-300">Member since {joinedDate}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/courses`}
              className="flex items-center gap-1.5 rounded-full bg-brand-gold px-4 py-1.5 text-sm font-semibold text-brand-blue transition-opacity hover:opacity-90"
            >
              Browse Courses <ChevronRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`/${locale}/test-series`}
              className="flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Test Series
            </Link>
          </div>
        </div>

        {/* Account info */}
        <div className="mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-brand-blue" />
            <h2 className="text-base font-semibold text-foreground">Account Details</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Name',   value: displayName },
              { label: 'Email',  value: user.email ?? '—' },
              { label: 'Phone',  value: (user.user_metadata?.phone as string) || '—' },
              { label: 'Login method', value: user.app_metadata?.provider === 'google' ? 'Google' : 'Email / Password' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <h2 className="mb-4 text-base font-semibold text-foreground">Quick Access</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          {QUICK_LINKS.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={label}
              href={`/${locale}${href}`}
              className="group flex flex-col items-center rounded-2xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <span className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-xs font-semibold text-foreground leading-snug">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
