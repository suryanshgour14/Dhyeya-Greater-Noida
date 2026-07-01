import type { Metadata } from "next";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = {
  title: "UPSC FAQs | Dhyeya IAS Greater Noida",
  description:
    "Official UPSC Frequently Asked Questions covering registration, exam process, admit cards, negative marking, attempts, and evaluation.",
};

export default function UpscFaqsPage() {
  return <FaqsClient />;
}
