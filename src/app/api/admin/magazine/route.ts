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
    .from('magazine_issues')
    .select('*')
    .order('year', { ascending: false })
    .order('published_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ issues: data });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, month, year, cover_image_url, description, topics, page_count, pdf_url, is_free } = body;

  if (!title || !month || !year || !pdf_url) {
    return NextResponse.json({ error: 'Title, month, year and PDF URL are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('magazine_issues')
    .insert({
      title, month, year: Number(year),
      cover_image_url: cover_image_url || null,
      description: description || null,
      topics: topics || [],
      page_count: page_count ? Number(page_count) : null,
      pdf_url, is_free: Boolean(is_free),
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ issue: data }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await request.json();
  const { error } = await supabase.from('magazine_issues').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
