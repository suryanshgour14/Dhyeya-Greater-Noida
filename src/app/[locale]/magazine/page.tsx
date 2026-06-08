import { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Monthly Magazine',
  description: "Download Dhyeya IAS Greater Noida's monthly current affairs magazine.",
};

export default function MagazinePage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          titleKey="navbar.magazine"
          subtitleKey="home.courses.subtitle"
        />
        <div className="mt-8">
          {/* Magazine PDFs from Sanity */}
        </div>
      </div>
    </section>
  );
}
