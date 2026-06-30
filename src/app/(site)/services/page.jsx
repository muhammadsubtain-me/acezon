import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import PageHero from '@/components/layout/PageHero';
import { domains, services } from '@/lib/data';

export const metadata = {
  title: 'Academic Tutoring & Technical Writing Services',
  description:
    "Explore Acezon's custom academic solutions, including homework writing, subject tutoring, programming help, lab tasks, semester projects, and thesis writing.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Services"
        subtitle={
          <div className="flex flex-col items-center gap-4">
            <p className="text-[var(--color-text-muted)] text-[17px] font-medium">
              Expert academic help, delivered on time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--color-text-muted)]">
              {domains.map((domain, i) => (
                <span key={domain.id} className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full flex items-center gap-1.5 shadow-sm">
                    {domain.icon} {domain.shortName}
                  </span>
                  {i < domains.length - 1 && (
                    <span className="text-white/20 select-none hidden md:inline">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4 md:gap-5 xl:gap-6 3xl:gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="p-6 h-full hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300 shadow-sm border border-white/[0.06] bg-white/[0.01]"
              >
                <div className="w-12 h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center text-2xl mb-5">
                  {service.icon}
                </div>
                <CardTitle className="text-base mb-3 leading-snug text-[var(--color-text-heading)]">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {service.desc}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
