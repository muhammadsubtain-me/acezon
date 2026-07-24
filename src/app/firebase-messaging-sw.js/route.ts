import { buildFirebaseMessagingSwScript } from '@/features/notifications';
import { siteInfo } from '@/shared/config/site';

// Serves /firebase-messaging-sw.js with Firebase config from env (not hardcoded).
export async function GET() {
  const script = buildFirebaseMessagingSwScript({
    apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    adminUrl:          `${siteInfo.url}/admin`,
  });

  return new Response(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Service-Worker-Allowed': '/',
    },
  });
}
