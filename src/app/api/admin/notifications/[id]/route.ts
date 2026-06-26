import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

async function assertAdmin(supabase: ReturnType<typeof createServerClient>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'faculty'].includes(profile.role)) return null;
  return user;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = createServerClient();
  const user = await assertAdmin(auth);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, date_label, is_new, is_active, show_in_bar, sort_order } = body;

  const update: Record<string, unknown> = {};
  if (title !== undefined) update.title = title.trim();
  if (description !== undefined) update.description = description.trim();
  if (date_label !== undefined) update.date_label = date_label.trim();
  if (is_new !== undefined) update.is_new = Boolean(is_new);
  if (is_active !== undefined) update.is_active = Boolean(is_active);
  if (show_in_bar !== undefined) update.show_in_bar = Boolean(show_in_bar);
  if (sort_order !== undefined) update.sort_order = Number(sort_order);

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('notifications')
    .update(update)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ notification: data });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = createServerClient();
  const user = await assertAdmin(auth);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createServiceClient();
  const { error } = await supabase.from('notifications').delete().eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
