import type { Metadata } from "next";
import { EXAM_MAP } from "@/lib/syllabus-data";
import SyllabusPageClient from "@/components/syllabus/SyllabusPageClient";

export const metadata: Metadata = {
  title: "BPSC Syllabus 2025 — Prelims, Mains & Exam Pattern | Dhyeya IAS Greater Noida",
  description:
    "Complete BPSC (Bihar Public Service Commission) syllabus 2025 — Prelims General Studies paper, Mains General Hindi, GS Papers I & II, Essay, Optional Subject and full Exam Pattern in English and Hindi.",
  keywords: [
    "BPSC syllabus 2025",
    "Bihar PSC syllabus",
    "BPSC prelims syllabus",
    "BPSC mains syllabus",
    "BPSC exam pattern",
    "BPSC GS syllabus",
    "BPSC syllabus hindi",
    "Bihar PCS syllabus 2025",
  ].join(", "),
  openGraph: {
    title: "BPSC Syllabus 2025 | Dhyeya IAS Greater Noida",
    description: "Full BPSC syllabus — Prelims, Mains, Exam Pattern in English & Hindi.",
    type: "article",
  },
};

export default function BPSCPage() {
  return <SyllabusPageClient exam={EXAM_MAP.bpsc} />;
}
