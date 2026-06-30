import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';

async function assertAdmin(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'faculty'].includes(profile.role)) return null;
  return user;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const caller = await assertAdmin(supabase);
  if (!caller) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testId = params.id;

  // Fetch test meta
  const { data: test } = await supabase
    .from('tests')
    .select('id, title, marks_per_q, total_duration_min')
    .eq('id', testId)
    .single();

  if (!test) return NextResponse.json({ error: 'Test not found' }, { status: 404 });

  // Fetch all submitted attempts
  const { data: attempts, error } = await supabase
    .from('attempts')
    .select('id, student_id, score, total_correct, total_wrong, total_skipped, time_taken_sec, submitted_at, status, created_at')
    .eq('test_id', testId)
    .in('status', ['submitted', 'auto_submitted'])
    .order('score', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!attempts?.length) return NextResponse.json({ test, attempts: [], stats: null });

  // Fetch profiles for all students
  const studentIds = Array.from(new Set(attempts.map((a) => a.student_id)));

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', studentIds);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p.full_name ?? 'Unknown']));

  // Fetch emails via service role admin API
  const emailMap = new Map<string, string>();
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceKey) {
      const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000, page: 1 });
      for (const u of users) {
        emailMap.set(u.id, u.email ?? '');
      }
    }
  } catch { /* emails optional */ }

  // Compute total questions from first attempt's correct+wrong+skipped
  const firstAttempt = attempts[0];
  const totalQ = (firstAttempt.total_correct ?? 0) + (firstAttempt.total_wrong ?? 0) + (firstAttempt.total_skipped ?? 0);
  const maxMarks = totalQ * test.marks_per_q;

  // Build enriched rows sorted by score desc (already sorted)
  const rows = attempts.map((a, idx) => {
    const score = a.score ?? 0;
    const pct = maxMarks > 0 ? Math.round((score / maxMarks) * 100) : 0;
    return {
      rank: idx + 1,
      attemptId: a.id,
      studentId: a.student_id,
      name: profileMap.get(a.student_id) ?? 'Unknown',
      email: emailMap.get(a.student_id) ?? '—',
      score,
      pct,
      total_correct: a.total_correct ?? 0,
      total_wrong: a.total_wrong ?? 0,
      total_skipped: a.total_skipped ?? 0,
      time_taken_sec: a.time_taken_sec,
      submitted_at: a.submitted_at ?? a.created_at,
      status: a.status,
    };
  });

  // Summary stats
  const scores = rows.map((r) => r.score);
  const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const highest = scores[0] ?? 0;
  const lowest = scores[scores.length - 1] ?? 0;
  const passing = rows.filter((r) => r.pct >= 33).length;

  return NextResponse.json({
    test,
    maxMarks,
    totalQ,
    attempts: rows,
    stats: {
      total: rows.length,
      avgScore: Math.round(avgScore * 100) / 100,
      highest,
      lowest,
      passing,
      passingPct: rows.length ? Math.round((passing / rows.length) * 100) : 0,
    },
  });
}
