import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/shared/supabase/server';
import { logError } from '@/shared/logger/logger';
import { siteInfo } from '@/shared/config/site';

export async function POST(request: NextRequest) {
  let body: { inquiry_id?: string; admin_name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { inquiry_id, admin_name } = body;

  if (!inquiry_id || !admin_name) {
    return NextResponse.json({ error: 'inquiry_id and admin_name are required.' }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { data: inquiry, error: fetchError } = await supabase
    .from('inquiries')
    .select('id, status, contact, contact_type, phone, country_dial, delivery_token, claimed_by')
    .eq('id', inquiry_id)
    .single();

  if (fetchError || !inquiry) {
    return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 });
  }

  if (inquiry.status !== 'in_progress') {
    return NextResponse.json({ error: 'Only in_progress inquiries can be marked as delivered.' }, { status: 400 });
  }

  if (inquiry.claimed_by !== admin_name) {
    return NextResponse.json({ error: 'You can only deliver your own claimed inquiries.' }, { status: 403 });
  }

  const deliveryToken: string = inquiry.delivery_token || crypto.randomUUID();

  const { error: updateError } = await supabase
    .from('inquiries')
    .update({
      status: 'delivered',
      delivered_at: new Date().toISOString(),
      delivered_by: admin_name,
      delivery_token: deliveryToken,
    })
    .eq('id', inquiry_id);

  if (updateError) {
    logError('mark-delivered', updateError);
    return NextResponse.json({ error: 'Failed to update inquiry status.' }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteInfo.url;
  const feedbackUrl = `${siteUrl}/feedback?token=${deliveryToken}`;

  if (inquiry.contact_type === 'whatsapp' && inquiry.phone && inquiry.country_dial) {
    try {
      const whapiUrl = process.env.WHATSAPP_API_URL;
      if (whapiUrl) {
        const dialDigits = (inquiry.country_dial as string || '').replace(/\D/g, '');
        const phoneDigits = (inquiry.phone as string || '').replace(/\D/g, '').replace(/^0+/, '');
        const to = `${dialDigits}${phoneDigits}`;

        await fetch(`${whapiUrl}/send-delayed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to,
            message: `Hope you're happy with your order! We'd love your feedback:\n\n${feedbackUrl} 🎓`,
            delay: 120,
          }),
          signal: AbortSignal.timeout(5000),
        });
      }
    } catch (err) {
      logError('mark-delivered:whatsapp', err);
    }
  }

  return NextResponse.json({ success: true, feedback_url: feedbackUrl });
}
