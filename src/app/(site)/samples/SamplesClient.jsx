'use client';

import PageHero from '@/components/layout/PageHero';
import { pdfSamples, sampleSections } from '@/lib/data';
import { ExternalLink } from 'lucide-react';

function SampleCard({ item, className = '' }) {
  return (
    <a
      href={item.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View PDF: ${item.title}`}
      className={`group cursor-pointer bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 ${className}`}
    >
      <div className="relative aspect-[1/1.25] bg-white overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <ExternalLink className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-white tracking-wider uppercase mt-1">View PDF</span>
        </div>
      </div>
    </a>
  );
}

export default function SamplesClient() {
  return (
    <div className="min-h-screen pb-24 bg-[var(--color-bg)]">
      <PageHero
        title="Work Samples"
        subtitle="Explore our verified portfolio of solved assignments, structured lecture notes, and professional engineering reports."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px]">
          <div className="space-y-14">
            {sampleSections.map((sec) => {
              const list = pdfSamples[sec.key] || [];
              return (
                <div key={sec.key}>
                  <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{sec.icon}</span>
                      <h2 className="text-lg font-bold text-[var(--color-text-heading)] tracking-wide">{sec.title}</h2>
                    </div>
                    <p className="text-xs md:text-[13px] lg:text-sm xl:text-base text-[var(--color-text-muted)] leading-relaxed">{sec.subtitle}</p>
                  </div>

                  {/* Mobile — horizontal scroll */}
                  <div className="relative md:hidden">
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
                    <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent]">
                      {list.map((item) => (
                        <SampleCard key={item.pdfUrl} item={item} className="flex-none w-36" />
                      ))}
                    </div>
                  </div>

                  {/* Desktop — auto-fit grid */}
                  <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(140px,200px))] justify-center gap-4 xl:gap-5">
                    {list.map((item) => (
                      <SampleCard key={item.pdfUrl} item={item} className="w-full" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
