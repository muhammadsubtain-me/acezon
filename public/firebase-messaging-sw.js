importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC09EqgqEC_y1wQdZXqaPv3a9eGVIUfYII",
  authDomain: "acezon.firebaseapp.com",
  projectId: "acezon",
  storageBucket: "acezon.firebasestorage.app",
  messagingSenderId: "271626695276",
  appId: "1:271626695276:web:f1b143f66553b006d5de49",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if (client.url.includes('/admin') && client.visibilityState === 'visible') {
        return;
      }
    }
    const { title, body, icon } = payload.notification || {};
    self.registration.showNotification(title || 'Acezon — New Order!', {
      body: body || 'A new order has been placed.',
      icon: icon || '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'new-order',
      renotify: true,
      data: { url: '/admin' },
    });
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/admin';
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