import React from 'react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { Mail, MessageSquare, Phone, Clock, MapPin, Zap } from 'lucide-react';
import { siteInfo } from '@/shared/config/site';

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Chat instantly with our support team',
    value: siteInfo.whatsappNumber,
    link: `https://wa.me/${siteInfo.whatsappNumber}`,
    type: 'whatsapp',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us a detailed message',
    value: siteInfo.supportEmail,
    link: `mailto:${siteInfo.supportEmail}`,
    type: 'email',
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Call us for immediate assistance',
    value: siteInfo.supportPhones[0],
    link: `tel:${siteInfo.supportPhones[0].replace(/\s/g, '')}`,
    type: 'phone',
  },
];

const faqs = [
  {
    question: 'What&apos;s the fastest I can get an order?',
    answer:
      'Our rush service offers 6-hour turnaround for most assignments. We assess feasibility based on your requirements when you submit — complex projects may take longer, but we&apos;ll always give you an honest timeline.',
  },
  {
    question: 'Can I communicate with my writer?',
    answer:
      'Absolutely! You can choose WhatsApp or email communication. You&apos;ll have direct contact with your assigned writer to clarify requirements, ask questions, and provide feedback throughout the process.',
  },
  {
    question: 'What if I need changes after delivery?',
    answer:
      'We offer unlimited free revisions. If the work doesn&apos;t meet your requirements, simply request changes and we&apos;ll revise it. If you&apos;re still not satisfied, we offer a money-back guarantee.',
  },
  {
    question: 'How do I know my work is original?',
    answer:
      'Every assignment is checked with Turnitin and other plagiarism detection software before delivery. We also provide a plagiarism report so you can verify the originality yourself.',
  },
];

export const metadata = {
  title: 'Contact Us — Acezon Academic Assistance',
  description: 'Get in touch with our support team. We&apos;re available 24/7 via WhatsApp, email, or phone.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Get In Touch</span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.07]">
                We&apos;re Here to{' '}
                <span className="text-primary">Help</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                Have questions or need support? Reach out to us via WhatsApp, email, or phone. We&apos;re available 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.title}
                    href={method.link}
                    target={method.type === 'whatsapp' ? '_blank' : undefined}
                    rel={method.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 text-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-text-main">{method.title}</h3>
                    <p className="text-xs text-text-muted mt-1 mb-3">{method.description}</p>
                    <div className="text-sm font-semibold text-primary">{method.value}</div>
                  </a>
                );
              })}
            </div>

            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Fastest Response</span>
              </div>
              <p className="text-base text-text-main">
                <strong>WhatsApp</strong> typically gets a response within 2-5 minutes. Email responses arrive within 1 hour.
              </p>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-4">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-text-main mb-2">24/7 Availability</h3>
                <p className="text-sm text-text-muted">Our team is working around the clock to support you, no matter your timezone.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-4">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-text-main mb-2">Quick Responses</h3>
                <p className="text-sm text-text-muted">Average response time is under 5 minutes for WhatsApp and 1 hour for email.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-primary mx-auto mb-4">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-text-main mb-2">Global Support</h3>
                <p className="text-sm text-text-muted">We serve students from around the world in every timezone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">Common Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="rounded-xl bg-surface-lvl2 border border-border-lvl2 overflow-hidden transition-colors hover:border-border-lvl3 group"
                >
                  <summary className="flex items-center justify-between w-full text-left p-5 cursor-pointer">
                    <span className="text-sm font-bold text-text-main pr-4">{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-text-muted leading-relaxed border-t border-border-lvl2">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-primary p-10 sm:p-14 text-center shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
                Don&apos;t wait. Chat with us on WhatsApp right now or submit your order to get a free quote within minutes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <a
                  href={`https://wa.me/${siteInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-primary text-sm font-bold px-6 h-12 shadow-sm hover:bg-white/90 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 text-white text-sm font-semibold px-6 h-12 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Submit Order
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
