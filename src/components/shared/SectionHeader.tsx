import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  titleKey: string;
  subtitleKey?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeader({
  titleKey,
  subtitleKey,
  className,
  centered = true,
}: SectionHeaderProps) {
  const t = useTranslations();

  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
        {t(titleKey as Parameters<typeof t>[0])}
      </h2>
      {subtitleKey && (
        <p className="mt-3 text-muted-foreground sm:text-lg">
          {t(subtitleKey as Parameters<typeof t>[0])}
        </p>
      )}
    </div>
  );
}
