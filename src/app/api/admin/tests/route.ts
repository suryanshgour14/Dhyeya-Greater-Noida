import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

async function assertFaculty(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'faculty'].includes(profile.role)) return null;
  return user;
}

export async function GET() {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('tests')
    .select('*, test_sections(count), questions(count)')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tests: data });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, title_hi, exam_type, total_duration_min, marks_per_q, negative_marks, sectional_timing, is_free } = body;

  if (!title || !total_duration_min) {
    return NextResponse.json({ error: 'Title and duration required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('tests')
    .insert({
      title,
      title_hi: title_hi || null,
      exam_type: exam_type || null,
      total_duration_min: Number(total_duration_min),
      marks_per_q: Number(marks_per_q ?? 2),
      negative_marks: Number(negative_marks ?? 0.66),
      sectional_timing: Boolean(sectional_timing),
      is_free: Boolean(is_free),
      status: 'draft',
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ test: data }, { status: 201 });
}
