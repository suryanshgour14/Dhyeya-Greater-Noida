"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, LogOut, BookOpen, ClipboardList, Bell,
  Download, Trophy, FileText, HelpCircle, GraduationCap,
  ShoppingBag, Award, ChevronRight, Loader2, Settings, Shield,
} from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STUDENT_ZONE = [
  { icon: BookOpen,      label: "Study Material",    href: "/student-zone/resources" },
  { icon: ClipboardList, label: "Test Series",        href: "/test-series" },
  { icon: Bell,          label: "Notifications",      href: "/student-zone/notifications" },
  { icon: FileText,      label: "Live Test",           href: "/tests" },
  { icon: Download,      label: "Books & Notes",      href: "/student-zone/books" },
  { icon: HelpCircle,    label: "UPSC FAQs",          href: "/student-zone/faqs" },
  { icon: Award,         label: "IAS Olympiad",       href: "/student-zone/olympiad" },
  { icon: Download,      label: "Brochure",           href: "/student-zone/brochure" },
];

const MY_ACCOUNT = [
  { icon: GraduationCap, label: "My Courses",         href: "/dashboard" },
  { icon: ShoppingBag,   label: "My Purchases",       href: "/dashboard/purchases" },
  { icon: Trophy,        label: "My Results",         href: "/dashboard/results" },
  { icon: Settings,      label: "Account Settings",   href: "/dashboard/profile" },
];

interface Props {
  user: SupabaseUser;
}

export default function ProfileSidebar({ user }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const name = (user.user_metadata?.name as string) || user.email?.split("@")[0] || "Aspirant";
  const firstName = name.split(" ")[0];
  const initial = firstName.charAt(0).toUpperCase();
  const email = user.email ?? "";
  const provider = user.app_metadata?.provider === "google" ? "Google" : "Email";

  useEffect(() => {
    supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.role === "admin" || data?.role === "faculty") setIsAdmin(true);
      });
  }, [user.id]);

  async function handleLogout() {
    setLoggingOut(true);
    await supabase.auth.signOut();
    setOpen(false);
    router.push(`/${locale}`);
    router.refresh();
  }

  return (
    <>
      {/* ── Avatar trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 pl-1 pr-3 py-1 transition-colors hover:bg-brand-blue/10"
        aria-label="Open profile menu"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
          {initial}
        </span>
        <span className="hidden text-xs font-semibold text-brand-blue sm:block">{firstName}</span>
      </button>

      <AnimatePresence>
        {open && mounted && createPortal(
          <>
            {/* Backdrop — portalled to body so it's above the ticker's stacking context */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed right-0 top-0 z-[9999] flex h-screen w-[320px] flex-col bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b bg-brand-blue px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gold text-base font-bold text-brand-blue">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{name}</p>
                    <p className="truncate text-xs text-slate-300">{email}</p>
                    <span className="mt-0.5 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                      via {provider}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                {/* Admin Panel — only for admin/faculty */}
                {isAdmin && (
                  <>
                    <div className="px-4 pt-5 pb-2">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Administration
                      </p>
                      <Link
                        href={`/${locale}/admin/tests`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl bg-brand-blue/5 border border-brand-blue/20 px-3 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/10"
                      >
                        <Shield className="h-4 w-4 shrink-0 text-brand-blue" />
                        Admin Panel
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-brand-blue/40 group-hover:text-brand-blue" />
                      </Link>
                    </div>
                    <div className="mx-4 my-2 h-px bg-border" />
                  </>
                )}

                {/* My Account */}
                <div className="px-4 pt-5 pb-2">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    My Account
                  </p>
                  <div className="space-y-0.5">
                    {MY_ACCOUNT.map(({ icon: Icon, label, href }) => (
                      <Link
                        key={href}
                        href={`/${locale}${href}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-brand-blue" />
                        {label}
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-brand-blue" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-4 my-2 h-px bg-border" />

                {/* Student Zone */}
                <div className="px-4 pb-2">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Student Zone
                  </p>
                  <div className="space-y-0.5">
                    {STUDENT_ZONE.map(({ icon: Icon, label, href }) => (
                      <Link
                        key={href}
                        href={`/${locale}${href}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-brand-blue" />
                        {label}
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-brand-blue" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="mx-4 my-2 h-px bg-border" />
                <div className="px-4 pb-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Quick Links
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Current Affairs", href: "/current-affairs" },
                      { label: "Test Series",     href: "/test-series" },
                      { label: "Courses",         href: "/courses" },
                      { label: "Results",         href: "/results" },
                    ].map(({ label, href }) => (
                      <Link
                        key={href}
                        href={`/${locale}${href}`}
                        onClick={() => setOpen(false)}
                        className="rounded-xl border border-border bg-slate-50 px-3 py-2 text-center text-xs font-medium text-foreground transition-colors hover:border-brand-blue/30 hover:bg-brand-blue/5 hover:text-brand-blue"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer - logout */}
              <div className="border-t bg-white px-4 py-4">
                <div className="mb-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20 px-4 py-3 text-center">
                  <p className="text-xs font-semibold text-amber-700">Admissions Open - 2025 Batch</p>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setOpen(false)}
                    className="mt-1 inline-block text-xs font-bold text-brand-orange hover:underline"
                  >
                    Enquire Now →
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
                >
                  {loggingOut
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <LogOut className="h-4 w-4" />
                  }
                  {loggingOut ? "Signing out…" : "Sign Out"}
                </button>
              </div>
            </motion.div>
          </>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
