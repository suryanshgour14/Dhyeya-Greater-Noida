import type { Metadata } from "next";
import SuccessStoriesClient from "./SuccessStoriesClient";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "Real words from real achievers — UPSC & UPPCS toppers who trained with Dhyeya IAS Greater Noida.",
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />;
}
