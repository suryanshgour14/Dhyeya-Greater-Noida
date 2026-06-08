import { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import ResultsFilter from '@/components/toppers/ResultsFilter';

export const metadata: Metadata = {
  title: 'Results & Toppers',
  description: 'Celebrating the success of Dhyeya IAS Greater Noida students.',
};

export default function ResultsPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader titleKey="results.title" subtitleKey="results.subtitle" />
        <ResultsFilter />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Toppers from Sanity */}
        </div>
      </div>
    </section>
  );
}
