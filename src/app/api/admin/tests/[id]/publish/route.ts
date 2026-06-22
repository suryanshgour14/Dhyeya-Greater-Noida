import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

async function assertFaculty(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'faculty'].includes(profile.role)) return null;
  return user;
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testId = params.id;

  // Ensure test has at least 1 question
  const { count } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })
    .eq('test_id', testId);

  if (!count || count === 0) {
    return NextResponse.json({ error: 'Cannot publish a test with no questions' }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const unpublish = body.unpublish === true;

  const { data, error } = await supabase
    .from('tests')
    .update({ status: unpublish ? 'draft' : 'published' })
    .eq('id', testId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ test: data });
}
