import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, Newsreader } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { locales } from '@/i18n/config';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import SmoothScroll from '@/components/shared/SmoothScroll';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import BackToTop from '@/components/shared/BackToTop';
import LoadingScreen from '@/components/shared/LoadingScreen';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const baseMetadata: Metadata = {
  title: {
    default: 'Dhyeya IAS Greater Noida | Best UPSC Coaching',
    template: '%s | Dhyeya IAS Greater Noida',
  },
  description:
    'Dhyeya IAS Greater Noida - Premier UPSC Civil Services coaching institute with proven results, expert faculty, and comprehensive study material.',
  keywords: [
    'IAS coaching Greater Noida',
    'UPSC coaching',
    'IAS preparation',
    'Dhyeya IAS',
    'civil services coaching',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://dhyeyagreaternoida.com'
  ),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

// Per-page canonical + hreflang (en/hi) for SEO. Reads the path exposed by
// middleware so every page self-canonicalises and declares its language alternates.
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const raw = headers().get('x-pathname') || `/${locale}`;
  const path = raw.replace(/^\/(en|hi)(?=\/|$)/, '') || '';
  return {
    ...baseMetadata,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        hi: `/hi${path}`,
        'x-default': `/en${path}`,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0B1C3D',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Cache notification bar items for 1 hour — prevents dynamic rendering on every request
const getBarItems = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase
        .from('notifications')
        .select('title')
        .eq('is_active', true)
        .eq('show_in_bar', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      return (data ?? []).map((n: { title: string }) => n.title);
    } catch {
      return [];
    }
  },
  ['announcement-bar-items'],
  { revalidate: 3600 }
);

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as 'en' | 'hi')) {
    notFound();
  }

  const [messages, barItems] = await Promise.all([getMessages(), getBarItems()]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dhyeyagreaternoida.com';
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Dhyeya IAS Greater Noida',
      alternateName: 'Dhyeya Sansathanam Greater Noida',
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
      image: `${siteUrl}/og-image.png`,
      description:
        'Premier UPSC, UPPCS & BPSC coaching institute in Greater Noida with expert faculty, test series and proven results.',
      telephone: CONTACT_INFO.phone,
      email: CONTACT_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No. 039A',
        addressLocality: 'Greater Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201310',
        addressCountry: 'IN',
      },
      sameAs: [
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.youtube,
        SOCIAL_LINKS.twitter,
        SOCIAL_LINKS.telegram,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Dhyeya IAS Greater Noida',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: ['en', 'hi'],
    },
  ];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to Supabase for early auth/data connection */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        {/* Organization + WebSite structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <LoadingScreen />
          <SmoothScroll>
            <AnnouncementBar items={barItems} />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
