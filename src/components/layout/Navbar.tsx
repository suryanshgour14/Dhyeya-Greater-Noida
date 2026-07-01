"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, CONTACT_INFO, type NavItem } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import LanguageToggle from "./LanguageToggle";
import DhyeyaLogo from "@/components/shared/DhyeyaLogo";
import ProfileSidebar from "./ProfileSidebar";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

// ─── Mega-menu dropdown ────────────────────────────────────────────────────
function MegaMenu({ item, locale }: { item: NavItem; locale: string }) {
  if (!item.children?.length) return null;

  const cols = item.columns === 2 ? "grid-cols-2" : "grid-cols-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "absolute top-full z-50 mt-1 min-w-[220px] rounded-xl border border-border/60 bg-white shadow-xl",
        item.alignRight ? "right-0" : "left-0",
        item.columns === 2 && "min-w-[420px]"
      )}
    >
      <div className="max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain rounded-xl p-2" data-lenis-prevent>
        <div className={cn("grid gap-0.5", cols)}>
          {item.children.map((child, i) => {
            if (child.isHeader) {
              return (
                <div
                  key={`h-${i}`}
                  className="px-2.5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-brand-blue/60"
                >
                  {child.label}
                </div>
              );
            }

            const Icon = child.icon!;

            if (child.subLinks?.length) {
              return (
                <div key={child.href} className="rounded-lg p-2.5 hover:bg-brand-blue/5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium leading-tight text-foreground">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-0.5 text-xs leading-snug text-muted-foreground">
                          {child.description}
                        </span>
                      )}
                      <div className="mt-1.5 flex gap-1.5">
                        {child.subLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={`/${locale}${sub.href}`}
                            className="rounded-full border border-brand-blue/30 bg-brand-blue/5 px-2.5 py-0.5 text-xs font-medium text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={child.href}
                href={`/${locale}${child.href}`}
                className={cn("group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-brand-blue/5", child.fullWidth && "col-span-full")}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-tight text-foreground">
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {child.description}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Desktop nav item with optional dropdown ───────────────────────────────
function NavMenuItem({ item, locale }: { item: NavItem; locale: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChildren = Boolean(item.children?.length);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={`/${locale}${item.href}`}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-blue",
          open && "text-brand-blue"
        )}
      >
        {item.label}
        {hasChildren && (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-150",
              open && "rotate-180"
            )}
          />
        )}
      </Link>

      <AnimatePresence>
        {open && hasChildren && (
          <MegaMenu item={item} locale={locale} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile nav accordion ──────────────────────────────────────────────────
function MobileNavItem({ item, locale, onClose }: { item: NavItem; locale: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  return (
    <div className="border-b border-border/50 last:border-0">
      <div className="flex items-center justify-between">
        <Link
          href={`/${locale}${item.href}`}
          onClick={onClose}
          className="flex-1 py-3 text-sm font-medium text-foreground hover:text-brand-blue"
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="px-2 py-3 text-muted-foreground hover:text-brand-blue"
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="pb-2 pl-3">
              {item.children!.map((child, i) => {
                if (child.isHeader) {
                  // In 2-column mode headers are side-by-side on desktop; skip on mobile to avoid consecutive labels
                  if (item.columns === 2) return null;
                  return (
                    <div key={`mh-${i}`} className="pt-3 pb-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">
                      {child.label}
                    </div>
                  );
                }
                const Icon = child.icon!;
                if (child.subLinks?.length) {
                  return (
                    <div key={child.href} className="py-2">
                      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Icon className="h-4 w-4 shrink-0" />
                        {child.label}
                      </div>
                      <div className="mt-1.5 ml-6 flex gap-1.5">
                        {child.subLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={`/${locale}${sub.href}`}
                            onClick={onClose}
                            className="rounded-full border border-brand-blue/30 bg-brand-blue/5 px-2.5 py-0.5 text-xs font-medium text-brand-blue hover:bg-brand-blue hover:text-white"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={child.href}
                    href={`/${locale}${child.href}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 py-2 text-sm text-muted-foreground hover:text-brand-blue"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────
export default function Navbar() {
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/60 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white"
      )}
    >
      {/* Row 1 - top bar */}
      <div className="hidden border-b border-border/40 bg-slate-50 md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" />
            {CONTACT_INFO.phone}
          </span>
          <span>{CONTACT_INFO.hours}</span>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            {user ? (
              <ProfileSidebar user={user} />
            ) : (
              <Button asChild size="sm" className="h-6 rounded-full bg-brand-orange px-3 text-xs hover:bg-brand-orange/90">
                <Link href={`/${locale}/login`}>Student Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Row 2 - main nav */}
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0">
          <DhyeyaLogo background="light" heightClass="h-9" className="max-w-[160px]" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavMenuItem key={item.href} item={item} locale={locale} />
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>

          {user ? (
            <span className="hidden sm:flex lg:hidden">
              <ProfileSidebar user={user} />
            </span>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden bg-brand-blue text-white hover:bg-brand-blue/90 sm:flex lg:hidden"
            >
              <Link href={`/${locale}/login`}>Login</Link>
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="left" showCloseButton={false} className="w-[300px] max-w-[85vw] p-0 bg-white text-slate-900">
              <div className="flex items-center justify-between border-b p-4">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center shrink-0"
                >
                  <DhyeyaLogo background="light" heightClass="h-8" className="max-w-[140px]" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1 hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto px-4 pb-6 pt-2" data-lenis-prevent>
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    locale={locale}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </div>

              <div className="border-t p-4">
                {user ? (
                  <div className="flex justify-center">
                    <ProfileSidebar user={user} />
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-brand-blue hover:bg-brand-blue/90"
                  >
                    <Link
                      href={`/${locale}/login`}
                      onClick={() => setMobileOpen(false)}
                    >
                      Student Login
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
