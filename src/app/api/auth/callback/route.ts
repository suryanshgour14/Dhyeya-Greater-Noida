import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // "next" is where to send the user after login - defaults to /en/dashboard
  const next = searchParams.get('next') ?? '/en';

  if (code) {
    const supabase = createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong → back to login with error flag
  return NextResponse.redirect(`${origin}/en/login?error=auth_failed`);
}
