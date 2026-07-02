import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dhyeya IAS Greater Noida collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro="This policy explains what information we collect, how we use it, and the choices you have."
    >
      <p>
        This Privacy Policy describes our policies and procedures on the collection, use and
        disclosure of your information when you use our website and services (the &ldquo;Service&rdquo;),
        and tells you about your privacy rights and how the law protects you. In this policy,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Company&rdquo; refers to{" "}
        <strong>{SITE_NAME}</strong>, operating in Uttar Pradesh, India. By using the Service, you
        agree to the collection and use of information in accordance with this policy.
      </p>

      <h2>Information we collect</h2>
      <h3>Personal Data</h3>
      <p>
        While using our Service, we may ask you to provide certain personally identifiable
        information that can be used to contact or identify you, including:
      </p>
      <ul>
        <li>First and last name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Details needed to create and manage your account and enrolments</li>
      </ul>
      <h3>Usage Data</h3>
      <p>
        Usage Data is collected automatically when you use the Service. It may include your device&apos;s
        IP address, browser type and version, the pages you visit, the time and date of your visit,
        the time spent on those pages, and other diagnostic data.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar technologies to operate and improve the Service. We use essential
        cookies (needed to sign you in and keep your account secure) and functional cookies (to
        remember your preferences, such as language). You can instruct your browser to refuse
        cookies, but some parts of the Service may not work correctly without them.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To provide, maintain and improve the Service, and to monitor its usage.</li>
        <li>To create and manage your account and your enrolments.</li>
        <li>To process the courses, test series or other products you purchase.</li>
        <li>
          To contact you by email, phone, SMS or notifications about updates, your enrolments,
          important service or security information, and — unless you opt out — news and offers
          about programmes similar to those you&apos;ve purchased or enquired about.
        </li>
        <li>To respond to your requests and provide customer support.</li>
      </ul>
      <p>
        <strong>Payments:</strong> online payments are processed securely by our payment partner
        (Razorpay). We do not store your card or banking details on our servers.
      </p>

      <h2>Sharing your information</h2>
      <p>We may share your information with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> who help us run the Service (e.g. hosting, database,
          payment processing and analytics), only as needed to perform their work.
        </li>
        <li>
          <strong>Legal and safety purposes</strong> — where required by law, or to protect the
          rights, property or safety of our users, the public, or the Company.
        </li>
        <li>
          <strong>Business transfers</strong> — in connection with a merger, acquisition or sale of
          assets, in which case your information may be transferred.
        </li>
      </ul>

      <h2>Retention of your data</h2>
      <p>
        We retain your personal data only as long as necessary for the purposes set out in this
        policy, and to comply with our legal obligations, resolve disputes and enforce our
        agreements. Usage data is generally retained for a shorter period.
      </p>

      <h2>Security of your data</h2>
      <p>
        The security of your data is important to us. We use commercially acceptable means to protect
        it, but no method of transmission or storage over the internet is 100% secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Our Service is not directed at children under 13, and we do not knowingly collect personal
        data from them. If you believe a child has provided us with personal data, please contact us
        and we will take steps to remove it.
      </p>

      <h2>Links to other websites</h2>
      <p>
        Our Service may contain links to third-party websites we don&apos;t operate. We are not
        responsible for their content or privacy practices, and we advise you to review their
        policies.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We&apos;ll post any changes on this page and update
        the &ldquo;Last updated&rdquo; date above. Please review it periodically.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Reach us at {CONTACT_INFO.email}, call{" "}
        {CONTACT_INFO.phone}, or use our{" "}
        <Link href={`/${locale}/contact`}>Contact page</Link>.
      </p>
    </LegalPage>
  );
}
