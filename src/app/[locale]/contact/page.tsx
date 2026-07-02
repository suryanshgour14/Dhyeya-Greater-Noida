import { Metadata } from 'next';
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import GoogleMap from '@/components/shared/GoogleMap';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Dhyeya IAS Greater Noida — call, WhatsApp, email, or visit us for admissions and enquiries.',
};

const waNumber = CONTACT_INFO.whatsapp.replace(/\D/g, '');
const waLink = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

export default function ContactPage() {
  const methods = [
    {
      icon: Phone,
      label: 'Call us',
      lines: [CONTACT_INFO.phone, CONTACT_INFO.phone2],
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
      cta: 'Tap to call',
      color: 'bg-brand-blue/10 text-brand-blue',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      lines: [CONTACT_INFO.phone],
      href: waLink("Hi, I'd like to know more about Dhyeya IAS Greater Noida."),
      cta: 'Chat on WhatsApp',
      color: 'bg-green-50 text-green-600',
      external: true,
    },
    {
      icon: Mail,
      label: 'Email us',
      lines: [CONTACT_INFO.email],
      href: `mailto:${CONTACT_INFO.email}`,
      cta: 'Send an email',
      color: 'bg-brand-orange/10 text-brand-orange',
    },
    {
      icon: MapPin,
      label: 'Visit us',
      lines: [CONTACT_INFO.address],
      href: CONTACT_INFO.mapUrl,
      cta: 'Open in Google Maps',
      color: 'bg-rose-50 text-rose-600',
      external: true,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 md:text-base">
            Have a question about admissions, courses, or test series? Reach out any way you like —
            we&apos;re happy to help.
          </p>
        </div>
      </section>

      {/* Direct contact methods */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.external ? '_blank' : undefined}
              rel={m.external ? 'noopener noreferrer' : undefined}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${m.color}`}>
                <m.icon className="h-6 w-6" />
              </span>
              <p className="text-sm font-bold text-brand-blue">{m.label}</p>
              <div className="mt-1 flex-1 space-y-0.5">
                {m.lines.map((l, i) => (
                  <p key={i} className="text-sm leading-snug text-slate-600">{l}</p>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange">
                {m.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>

        {/* Office Hours */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <Clock className="h-5 w-5 shrink-0 text-brand-gold" />
          <div>
            <p className="text-sm font-semibold text-brand-blue">Office Hours</p>
            <p className="text-sm text-slate-600">{CONTACT_INFO.hours}</p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-4 text-lg font-bold text-brand-blue">Find us on the map</h2>
        <GoogleMap />
      </section>
    </div>
  );
}
