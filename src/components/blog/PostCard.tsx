import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
}

export default function PostCard({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
}: PostCardProps) {
  const locale = useLocale();

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="h-40 bg-primary/10" />
      <CardHeader className="pb-2">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-orange">
          {category}
        </span>
        <h3 className="line-clamp-2 font-semibold leading-tight">
          <Link
            href={`/${locale}/current-affairs/${slug.current}`}
            className="hover:text-primary"
          >
            {title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="flex-1 text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>{formatDate(publishedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
