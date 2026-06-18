import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata = { title: 'Student Dashboard - Dhyeya IAS' };

export default async function DashboardPage({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Server-side guard - if somehow middleware was bypassed
  if (!user) {
    redirect(`/${params.locale}/login`);
  }

  return <DashboardClient user={user} locale={params.locale} />;
}
