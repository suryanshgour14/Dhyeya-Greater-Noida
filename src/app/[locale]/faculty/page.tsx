import { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Our Faculty',
  description: 'Meet the expert faculty at Dhyeya IAS Greater Noida.',
};

export default function FacultyPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader titleKey="faculty.title" subtitleKey="faculty.subtitle" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Faculty fetched from Sanity */}
        </div>
      </div>
    </section>
  );
}
