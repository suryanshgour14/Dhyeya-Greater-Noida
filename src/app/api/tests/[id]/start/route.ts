import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testId = params.id;

  // Load test (must be published)
  const { data: test } = await supabase
    .from('tests')
    .select('*')
    .eq('id', testId)
    .eq('status', 'published')
    .single();

  if (!test) return NextResponse.json({ error: 'Test not found' }, { status: 404 });

  // Enrollment gate: a paid test is accessible if the student is enrolled in
  // ANY series it belongs to (test_series_links) — or, for backward compat, a
  // per-test product (products.ref_id = test.id).
  if (!test.is_free) {
    // Series this test belongs to
    const { data: links } = await supabase
      .from('test_series_links')
      .select('series_product_id')
      .eq('test_id', testId);
    const candidateIds = new Set<string>((links ?? []).map((l) => l.series_product_id));

    // Legacy per-test product
    const { data: directProduct } = await supabase
      .from('products')
      .select('id')
      .eq('type', 'test')
      .eq('ref_id', testId)
      .eq('is_active', true)
      .maybeSingle();
    if (directProduct) candidateIds.add(directProduct.id);

    // A test with no series and no product is admin-misconfigured → keep it locked.
    if (candidateIds.size === 0) {
      return NextResponse.json(
        { error: 'This test is not available for purchase yet. Please contact the institute.', requiresPurchase: true },
        { status: 403 },
      );
    }

    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('product_id, expires_at')
      .eq('student_id', user.id)
      .in('product_id', Array.from(candidateIds));

    const hasAccess = (enrollments ?? []).some(
      (e) => e.expires_at === null || new Date(e.expires_at) > new Date(),
    );
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Purchase required', requiresPurchase: true, productIds: Array.from(candidateIds) },
        { status: 403 },
      );
    }
  }

  // Check for an existing in-progress attempt
  const { data: existing } = await supabase
    .from('attempts')
    .select('*')
    .eq('student_id', user.id)
    .eq('test_id', testId)
    .eq('status', 'in_progress')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  let attempt = existing;

  if (!attempt) {
    // Create new attempt
    const { data: newAttempt, error } = await supabase
      .from('attempts')
      .insert({
        student_id: user.id,
        test_id: testId,
        progress: { answers: {}, marked: [], visited: [], currentQ: null },
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    attempt = newAttempt;
  } else {
    // Check if server-side deadline has passed → auto-submit
    const deadlineSec = attempt.started_at
      ? new Date(attempt.started_at).getTime() / 1000 + test.total_duration_min * 60
      : null;
    if (deadlineSec && Date.now() / 1000 > deadlineSec) {
      // Auto-submit via RPC
      await supabase.rpc('score_attempt', { p_attempt_id: attempt.id });
      const { data: updated } = await supabase
        .from('attempts')
        .update({ status: 'auto_submitted' })
        .eq('id', attempt.id)
        .select()
        .single();
      return NextResponse.json({ attempt: updated, autoSubmitted: true });
    }
  }

  // Load questions WITHOUT correct field
  const { data: sections } = await supabase
    .from('test_sections')
    .select('*')
    .eq('test_id', testId)
    .order('order_index');

  const { data: questions } = await supabase
    .from('questions')
    .select('id, test_id, section_id, order_index, question_en, question_hi, option_a_en, option_b_en, option_c_en, option_d_en, option_a_hi, option_b_hi, option_c_hi, option_d_hi')
    .eq('test_id', testId)
    .order('section_id')
    .order('order_index');

  // Compute server deadline
  const startedAt = new Date(attempt.started_at).getTime();
  const overallDeadline = new Date(startedAt + test.total_duration_min * 60 * 1000).toISOString();

  // Compute section deadlines if sectional timing is enabled
  let sectionDeadlines: Record<string, string> = attempt.progress?.sectionDeadlines ?? {};

  if (test.sectional_timing && sections && !Object.keys(sectionDeadlines).length) {
    let cursor = startedAt;
    for (const sec of sections) {
      const dur = sec.duration_min ?? Math.floor(test.total_duration_min / sections.length);
      cursor += dur * 60 * 1000;
      sectionDeadlines[sec.id] = new Date(cursor).toISOString();
    }
    // Save deadlines into attempt progress
    await supabase
      .from('attempts')
      .update({
        progress: { ...attempt.progress, sectionDeadlines },
      })
      .eq('id', attempt.id);
  }

  return NextResponse.json({
    attempt,
    test,
    sections,
    questions,
    overallDeadline,
    sectionDeadlines,
    serverNow: new Date().toISOString(),
  });
}
