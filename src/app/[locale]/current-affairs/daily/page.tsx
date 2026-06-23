import type { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { currentAffairsQuery } from '@/lib/sanity/queries';
import CurrentAffairsClient from '@/components/current-affairs/CurrentAffairsClient';

export const metadata: Metadata = {
  title: 'Daily Current Affairs | Dhyeya IAS Greater Noida',
  description: 'Stay updated with daily current affairs for UPSC, UPPSC and state PCS exams. Expert analysis by Dhyeya IAS faculty covering Economy, Polity, Environment and more.',
  keywords: 'UPSC current affairs, daily current affairs, UPPSC current affairs, IAS preparation, GS current affairs',
};

export const revalidate = 3600;

export default async function DailyCurrentAffairsPage() {
  const articles = await sanityClient.fetch(currentAffairsQuery).catch(() => []);

  return <CurrentAffairsClient articles={articles} />;
}
