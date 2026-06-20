import type { Metadata } from "next";
import { EXAM_MAP } from "@/lib/syllabus-data";
import SyllabusPageClient from "@/components/syllabus/SyllabusPageClient";

export const metadata: Metadata = {
  title: "UPSC IAS Syllabus 2025 — Prelims, Mains & Exam Pattern | Dhyeya IAS Greater Noida",
  description:
    "Complete UPSC Civil Services (IAS) syllabus 2025 — Prelims GS Paper I & CSAT, Mains General Studies Papers I–IV, Essay, Optional Subjects and full Exam Pattern. Bilingual (English / Hindi). Dhyeya IAS Greater Noida.",
  keywords: [
    "UPSC IAS syllabus 2025",
    "UPSC prelims syllabus",
    "UPSC mains syllabus",
    "GS paper 1 syllabus",
    "GS paper 2 syllabus",
    "UPSC exam pattern",
    "civil services syllabus hindi",
    "UPSC optional subjects list",
  ].join(", "),
  openGraph: {
    title: "UPSC IAS Syllabus 2025 | Dhyeya IAS Greater Noida",
    description: "Full UPSC CSE syllabus — Prelims, Mains, Exam Pattern in English & Hindi.",
    type: "article",
  },
};

export default function IASPage() {
  return <SyllabusPageClient exam={EXAM_MAP.ias} />;
}
