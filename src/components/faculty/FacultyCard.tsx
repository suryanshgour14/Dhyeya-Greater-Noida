import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

interface FacultyCardProps {
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  bio?: string;
  imageUrl?: string;
}

export default function FacultyCard({
  name,
  designation,
  specialization,
  experience,
}: FacultyCardProps) {
  const t = useTranslations('faculty');

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="flex h-48 items-center justify-center bg-primary/10">
        <div className="h-24 w-24 rounded-full bg-primary/30" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-brand-orange">{designation}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t('card.specialization')}: {specialization}
        </p>
        <p className="text-xs text-muted-foreground">
          {t('card.experience')}: {experience}
        </p>
      </CardContent>
    </Card>
  );
}
