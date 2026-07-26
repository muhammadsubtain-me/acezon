import React from 'react';
import { Shield, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';

interface Guarantee {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const guarantees: Guarantee[] = [
  {
    icon: CheckCircle2,
    title: 'Money-Back Guarantee',
    description:
      'If the work doesn\'t meet the requirements you submitted, we\'ll refund your money. No questions asked. Your satisfaction is guaranteed.',
  },
  {
    icon: RefreshCw,
    title: 'Unlimited Free Revisions',
    description:
      'Not happy with any aspect of the work? Request unlimited revisions until it\'s exactly what you need.',
  },
  {
    icon: Lock,
    title: 'Confidentiality Assured',
    description:
      'Your information is 100% private. We never share or sell your details. Your school will never know you used our services.',
  },
  {
    icon: Shield,
    title: 'Plagiarism-Free Promise',
    description:
      'Every assignment is written from scratch and checked with industry-leading plagiarism detection software before delivery.',
  },
];

export function Guarantees() {
  return (
    <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Commitment</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Iron-Clad Guarantees
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            We stand behind our work. These guarantees protect your investment and give you complete peace of mind.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((guarantee) => {
            const Icon = guarantee.icon;
            return (
              <div
                key={guarantee.title}
                className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main">{guarantee.title}</h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">{guarantee.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-base text-text-muted mb-6">
            Ready to take the first step? <strong className="text-text-main">Get a free quote in under 2 minutes.</strong>
          </p>
          <a
            href="#order"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-8 h-12 shadow-sm hover:bg-primary-hover transition-all active:scale-[0.98] cursor-pointer"
          >
            Start Your Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
