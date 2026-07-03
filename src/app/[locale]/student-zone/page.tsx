import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Download, HelpCircle, Bell, Trophy, Monitor,
  Users, ArrowRight, BookOpen, GraduationCap,
  Clock, CheckCircle, Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Student Zone | Dhyeya IAS Greater Noida",
  description:
    "Your one-stop hub for batch details, free study resources, UPSC FAQs, live tests, notifications, and results — all in one place.",
};

const SECTIONS = [
  {
    icon: Users,
    label: "Batch Details",
    href: "/student-zone/batches",
    description:
      "View current batch schedules, timings, faculty assignments, and classroom allotments for all ongoing programmes.",
    color: "blue",
    badge: null,
  },
  {
    icon: Download,
    label: "Free Resources",
    href: "/student-zone/resources",
    description:
      "Download free UPSC study material, previous year papers, answer key PDFs, and curated notes shared by our faculty.",
    color: "gold",
    badge: "Free",
  },
  {
    icon: HelpCircle,
    label: "UPSC FAQs",
    href: "/student-zone/faqs",
    description:
      "Answers to the most common questions on eligibility, exam pattern, registration, admit card, and evaluation.",
    color: "blue",
    badge: null,
  },
  {
    icon: Monitor,
    label: "Live Tests",
    href: "/tests",
    description:
      "Attempt full-length mock tests online — UPSC Prelims, UPPSC Prelims, Mains series — with instant scoring and analytics.",
    color: "orange",
    badge: "Live",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/student-zone/notifications",
    description:
      "Stay updated with official exam dates, admit card releases, result announcements, and institute circulars.",
    color: "gold",
    badge: null,
  },
  {
    icon: Trophy,
    label: "Test Results",
    href: "/student-zone/results",
    description:
      "Check your mock test scores, subject-wise performance breakdown, all-India ranking, and improvement trends.",
    color: "blue",
    badge: null,
  },
] as const;

const QUICK_LINKS = [
  { icon: BookOpen,      label: "Study Material",      href: "/student-zone/resources" },
  { icon: GraduationCap,label: "My Dashboard",         href: "/dashboard" },
  { icon: Monitor,       label: "Take a Test",          href: "/tests" },
  { icon: Bell,          label: "Notifications",        href: "/student-zone/notifications" },
  { icon: Trophy,        label: "My Results",           href: "/student-zone/results" },
  { icon: HelpCircle,    label: "UPSC FAQs",            href: "/student-zone/faqs" },
];

const HIGHLIGHTS = [
  { icon: Zap,          stat: "500+",  label: "Free Resources" },
  { icon: Monitor,      stat: "50+",   label: "Mock Tests" },
  { icon: CheckCircle,  stat: "24/7",  label: "Online Access" },
  { icon: Clock,        stat: "Daily", label: "Updates" },
];

const COLOR_MAP = {
  blue:   { card: "bg-brand-blue/5 border-brand-blue/15 hover:border-brand-blue/40 hover:bg-brand-blue/10", icon: "bg-brand-blue/10 text-brand-blue", badge: "bg-brand-blue text-white" },
  gold:   { card: "bg-brand-gold/5 border-brand-gold/20 hover:border-brand-gold/50 hover:bg-brand-gold/10", icon: "bg-brand-gold/15 text-amber-700", badge: "bg-brand-gold text-brand-blue" },
  orange: { card: "bg-orange-50 border-orange-100 hover:border-orange-300 hover:bg-orange-50", icon: "bg-orange-100 text-orange-600", badge: "bg-orange-500 text-white" },
} as const;

export default function StudentZonePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-blue pb-16 pt-14">
        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            05 — Student Zone
          </p>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Your Learning Hub,<br />
            <span className="text-brand-gold">All in One Place</span>
          </h1>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Everything you need as a Dhyeya IAS student — resources, test series, notifications,
            batch schedules, and your results — right here, always accessible.
          </p>

          {/* Highlight pills */}
          <div className="flex flex-wrap gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, stat, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-brand-gold" />
                <span className="text-sm font-bold text-white">{stat}</span>
                <span className="text-xs text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick links strip ── */}
      <section className="border-b bg-slate-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Access:
            </span>
            {QUICK_LINKS.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/5 hover:text-brand-blue"
              >
                <Icon className="h-3 w-3" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main section cards ── */}
      <section className="container mx-auto px-4 py-14">
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            What's in the Student Zone?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Six dedicated sections built to support every stage of your preparation journey.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ icon: Icon, label, href, description, color, badge }) => {
            const c = COLOR_MAP[color];
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${c.card}`}
              >
                {badge && (
                  <span className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c.badge}`}>
                    {badge}
                  </span>
                )}

                {/* Icon */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                  {label}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-500">
                  {description}
                </p>

                <div className="mt-5 flex items-center gap-1 text-xs font-bold text-brand-blue opacity-0 transition-all group-hover:opacity-100 group-hover:gap-2">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t bg-slate-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-2 text-xl font-extrabold text-slate-900">
            Need help? We're always here.
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Can't find what you're looking for? Reach out to us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-800"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/student-zone/faqs"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:border-brand-blue/30 hover:text-brand-blue"
            >
              <HelpCircle className="h-4 w-4" />
              Browse FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
