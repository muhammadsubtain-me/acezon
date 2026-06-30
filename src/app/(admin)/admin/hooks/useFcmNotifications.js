'use client';

import { useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  getFirebaseMessaging,
  getToken,
  onMessage,
  isMessagingSupported,
} from '@/lib/firebase';
import { logError } from '@/lib/logger';
import { requestNotificationPermission } from '../lib/fcm';

const VAPID_KEY = process.env.NEXT_PUBLIC_FCM_VAPID_KEY;

// Manages the FCM lifecycle for the admin dashboard: service-worker registration,
// token persistence, and notification permission tied to browser state.
export function useFcmNotifications(userEmail) {
  const registerToken = useCallback(async () => {
    const supported = await isMessagingSupported();
    const messaging = supported ? getFirebaseMessaging() : null;
    if (!messaging) return;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (!token) return;

    await supabase.from('fcm_tokens').upsert(
      { user_email: userEmail, token, updated_at: new Date().toISOString() },
      { onConflict: 'user_email' }
    );

    onMessage(messaging, () => {});
  }, [userEmail]);

  useEffect(() => {
    if (typeof window === 'undefined' || !userEmail) return;
    if (!('Notification' in window)) return;

    const run = async () => {
      if (Notification.permission === 'granted') {
        registerToken().catch((err) => logError('fcm:register', err));
        return;
      }

      // Fallback when landing on /admin already signed in (skipped login form).
      if (Notification.permission === 'default') {
        const result = await requestNotificationPermission();
        if (result === 'granted') {
          registerToken().catch((err) => logError('fcm:register', err));
        }
      }
    };

    run().catch((err) => logError('fcm:setup', err));
  }, [userEmail, registerToken]);
}
