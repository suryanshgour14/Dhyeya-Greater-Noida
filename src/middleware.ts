import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Routes that require any authenticated user
const AUTH_REQUIRED = [
  '/dashboard',
  '/tests',
  '/student-zone',
  '/purchases',
];

// Routes that require faculty/admin role
const ADMIN_REQUIRED = ['/admin'];

function getLocale(pathname: string) {
  return pathname.split('/')[1] || 'en';
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth = AUTH_REQUIRED.some((p) => pathname.includes(p));
  const needsAdmin = ADMIN_REQUIRED.some((p) => pathname.includes(p));

  if (needsAuth || needsAdmin) {
    const response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    const locale = getLocale(pathname);

    if (!user) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (needsAdmin) {
      // Check role from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || !['admin', 'faculty'].includes(profile.role)) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|studio|_next/static|_next/image|.*\\..*).*)'],
};
