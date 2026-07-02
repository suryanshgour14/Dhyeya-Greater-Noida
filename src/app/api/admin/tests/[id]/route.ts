import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

async function assertFaculty(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'faculty'].includes(profile.role)) return null;
  return user;
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testId = params.id;

  // Cascade: delete sections (questions cascade via FK), then test
  await supabase.from('test_sections').delete().eq('test_id', testId);

  const { error } = await supabase.from('tests').delete().eq('id', testId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  // series_ids is not a column on tests — pull it out and sync the join table.
  const { series_ids, ...testFields } = body as { series_ids?: string[] } & Record<string, unknown>;

  // Normalise max_attempts: empty / 0 / negative → null (unlimited)
  if ('max_attempts' in testFields) {
    const n = Number(testFields.max_attempts);
    testFields.max_attempts = testFields.max_attempts != null && n > 0 ? n : null;
  }

  if (Object.keys(testFields).length) {
    const { error } = await supabase.from('tests').update(testFields).eq('id', params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Replace the series mapping when series_ids is provided.
  if (Array.isArray(series_ids)) {
    await supabase.from('test_series_links').delete().eq('test_id', params.id);
    const isFree = testFields.is_free === true;
    const ids = series_ids.filter(Boolean);
    if (!isFree && ids.length) {
      const rows = ids.map((sid) => ({ test_id: params.id, series_product_id: sid }));
      const { error: linkErr } = await supabase.from('test_series_links').insert(rows);
      if (linkErr) return NextResponse.json({ error: linkErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
