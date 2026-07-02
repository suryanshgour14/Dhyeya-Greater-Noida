import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Dhyeya IAS Greater Noida website and services.",
};

export default function TermsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="July 2026"
      intro="Please read these terms carefully. By using this website and our services, you agree to them."
    >
      <p>
        Welcome. If you continue to browse and use this website, you are agreeing to comply with and
        be bound by the following terms and conditions, which — together with our{" "}
        <Link href={`/${locale}/privacy-policy`}>Privacy Policy</Link> — govern{" "}
        <strong>{SITE_NAME}</strong>&apos;s relationship with you in relation to this website.
        &ldquo;We&rdquo;, &ldquo;us&rdquo; or &ldquo;the Company&rdquo; refers to the owner of this
        website; &ldquo;you&rdquo; refers to the user or viewer.
      </p>

      <h2>Use of the website</h2>
      <ul>
        <li>
          The content of the pages of this website is for your general information and use only, and
          is subject to change without notice.
        </li>
        <li>
          Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
          timeliness, performance, completeness or suitability of the information and materials found
          or offered on this website for any particular purpose. You acknowledge that such
          information may contain inaccuracies, and we exclude liability for them to the fullest
          extent permitted by law.
        </li>
        <li>Your use of any information or materials on this website is entirely at your own risk.</li>
        <li>
          It is your responsibility to ensure that any products, services or information available
          through this website meet your specific requirements.
        </li>
      </ul>

      <h2>Educational purpose &amp; no guarantee of results</h2>
      <p>
        Our courses, test series and material are provided <strong>solely for educational purposes</strong>{" "}
        to help you prepare for competitive examinations. We do <strong>not</strong> guarantee any
        particular result, rank, selection or outcome. Your performance depends on many factors,
        including your own effort and preparation.
      </p>

      <h2>Accounts &amp; enrolment</h2>
      <ul>
        <li>
          You are responsible for maintaining the confidentiality of your account and for all
          activity that happens under it.
        </li>
        <li>
          On purchasing a course or test series, access is granted to your account for the applicable
          duration. Access is for your personal use and may not be shared, resold or redistributed.
        </li>
      </ul>

      <h2>Payments &amp; refunds</h2>
      <p>
        Online payments are processed through our payment partner (Razorpay); orders are confirmed on
        receiving authorization from the payment gateway. As these are digital purchases, payments
        are final and non-refundable <strong>except</strong> in the specific cases described in our{" "}
        <Link href={`/${locale}/refund-policy`}>Refund &amp; Cancellation Policy</Link> (such as a
        course not being made available to you, or a duplicate payment).
      </p>

      <h2>Intellectual property</h2>
      <p>
        This website contains material owned by or licensed to us — including the design, layout,
        look, appearance, graphics, and all course content. Reproduction is prohibited other than in
        accordance with the copyright notice. Unauthorised use of this website or its content may
        give rise to a claim for damages and/or be a criminal offence.
      </p>

      <h2>Links to other websites</h2>
      <p>
        From time to time this website may include links to other websites, provided for your
        convenience and further information. They do not signify that we endorse those websites, and
        we take no responsibility for their content. You may not create a link to this website from
        another website or document without our prior consent.
      </p>

      <h2>Governing law</h2>
      <p>
        Your use of this website, and any dispute arising out of such use, is subject to the laws of
        India, with jurisdiction in the courts of Gautam Buddh Nagar, Uttar Pradesh.
      </p>

      <p>By continuing to use this website and our services, you accept and agree to these terms.</p>
    </LegalPage>
  );
}
