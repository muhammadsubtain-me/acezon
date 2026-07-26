import React from 'react';
import { Users, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: '8,500+',
    label: 'Active Students',
    description: 'From universities worldwide trusting us for their academic needs',
  },
  {
    icon: CheckCircle2,
    value: '15,000+',
    label: 'Orders Completed',
    description: 'Successfully delivered assignments across all subjects and levels',
  },
  {
    icon: TrendingUp,
    value: '99.2%',
    label: 'On-Time Delivery',
    description: 'Your deadline is our priority — we rarely miss one',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'Average Rating',
    description: 'Based on verified reviews from satisfied students worldwide',
  },
];

export function ResultsShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Impact</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Trusted by Thousands of Students
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            Our track record speaks for itself. Here&apos;s what we&apos;ve accomplished together with our students.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-8 text-center hover:border-border-lvl3 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary mx-auto">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="mt-6">
                  <div className="text-4xl font-extrabold text-primary">{stat.value}</div>
                  <div className="mt-2 text-lg font-bold text-text-main">{stat.label}</div>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/10 p-10 text-center">
          <p className="text-base text-text-main mb-6">
            <strong>Why students choose Acezon:</strong>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Expert Writers',
              'Original Work',
              'Secure Payment',
              '24/7 Support',
              'Free Revisions',
              'Confidential',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 justify-center">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-text-main">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
