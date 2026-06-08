'use client';

interface PDFViewerProps {
  url: string;
  title?: string;
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-sm">
      {title && (
        <div className="border-b bg-muted px-4 py-2 font-medium">{title}</div>
      )}
      <iframe
        src={`${url}#toolbar=0`}
        title={title}
        className="h-[600px] w-full"
      />
    </div>
  );
}
