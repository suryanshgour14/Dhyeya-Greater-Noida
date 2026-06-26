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

export async function GET() {
  const auth = createServerClient();
  const user = await assertAdmin(auth);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ notifications: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = createServerClient();
  const user = await assertAdmin(auth);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, date_label, is_new, is_active, show_in_bar, sort_order } = body;

  if (!title?.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      title: title.trim(),
      description: description?.trim() ?? '',
      date_label: date_label?.trim() ?? '',
      is_new: Boolean(is_new ?? true),
      is_active: Boolean(is_active ?? true),
      show_in_bar: Boolean(show_in_bar ?? true),
      sort_order: Number(sort_order ?? 0),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ notification: data }, { status: 201 });
}
