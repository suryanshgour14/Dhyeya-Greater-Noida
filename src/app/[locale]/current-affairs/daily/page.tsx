import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import CurrentAffairsClient from '@/components/current-affairs/CurrentAffairsClient';

export const metadata: Metadata = {
  title: 'Daily Current Affairs | Dhyeya IAS Greater Noida',
  description: 'Stay updated with daily current affairs for UPSC, UPPSC and state PCS exams. Expert analysis by Dhyeya IAS faculty covering Economy, Polity, Environment and more.',
  keywords: 'UPSC current affairs, daily current affairs, UPPSC current affairs, IAS preparation, GS current affairs',
};

export const revalidate = 3600;

export default async function DailyCurrentAffairsPage() {
  const supabase = createServerClient();
  const { data: articles } = await supabase
    .from('current_affairs')
    .select('id, title, title_hi, slug, excerpt, excerpt_hi, category, gs_relevance, tags, is_important, image_url, published_at')
    .order('published_at', { ascending: false });

  return <CurrentAffairsClient articles={articles ?? []} />;
}
