import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, FileText, Layers, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Syllabus — UPSC IAS, UPPSC, UKPSC, BPSC | Dhyeya IAS Greater Noida",
  description:
    "Complete and detailed syllabus for UPSC Civil Services (IAS), UPPSC, UKPSC and BPSC examinations — Prelims, Mains and Exam Pattern in English and Hindi. Dhyeya IAS Greater Noida.",
  keywords: [
    "UPSC syllabus 2025",
    "IAS syllabus",
    "UPPSC syllabus",
    "UKPSC syllabus",
    "BPSC syllabus",
    "civil services syllabus",
    "UPSC mains syllabus",
    "UPSC prelims syllabus",
  ].join(", "),
};

const EXAMS = [
  {
    id: "ias",
    href: "/syllabus/ias",
    shortName: "IAS / UPSC CSE",
    fullName: "UPSC Civil Services Examination",
    tagline: "India's premier civil services exam — IAS, IPS, IFS and more",
    merit: "2025 Marks",
    icon: GraduationCap,
    color: {
      hero: "from-blue-600 to-blue-800",
      badge: "bg-blue-100 text-blue-700",
      cta: "bg-blue-600 hover:bg-blue-700",
    },
    stats: [
      { label: "Prelims Marks", value: "400" },
      { label: "Mains Marks", value: "1750" },
      { label: "Interview", value: "275" },
      { label: "Final Merit", value: "2025" },
    ],
  },
  {
    id: "uppsc",
    href: "/syllabus/uppsc",
    shortName: "UPPSC / UPPCS",
    fullName: "Uttar Pradesh Public Service Commission",
    tagline: "UP State Civil Services — PCS, ACF, RFO and allied services",
    merit: "1600 Marks",
    icon: FileText,
    color: {
      hero: "from-amber-600 to-amber-800",
      badge: "bg-amber-100 text-amber-800",
      cta: "bg-amber-600 hover:bg-amber-700",
    },
    stats: [
      { label: "Prelims Marks", value: "400" },
      { label: "Mains Marks", value: "1500" },
      { label: "Interview", value: "100" },
      { label: "Final Merit", value: "1600" },
    ],
  },
  {
    id: "ukpsc",
    href: "/syllabus/ukpsc",
    shortName: "UKPSC / UKPCS",
    fullName: "Uttarakhand Public Service Commission",
    tagline: "Uttarakhand State Civil Services with special UK-focused papers",
    merit: "1650 Marks",
    icon: Layers,
    color: {
      hero: "from-orange-600 to-orange-800",
      badge: "bg-orange-100 text-orange-800",
      cta: "bg-orange-600 hover:bg-orange-700",
    },
    stats: [
      { label: "Prelims Marks", value: "300" },
      { label: "Mains Marks", value: "1500" },
      { label: "Interview", value: "150" },
      { label: "Final Merit", value: "1650" },
    ],
  },
  {
    id: "bpsc",
    href: "/syllabus/bpsc",
    shortName: "BPSC",
    fullName: "Bihar Public Service Commission",
    tagline: "Bihar State Civil Services — SDO, DSP, Block Dev. Officer and more",
    merit: "1020 Marks",
    icon: BookOpen,
    color: {
      hero: "from-green-600 to-green-800",
      badge: "bg-green-100 text-green-800",
      cta: "bg-green-600 hover:bg-green-700",
    },
    stats: [
      { label: "Prelims Marks", value: "150" },
      { label: "Mains Marks", value: "900" },
      { label: "Interview", value: "120" },
      { label: "Final Merit", value: "1020" },
    ],
  },
];

export default function SyllabusIndexPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-14 md:py-20 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/60">
            {locale === "hi" ? "पाठ्यक्रम" : "Syllabus"}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            {locale === "hi" ? "परीक्षा पाठ्यक्रम" : "Exam Syllabi"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/70">
            {locale === "hi"
              ? "UPSC, UPPSC, UKPSC और BPSC के विस्तृत पाठ्यक्रम — प्रारंभिक, मुख्य और परीक्षा पैटर्न के साथ।"
              : "Detailed syllabus for UPSC, UPPSC, UKPSC and BPSC — Prelims, Mains and Exam Pattern."}
          </p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXAMS.map((exam) => {
              const Icon = exam.icon;
              return (
                <Link
                  key={exam.id}
                  href={`/${locale}${exam.href}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Top colour bar */}
                  <div className={`bg-gradient-to-r ${exam.color.hero} p-6 text-white`}>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                      {exam.shortName}
                    </p>
                    <h2 className="mt-1 text-base font-extrabold leading-tight">{exam.fullName}</h2>
                    <p className="mt-1.5 text-xs text-white/65 leading-relaxed">{exam.tagline}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-px border-b border-slate-100 bg-slate-100">
                    {exam.stats.map((s) => (
                      <div key={s.label} className="bg-white px-4 py-3 text-center">
                        <p className="text-base font-extrabold text-slate-800">{s.value}</p>
                        <p className="text-[10px] text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-1 items-end p-4">
                    <span className={`w-full rounded-xl py-2.5 text-center text-sm font-semibold text-white transition-colors ${exam.color.cta}`}>
                      {locale === "hi" ? "पाठ्यक्रम देखें" : "View Syllabus"} →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
