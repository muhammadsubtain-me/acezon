import React from 'react';
import { Send, Cog, CircleCheck as CheckCircle2 } from 'lucide-react';
import { steps } from '@/config/site-content';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Send, Cog, CheckCircle2,
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple Process</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            How It Works
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            Three straightforward steps from submission to a completed, polished assignment.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border-lvl3 to-transparent" />

          {steps.map((step, idx) => {
            const Icon = ICONS[step.icon] || Send;
            return (
              <div key={step.title} className="relative text-center">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 rounded-2xl bg-surface-lvl2 border border-border-lvl3 shadow-sm flex items-center justify-center text-primary mx-auto">
                    <Icon className="w-9 h-9" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-text-main">{step.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#order"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-6 h-12 shadow-sm hover:bg-primary-hover transition-all active:scale-[0.98] cursor-pointer"
          >
            Submit Your Request
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
