import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import MagazineClient from '@/components/magazine/MagazineClient';

export const metadata: Metadata = {
  title: 'Monthly Magazine | Dhyeya IAS Greater Noida',
  description: 'Download Dhyeya IAS monthly current affairs magazine — comprehensive UPSC preparation material covering all GS topics.',
};

export const revalidate = 3600;

export default async function MagazinePage() {
  const supabase = createServerClient();
  const { data: issues } = await supabase
    .from('magazine_issues')
    .select('id, title, month, year, cover_image_url, description, topics, page_count, pdf_url, is_free, published_at')
    .order('year', { ascending: false })
    .order('published_at', { ascending: false });

  return <MagazineClient issues={issues ?? []} />;
}
