interface CourseDetailsProps {
  slug: string;
}

export default function CourseDetails({ slug }: CourseDetailsProps) {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <p className="text-muted-foreground">Loading course: {slug}</p>
      </div>
    </div>
  );
}
