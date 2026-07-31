'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/shared/supabase/browser';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid login credentials. Please check and try again.');
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setErrorMsg('An unexpected connection error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-surface-lvl0 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header & Badge */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light border border-primary-light text-primary-hover text-xs font-bold tracking-wide uppercase shadow-2xs">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Acezon Management System</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-text-main">
            Admin Authentication
          </h1>
          <p className="text-sm text-text-muted max-w-xs">
            Sign in with your administrator credentials to access the order queue and management dashboard.
          </p>
        </div>

        {/* shadcn Card Container */}
        <Card className="border-border-lvl2 bg-surface-lvl2 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-text-main">Sign in to your account</CardTitle>
            <CardDescription className="text-text-muted">
              Enter your admin email and security password below.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {/* Error Alert Notification */}
              {errorMsg && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <div>
                    <AlertTitle>Authentication Failed</AlertTitle>
                    <AlertDescription>{errorMsg}</AlertDescription>
                  </div>
                </Alert>
              )}

              {/* Email Address Input */}
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@acezon.app"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-2">
              <Button type="submit" className="w-full h-11" isLoading={loading}>
                Sign in to Dashboard
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400 space-y-1">
          <p>© 2026 Acezon. Secure Admin Control Panel.</p>
        </div>
      </div>
    </main>
  );
}
