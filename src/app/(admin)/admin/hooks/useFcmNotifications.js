'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { getFirebaseMessaging, getToken, onMessage } from '@/lib/firebase';

// Registers the Firebase service worker, requests notification permission,
// and persists the resulting FCM token to Supabase so the notify-new-order
// edge function can push to this device.
export function useFcmNotifications(initialEmail) {
  useEffect(() => {
    const setupFCM = async () => {
      try {
        // Register the Firebase service worker
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        const messaging = getFirebaseMessaging();
        if (!messaging) return;

        // Request notification permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('[FCM] Notification permission denied');
          return;
        }

        // Get FCM token — VAPID key loaded from env var (NEXT_PUBLIC_FCM_VAPID_KEY)
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (token) {
          // Save token to Supabase — upsert so it updates if token refreshes
          await supabase.from('fcm_tokens').upsert(
            { user_email: initialEmail, token, updated_at: new Date().toISOString() },
            { onConflict: 'user_email' }
          );
          console.log('[FCM] Token saved');
        }

        // Handle foreground messages (tab is open and active)
        onMessage(messaging, (payload) => {
          console.log('[FCM] Foreground message:', payload);
          // We already handle new orders via Supabase realtime,
          // so foreground messages are intentionally ignored here
          // to avoid duplicate notifications.
        });

      } catch (err) {
        console.error('[FCM] Setup error:', err);
      }
    };

    setupFCM();
  }, [initialEmail]);
}
