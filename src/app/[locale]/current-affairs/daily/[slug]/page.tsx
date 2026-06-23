import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import ArticleClient from '@/components/current-affairs/ArticleClient';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: article } = await supabase
    .from('current_affairs')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .single();
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | Dhyeya IAS Current Affairs`,
    description: article.excerpt,
  };
}

export const revalidate = 3600;

export default async function ArticlePage({ params }: Props) {
  const supabase = createServerClient();

  const { data: article } = await supabase
    .from('current_affairs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!article) notFound();

  const { data: related } = await supabase
    .from('current_affairs')
    .select('id, title, slug, excerpt, category, image_url, published_at')
    .eq('category', article.category)
    .neq('slug', params.slug)
    .order('published_at', { ascending: false })
    .limit(3);

  return <ArticleClient article={article} related={related ?? []} />;
}
