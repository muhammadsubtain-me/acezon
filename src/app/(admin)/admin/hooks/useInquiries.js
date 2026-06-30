'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { mergeRealtimeInquiry } from '../lib/inquiries';

// Owns the inquiries list: initial fetch, realtime subscription, polling
// fallback, focus refresh, and the claim/release/status/notes mutations.
export function useInquiries(userName) {
  const [inquiries,   setInquiries]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [fetchError,  setFetchError]  = useState('');
  const [actionError, setActionError] = useState('');

  const fetchInquiries = useCallback(async ({ showLoading = false } = {}) => {
    if (showLoading) setLoading(true);
    setFetchError('');
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      setInquiries(data ?? []);
    } catch (err) {
      console.error('fetchInquiries:', err);
      setFetchError('Failed to load inquiries. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries({ showLoading: true });

    // Redirect all tabs to login on sign-out
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/admin/login';
      }
    });

    const channel = supabase
      .channel('inquiries-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, (payload) => {
        setFetchError('');
        setInquiries(current => mergeRealtimeInquiry(current, payload));
      })
      .subscribe((status, error) => {
        if (error) console.error('inquiries realtime subscription:', error);
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') fetchInquiries();
      });

    const refreshOnFocus = () => {
      if (document.visibilityState === 'visible') fetchInquiries();
    };
    document.addEventListener('visibilitychange', refreshOnFocus);

    const syncInterval = window.setInterval(() => fetchInquiries(), 10000);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', refreshOnFocus);
      window.clearInterval(syncInterval);
      supabase.removeChannel(channel);
    };
  }, [fetchInquiries]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('signOut error:', err);
      window.location.href = '/admin/login';
    }
  }, []);

  const handleClaim = useCallback(async (id) => {
    setActionError('');
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status: 'claimed', claimed_by: userName, claimed_at: new Date().toISOString() })
        .eq('id', id)
        .eq('status', 'new')
        .is('claimed_by', null)
        .select();
      if (error) throw error;
      if (!data?.length) setActionError('This inquiry was already claimed by another admin.');
      fetchInquiries();
    } catch (err) {
      console.error('handleClaim:', err);
      setActionError('Failed to claim inquiry. Please try again.');
    }
  }, [userName, fetchInquiries]);

  const handleRelease = useCallback(async (id) => {
    setActionError('');
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: 'new', claimed_by: null, claimed_at: null, completed_at: null })
        .eq('id', id)
        .eq('claimed_by', userName);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleRelease:', err);
      setActionError('Failed to release inquiry. Please try again.');
    }
  }, [userName, fetchInquiries]);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    setActionError('');
    try {
      const updates = { status: newStatus };
      if (newStatus === 'completed') updates.completed_at = new Date().toISOString();
      if (newStatus !== 'completed') updates.completed_at = null;
      const { error } = await supabase
        .from('inquiries')
        .update(updates)
        .eq('id', id)
        .eq('claimed_by', userName);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleStatusChange:', err);
      setActionError('Failed to update inquiry status. Please try again.');
    }
  }, [userName, fetchInquiries]);

  // Save internal notes (separate from status transitions)
  const handleSaveNotes = useCallback(async (id, notes) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ notes })
        .eq('id', id)
        .eq('claimed_by', userName);
      if (error) throw error;
      fetchInquiries();
    } catch (err) {
      console.error('handleSaveNotes:', err);
      setActionError('Failed to save notes. Please try again.');
    }
  }, [userName, fetchInquiries]);

  return {
    inquiries,
    loading,
    fetchError,
    actionError,
    setActionError,
    fetchInquiries,
    handleLogout,
    handleClaim,
    handleRelease,
    handleStatusChange,
    handleSaveNotes,
  };
}
