import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/forms/LoginForm';
import { Trophy, Users, GraduationCap, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Login - Dhyeya IAS Greater Noida',
  description: 'Login to access your study materials, test series, and resources.',
};

const STATS = [
  { icon: Trophy,        value: '500+',    label: 'UPSC Selections' },
  { icon: Users,         value: '15,000+', label: 'Students Trained' },
  { icon: GraduationCap, value: '25+',     label: 'Expert Faculty' },
  { icon: Star,          value: '4.3★',    label: 'Google Rating' },
];

function FormSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(11,28,61,0.12)]">
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange" />
      <div className="animate-pulse px-8 py-8">
        <div className="mx-auto mb-4 h-12 w-40 rounded-lg bg-slate-200" />
        <div className="mx-auto mb-1 h-7 w-44 rounded bg-slate-200" />
        <div className="mx-auto mb-7 h-4 w-56 rounded bg-slate-100" />
        <div className="mb-5 h-11 w-full rounded-xl bg-slate-100" />
        <div className="mb-5 h-px w-full bg-slate-200" />
        <div className="mb-4 h-11 w-full rounded-xl bg-slate-100" />
        <div className="mb-4 h-11 w-full rounded-xl bg-slate-100" />
        <div className="h-11 w-full rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  return (
    <div className="flex min-h-screen">

      {/* ── Left panel - brand (hidden on mobile) ── */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-brand-blue p-12">
        {/* Dot pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Gold glow */}
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708202/DHYEYA_LOGO_ENGLISHWHITE.jpg_gs7mee.jpg"
            alt="Dhyeya IAS Greater Noida"
            width={180}
            height={54}
            className="h-14 w-auto object-contain"
            priority
          />
        </div>

        {/* Middle content */}
        <div className="relative z-10">
          <h2 className="mb-4 text-3xl font-bold leading-snug text-white">
            Your UPSC journey<br />
            starts <span className="text-brand-gold">here.</span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-slate-300">
            Access your study materials, mock tests, current affairs, and live sessions - all in one place.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm">
                <Icon className="mb-2 h-5 w-5 text-brand-gold" />
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="mb-3 text-sm italic leading-relaxed text-slate-300">
            &ldquo;Dhyeya IAS completely transformed my approach to UPSC. The faculty and test series are world-class.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-blue">P</div>
            <div>
              <p className="text-sm font-semibold text-white">Priya Sharma</p>
              <p className="text-xs text-brand-gold">AIR 12 · UPSC CSE 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel - form ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<FormSkeleton />}>
            <LoginForm
              initialNext={searchParams.next}
              errorParam={searchParams.error}
            />
          </Suspense>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Dhyeya IAS Greater Noida. All rights reserved.{' '}
          <Link href="/en/privacy" className="hover:underline">Privacy</Link>
          {' · '}
          <Link href="/en/terms" className="hover:underline">Terms</Link>
        </p>
      </div>
    </div>
  );
}
