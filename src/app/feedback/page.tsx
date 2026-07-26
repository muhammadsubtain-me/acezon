'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Loader as Loader2, GraduationCap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { siteInfo } from '@/shared/config/site';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Phase = 'loading' | 'form' | 'submitting' | 'success' | 'invalid' | 'used' | 'error';

function FeedbackContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [phase, setPhase] = useState<Phase>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!token) {
      setPhase('invalid');
      setErrorMsg('This link is missing a valid token. Please use the link sent to you.');
      return;
    }
    setPhase('form');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'submitting') return;

    setPhase('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/confirm-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          feedback_rating: rating || undefined,
          feedback_text: feedback.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error || 'Something went wrong.';
        if (msg.toLowerCase().includes('already been used')) {
          setPhase('used');
        } else if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('expired')) {
          setPhase('invalid');
        } else if (msg.toLowerCase().includes('not in a deliverable')) {
          setPhase('invalid');
          setErrorMsg('This order has already been confirmed or is no longer awaiting confirmation.');
        } else {
          setPhase('error');
          setErrorMsg(msg);
        }
        return;
      }

      setPhase('success');
    } catch {
      setPhase('error');
      setErrorMsg('A connection error occurred. Please try again.');
    }
  };

  return (
    <main className="min-h-screen w-full bg-surface-lvl0 flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Brand header */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
          <GraduationCap className="w-5 h-5" />
        </div>
        <span className="font-extrabold text-text-main text-lg tracking-tight">{siteInfo.name}</span>
      </div>

      <div className="w-full max-w-md relative z-10">
        {phase === 'loading' && (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
            <p className="text-sm text-text-muted">Loading…</p>
          </div>
        )}

        {phase === 'success' && (
          <div className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="mt-5 text-xl font-extrabold text-text-main">Delivery Confirmed!</h1>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Thank you for confirming your order
              {rating > 0 && <> and for your {rating}-star rating</>}. Your feedback helps us
              keep improving. We hope to work with you again!
            </p>
            <a
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary text-white text-sm font-semibold px-5 h-10 shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Back to Home
            </a>
          </div>
        )}

        {(phase === 'invalid' || phase === 'used' || phase === 'error') && (
          <div className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-8 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="mt-5 text-xl font-extrabold text-text-main">
              {phase === 'used' ? 'Already Confirmed' : 'Link Not Valid'}
            </h1>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              {phase === 'used'
                ? 'This confirmation link has already been used. Your order is complete — no further action is needed.'
                : errorMsg || 'This confirmation link is invalid or has expired. Please contact us if you need help.'}
            </p>
            <a
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-border-lvl3 bg-surface-lvl2 text-text-main text-sm font-semibold px-5 h-10 shadow-sm hover:bg-surface-lvl1 transition-colors cursor-pointer"
            >
              Back to Home
            </a>
          </div>
        )}

        {phase === 'form' || phase === 'submitting' ? (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-7 border-b border-border-lvl2 bg-surface-lvl1">
              <h1 className="text-xl font-extrabold text-text-main">Confirm Your Delivery</h1>
              <p className="mt-1 text-sm text-text-muted">
                Your order is ready. Confirm delivery below and let us know how we did.
              </p>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              <div className="space-y-3">
                <Label>How was your experience?</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const active = (hoverRating || rating) >= n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHoverRating(n)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                        aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={cn(
                            'w-8 h-8 transition-colors',
                            active ? 'fill-amber-400 text-amber-400' : 'text-border-lvl4',
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
                {rating > 0 && (
                  <p className="text-xs text-text-muted">
                    {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Leave a review <span className="font-normal text-text-subtle">(optional)</span></Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience working with our team…"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                isLoading={phase === 'submitting'}
              >
                <Send className="w-4 h-4 mr-1" />
                Confirm Delivery
              </Button>

              <p className="text-center text-xs text-text-subtle">
                By confirming, your order is marked complete. This link can only be used once.
              </p>
            </div>
          </form>
        ) : null}
      </div>
    </main>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-surface-lvl0">
        <Loader2 className="w-7 h-7 text-primary animate-spin" />
      </main>
    }>
      <FeedbackContent />
    </Suspense>
  );
}
