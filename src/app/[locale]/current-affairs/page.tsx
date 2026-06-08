import { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import CategoryFilter from '@/components/blog/CategoryFilter';

export const metadata: Metadata = {
  title: 'Current Affairs',
  description: 'Stay updated with daily current affairs for UPSC preparation.',
};

export default function CurrentAffairsPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          titleKey="home.courses.title"
          subtitleKey="home.courses.subtitle"
        />
        <CategoryFilter />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Posts from Sanity */}
        </div>
      </div>
    </section>
  );
}
