import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { ShoppingBag, BookOpen, FileText, CheckCircle2, Clock, Calendar } from "lucide-react";

interface EnrollmentRow {
  id: string;
  granted_at: string;
  expires_at: string | null;
  products: {
    id: string;
    title: string;
    title_hi: string | null;
    type: string;
    ref_slug: string | null;
    price_inr: number;
  } | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function PurchasesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?next=/${locale}/purchases`);

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, granted_at, expires_at, products(id, title, title_hi, type, ref_slug, price_inr)")
    .eq("student_id", user.id)
    .order("granted_at", { ascending: false });

  const rows = (enrollments ?? []) as unknown as EnrollmentRow[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-white/60" />
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {locale === "hi" ? "मेरी खरीदारी" : "My Purchases"}
          </h1>
          <p className="mt-2 text-white/65 text-sm">
            {locale === "hi"
              ? "आपके सभी नामांकन और खरीदे गए उत्पाद।"
              : "All your enrollments and purchased products."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-3xl">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-slate-300" />
            <p className="text-lg font-semibold text-slate-600">No purchases yet.</p>
            <p className="mt-1 text-sm text-slate-400">Browse our courses and tests to get started.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href={`/${locale}/courses`} className="rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
                Browse Courses
              </Link>
              <Link href={`/${locale}/tests`} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Browse Tests
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {rows.map((row) => {
              const product = row.products;
              if (!product) return null;
              const expired = row.expires_at && new Date(row.expires_at) < new Date();
              const isCourse = product.type === "course";
              const href = isCourse
                ? `/${locale}/courses/${product.ref_slug}`
                : `/${locale}/tests`;

              return (
                <div key={row.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isCourse ? "bg-blue-50" : "bg-amber-50"}`}>
                      {isCourse
                        ? <BookOpen className="h-5 w-5 text-blue-600" />
                        : <FileText className="h-5 w-5 text-amber-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 leading-tight">
                        {locale === "hi" && product.title_hi ? product.title_hi : product.title}
                      </p>
                      <p className="text-xs text-slate-400 capitalize mt-0.5">{product.type}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="h-3 w-3" />
                          Enrolled {formatDate(row.granted_at)}
                        </span>
                        {row.expires_at && (
                          <span className={`flex items-center gap-1 ${expired ? "text-red-500" : "text-slate-500"}`}>
                            <Clock className="h-3 w-3" />
                            {expired ? "Expired" : "Expires"} {formatDate(row.expires_at)}
                          </span>
                        )}
                        {!row.expires_at && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-3 w-3" /> Lifetime access
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-800">₹{product.price_inr.toLocaleString("en-IN")}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${expired ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                        {expired ? "EXPIRED" : "ACTIVE"}
                      </span>
                    </div>
                    {!expired && (
                      <Link
                        href={href}
                        className="rounded-xl bg-brand-blue px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        {isCourse ? "View Course" : "Go to Tests"}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
