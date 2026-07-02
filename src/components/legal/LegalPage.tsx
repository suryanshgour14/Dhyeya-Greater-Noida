import type { ReactNode } from "react";

// Shared shell for legal/policy pages — consistent hero + typography.
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/55">Last updated: {updated}</p>
          {intro && <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">{intro}</p>}
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-4 text-[15px] leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-brand-blue hover:[&_a]:underline [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-blue [&_h3]:mb-1 [&_h3]:mt-5 [&_h3]:font-semibold [&_h3]:text-slate-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-slate-900">
          {children}
        </div>
      </section>
    </div>
  );
}
