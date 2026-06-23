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

// Manual grant: admin grants enrollment without a payment
export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const admin = await assertAdmin(supabase);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { student_id, product_id, access_days } = body;

  if (!student_id || !product_id) {
    return NextResponse.json({ error: 'student_id and product_id are required' }, { status: 400 });
  }

  const expires_at = access_days
    ? new Date(Date.now() + access_days * 86400_000).toISOString()
    : null;

  const service = createServiceClient();
  const { data, error } = await service
    .from('enrollments')
    .upsert(
      { student_id, product_id, granted_at: new Date().toISOString(), expires_at, granted_by: admin.id },
      { onConflict: 'student_id,product_id', ignoreDuplicates: false }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

// List all enrollments (admin view)
export async function GET() {
  const supabase = createServerClient();
  const user = await assertAdmin(supabase);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('enrollments')
    .select('*, products(title, type), profiles(full_name, email)')
    .order('granted_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
