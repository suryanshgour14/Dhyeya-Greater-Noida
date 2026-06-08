const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
  }
) {
  const { width, height, quality = 'auto', format = 'auto' } = options || {};

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    width ? `w_${width}` : '',
    height ? `h_${height}` : '',
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}
