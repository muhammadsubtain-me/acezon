'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { requestNotificationPermission } from '../lib/fcm';
import { Loader2, Eye, EyeOff } from 'lucide-react';

/* ─── Inline Acezon Logo ─────────────────────────────────────────────────── */
function AcezonLogo({ size = 48 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 48 48">
      <defs>
        <filter id="lgl-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="9" fill="#FFFFFF" filter="url(#lgl-shadow)" />
      <g transform="translate(-2,-2.78) scale(0.52)">
        <path
          d="M 21,77 C 17,83 24,85 27.5,79.5 C 35,69 42,49 50,49 C 58,49 65,69 72.5,79.5 C 76,85 83,83 79,77 C 72,61 63,20 50,20 C 37,20 28,61 21,77 Z"
          fill="#000000"
        />
      </g>
    </svg>
  );
}

/* ─── Wave SVG (bottom decoration like the reference) ───────────────────── */
function WaveDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden rounded-b-3xl">
      <svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
        <path
          d="M0,40 C60,70 120,20 180,45 C240,70 300,25 360,50 C380,57 395,52 400,50 L400,80 L0,80 Z"
          fill="rgba(255,255,255,0.03)"
        />
        <path
          d="M0,55 C80,30 160,70 240,50 C300,35 360,65 400,55 L400,80 L0,80 Z"
          fill="rgba(255,255,255,0.04)"
        />
      </svg>
    </div>
  );
}

/* ─── Main login component ───────────────────────────────────────────────── */
export default function LoginGateClient() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Invalid email or password. Please try again.');
      return;
    }
    // Show the browser notification dialog when permission is still "default"
    // (re-shown after revoke/reset). Skipped when already granted or denied.
    await requestNotificationPermission();
    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4 py-8">
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      {/* Subtle top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-[var(--shadow-lg)]">

        {/* Inner top padding + content */}
        <div className="flex flex-col items-center px-8 pt-10 pb-10">

          {/* Logo + title */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <AcezonLogo size={52} />
            <div className="text-center">
              <div className="text-white font-bold text-xl tracking-[-0.02em] leading-none">ADMIN PANEL</div>
              <div className="text-[var(--color-text-muted)] text-[12px] mt-1">Control panel login</div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full flex flex-col gap-3">

            {/* Email field */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                type="email"
                required
                placeholder="admin"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="admin-login-input w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ WebkitAppearance: 'none' }}
                className="admin-login-input w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl pl-10 pr-11 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)] transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 text-center bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-1 py-3 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </div>

          {/* Footer note */}
          <p className="mt-5 text-[11px] text-[var(--color-text-faint)] text-center">
            Only Acezon team members can access this panel.
          </p>
        </div>

        {/* Wave decoration at bottom */}
        <WaveDecoration />
      </div>
    </div>
  );
}