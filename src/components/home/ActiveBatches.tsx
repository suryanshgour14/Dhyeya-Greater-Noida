import SectionHeader from '@/components/shared/SectionHeader';

export default function ActiveBatches() {

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <SectionHeader titleKey="home.batches.title" subtitleKey="home.batches.subtitle" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Populated from Sanity batches query */}
        </div>
      </div>
    </section>
  );
}
