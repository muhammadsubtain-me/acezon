import React from 'react';
import { OrderForm } from '@/components/site/order-form';

export function OrderSection() {
  return (
    <section id="order" className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left copy */}
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Get Started</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
              Submit Your Request
            </h2>
            <p className="mt-4 text-base text-text-muted leading-relaxed">
              Tell us what you need and when you need it. There is no payment required to get a quote —
              our team will review your request and confirm the details with you before any work begins.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'No upfront payment to get a quote',
                'Response within minutes, 24/7',
                'Free revisions until you are satisfied',
                'Your information stays confidential',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-text-main font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-surface-lvl2 border border-border-lvl2">
              <p className="text-xs text-text-muted leading-relaxed">
                <strong className="text-text-main">Prefer to talk first?</strong> Reach us directly on
                WhatsApp or email — we are happy to discuss your requirements before you submit.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
