import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${params.locale}/login`);
  }

  // The dashboard page renders its own full-page layout.
  return <>{children}</>;
}
