import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, Newsreader } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import SmoothScroll from '@/components/shared/SmoothScroll';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import BackToTop from '@/components/shared/BackToTop';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
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
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icons/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0B1C3D',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getBarItems(): Promise<string[]> {
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
}

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to Cloudinary (hero carousel images) and Supabase (auth/data) */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${newsreader.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
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
