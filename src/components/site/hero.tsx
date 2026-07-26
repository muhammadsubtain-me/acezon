import React from 'react';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-400/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(0,112,243,0.18) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary-hover text-xs font-bold tracking-wide shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available 24/7 — Get Help Now
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.07]">
              Expert Academic<br className="hidden sm:block" /> Assistance,{' '}
              <span className="text-primary">Delivered On Time.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Essays, assignments, and proofreading handled by qualified specialists.
              Submit your request in minutes and receive high-quality, plagiarism-free work
              before your deadline.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-6 h-12 shadow-sm hover:bg-primary-hover transition-all active:scale-[0.98] cursor-pointer"
              >
                Start Your Order
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-lvl3 bg-surface-lvl2 text-text-main text-sm font-semibold px-6 h-12 shadow-sm hover:bg-surface-lvl1 transition-colors cursor-pointer"
              >
                How it Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-text-muted">4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                <Clock className="w-4 h-4 text-primary" />
                Urgent 6h delivery
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Original
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border-lvl3">
              <img
                src="https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop"
                alt="Student studying with books and laptop"
                className="w-full h-[30rem] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-surface-lvl2 border border-border-lvl3 rounded-2xl shadow-xl p-4 w-56 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-text-main">2,400+</div>
                  <div className="text-[11px] text-text-muted">Orders delivered</div>
                </div>
              </div>
            </div>

            {/* Floating on-time card */}
            <div className="absolute -top-5 -right-5 bg-surface-lvl2 border border-border-lvl3 rounded-2xl shadow-xl p-4 w-48 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-text-main">99.2%</div>
                  <div className="text-[11px] text-text-muted">On-time delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
