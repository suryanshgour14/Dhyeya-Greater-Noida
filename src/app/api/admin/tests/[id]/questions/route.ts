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

  const body = await request.json();
  const { questions } = body as {
    questions: Array<{
      section: string;
      question_en: string;
      question_hi?: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct: string;
    }>;
  };

  if (!questions?.length) {
    return NextResponse.json({ error: 'No questions provided' }, { status: 400 });
  }

  const testId = params.id;

  // Verify test belongs to this user
  const { data: test } = await supabase
    .from('tests')
    .select('id, status')
    .eq('id', testId)
    .single();

  if (!test) return NextResponse.json({ error: 'Test not found' }, { status: 404 });
  if (test.status === 'published') {
    return NextResponse.json({ error: 'Cannot modify a published test' }, { status: 400 });
  }

  // Remove existing sections and questions for this test (re-upload flow)
  await supabase.from('test_sections').delete().eq('test_id', testId);

  // Build sections in first-seen order
  const sectionOrder: string[] = [];
  const sectionMap: Record<string, string> = {};

  for (const q of questions) {
    if (!sectionOrder.includes(q.section)) {
      sectionOrder.push(q.section);
    }
  }

  // Insert sections
  const sectionInserts = sectionOrder.map((name, i) => ({
    test_id: testId,
    name,
    order_index: i,
  }));

  const { data: createdSections, error: secErr } = await supabase
    .from('test_sections')
    .insert(sectionInserts)
    .select();

  if (secErr) return NextResponse.json({ error: secErr.message }, { status: 500 });

  for (const sec of createdSections!) {
    sectionMap[sec.name] = sec.id;
  }

  // Insert questions grouped per section
  const sectionQCount: Record<string, number> = {};

  const questionInserts = questions.map((q) => {
    const sectionId = sectionMap[q.section];
    const orderInSection = (sectionQCount[q.section] ?? 0);
    sectionQCount[q.section] = orderInSection + 1;

    return {
      test_id: testId,
      section_id: sectionId,
      order_index: orderInSection,
      question_en: q.question_en,
      question_hi: q.question_hi || null,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct: q.correct.toLowerCase(),
    };
  });

  const { error: qErr } = await supabase.from('questions').insert(questionInserts);
  if (qErr) return NextResponse.json({ error: qErr.message }, { status: 500 });

  return NextResponse.json({ inserted: questionInserts.length, sections: createdSections?.length });
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('questions')
    .select('*, test_sections(name)')
    .eq('test_id', params.id)
    .order('section_id')
    .order('order_index');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ questions: data });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const user = await assertFaculty(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { questionId, ...updates } = body;

  if (!questionId) return NextResponse.json({ error: 'questionId required' }, { status: 400 });

  const { error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', questionId)
    .eq('test_id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
