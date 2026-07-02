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

  // Attach the series each test belongs to (series_ids: string[])
  const { data: links } = await supabase
    .from('test_series_links')
    .select('test_id, series_product_id');

  const byTest = new Map<string, string[]>();
  for (const l of links ?? []) {
    const arr = byTest.get(l.test_id) ?? [];
    arr.push(l.series_product_id);
    byTest.set(l.test_id, arr);
  }
  const tests = (data ?? []).map((t) => ({ ...t, series_ids: byTest.get(t.id) ?? [] }));

  return NextResponse.json({ tests });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, title_hi, exam_type, total_duration_min, marks_per_q, negative_marks, sectional_timing, is_free, series_ids, max_attempts } = body;

  if (!title || !total_duration_min) {
    return NextResponse.json({ error: 'Title and duration required' }, { status: 400 });
  }

  const maxAttempts = max_attempts != null && Number(max_attempts) > 0 ? Number(max_attempts) : null;

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
      max_attempts: maxAttempts,
      status: 'draft',
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Link the test to the selected series (skipped for free tests)
  const ids: string[] = Array.isArray(series_ids) ? series_ids.filter(Boolean) : [];
  if (!is_free && ids.length) {
    const rows = ids.map((sid) => ({ test_id: data.id, series_product_id: sid }));
    const { error: linkErr } = await supabase.from('test_series_links').insert(rows);
    if (linkErr) return NextResponse.json({ error: `Test created but series link failed: ${linkErr.message}` }, { status: 500 });
  }

  return NextResponse.json({ test: data }, { status: 201 });
}
