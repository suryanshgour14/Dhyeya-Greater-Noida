import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dhyeyagreaternoida.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Public UPSC FAQ lives under the otherwise auth-gated student-zone —
        // list it explicitly so the more-specific Allow wins over the Disallow.
        allow: ['/', '/*/student-zone/faqs'],
        // Non-public / auth-gated areas that redirect anonymous visitors to
        // /login (locale-prefixed, so use /*/ wildcards). Excluding them stops
        // wasted crawl budget and the "Page with redirect" reports in GSC.
        disallow: [
          '/studio/',
          '/api/',
          '/*/dashboard',
          '/*/admin',
          '/*/tests',
          '/*/purchases',
          '/*/student-zone',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
