import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { attemptId, progress, blurCount } = body;

  if (!attemptId) return NextResponse.json({ error: 'attemptId required' }, { status: 400 });

  // Verify ownership
  const { data: attempt } = await supabase
    .from('attempts')
    .select('id, student_id, status, started_at, test_id')
    .eq('id', attemptId)
    .eq('student_id', user.id)
    .single();

  if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (attempt.status !== 'in_progress') {
    return NextResponse.json({ error: 'Attempt already submitted' }, { status: 400 });
  }

  // Check if overall deadline passed → auto-submit
  const { data: test } = await supabase
    .from('tests')
    .select('total_duration_min')
    .eq('id', attempt.test_id)
    .single();

  if (test) {
    const deadline = new Date(attempt.started_at).getTime() + test.total_duration_min * 60 * 1000;
    if (Date.now() > deadline) {
      await supabase.rpc('score_attempt', { p_attempt_id: attemptId });
      await supabase.from('attempts').update({ status: 'auto_submitted' }).eq('id', attemptId);
      return NextResponse.json({ autoSubmitted: true });
    }
  }

  const updates: Record<string, unknown> = { progress };
  if (typeof blurCount === 'number') updates.blur_count = blurCount;

  const { error } = await supabase
    .from('attempts')
    .update(updates)
    .eq('id', attemptId)
    .eq('student_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
