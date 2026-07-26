import React from 'react';
import { Check, Clock, FileText, Sparkles, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingTier {
  name: string;
  description: string;
  deadline: string;
  priceNote: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Flexible Deadline',
    description: 'For assignments with ample time',
    deadline: '14+ days',
    priceNote: 'Starting from $15 per page',
    icon: Calendar,
    features: [
      'Expert writer assignment',
      'Free unlimited revisions',
      'Plagiarism check included',
      'Proper citation formatting',
      'Email communication',
    ],
  },
  {
    name: 'Standard',
    description: 'Our most popular choice',
    deadline: '7-13 days',
    priceNote: 'Starting from $18 per page',
    icon: FileText,
    features: [
      'Priority expert assignment',
      'Free unlimited revisions',
      'Plagiarism check included',
      'Proper citation formatting',
      'WhatsApp + Email support',
    ],
    highlighted: true,
  },
  {
    name: 'Urgent',
    description: 'Need it fast?',
    deadline: '1-6 days',
    priceNote: 'Starting from $25 per page',
    icon: Clock,
    features: [
      'Urgent priority assignment',
      'Free unlimited revisions',
      'Plagiarism check included',
      'Proper citation formatting',
      'Premium support 24/7',
    ],
  },
  {
    name: 'Premium Rush',
    description: 'For last-minute emergencies',
    deadline: 'Same day (6h+)',
    priceNote: 'Starting from $35 per page',
    icon: Sparkles,
    features: [
      'Maximum priority assignment',
      'Free unlimited revisions',
      'Plagiarism check included',
      'Proper citation formatting',
      'Dedicated support line',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Transparent Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Clear, Competitive Pricing for Every Timeline
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            No hidden fees. No surprises. Choose a deadline that fits your needs and get a free quote instantly.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={cn(
                  'rounded-2xl border transition-all duration-300 flex flex-col',
                  tier.highlighted
                    ? 'lg:scale-105 bg-primary/5 border-primary/30 shadow-lg'
                    : 'bg-surface-lvl2 border-border-lvl2 shadow-sm hover:shadow-md hover:-translate-y-1',
                )}
              >
                {/* Header */}
                <div className="p-6 border-b border-border-lvl2">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main">{tier.name}</h3>
                      <p className="text-xs text-text-muted mt-1">{tier.description}</p>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-6 border-b border-border-lvl2 bg-primary/10 rounded-t-none">
                  <div className="text-center">
                    <div className="text-xs uppercase tracking-wider text-primary font-bold mb-2">
                      {tier.deadline}
                    </div>
                    <div className="text-sm text-text-muted font-medium">
                      {tier.priceNote}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <a
                    href="#order"
                    className={cn(
                      'w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all text-center block',
                      tier.highlighted
                        ? 'bg-primary text-white hover:bg-primary-hover shadow-sm'
                        : 'bg-surface-lvl1 text-text-main border border-border-lvl2 hover:bg-surface-lvl2',
                    )}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted">
            <strong className="text-text-main">💡 Tip:</strong> Prices are per-page estimates. Submit your order for an exact quote based on your specific requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
