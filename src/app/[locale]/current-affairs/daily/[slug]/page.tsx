import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { currentAffairsBySlugQuery, relatedCurrentAffairsQuery } from '@/lib/sanity/queries';
import ArticleClient from '@/components/current-affairs/ArticleClient';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await sanityClient.fetch(currentAffairsBySlugQuery, { slug: params.slug }).catch(() => null);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | Dhyeya IAS Current Affairs`,
    description: article.excerpt,
  };
}

export const revalidate = 3600;

export default async function ArticlePage({ params }: Props) {
  const [article, related] = await Promise.all([
    sanityClient.fetch(currentAffairsBySlugQuery, { slug: params.slug }).catch(() => null),
    sanityClient.fetch(relatedCurrentAffairsQuery, { category: '', slug: params.slug }).catch(() => []),
  ]);

  if (!article) notFound();

  const relatedArticles = await sanityClient
    .fetch(relatedCurrentAffairsQuery, { category: article.category, slug: params.slug })
    .catch(() => []);

  return <ArticleClient article={article} related={relatedArticles} />;
}
