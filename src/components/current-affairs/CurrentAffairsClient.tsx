"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Search, Calendar, Tag, Star, BookOpen, Filter, X, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Economy", value: "Economy" },
  { label: "Polity", value: "Polity" },
  { label: "Science & Tech", value: "Science" },
  { label: "Environment", value: "Environment" },
  { label: "International", value: "International" },
  { label: "History", value: "History" },
  { label: "Geography", value: "Geography" },
  { label: "Social Issues", value: "Social" },
  { label: "Security", value: "Security" },
];

const GS_FILTERS = ["GS1", "GS2", "GS3", "GS4", "Prelims", "Essay"];

const CATEGORY_COLORS: Record<string, string> = {
  Economy: "bg-emerald-100 text-emerald-700",
  Polity: "bg-blue-100 text-blue-700",
  Science: "bg-purple-100 text-purple-700",
  Environment: "bg-green-100 text-green-700",
  International: "bg-orange-100 text-orange-700",
  History: "bg-amber-100 text-amber-700",
  Geography: "bg-cyan-100 text-cyan-700",
  Social: "bg-pink-100 text-pink-700",
  Security: "bg-red-100 text-red-700",
};

interface Article {
  id: string;
  title: string;
  title_hi?: string | null;
  slug: string;
  excerpt: string;
  excerpt_hi?: string | null;
  category: string;
  gs_relevance?: string[] | null;
  tags?: string[] | null;
  is_important?: boolean | null;
  image_url?: string | null;
  published_at: string;
}

export default function CurrentAffairsClient({ articles }: { articles: Article[] }) {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeGS, setActiveGS] = useState("");
  const [showImportant, setShowImportant] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (showImportant && !a.is_important) return false;
      if (activeCategory && a.category !== activeCategory) return false;
      if (activeGS && !a.gs_relevance?.includes(activeGS)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q) ||
          a.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [articles, search, activeCategory, activeGS, showImportant]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const todayCount = articles.filter(
    (a) => new Date(a.published_at).toDateString() === new Date().toDateString()
  ).length;

  function clearFilters() {
    setSearch(""); setActiveCategory(""); setActiveGS(""); setShowImportant(false); setPage(1);
  }

  const hasFilters = search || activeCategory || activeGS || showImportant;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <div className="bg-[#0B1C3D] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#F59E0B20,transparent_60%)]" />
        <div className="container mx-auto px-4 py-14 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-bold text-brand-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                  Live Updates
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Daily Current Affairs</h1>
              <p className="text-slate-400 text-sm md:text-base max-w-xl">
                Expert-curated current affairs for UPSC, UPPSC & state PCS. Every article mapped to GS papers.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-center">
                <p className="text-2xl font-extrabold text-brand-gold">{todayCount || articles.length}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  {todayCount > 0 ? "Today" : "Total"} Articles
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-center">
                <p className="text-2xl font-extrabold text-white">{articles.filter((a) => a.is_important).length}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Important</p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, topics, tags..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-2xl bg-white/10 border border-white/15 pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none focus:border-brand-gold/50 focus:bg-white/15 transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat.value} onClick={() => { setActiveCategory(cat.value); setPage(1); }}
                className={cn("shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                  activeCategory === cat.value ? "bg-[#0B1C3D] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
            <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
              <Filter className="h-3 w-3" /> GS Paper:
            </span>
            {GS_FILTERS.map((gs) => (
              <button key={gs} onClick={() => { setActiveGS(activeGS === gs ? "" : gs); setPage(1); }}
                className={cn("shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold transition-all",
                  activeGS === gs ? "bg-brand-gold border-brand-gold text-brand-blue" : "border-slate-200 text-slate-500 hover:border-slate-400")}>
                {gs}
              </button>
            ))}
            <button onClick={() => { setShowImportant(!showImportant); setPage(1); }}
              className={cn("shrink-0 ml-2 flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition-all",
                showImportant ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 text-slate-500 hover:border-amber-400")}>
              <Star className="h-3 w-3" /> Important Only
            </button>
            {hasFilters && (
              <button onClick={clearFilters} className="shrink-0 ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Articles ── */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-200" />
            <p className="font-semibold text-slate-500">No articles found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters</p>
            <button onClick={clearFilters} className="mt-4 text-sm font-semibold text-brand-blue hover:underline">Clear all filters</button>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-5 font-medium">Showing {paginated.length} of {filtered.length} articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((article, i) => (
                <motion.article key={article.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link href={`/${locale}/current-affairs/daily/${article.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all">
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      {article.image_url ? (
                        <Image src={article.image_url} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-blue/5">
                          <BookOpen className="h-10 w-10 text-brand-blue/20" />
                        </div>
                      )}
                      {article.is_important && (
                        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                          <Star className="h-2.5 w-2.5" /> Important
                        </span>
                      )}
                      <span className={cn("absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold",
                        CATEGORY_COLORS[article.category] ?? "bg-slate-100 text-slate-700")}>
                        {article.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-[11px] text-slate-400">{format(new Date(article.published_at), "dd MMM yyyy")}</span>
                        {article.gs_relevance && article.gs_relevance.length > 0 && (
                          <>
                            <span className="text-slate-200">·</span>
                            {article.gs_relevance.slice(0, 2).map((gs) => (
                              <span key={gs} className="rounded bg-brand-blue/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-blue">{gs}</span>
                            ))}
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 flex-1">{article.excerpt}</p>
                      {article.tags && article.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="flex items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                              <Tag className="h-2.5 w-2.5" />{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-blue">
                        Read More <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button onClick={() => setPage((p) => p + 1)}
                  className="rounded-2xl border border-brand-blue/20 bg-white px-8 py-3 text-sm font-semibold text-brand-blue shadow-sm hover:bg-brand-blue hover:text-white transition-all">
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
