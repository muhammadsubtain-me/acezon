import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import LoginGateClient from './LoginGateClient';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Already logged in — go straight to dashboard
  if (session) {
    redirect('/admin');
  }

  return <LoginGateClient />;
}
