import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no session, redirect to login page
  if (!session) {
    redirect('/admin/login');
  }

  // Session exists — render dashboard immediately with user email
  return <AdminDashboard initialEmail={session.user.email} />;
}
