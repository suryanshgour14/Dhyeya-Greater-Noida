"use client";

import { Phone, MessageSquare, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";
import type { TestSeries } from "@/lib/test-series";

const themes = {
  blue:   { btn: "bg-brand-blue hover:bg-brand-blue/90 text-white", border: "border-brand-blue/20" },
  gold:   { btn: "bg-brand-blue hover:bg-brand-blue/90 text-white", border: "border-brand-blue/20" },
  orange: { btn: "bg-brand-blue hover:bg-brand-blue/90 text-white", border: "border-brand-blue/20" },
};

interface Props {
  series: TestSeries;
}

export default function TestSeriesEnquiry({ series }: Props) {
  const t = themes[series.accentColor];

  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className={cn("rounded-2xl border bg-white p-8 shadow-sm", t.border)}>
            <h2 className="mb-2 text-xl font-bold text-slate-800">Register / Enquire</h2>
            <p className="mb-6 text-sm text-slate-500">
              To enrol in the {series.title} or get more details, contact our Greater Noida centre.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Call</div>
                  <div className="text-xs">{CONTACT_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">WhatsApp</div>
                  <div className="text-xs">Message Us</div>
                </div>
              </a>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Centre</div>
                  <div className="text-xs leading-snug">{CONTACT_INFO.address}</div>
                </div>
              </div>
            </div>

            {series.fee && (
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Fees</p>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-extrabold text-slate-900">₹{series.fee.discounted.toLocaleString("en-IN")}</span>
                  {series.fee.original > series.fee.discounted && (
                    <>
                      <span className="text-sm text-slate-400 line-through">₹{series.fee.original.toLocaleString("en-IN")}</span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-700">
                        {Math.round(((series.fee.original - series.fee.discounted) / series.fee.original) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
