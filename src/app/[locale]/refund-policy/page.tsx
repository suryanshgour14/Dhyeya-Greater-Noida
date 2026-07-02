import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation policy for courses and test series purchased on Dhyeya IAS Greater Noida.",
};

export default function RefundPolicyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="July 2026"
      intro="We want you to enrol with confidence. Here's exactly how refunds work at Dhyeya IAS Greater Noida — kept simple and fair."
    >
      <p>
        Our courses and test series are <strong>digital purchases</strong> — the moment you enrol,
        your study material, tests and sessions are made available to you. Because of this, fees are
        generally <strong>non-refundable</strong> once a purchase is complete. That said, we&apos;ll
        always do the right thing in genuine cases.
      </p>

      <h2>When you are entitled to a refund</h2>
      <p>You can request a refund if either of the following happens:</p>
      <ul>
        <li>
          <strong>Your course wasn&apos;t made available to you.</strong> If the course you paid for is
          not assigned or activated on your account within the expected time from your date of
          purchase, you are entitled to a full refund.
        </li>
        <li>
          <strong>You were charged twice for the same course.</strong> If a duplicate or double
          payment is made for the same purchase, we will refund the extra amount in full.
        </li>
      </ul>

      <h2>Failed or interrupted payments</h2>
      <p>
        If a payment fails but money was still deducted from your account, it is usually reversed
        automatically by your bank or by our payment partner (Razorpay) within a few working days.
        If you don&apos;t see it back within 5–7 working days, just reach out with your payment
        details and we&apos;ll reconcile it for you.
      </p>

      <h2>When a refund isn&apos;t possible</h2>
      <p>
        Apart from the cases above, we&apos;re unable to consider refund requests once a course or test
        series has been purchased, since access to the digital content is granted immediately. We
        recommend reviewing the course details, or simply reaching out to us before purchasing if
        you have any questions — we&apos;re happy to help you choose the right programme.
      </p>

      <h2>How to request a refund</h2>
      <p>
        Contact us with your name, registered email, and the order/payment details:
      </p>
      <ul>
        <li>Phone: {CONTACT_INFO.phone} / {CONTACT_INFO.phone2}</li>
        <li>Email: {CONTACT_INFO.email}</li>
        <li>
          Or via our{" "}
          <Link href={`/${locale}/contact`}>Contact page</Link>.
        </li>
      </ul>
      <p>
        Approved refunds are processed back to your original payment method, typically within
        <strong> 5–7 working days</strong>.
      </p>
    </LegalPage>
  );
}
