"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ExternalLink } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: "bg-brand-blue/10 text-brand-blue",
  Polity: "bg-violet-50 text-violet-700",
  Environment: "bg-emerald-50 text-emerald-700",
  Economy: "bg-amber-50 text-amber-700",
  History: "bg-rose-50 text-rose-700",
};

export default function BlogSection() {
  const locale = useLocale();
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
        >
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-brand-orange">
              Knowledge Hub
            </span>
            <h2 className="text-3xl font-bold text-brand-blue sm:text-4xl">
              Latest from the Blog
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Strategy guides, subject deep-dives, and current affairs analysis - written by our expert faculty.
            </p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white"
          >
            View All Posts
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Cover */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-brand-blue/5 to-brand-blue/15 sm:h-56">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    CATEGORY_COLORS[featured.category] ?? "bg-slate-100 text-slate-600"
                  }`}
                >
                  {featured.category}
                </span>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-brand-blue">
                  {featured.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side posts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="flex flex-col gap-4"
          >
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="group flex gap-4 overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Mini cover */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/5 to-brand-blue/10">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-blue">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-brand-blue" />
              </Link>
            ))}

            {/* Newsletter mini card */}
            <div className="rounded-2xl bg-brand-blue p-5 text-center">
              <p className="mb-1 text-sm font-bold text-white">Get Articles in Your Inbox</p>
              <p className="mb-4 text-xs text-slate-300">
                Weekly UPSC strategy &amp; current affairs digest
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg border-0 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <button className="rounded-lg bg-brand-gold px-3 py-2 text-xs font-bold text-brand-blue transition-opacity hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
