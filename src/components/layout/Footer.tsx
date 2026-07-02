import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import DhyeyaLogo from "@/components/shared/DhyeyaLogo";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/shared/SocialIcons";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Test Series", href: "/test-series" },
  { label: "Current Affairs", href: "/current-affairs" },
  { label: "Contact Us", href: "/contact" },
];

const COURSES_LINKS = [
  { label: "UPSC IAS Foundation", href: "/courses/upsc-ias-foundation" },
  { label: "UPPSC PCS Comprehensive", href: "/courses/uppsc-pcs-comprehensive" },
  { label: "Udaan 3-Year – IAS/PCS", href: "/courses/udaan-3-year-integrated" },
  { label: "UPSC Mentorship Program", href: "/courses/upsc-ias-mentorship" },
  { label: "CSAT Mastery – IAS/PCS", href: "/courses/csat-mastery" },
  { label: "UPPCS Prelims Crash Course", href: "/courses/uppsc-prelims-crash-course" },
];

const STUDENT_LINKS = [
  { label: "Batch Details", href: "/student-zone/batches" },
  { label: "Free Resources", href: "/student-zone/resources" },
  { label: "UPSC FAQs", href: "/student-zone/faqs" },
  { label: "Live Test", href: "/tests" },
  { label: "Latest Notifications", href: "/student-zone/notifications" },
  { label: "Test Results", href: "/student-zone/results" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Col 1 - Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <DhyeyaLogo background="dark" heightClass="h-11" className="max-w-[180px]" />
            </div>

            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Premier UPSC &amp; State PSC coaching institute in Greater Noida. Trusted by
              15,000+ aspirants with 500+ selections in UPSC Civil Services.
            </p>

            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <a
                  href={CONTACT_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <span className="text-slate-400">
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                  {" / "}
                  <a href={`tel:${CONTACT_INFO.phone2.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                    {CONTACT_INFO.phone2}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-400 hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-brand-gold" />
                <span className="text-slate-400">{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-slate-400 transition-colors hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Courses */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Courses
            </h3>
            <ul className="space-y-1">
              {COURSES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-slate-400 transition-colors hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Student Zone + Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Student Zone
            </h3>
            <ul className="mb-6 space-y-1">
              {STUDENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm text-slate-400 transition-colors hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <div className="flex gap-2">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition-colors hover:bg-pink-600 hover:text-white"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200 transition-colors hover:bg-red-600 hover:text-white"
              >
                <YouTubeIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="py-2 px-1 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="py-2 px-1 hover:text-slate-300 transition-colors">Terms &amp; Conditions</Link>
            <Link href="/refund-policy" className="py-2 px-1 hover:text-slate-300 transition-colors">Refund Policy</Link>
            <Link href="/contact" className="py-2 px-1 hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
