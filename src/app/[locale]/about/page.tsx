import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Dhyeya IAS Greater Noida | Best UPSC & PCS Coaching Institute",
  description:
    "Learn about Dhyeya IAS Greater Noida — an authorized franchise offering UPSC, IAS, and State PCS coaching with proven methodology, expert faculty, and integrated test series.",
};

export default function AboutPage() {
  return <AboutClient />;
}
