import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'en' | 'hi')) {
    locale = routing.defaultLocale;
  }

  const [common, home, courses, about, faculty, contact, results, auth] =
    await Promise.all([
      import(`../../locales/${locale}/common.json`),
      import(`../../locales/${locale}/home.json`),
      import(`../../locales/${locale}/courses.json`),
      import(`../../locales/${locale}/about.json`),
      import(`../../locales/${locale}/faculty.json`),
      import(`../../locales/${locale}/contact.json`),
      import(`../../locales/${locale}/results.json`),
      import(`../../locales/${locale}/auth.json`),
    ]);

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      courses: courses.default,
      about: about.default,
      faculty: faculty.default,
      contact: contact.default,
      results: results.default,
      auth: auth.default,
    },
  };
});
