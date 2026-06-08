import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Study Materials' };

export default function MaterialsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Study Materials</h1>
      <p className="mt-2 text-muted-foreground">Your enrolled course materials.</p>
    </div>
  );
}
