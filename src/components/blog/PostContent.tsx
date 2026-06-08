interface PostContentProps {
  slug: string;
}

export default function PostContent({ slug }: PostContentProps) {
  return (
    <div>
      <p className="text-muted-foreground">Loading article: {slug}</p>
    </div>
  );
}
