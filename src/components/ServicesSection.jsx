import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/contentData';

export default function ServicesSection() {
  const homeServices = services.filter(
    (s) => s.id !== 'final-year-projects' && s.id !== 'lab-tasks-projects' && s.id !== 'programming-coding'
  );

  return (
    <section className="py-20 bg-[var(--color-section-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">What We Offer</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-heading)]">
            Our Popular Services
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-[560px] mx-auto text-[17px]">
            From essays to dissertations, coding to lab reports — ZenEdify covers every academic need with expert precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeServices.map((service) => (
            <div key={service.id} className="block">
              <Card className="p-6 h-full hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-2xl mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-[14px] leading-snug text-[var(--color-text-heading)] font-semibold">
                  {service.name}
                </CardTitle>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/services" className="inline-flex items-center gap-2">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
