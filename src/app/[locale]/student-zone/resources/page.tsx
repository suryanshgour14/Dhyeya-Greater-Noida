import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { FileText, Download, FolderOpen, Lock } from "lucide-react";

export const metadata = { title: "Free Resources" };

interface ResourceRow {
  id: string;
  title: string;
  title_hi: string | null;
  description: string | null;
  category: string;
  file_path: string;
  file_size_kb: number | null;
  published_at: string;
}

function formatSize(kb: number | null): string | null {
  if (!kb || kb <= 0) return null;
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export default async function ResourcesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const supabase = createServerClient();

  // Login required (middleware also enforces this; this passes a redirect target)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?next=/${locale}/student-zone/resources`);

  // Fetch active resources. If the table doesn't exist yet, `error` is set and
  // `resources` stays null — we just show the empty state instead of crashing.
  const { data: resources } = await supabase
    .from("resources")
    .select(
      "id, title, title_hi, description, category, file_path, file_size_kb, published_at"
    )
    .eq("is_active", true)
    .order("published_at", { ascending: false });

  const rows = (resources as ResourceRow[] | null) ?? [];

  // Generate short-lived signed download URLs for the private bucket
  const signedMap = new Map<string, string>();
  if (rows.length) {
    const { data: signed } = await supabase.storage
      .from("resources")
      .createSignedUrls(
        rows.map((r) => r.file_path),
        60 * 60 // 1 hour
      );
    signed?.forEach((s) => {
      if (s.signedUrl && s.path) signedMap.set(s.path, s.signedUrl);
    });
  }

  // Group by category
  const byCategory = new Map<string, ResourceRow[]>();
  for (const r of rows) {
    const list = byCategory.get(r.category) ?? [];
    list.push(r);
    byCategory.set(r.category, list);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <FolderOpen className="mx-auto mb-3 h-10 w-10 text-white/60" />
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {locale === "hi" ? "निःशुल्क संसाधन" : "Free Resources"}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/65 md:text-base">
            {locale === "hi"
              ? "करंट अफेयर्स, नोट्स और पिछले वर्षों के प्रश्नपत्र डाउनलोड करें।"
              : "Download notes, current affairs compilations and previous-year papers — free for enrolled students."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {rows.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Lock className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            <p className="text-lg font-semibold">No resources uploaded yet.</p>
            <p className="mt-1 text-sm">Check back soon — new material is added regularly.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Array.from(byCategory.entries()).map(([category, items]) => (
              <div key={category}>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-blue">
                  <span className="h-5 w-1 rounded-full bg-brand-gold" />
                  {category}
                  <span className="text-sm font-normal text-slate-400">
                    ({items.length})
                  </span>
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r: ResourceRow) => {
                    const url = signedMap.get(r.file_path);
                    const size = formatSize(r.file_size_kb);
                    return (
                      <div
                        key={r.id}
                        className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <FileText className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold leading-snug text-foreground">
                              {locale === "hi" && r.title_hi ? r.title_hi : r.title}
                            </h3>
                            {r.description && (
                              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                {r.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[11px] font-medium text-slate-400">
                            PDF{size ? ` · ${size}` : ""}
                          </span>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-400">
                              <Lock className="h-3.5 w-3.5" />
                              Unavailable
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
