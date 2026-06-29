import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest, { params }: { params: { attemptId: string } }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { attemptId } = params;

  // Load attempt (owner check)
  const { data: attempt } = await supabase
    .from('attempts')
    .select('*')
    .eq('id', attemptId)
    .eq('student_id', user.id)
    .single();

  if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (attempt.status === 'in_progress') {
    return NextResponse.json({ error: 'Test not yet submitted' }, { status: 400 });
  }

  // Load test + sections
  const { data: test } = await supabase
    .from('tests')
    .select('*')
    .eq('id', attempt.test_id)
    .single();

  const { data: sections } = await supabase
    .from('test_sections')
    .select('*')
    .eq('test_id', attempt.test_id)
    .order('order_index');

  // Load questions WITH correct (server side only — never sent as-is)
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('test_id', attempt.test_id)
    .order('section_id')
    .order('order_index');

  // Load answers for this attempt
  const { data: answers } = await supabase
    .from('answers')
    .select('*')
    .eq('attempt_id', attemptId);

  // Build per-section breakdown
  const sectionMap: Record<string, { name: string; total: number; correct: number; wrong: number; skip: number }> = {};
  for (const sec of (sections ?? [])) {
    sectionMap[sec.id] = { name: sec.name, total: 0, correct: 0, wrong: 0, skip: 0 };
  }

  type AnswerRow = { question_id: string; section_id: string; selected_option: string | null; is_correct: boolean };
  const answerMap: Record<string, AnswerRow> = {};
  for (const a of (answers ?? [])) {
    answerMap[a.question_id] = a;
    if (sectionMap[a.section_id]) {
      sectionMap[a.section_id].total++;
      if (a.selected_option === null) sectionMap[a.section_id].skip++;
      else if (a.is_correct) sectionMap[a.section_id].correct++;
      else sectionMap[a.section_id].wrong++;
    }
  }

  // Rank / percentile across all submitted attempts of this test
  const { data: rankData } = await supabase
    .from('attempts')
    .select('score')
    .eq('test_id', attempt.test_id)
    .in('status', ['submitted', 'auto_submitted'])
    .not('score', 'is', null);

  let rank = 1;
  let percentile = 100;
  if (rankData && rankData.length > 1) {
    const myScore = attempt.score ?? 0;
    const sorted = [...rankData].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    rank = sorted.findIndex((r) => (r.score ?? 0) <= myScore) + 1;
    const below = sorted.filter((r) => (r.score ?? 0) < myScore).length;
    percentile = Math.round((below / rankData.length) * 100);
  }

  // Build question review (attach student answer + explanation to each question)
  const review = (questions ?? []).map((q) => {
    const ans = answerMap[q.id];
    return {
      id: q.id,
      section_id: q.section_id,
      question_en: q.question_en,
      question_hi: q.question_hi,
      option_a_en: q.option_a_en,
      option_b_en: q.option_b_en,
      option_c_en: q.option_c_en,
      option_d_en: q.option_d_en,
      option_a_hi: q.option_a_hi ?? null,
      option_b_hi: q.option_b_hi ?? null,
      option_c_hi: q.option_c_hi ?? null,
      option_d_hi: q.option_d_hi ?? null,
      explanation_en: q.explanation_en ?? null,
      explanation_hi: q.explanation_hi ?? null,
      correct: q.correct,              // safe: this is the result page, auth check passed
      selected: ans?.selected_option ?? null,
      is_correct: ans?.is_correct ?? false,
    };
  });

  return NextResponse.json({
    attempt,
    test,
    sections,
    sectionBreakdown: Object.values(sectionMap),
    review,
    rank,
    percentile,
    totalTakers: rankData?.length ?? 1,
  });
}
