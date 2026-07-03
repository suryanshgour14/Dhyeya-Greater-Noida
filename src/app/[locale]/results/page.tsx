import { Metadata } from 'next';
import { Trophy } from 'lucide-react';
import ResultsGallery from '@/components/toppers/ResultsGallery';
import { TOPPERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Results & Toppers',
  description: 'Celebrating the success of Dhyeya IAS Greater Noida students.',
};

export default function ResultsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <Trophy className="mx-auto mb-3 h-10 w-10 text-brand-gold" />
          <h1 className="text-3xl font-extrabold md:text-4xl">Results &amp; Toppers</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 md:text-base">
            Celebrating the success of Dhyeya IAS Greater Noida students - from AIR 01 to hundreds
            of selections in the UPSC Civil Services Examination.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { value: `${TOPPERS.length}+`, label: 'Featured Selections' },
              { value: 'AIR 01', label: 'All India Rank 1' },
              { value: '5000+', label: 'Total Selections in IAS / PCS' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-brand-gold">{value}</p>
                <p className="text-[11px] font-medium text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toppers grid */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="container mx-auto px-4">
          <ResultsGallery />
        </div>
      </section>
    </div>
  );
}
