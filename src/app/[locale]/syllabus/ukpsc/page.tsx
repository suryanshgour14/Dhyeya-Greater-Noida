import type { Metadata } from "next";
import { EXAM_MAP } from "@/lib/syllabus-data";
import SyllabusPageClient from "@/components/syllabus/SyllabusPageClient";

export const metadata: Metadata = {
  title: "UKPSC Syllabus 2025 — Prelims, Mains & Exam Pattern | Dhyeya IAS Greater Noida",
  description:
    "Complete UKPCS (Uttarakhand PCS) syllabus 2025 — Prelims GS Paper I & General Aptitude Test, Mains Papers 1–8 (including Uttarakhand Special Papers), and full Exam Pattern in English and Hindi.",
  keywords: [
    "UKPSC syllabus 2025",
    "UKPCS syllabus",
    "Uttarakhand PCS syllabus",
    "UKPSC prelims syllabus",
    "UKPSC mains syllabus",
    "UKPSC Uttarakhand special paper",
    "UKPSC exam pattern",
    "UK PCS syllabus hindi",
  ].join(", "),
  openGraph: {
    title: "UKPSC Syllabus 2025 | Dhyeya IAS Greater Noida",
    description: "Full UKPCS syllabus — Prelims, Mains, Uttarakhand Special Papers in English & Hindi.",
    type: "article",
  },
};

export default function UKPSCPage() {
  return <SyllabusPageClient exam={EXAM_MAP.ukpsc} />;
}
