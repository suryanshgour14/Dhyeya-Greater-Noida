import type { Metadata } from "next";
import Link from "next/link";
import { TEST_SERIES } from "@/lib/test-series";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Test Series | Dhyeya IAS Greater Noida",
  description:
    "Comprehensive mock test series for IAS Prelims, IAS Mains, UPPCS, and UKPCS examinations at Dhyeya IAS Greater Noida.",
};

const themes = {
  blue:   { bar: "bg-gradient-to-r from-brand-blue to-blue-400", btn: "bg-brand-blue hover:bg-brand-blue/90 text-white", badge: "bg-blue-50 text-brand-blue" },
  gold:   { bar: "bg-gradient-to-r from-amber-500 to-yellow-400", btn: "bg-amber-600 hover:bg-amber-700 text-white",    badge: "bg-amber-50 text-amber-700" },
  orange: { bar: "bg-gradient-to-r from-brand-orange to-orange-400", btn: "bg-brand-orange hover:bg-brand-orange/90 text-white", badge: "bg-orange-50 text-orange-700" },
};

interface Props {
  params: { locale: string };
}

export default function TestSeriesPage({ params }: Props) {
  const { locale } = params;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-brand-blue py-14 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">Test Series</h1>
          <p className="max-w-xl text-base text-white/70">
            Structured mock tests for IAS, UPPCS, and UKPCS — sectional, full-length, and CSAT practice with evaluated copies and all-India rankings.
          </p>
        </div>
      </section>

      {/* Series grid */}
      <section className="container mx-auto px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEST_SERIES.map((series) => {
            const t = themes[series.accentColor];
            return (
              <div
                key={series.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300"
              >
                <div className={cn("h-1 w-full", t.bar)} />
                <div className="flex flex-1 flex-col p-5">
                  <span className={cn("mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest", t.badge)}>
                    Test Series
                  </span>
                  <h2 className="text-[15px] font-bold leading-snug text-slate-800 group-hover:text-brand-blue transition-colors">
                    {series.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">{series.subtitle}</p>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">{series.tagline}</p>

                  {/* Key info */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {series.highlights.slice(0, 2).map((h) => (
                      <div key={h.label} className="rounded-xl bg-slate-50 px-3 py-2">
                        <div className="text-sm font-bold text-slate-700">{h.value}</div>
                        <div className="text-[10px] text-slate-400">{h.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Fee */}
                  {series.fee && (
                    <div className="mt-3 text-sm text-slate-600">
                      {typeof series.fee === "object" ? (
                        <span>
                          Offline <strong>₹{series.fee.offline.toLocaleString("en-IN")}</strong> &nbsp;|&nbsp; Online <strong>₹{series.fee.online.toLocaleString("en-IN")}</strong>
                        </span>
                      ) : (
                        <span>Fee: <strong>₹{series.fee.toLocaleString("en-IN")}</strong></span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/${locale}/test-series/${series.slug}`}
                      className={cn(
                        "flex w-full items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
                        t.btn
                      )}
                    >
                      View Schedule & Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
