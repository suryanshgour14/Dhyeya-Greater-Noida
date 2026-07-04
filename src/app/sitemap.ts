import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { COURSES } from '@/lib/constants';
import { TEST_SERIES } from '@/lib/test-series';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dhyeyagreaternoida.com';

// All public, indexable paths (admin/dashboard/auth/studio excluded — see robots.ts)
const staticPaths = [
  '',
  '/courses',
  '/test-series',
  '/syllabus',
  '/syllabus/ias',
  '/syllabus/uppsc',
  '/syllabus/ukpsc',
  '/syllabus/bpsc',
  '/about',
  '/faculty',
  '/team',
  '/results',
  '/success-stories',
  '/current-affairs',
  '/magazine',
  '/contact',
  '/student-zone/faqs',
  '/terms',
  '/privacy-policy',
  '/refund-policy',
];

const dynamicPaths = [
  ...COURSES.map((c) => `/courses/${c.slug}`),
  ...TEST_SERIES.map((s) => `/test-series/${s.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const [primary] = locales; // 'en' — used as the canonical URL, with hreflang alternates
  const now = new Date();

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${SITE_URL}/${primary}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.includes('/') ? 0.7 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
      ),
    },
  }));
}
