import { NextResponse, type NextRequest } from 'next/server';
import { logError } from '@/shared/logger/logger';
import { createSupabaseAdminClient } from '@/shared/supabase/admin';
import { enforceConfirmDeliveryRateLimits } from '@/shared/rate-limit/rate-limit';

export async function POST(request: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const rateLimited = await enforceConfirmDeliveryRateLimits(request);
  if (rateLimited) return rateLimited;

  let body: { token?: string; feedback_rating?: number; feedback_text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { token, feedback_rating, feedback_text } = body;

  if (!token) {
    return NextResponse.json({ error: 'Token is required.' }, { status: 400 });
  }

  if (feedback_rating !== undefined && (feedback_rating < 1 || feedback_rating > 5)) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
  }

  const { data: inquiry, error: fetchError } = await supabase
    .from('inquiries')
    .select('id, status, delivery_token_used_at')
    .eq('delivery_token', token)
    .single();

  if (fetchError || !inquiry) {
    return NextResponse.json({ error: 'Invalid or expired link.' }, { status: 400 });
  }

  if (inquiry.status !== 'delivered') {
    return NextResponse.json({ error: 'This order is not in a deliverable state.' }, { status: 400 });
  }

  if (inquiry.delivery_token_used_at) {
    return NextResponse.json({ error: 'This link has already been used.' }, { status: 400 });
  }

  const now = new Date().toISOString();

  const { data: updatedInquiry, error: updateError } = await supabase
    .from('inquiries')
    .update({
      status: 'completed',
      completed_at: now,
      delivery_token_used_at: now,
      feedback_rating: feedback_rating ?? null,
      feedback_text: feedback_text?.trim() || null,
      feedback_submitted_at: now,
    })
    .eq('delivery_token', token)
    .eq('status', 'delivered')
    .is('delivery_token_used_at', null)
    .select('id')
    .single();

  if (updateError || !updatedInquiry) {
    logError('confirm-delivery', updateError);
    return NextResponse.json({ error: 'Failed to confirm delivery. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
