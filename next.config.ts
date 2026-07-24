/** @type {import('next').NextConfig} */

// ─── HTTP Security Headers ─────────────────────────────────────────────────────
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

// Supabase origins from env so CSP stays in sync when the project URL changes.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_WSS = SUPABASE_URL.replace(/^https:\/\//, 'wss://');

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  `connect-src 'self' ${SUPABASE_URL} ${SUPABASE_WSS} https://fcm.googleapis.com https://fcmregistrations.googleapis.com https://firebaseinstallations.googleapis.com https://firebase.googleapis.com https://www.googleapis.com https://*.ingest.sentry.io`.trim(),
  `img-src 'self' data: blob: https://flagcdn.com ${SUPABASE_URL}`.trim(),
  "media-src 'self'",
  "object-src 'none'",
  `frame-src 'self' blob: ${SUPABASE_URL}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
];

const cspHeader = {
  key: 'Content-Security-Policy',
  value: cspDirectives.join('; '),
};

const noIndexHeader = {
  key: 'X-Robots-Tag',
  value: 'noindex, nofollow',
};

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'acezon.app',
          },
        ],
        destination: 'https://www.acezon.app/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          ...(process.env.NODE_ENV === 'production' ? [cspHeader] : []),
        ],
      },
      {
        source: '/admin/:path*',
        headers: [noIndexHeader],
      },
      {
        source: '/api/:path*',
        headers: [noIndexHeader],
      },
      {
        source: '/feedback',
        headers: [noIndexHeader],
      },
      {
        source: '/firebase-messaging-sw.js',
        headers: [noIndexHeader],
      },

    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
};

export default nextConfig;
