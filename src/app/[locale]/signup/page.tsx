import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SignupForm from '@/components/forms/SignupForm';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Account - Dhyeya IAS Greater Noida',
  description: 'Join 15,000+ UPSC aspirants. Create your free student account.',
};

const PERKS = [
  'Free access to daily current affairs',
  'Mock test series & performance analytics',
  'Live doubt-clearing sessions',
  'Study material worth ₹15,000+',
  'Direct mentorship from IAS officers',
];

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">

      {/* ── Left panel ── */}
      <div className="relative hidden lg:flex lg:w-[45%] flex-col justify-between overflow-hidden bg-brand-blue p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl" />

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

        {/* Content */}
        <div className="relative z-10">
          <span className="mb-3 inline-block rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
            Free Account
          </span>
          <h2 className="mb-4 text-3xl font-bold leading-snug text-white">
            Everything you need<br />
            to <span className="text-brand-gold">crack UPSC.</span>
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-slate-300">
            Join thousands of aspirants who are already preparing smarter with Dhyeya IAS.
          </p>

          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 inline-flex items-center gap-3 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-5 py-3">
          <Image
            src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708897/udaan_logo.jpg_gyk7ew.jpg"
            alt="UDAAN"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-contain"
          />
          <div>
            <p className="text-sm font-bold text-brand-gold">UDAAN Scholarship</p>
            <p className="text-xs text-slate-300">Up to ₹2 Lakh fee waiver available</p>
          </div>
        </div>
      </div>

      {/* ── Right panel - form ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-12 overflow-y-auto" data-lenis-prevent>
        {/* Mobile logo */}
        <div className="mb-8 lg:hidden">
          <Image
            src="https://res.cloudinary.com/dl9t48lyt/image/upload/v1776708127/DHYEYA_LOGO_ENGLISH_BLUE.jpg_pa8b8v.jpg"
            alt="Dhyeya IAS Greater Noida"
            width={160}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        <div className="w-full max-w-md">
          <SignupForm />
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Dhyeya IAS Greater Noida.{' '}
          <Link href="/en/privacy" className="hover:underline">Privacy</Link>
          {' · '}
          <Link href="/en/terms" className="hover:underline">Terms</Link>
        </p>
      </div>
    </div>
  );
}
