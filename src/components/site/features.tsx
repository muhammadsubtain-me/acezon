import type { ComponentType } from 'react';
import {
  Clock, GraduationCap, ShieldCheck, Timer, RefreshCw, Lock,
} from 'lucide-react';
import { features } from '@/config/site-content';

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Clock, GraduationCap, ShieldCheck, Timer, RefreshCw, Lock,
};

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Why Choose Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Built for Student Success
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            We combine expert talent with a dependable process so you can focus on learning
            while we handle the heavy lifting.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = ICONS[feature.icon] || ShieldCheck;
            return (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-6 shadow-sm hover:border-border-lvl3 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-main">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
