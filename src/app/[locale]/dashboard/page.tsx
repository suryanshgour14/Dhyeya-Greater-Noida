import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata = { title: 'My Dashboard - Dhyeya IAS' };

type Tab = 'courses' | 'purchases' | 'results' | 'settings';
const VALID_TABS: Tab[] = ['courses', 'purchases', 'results', 'settings'];

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { tab?: string };
}) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${params.locale}/login`);

  const initialTab: Tab = VALID_TABS.includes(searchParams.tab as Tab)
    ? (searchParams.tab as Tab)
    : 'courses';

  // Enrollments (Courses + Purchases) and attempts (Results) in parallel
  const [{ data: enrollments }, { data: attempts }] = await Promise.all([
    supabase
      .from('enrollments')
      .select('id, granted_at, expires_at, products(id, title, title_hi, type, ref_slug, price_inr)')
      .eq('student_id', user.id)
      .order('granted_at', { ascending: false }),
    supabase
      .from('attempts')
      .select('id, test_id, score, total_correct, total_wrong, total_skipped, time_taken_sec, submitted_at, created_at, status')
      .eq('student_id', user.id)
      .in('status', ['submitted', 'auto_submitted'])
      .order('submitted_at', { ascending: false }),
  ]);

  // Test details for the attempts shown in "My Results"
  const testIds = Array.from(new Set((attempts ?? []).map((a) => a.test_id)));
  const { data: tests } = testIds.length
    ? await supabase.from('tests').select('id, title, exam_type, marks_per_q').in('id', testIds)
    : { data: [] };

  return (
    <DashboardClient
      user={user}
      locale={params.locale}
      initialTab={initialTab}
      enrollments={(enrollments ?? []) as never}
      attempts={attempts ?? []}
      tests={tests ?? []}
    />
  );
}
