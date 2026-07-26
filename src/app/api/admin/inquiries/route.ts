import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/shared/supabase/server';
import { logError } from '@/shared/logger/logger';
import type { AdminInquiryRecord, AdminInquiryStats } from '@/features/orders/services/admin-orders';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status');
  const searchQuery = searchParams.get('q')?.trim().toLowerCase();

  try {
    const { data: allInquiries, error: fetchError } = await supabase
      .from('inquiries')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (fetchError) {
      logError('admin:get-inquiries', fetchError);
      return NextResponse.json({ error: 'Failed to fetch inquiries.' }, { status: 500 });
    }

    const records = (allInquiries || []) as AdminInquiryRecord[];

    const currentAdminName = user.email ? user.email.split('@')[0].toLowerCase() : 'admin';
    const currentUserEmail = user.email ? user.email.toLowerCase() : '';

    let totalRatings = 0;
    let sumRatings = 0;

    const stats: AdminInquiryStats = {
      total: records.length,
      newCount: 0,
      claimedCount: 0,
      inProgressCount: 0,
      deliveredCount: 0,
      completedCount: 0,
      avgRating: 5.0,
      myWorkCount: 0,
      teamCount: 0,
    };

    let myWorkCount = 0;
    let teamCount = 0;

    records.forEach((item) => {
      if (item.status === 'new') stats.newCount++;
      if (item.status === 'claimed') stats.claimedCount++;
      if (item.status === 'in_progress') stats.inProgressCount++;
      if (item.status === 'delivered') stats.deliveredCount++;
      if (item.status === 'completed') stats.completedCount++;

      if (item.status !== 'new') {
        teamCount++;
      }

      const isClaimedOrActive = item.status === 'claimed' || item.status === 'in_progress';
      if (isClaimedOrActive) {
        const itemClaimedBy = (item.claimed_by || '').toLowerCase();
        if (itemClaimedBy && (itemClaimedBy === currentAdminName || itemClaimedBy === currentUserEmail)) {
          myWorkCount++;
        }
      }

      if (item.feedback_rating && item.feedback_rating >= 1 && item.feedback_rating <= 5) {
        totalRatings++;
        sumRatings += item.feedback_rating;
      }
    });

    stats.myWorkCount = myWorkCount;
    stats.teamCount = teamCount;

    if (totalRatings > 0) {
      stats.avgRating = parseFloat((sumRatings / totalRatings).toFixed(1));
    }

    // Apply Filter & Search
    let filtered = records;

    if (statusFilter && statusFilter !== 'all') {
      if (statusFilter === 'my_work') {
        filtered = filtered.filter((item) => {
          const isClaimedOrActive = item.status === 'claimed' || item.status === 'in_progress';
          const itemClaimedBy = (item.claimed_by || '').toLowerCase();
          return isClaimedOrActive && (itemClaimedBy === currentAdminName || itemClaimedBy === currentUserEmail);
        });
      } else if (statusFilter === 'team') {
        filtered = filtered.filter((item) => item.status !== 'new');
      } else {
        filtered = filtered.filter((item) => item.status === statusFilter);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter((item) => {
        const idMatch = item.id.toLowerCase().includes(searchQuery);
        const contactMatch = item.contact?.toLowerCase().includes(searchQuery);
        const phoneMatch = item.phone?.toLowerCase().includes(searchQuery);
        const serviceMatch = item.service_id?.toLowerCase().includes(searchQuery);
        const customMatch = item.custom_service?.toLowerCase().includes(searchQuery);
        const descMatch = item.description?.toLowerCase().includes(searchQuery);
        const claimedByMatch = item.claimed_by?.toLowerCase().includes(searchQuery);
        return idMatch || contactMatch || phoneMatch || serviceMatch || customMatch || descMatch || claimedByMatch;
      });
    }

    return NextResponse.json({ inquiries: filtered, stats });
  } catch (err) {
    logError('admin:get-inquiries-exception', err);
    return NextResponse.json({ error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}
