import { Metadata } from 'next';
import PostContent from '@/components/blog/PostContent';

interface Props {
  params: { slug: string; locale: string };
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Current Affairs Article' };
}

export default function CurrentAffairsPostPage({ params }: Props) {
  return (
    <article className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <PostContent slug={params.slug} />
      </div>
    </article>
  );
}
