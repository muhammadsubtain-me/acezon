import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/shared/supabase/server';
import { logError } from '@/shared/logger/logger';

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  let body: {
    action?: 'claim' | 'update_status' | 'update_notes';
    inquiry_id?: string;
    status?: string;
    notes?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { action, inquiry_id, status, notes } = body;

  if (!inquiry_id || !action) {
    return NextResponse.json({ error: 'inquiry_id and action are required.' }, { status: 400 });
  }

  const adminDisplayName = user.email ? user.email.split('@')[0] : 'Admin';

  try {
    if (action === 'claim') {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('inquiries')
        .update({
          status: 'claimed',
          claimed_by: adminDisplayName,
          claimed_at: now,
        })
        .eq('id', inquiry_id)
        .select()
        .single();

      if (error) {
        logError('admin:action-claim', error);
        return NextResponse.json({ error: 'Failed to claim inquiry.' }, { status: 500 });
      }

      return NextResponse.json({ success: true, inquiry: data });
    }

    if (action === 'update_status') {
      if (!status) {
        return NextResponse.json({ error: 'status is required for update_status action.' }, { status: 400 });
      }

      const validStatuses = ['new', 'claimed', 'in_progress', 'delivered', 'completed', 'rejected'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
      }

      const updateData: Record<string, unknown> = { status };
      if (status === 'in_progress' && !body.status) {
        updateData.claimed_by = adminDisplayName;
        updateData.claimed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('inquiries')
        .update(updateData)
        .eq('id', inquiry_id)
        .select()
        .single();

      if (error) {
        logError('admin:action-update-status', error);
        return NextResponse.json({ error: 'Failed to update inquiry status.' }, { status: 500 });
      }

      return NextResponse.json({ success: true, inquiry: data });
    }

    if (action === 'update_notes') {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ notes: notes || '' })
        .eq('id', inquiry_id)
        .select()
        .single();

      if (error) {
        logError('admin:action-update-notes', error);
        return NextResponse.json({ error: 'Failed to update notes.' }, { status: 500 });
      }

      return NextResponse.json({ success: true, inquiry: data });
    }

    return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
  } catch (err) {
    logError('admin:action-exception', err);
    return NextResponse.json({ error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}
