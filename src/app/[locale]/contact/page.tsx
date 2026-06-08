import { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import ContactForm from '@/components/forms/ContactForm';
import GoogleMap from '@/components/shared/GoogleMap';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Dhyeya IAS Greater Noida for admissions and enquiries.',
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader titleKey="contact.title" subtitleKey="contact.subtitle" />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <GoogleMap />
        </div>
      </div>
    </section>
  );
}
