import { useState } from 'react';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

const testimonials = [
  {
    name: 'Maha Al Sulaiti', role: 'Student', avatar: '👩‍🎓',
    text: 'When I was writing my dissertation, I used ZenEdify for the first time. I had run out of time and only needed to finish it. They helped my friend with her homework and essays, so she forwarded the information. Since then, we have collaborated quite a bit, and I cannot imagine not using their services.',
    rating: 5,
  },
  {
    name: 'Mahmoud Elgad', role: 'Student', avatar: '👨‍🎓',
    text: 'My friend recommended this website, and I am glad I tried it. I had three days to complete an essay assignment. I am grateful for the wonderful experience — the quality exceeded what I expected for such a tight deadline.',
    rating: 5,
  },
  {
    name: 'Alicia Patrick', role: 'Student', avatar: '👩‍💻',
    text: 'It was the end of the semester, and I needed help with my project. It is a coincidence that I stumbled upon this website. The quality of the project they delivered was beyond my expectations! Highly recommend them.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-heading)]">
            What Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-10 mb-8">
            <div className="text-[56px] text-[var(--color-border-hover)] font-extrabold leading-none mb-4">"</div>
            <p className="text-[var(--color-text)] text-[17px] leading-[1.75] mb-6">
              {testimonials[active].text}
            </p>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{testimonials[active].avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-[var(--color-text-heading)]">{testimonials[active].name}</div>
                <div className="text-[13px] text-[var(--color-text-muted)]">{testimonials[active].role}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
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
                className={`w-12 h-12 flex items-center justify-center text-xl border-none cursor-pointer transition-all duration-200 ${
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
