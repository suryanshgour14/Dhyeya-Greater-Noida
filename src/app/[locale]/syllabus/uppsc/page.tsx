import type { Metadata } from "next";
import { EXAM_MAP } from "@/lib/syllabus-data";
import SyllabusPageClient from "@/components/syllabus/SyllabusPageClient";

export const metadata: Metadata = {
  title: "UPPSC Syllabus 2025 — Prelims, Mains & Exam Pattern | Dhyeya IAS Greater Noida",
  description:
    "Complete UPPCS (Uttar Pradesh PCS) syllabus 2025 — Prelims GS Paper I & CSAT, Mains Papers 1–8 (including UP Special Papers), General Hindi, Essay and full Exam Pattern in English and Hindi.",
  keywords: [
    "UPPSC syllabus 2025",
    "UPPCS syllabus",
    "UPPSC prelims syllabus",
    "UPPSC mains syllabus",
    "UP PCS syllabus in hindi",
    "UPPSC exam pattern",
    "UPPSC UP special paper",
    "UPPSC general hindi",
  ].join(", "),
  openGraph: {
    title: "UPPSC Syllabus 2025 | Dhyeya IAS Greater Noida",
    description: "Full UPPCS syllabus — Prelims, Mains, UP Special Papers in English & Hindi.",
    type: "article",
  },
};

export default function UPPSCPage() {
  return <SyllabusPageClient exam={EXAM_MAP.uppsc} />;
}
