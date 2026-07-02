import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses — IAS, PCS & Foundation Programmes",
  description:
    "Explore Dhyeya Sansathanam Greater Noida's UPSC, UPPCS, UKPCS and BPSC courses — GS Foundation, Mentorship, CSAT, Crash Courses and Answer Writing programmes with expert faculty.",
  alternates: { canonical: "/courses" },
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
