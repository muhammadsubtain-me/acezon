import type { ComponentType } from 'react';
import {
  PenTool, ClipboardList, SpellCheck, Sparkles,
} from 'lucide-react';
import { services } from '@/config/site-content';

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  PenTool, ClipboardList, SpellCheck, Sparkles,
};

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">What We Offer</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Academic Services for Every Need
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            From a single essay to a full dissertation, our specialists cover the full range
            of academic writing and editing.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = ICONS[service.icon] || PenTool;
            return (
              <div
                key={service.id}
                className="group rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-text-main">{service.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">{service.description}</p>
                <a
                  href="#order"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  Get started
                  <span aria-hidden>→</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
