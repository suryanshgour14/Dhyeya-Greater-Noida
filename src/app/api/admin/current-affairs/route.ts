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
    .from('current_affairs')
    .select('id, title, slug, category, is_important, published_at, created_at')
    .order('published_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ articles: data });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, title_hi, slug, excerpt, excerpt_hi, body: articleBody, body_hi,
    category, gs_relevance, tags, is_important, image_url, published_at } = body;

  if (!title || !slug || !excerpt || !category) {
    return NextResponse.json({ error: 'Title, slug, excerpt and category are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('current_affairs')
    .insert({
      title, title_hi: title_hi || null, slug, excerpt,
      excerpt_hi: excerpt_hi || null, body: articleBody || null, body_hi: body_hi || null,
      category, gs_relevance: gs_relevance || [], tags: tags || [],
      is_important: Boolean(is_important),
      image_url: image_url || null,
      published_at: published_at || new Date().toISOString(),
      created_by: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ article: data }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await request.json();
  const { error } = await supabase.from('current_affairs').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
