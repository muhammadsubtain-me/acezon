import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/config/site-content';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Student Reviews</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Trusted by Students Worldwide
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            Real feedback from students who achieved their target grades with our help.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-6 shadow-sm flex flex-col"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/15" />

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-sm text-text-muted leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border-lvl2">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-border-lvl3"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold text-text-main">{t.name}</div>
                  <div className="text-xs text-text-muted">
                    {t.role} · {t.university}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
