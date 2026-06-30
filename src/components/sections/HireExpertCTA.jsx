import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { hireExpertBenefits, hireExpertCopy } from '@/lib/data';

export default function HireExpertCTA() {
  return (
    <section className="py-20 bg-[var(--color-surface)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 3xl:gap-20 items-center">
          <div>
            <Badge className="mb-5">Get Started Today</Badge>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl font-bold mb-5 leading-tight text-[var(--color-text-heading)]">
              Hire an Expert Right Now
            </h2>
            {hireExpertCopy.map((para, i) => (
              <p key={i} className="text-[var(--color-text-muted)] leading-[1.7] mb-5 last:mb-8">{para}</p>
            ))}
            <Button asChild>
              <Link href="/order" className="inline-flex items-center gap-2">
                Hire Expert Now <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 xl:gap-5">
            {hireExpertBenefits.map((item) => (
              <Card key={item.title} className="p-5 bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-3)]">
                <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center mb-3 text-xl">
                  {item.icon}
                </div>
                <CardTitle className="text-[13px] mb-1.5">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
