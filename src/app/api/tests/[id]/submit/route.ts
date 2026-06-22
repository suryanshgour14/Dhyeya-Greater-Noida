import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { attemptId } = body;

  if (!attemptId) return NextResponse.json({ error: 'attemptId required' }, { status: 400 });

  // Verify ownership and state
  const { data: attempt } = await supabase
    .from('attempts')
    .select('*')
    .eq('id', attemptId)
    .eq('student_id', user.id)
    .eq('test_id', params.id)
    .single();

  if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (attempt.status !== 'in_progress') {
    return NextResponse.json({ error: 'Already submitted', attemptId }, { status: 200 });
  }

  // Score server-side via RPC (reads `correct` — never sent to client)
  const { data: result, error } = await supabase.rpc('score_attempt', { p_attempt_id: attemptId });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, attemptId, result });
}
