import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import PageHero from '@/components/layout/PageHero';
import { aboutStory, aboutValues, founders } from '@/lib/data';

export const metadata = {
  title: 'About Acezon | Verified Tutors & Academic Advisers',
  description:
    "Meet Acezon's expert academic tutoring team. Discover our mission, student-first values, and quality assurance workflows across major technical disciplines.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="About Acezon" subtitle="Your trusted academic partner, built on expertise and integrity." />

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
          <div>
            <Badge className="mb-5">Our Story</Badge>
            <h2 className="font-display text-3xl font-bold mb-5 text-[var(--color-text-heading)]">Who We Are</h2>
            {aboutStory.map((p) => (
              <p key={p} className="text-[var(--color-text-muted)] leading-[1.7] mb-4">{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 xl:gap-5">
            {aboutValues.map((item) => (
              <Card key={item.title} className="p-5">
                <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center mb-3 text-xl">
                  {item.icon}
                </div>
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-section-alt)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px] text-center">
          <Badge className="mb-5">Our Founders</Badge>
          <h2 className="font-display text-3xl font-bold mb-3 text-[var(--color-text-heading)]">Meet the Team Behind Acezon</h2>
          <p className="text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto leading-[1.7]">
            Our founding team brings together verified expertise from one of Pakistan's most prestigious institutions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {founders.map((member) => (
                <Card key={member.degree} className="p-8 flex flex-col items-center text-center gap-4 hover:border-[var(--color-border-hover)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center text-3xl">
                    {member.icon}
                  </div>

                  <div className="font-bold text-lg text-[var(--color-text-heading)] leading-snug">{member.degree}</div>

                  <div className="w-full h-px bg-[var(--color-border)]" />

                  <div className="flex flex-col gap-1.5 text-sm text-[var(--color-text-muted)]">
                    <div><span className="text-[var(--color-text)]">{member.specialization}</span></div>
                    <div>{member.experience}</div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {member.tags.map(tag => (
                      <span key={tag} className="text-[11px] bg-[var(--color-surface-3)] border border-[var(--color-border)] px-2.5 py-1 rounded-lg text-[var(--color-text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
