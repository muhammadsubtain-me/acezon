import React from 'react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import {
  PenTool, ClipboardList, SpellCheck, Sparkles, ArrowRight, CheckCircle2
} from 'lucide-react';

interface ServiceDetail {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortDesc: string;
  fullDesc: string;
  includes: string[];
  bestFor: string[];
}

const services: ServiceDetail[] = [
  {
    icon: PenTool,
    title: 'Essay Writing',
    shortDesc: 'Well-researched, original essays from subject experts',
    fullDesc:
      'Our essay writing service delivers carefully researched, originally written essays that meet your exact requirements. Whether it\'s argumentative, descriptive, narrative, or analytical, our expert writers craft compelling essays with proper structure, citations, and analysis.',
    includes: [
      'Original research and writing',
      'Proper citation (APA, MLA, Chicago)',
      'Multiple revisions included',
      'Plagiarism check before delivery',
      'Expert-level analysis',
    ],
    bestFor: [
      'High school essays',
      'College/university assignments',
      'Scholarship essays',
      'Application essays',
      'Literary analysis',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Assignments & Homework',
    shortDesc: 'From case studies to lab reports — every assignment type covered',
    fullDesc:
      'Homework assignments and case studies require precision and subject-matter expertise. Our writers handle everything from case analysis to lab reports, ensuring accuracy, proper formatting, and adherence to your institution\'s standards.',
    includes: [
      'Case study solutions',
      'Lab reports and practical work',
      'Problem-solving assignments',
      'Data analysis and interpretation',
      'Subject-specific formatting',
    ],
    bestFor: [
      'STEM assignments',
      'Business case studies',
      'Lab reports',
      'Problem sets',
      'Project assignments',
    ],
  },
  {
    icon: SpellCheck,
    title: 'Proofreading & Editing',
    shortDesc: 'Polish your work to perfection with professional editing',
    fullDesc:
      'Your draft is almost there — let our professional editors refine it. We check for grammar, syntax, clarity, tone, and structure to ensure your work reads flawlessly while preserving your voice and argument.',
    includes: [
      'Grammar and syntax correction',
      'Style and tone optimization',
      'Structure and flow improvement',
      'Citation formatting',
      'Plagiarism check included',
    ],
    bestFor: [
      'Dissertations and theses',
      'Research papers',
      'Personal statements',
      'Application essays',
      'Any academic writing',
    ],
  },
  {
    icon: Sparkles,
    title: 'Custom Assistance',
    shortDesc: 'Dissertations, research proposals, presentations — anything you need',
    fullDesc:
      'Every student\'s needs are unique. Beyond our standard services, we handle dissertations, research proposals, presentations, capstone projects, and any other academic challenge you face.',
    includes: [
      'Dissertation chapters',
      'Research proposal writing',
      'Presentation design & content',
      'Literature reviews',
      'Thesis editing',
    ],
    bestFor: [
      'Graduate-level work',
      'Capstone projects',
      'Honors theses',
      'Research initiatives',
      'Complex academic work',
    ],
  },
];

export const metadata = {
  title: 'Our Services — Acezon Academic Assistance',
  description: 'Explore our full range of academic writing and editing services designed to help students succeed.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Expertise</span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.07]">
                Comprehensive Academic{' '}
                <span className="text-primary">Services</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                From essays to dissertations, we handle every type of academic writing and editing. Choose a service below to learn more.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-text-main">{service.title}</h2>
                        <p className="mt-1 text-sm text-text-muted">{service.shortDesc}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {service.fullDesc}
                    </p>

                    {/* Includes */}
                    <div className="mb-8 pb-8 border-b border-border-lvl2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3">
                        This Service Includes
                      </h3>
                      <ul className="space-y-2">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text-main mb-3">
                        Best For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.bestFor.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href="#order"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary-hover transition-colors"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
                Our Process Is Simple
              </h2>
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                Three straightforward steps from your request to your completed work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: 1,
                  title: 'Submit Your Request',
                  desc: 'Tell us what you need, when you need it, and any specific requirements. Attach files and get a free quote.',
                },
                {
                  num: 2,
                  title: 'Expert Assignment',
                  desc: 'Your order is assigned to a qualified writer in your field. You can communicate and track progress anytime.',
                },
                {
                  num: 3,
                  title: 'Receive & Review',
                  desc: 'Get your completed work by the deadline. Request revisions until you\'re 100% satisfied.',
                },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-10 sm:p-14 text-center shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Start Your Order Today
              </h2>
              <p className="mt-4 text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
                Choose your service and submit your order. Our team will review your requirements and get started right away.
              </p>
              <a
                href="#order"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white text-primary text-sm font-bold px-6 h-12 shadow-sm hover:bg-white/90 transition-all active:scale-[0.98] cursor-pointer"
              >
                Submit Order
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
