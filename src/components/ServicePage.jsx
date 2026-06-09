import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';

export default function ServicePage({ title, icon, description, topics, benefits }) {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-[var(--color-surface)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[80px] mb-6">{icon}</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5 text-[var(--color-text-heading)]">{title}</h1>
          <p className="text-[var(--color-text-muted)] text-[17px] max-w-[560px] mx-auto mb-8">{description}</p>
          <Button size="lg" asChild>
            <Link to="/contact" className="inline-flex items-center gap-2">Get Expert Help</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 text-[var(--color-text-heading)]">Topics We Cover</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <Card key={topic} className="p-4 text-center hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <span className="text-[13px] font-medium text-[var(--color-text)]">{topic}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-section-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10 text-[var(--color-text-heading)]">Why Choose ZenEdify for {title}?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="p-6 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="text-[32px] mb-4">{b.icon}</div>
                <CardTitle className="mb-2">{b.title}</CardTitle>
                <CardDescription className="text-[13px]">{b.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-heading)]">Ready to Get Started?</h2>
          <p className="text-[var(--color-text-muted)] mb-8">Connect with our {title} experts today and get the academic help you deserve.</p>
          <Button size="lg" asChild>
            <Link to="/contact" className="inline-flex items-center gap-2">
              Hire an Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
