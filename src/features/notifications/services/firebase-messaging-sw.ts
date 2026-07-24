interface SwScriptConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  adminUrl?: string;
}

function json(value: string | undefined): string {
  return JSON.stringify(value ?? '');
}

export function buildFirebaseMessagingSwScript({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  adminUrl = '/admin',
}: SwScriptConfig): string {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };

  return `importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp(${JSON.stringify(firebaseConfig)});

const messaging = firebase.messaging();
const ADMIN_URL = ${json(adminUrl)};

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || 'Acezon — New Order!';
  const body  = payload.data?.body  || 'A new order has been placed.';
  const url   = payload.data?.url   || ADMIN_URL;

  return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if (client.url.includes('/admin') && client.visibilityState === 'visible') {
        return;
      }
    }

    return self.registration.showNotification(title, {
      body,
      tag: 'new-order',
      renotify: true,
      data: { url },
    });
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || ADMIN_URL;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/admin') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
`;
}
