'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px]">
        <div className="text-center mb-14">
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl font-bold text-[var(--color-text-heading)]">
            What Students Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 md:p-8 lg:p-10 xl:p-12 3xl:p-14 mb-8">
            <div className="text-[56px] text-[var(--color-border-hover)] font-extrabold leading-none mb-4">"</div>
            <p className="text-[var(--color-text)] text-[17px] leading-[1.75] mb-6">
              {testimonials[active].text}
            </p>
            <div className="flex flex-col sm:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{testimonials[active].avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-[var(--color-text-heading)]">{testimonials[active].name}</div>
                  <div className="text-[13px] text-[var(--color-text-muted)]">{testimonials[active].role}</div>
                </div>
              </div>
              <div className="sm:ml-auto md:ml-auto flex gap-0.5">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[var(--color-star)]" />
                ))}
              </div>
            </div>
          </Card>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`border-none cursor-pointer transition-all duration-300 h-3 ${
                  i === active
                    ? 'w-8 bg-[var(--color-accent)]'
                    : 'w-3 bg-[var(--color-border-hover)]'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail avatars */}
          <div className="flex justify-center gap-4 mt-6">
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-none cursor-pointer transition-all duration-200 ${
                  i === active
                    ? 'bg-[var(--color-surface-3)] outline outline-2 outline-[var(--color-accent)] outline-offset-2 scale-110 opacity-100'
                    : 'bg-[var(--color-surface)] scale-100 opacity-50'
                }`}
              >
                {t.avatar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
