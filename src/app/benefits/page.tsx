import React from 'react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import {
  Clock, GraduationCap, ShieldCheck, RefreshCw, Lock, Users, 
  Zap, Award, ArrowRight, CheckCircle2
} from 'lucide-react';

const benefits = [
  {
    icon: GraduationCap,
    title: 'Expert Writers in Your Field',
    description:
      'Every assignment is handled by a specialist with a degree in your subject. No generalists, no copy-paste work — just authentic expertise.',
  },
  {
    icon: Clock,
    title: 'Available 24/7',
    description:
      'Deadlines don\'t sleep. Neither do we. Get help anytime, day or night, from anywhere in the world.',
  },
  {
    icon: ShieldCheck,
    title: '100% Original & Plagiarism-Free',
    description:
      'Every paper is written from scratch and checked with Turnitin and other detection software before delivery.',
  },
  {
    icon: RefreshCw,
    title: 'Unlimited Free Revisions',
    description:
      'Not quite right? Request unlimited revisions until the work meets your exact requirements — no additional cost.',
  },
  {
    icon: Lock,
    title: 'Complete Confidentiality',
    description:
      'Your privacy is paramount. We never share your information with third parties, and we use secure encryption for all data.',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Turnaround',
    description:
      'Need it in 6 hours? We can do it. Standard orders are typically completed within 24-48 hours.',
  },
  {
    icon: Users,
    title: 'Direct Communication',
    description:
      'Chat directly with your assigned writer via WhatsApp or email. Ask questions, provide feedback, and stay in control.',
  },
  {
    icon: Award,
    title: 'Quality-First Guarantee',
    description:
      'If the work doesn\'t meet your requirements, we\'ll revise it for free. If you\'re still not satisfied, we refund your money.',
  },
];

const stats = [
  { label: 'Students Helped', value: '8,500+' },
  { label: 'Orders Completed', value: '15,000+' },
  { label: 'On-Time Rate', value: '99.2%' },
  { label: 'Average Rating', value: '4.9/5' },
];

export const metadata = {
  title: 'Why Choose Acezon? — Academic Assistance Benefits',
  description: 'Discover why thousands of students trust Acezon for expert academic assistance with guaranteed original work.',
};

export default function BenefitsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Why Acezon</span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.07]">
                The #1 Choice for{' '}
                <span className="text-primary">Student Success</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                We combine expert talent, proven processes, and uncompromising quality to deliver academic excellence when you need it most.
              </p>
              <a
                href="#order"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-6 h-12 shadow-sm hover:bg-primary-hover transition-all active:scale-[0.98] cursor-pointer"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 sm:py-20 bg-surface-lvl1 border-y border-border-lvl2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary">{stat.value}</div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
                What Makes Us Different
              </h2>
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                Eight key advantages that set Acezon apart from the competition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-5 rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-main">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-text-muted leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
              Trusted by Students Worldwide
            </h2>
            <p className="mt-4 text-base text-text-muted leading-relaxed">
              Listen to what students say about their experience with Acezon.
            </p>

            <div className="mt-12 p-8 rounded-2xl bg-surface-lvl2 border border-border-lvl2">
              <div className="flex items-center gap-1 mb-4 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-text-muted leading-relaxed italic mb-6">
                "Acezon saved my semester. My dissertation was due in 48 hours and they delivered a polished, well-researched draft ahead of time. The communication over WhatsApp was instant and professional. I've used them three times now and wouldn't trust anyone else with my assignments."
              </blockquote>
              <div className="font-bold text-text-main">— Aisha M., Masters Student</div>
              <div className="text-sm text-text-muted mt-1">University of Manchester</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-10 sm:p-14 text-center shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ready to Experience the Acezon Difference?
              </h2>
              <p className="mt-4 text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
                Get a free quote in under 2 minutes. No payment required — just submit your requirements and let our team show you what quality looks like.
              </p>
              <a
                href="#order"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white text-primary text-sm font-bold px-6 h-12 shadow-sm hover:bg-white/90 transition-all active:scale-[0.98] cursor-pointer"
              >
                Submit Your Order
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
