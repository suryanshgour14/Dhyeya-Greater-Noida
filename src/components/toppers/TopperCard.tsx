import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface TopperCardProps {
  name: string;
  rank: string;
  year: number;
  exam: string;
  service?: string;
  optional?: string;
  message?: string;
}

export default function TopperCard({
  name,
  rank,
  year,
  exam,
  service,
  message,
}: TopperCardProps) {
  return (
    <Card className="overflow-hidden text-center transition-shadow hover:shadow-lg">
      <div className="bg-primary/10 p-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-primary/20" />
        <div className="mt-3 flex items-center justify-center gap-1">
          <Award size={16} className="text-brand-orange" />
          <span className="font-bold text-brand-orange">{rank}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {exam} {year}
        </p>
        {service && (
          <p className="mt-1 text-xs text-primary">{service}</p>
        )}
        {message && (
          <p className="mt-2 text-xs italic text-muted-foreground">
            &ldquo;{message}&rdquo;
          </p>
        )}
      </CardContent>
    </Card>
  );
}
