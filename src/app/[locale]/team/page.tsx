import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team | Dhyeya IAS Greater Noida",
  description:
    "Meet the directors, faculty, and advisory board who lead Dhyeya IAS Greater Noida.",
};

export default function TeamPage() {
  return <TeamClient />;
}
