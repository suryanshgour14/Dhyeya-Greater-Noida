"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Calendar, Tag, Star, BookOpen, ChevronRight, ArrowLeft, Share2, Check } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  Economy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Polity: "bg-blue-100 text-blue-700 border-blue-200",
  Science: "bg-purple-100 text-purple-700 border-purple-200",
  Environment: "bg-green-100 text-green-700 border-green-200",
  International: "bg-orange-100 text-orange-700 border-orange-200",
  History: "bg-amber-100 text-amber-700 border-amber-200",
  Geography: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Social: "bg-pink-100 text-pink-700 border-pink-200",
  Security: "bg-red-100 text-red-700 border-red-200",
};

const GS_COLORS: Record<string, string> = {
  GS1: "bg-blue-600", GS2: "bg-green-600", GS3: "bg-amber-600",
  GS4: "bg-purple-600", Prelims: "bg-red-600", Essay: "bg-indigo-600",
};

const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-8 mb-3 text-xl font-bold text-slate-800">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 mb-2 text-lg font-bold text-slate-700">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-slate-600">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-brand-gold bg-brand-gold/5 pl-5 py-3 pr-4 rounded-r-xl italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 space-y-1.5 pl-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 list-decimal space-y-1.5 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex gap-2 text-slate-600">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-slate-600">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-slate-800">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-slate-700">{children}</em>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: object; caption?: string; alt?: string } }) => (
      <figure className="my-6">
        <div className="relative h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={urlFor(value.asset).width(800).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-xs text-slate-400 italic">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

interface Article {
  _id: string;
  title: string;
  titleHi?: string;
  slug: { current: string };
  excerpt: string;
  excerptHi?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyHi?: any[];
  category: string;
  gsRelevance?: string[];
  tags?: string[];
  isImportant?: boolean;
  publishedAt: string;
  mainImage?: object;
}

interface RelatedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  mainImage?: object;
}

export default function ArticleClient({ article, related }: { article: Article; related: RelatedArticle[] }) {
  const locale = useLocale();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [copied, setCopied] = useState(false);

  const hasHindi = !!(article.titleHi || article.bodyHi);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero / Cover ── */}
      <div className="bg-[#0B1C3D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#F59E0B15,transparent_60%)]" />
        <div className="container mx-auto px-4 py-10 relative">
          <Link href={`/${locale}/current-affairs/daily`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Current Affairs
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={cn("rounded-full border px-3 py-1 text-xs font-bold", CATEGORY_COLORS[article.category] ?? "bg-white/10 text-white")}>
              {article.category}
            </span>
            {article.isImportant && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                <Star className="h-3 w-3" /> Important
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white max-w-3xl leading-snug mb-3">
            {lang === "hi" && article.titleHi ? article.titleHi : article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(article.publishedAt), "EEEE, dd MMMM yyyy")}
            </span>
            <span>·</span>
            <span>Dhyeya IAS Faculty</span>
          </div>
          {article.gsRelevance && article.gsRelevance.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.gsRelevance.map((gs) => (
                <span key={gs} className={cn("rounded-full px-3 py-1 text-[11px] font-bold text-white", GS_COLORS[gs] ?? "bg-slate-600")}>
                  {gs}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cover image ── */}
      {article.mainImage && (
        <div className="container mx-auto px-4 -mt-8">
          <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={urlFor(article.mainImage).width(1200).height(600).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Actions bar */}
            <div className="mb-6 flex items-center justify-between rounded-2xl border bg-white px-5 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                {hasHindi && (
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-bold">
                    <button
                      onClick={() => setLang("en")}
                      className={cn("px-3 py-1.5 transition-colors", lang === "en" ? "bg-brand-blue text-white" : "text-slate-500 hover:bg-slate-50")}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLang("hi")}
                      className={cn("px-3 py-1.5 transition-colors", lang === "hi" ? "bg-brand-blue text-white" : "text-slate-500 hover:bg-slate-50")}
                    >
                      हिंदी
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>

            {/* Excerpt highlight */}
            <div className="mb-6 rounded-2xl border-l-4 border-brand-gold bg-brand-gold/5 p-5">
              <p className="text-base font-medium text-slate-700 leading-relaxed">
                {lang === "hi" && article.excerptHi ? article.excerptHi : article.excerpt}
              </p>
            </div>

            {/* Body */}
            <div className="prose max-w-none">
              {lang === "hi" && article.bodyHi && article.bodyHi.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <PortableText value={article.bodyHi as any} components={ptComponents as Parameters<typeof PortableText>[0]["components"]} />
              ) : article.body && article.body.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <PortableText value={article.body as any} components={ptComponents as Parameters<typeof PortableText>[0]["components"]} />
              ) : (
                <p className="text-slate-400 italic text-center py-8">Full article content coming soon.</p>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 border-t pt-6">
                <span className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                  <Tag className="h-3 w-3" /> Tags:
                </span>
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <aside className="mt-10 lg:mt-0 space-y-5">
            {/* GS Relevance card */}
            {article.gsRelevance && article.gsRelevance.length > 0 && (
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">UPSC GS Relevance</h3>
                <div className="space-y-2">
                  {article.gsRelevance.map((gs) => (
                    <div key={gs} className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", GS_COLORS[gs] ?? "bg-slate-400")} />
                      <span className="text-sm font-medium text-slate-700">{gs}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related articles */}
            {related.length > 0 && (
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link
                      key={rel._id}
                      href={`/${locale}/current-affairs/daily/${rel.slug.current}`}
                      className="group flex gap-3"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {rel.mainImage ? (
                          <Image
                            src={urlFor(rel.mainImage).width(100).height(100).url()}
                            alt={rel.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <BookOpen className="absolute inset-0 m-auto h-5 w-5 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-700 line-clamp-2 group-hover:text-brand-blue transition-colors leading-snug">
                          {rel.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {format(new Date(rel.publishedAt), "dd MMM")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/${locale}/current-affairs/daily`}
                  className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
                >
                  View all articles <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl bg-[#0B1C3D] p-5 text-center">
              <p className="text-xs font-bold text-brand-gold mb-1">UPSC 2026 Batch</p>
              <p className="text-sm font-bold text-white mb-3">Join Dhyeya IAS Greater Noida</p>
              <Link
                href={`/${locale}/courses`}
                className="inline-block rounded-xl bg-brand-gold px-5 py-2 text-xs font-bold text-brand-blue hover:opacity-90 transition-opacity"
              >
                Explore Courses →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
