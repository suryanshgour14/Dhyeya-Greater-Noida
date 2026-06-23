import type { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { magazinesQuery } from '@/lib/sanity/queries';
import MagazineClient from '@/components/magazine/MagazineClient';

export const metadata: Metadata = {
  title: 'Monthly Magazine | Dhyeya IAS Greater Noida',
  description: 'Download Dhyeya IAS monthly current affairs magazine — comprehensive UPSC preparation material covering all GS topics.',
};

export const revalidate = 3600;

export default async function MagazinePage() {
  const issues = await sanityClient.fetch(magazinesQuery).catch(() => []);
  return <MagazineClient issues={issues} />;
}
