import React from 'react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { ArrowRight } from 'lucide-react';
import { siteInfo } from '@/shared/config/site';

interface FAQCategory {
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const faqCategories: FAQCategory[] = [
  {
    title: 'About Our Services',
    faqs: [
      {
        question: 'Is the work you provide original and plagiarism-free?',
        answer:
          'Yes. Every assignment is written from scratch by a qualified expert and checked with plagiarism detection tools before delivery. You receive work that is 100% original and tailored to your instructions.',
      },
      {
        question: 'What types of assignments do you handle?',
        answer:
          'We handle essays, assignments, research papers, dissertations, lab reports, case studies, presentations, and virtually any academic writing. If you can name it, we can likely help with it.',
      },
      {
        question: 'Can you write in different styles and formats?',
        answer:
          'Absolutely. We\'re experienced with APA, MLA, Chicago, Harvard, and other citation styles. We can adapt our writing tone and style to match your institution\'s requirements.',
      },
      {
        question: 'Do you work with all subjects and academic levels?',
        answer:
          'Yes. Our team includes experts across engineering, humanities, business, sciences, medicine, law, and more. We handle high school, undergraduate, graduate, and PhD-level work.',
      },
    ],
  },
  {
    title: 'Pricing & Payment',
    faqs: [
      {
        question: 'How much does it cost?',
        answer:
          'Pricing depends on complexity, length, and deadline. Flexible deadlines (14+ days) start from $15/page, while rush orders (6 hours) start from $35/page. You get a free quote when you submit your order.',
      },
      {
        question: 'Do you charge upfront?',
        answer:
          'No. You get a free quote first. Payment is only collected once you approve the quote and we confirm your order. This gives you complete transparency before committing.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept Wise, PayPal, Remitly, ADIB, and Al Rajhi Bank transfers. Payment methods are shared with you after your order is confirmed.',
      },
      {
        question: 'What if I\'m not satisfied with the work?',
        answer:
          'We offer unlimited free revisions. If after revisions you\'re still not satisfied, we offer a money-back guarantee. Your satisfaction is guaranteed.',
      },
    ],
  },
  {
    title: 'Speed & Deadlines',
    faqs: [
      {
        question: 'What&apos;s the fastest you can deliver?',
        answer:
          'Our rush service offers 6-hour turnaround. However, feasibility depends on complexity. We\'ll always be honest about whether we can meet your deadline when you submit your order.',
      },
      {
        question: 'How are rush orders prioritized?',
        answer:
          'Rush orders are assigned to our most experienced writers and processed immediately. Every hour counts, and our team is trained to work efficiently without compromising quality.',
      },
      {
        question: 'Do you always meet deadlines?',
        answer:
          'We have a 99.2% on-time delivery rate. In rare cases where we might miss a deadline, we notify you immediately and work out solutions. Your deadline is our priority.',
      },
      {
        question: 'Can I request a specific delivery time?',
        answer:
          'Yes. When submitting your order, you can specify your exact deadline including the time. We\'ll confirm feasibility and guarantee delivery by that time.',
      },
    ],
  },
  {
    title: 'Communication & Process',
    faqs: [
      {
        question: 'How do I communicate with my writer?',
        answer:
          'You can choose WhatsApp or email when submitting your order. Your assigned writer will contact you directly through your preferred channel to clarify requirements and provide updates.',
      },
      {
        question: 'Can I provide feedback during the process?',
        answer:
          'Yes. You can contact your writer at any time during the writing process to ask questions, provide feedback, or clarify requirements. Direct communication ensures the final work matches your expectations.',
      },
      {
        question: 'What happens after I submit my order?',
        answer:
          'You receive a free quote within minutes. Once you approve, an expert is assigned. You\'ll communicate with them directly, and they\'ll share progress updates. You receive the completed work by your deadline.',
      },
      {
        question: 'How do I request revisions?',
        answer:
          'After receiving your work, simply reply to your writer with your feedback and requested changes. Revisions are unlimited and completely free. We keep revising until you\'re 100% satisfied.',
      },
    ],
  },
  {
    title: 'Privacy & Confidentiality',
    faqs: [
      {
        question: 'Is my information kept confidential?',
        answer:
          'Absolutely. Your personal details and order information are never shared with third parties. All communication is private and your data is stored securely with encryption.',
      },
      {
        question: 'Will my school know I used your service?',
        answer:
          'No. Your school will never know. Our work is indistinguishable from your own writing, and we maintain strict confidentiality agreements. Your privacy is our top priority.',
      },
      {
        question: 'What about data security?',
        answer:
          'We use industry-standard encryption and security protocols to protect your data. Your files are stored securely and deleted after order completion unless you request otherwise.',
      },
      {
        question: 'Do you sell my information to anyone?',
        answer:
          'Never. We do not sell, share, or disclose your information to any third party for any reason. We strictly adhere to privacy regulations.',
      },
    ],
  },
  {
    title: 'Quality & Guarantees',
    faqs: [
      {
        question: 'What if the work doesn&apos;t match my requirements?',
        answer:
          'Request a revision. Our writers will make the changes at no extra cost. We revise unlimited times until your work meets your exact requirements.',
      },
      {
        question: 'How do I know the work is high quality?',
        answer:
          'Our team consists of experienced writers with degrees in their fields. Every order goes through quality checks. You also get a plagiarism report to verify originality.',
      },
      {
        question: 'Do you guarantee my grade?',
        answer:
          'We cannot guarantee a specific grade, as that depends on your instructor&apos;s grading criteria. However, we guarantee high-quality, original work that meets academic standards.',
      },
      {
        question: 'What if there&apos;s an emergency or issue?',
        answer:
          'Contact us immediately via WhatsApp or email. Our 24/7 support team will address issues as quickly as possible and work toward a resolution.',
      },
    ],
  },
];

export const metadata = {
  title: 'Frequently Asked Questions — Acezon',
  description: 'Get answers to common questions about our academic writing services, pricing, process, and guarantees.',
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Help Center</span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-[1.07]">
                Frequently Asked{' '}
                <span className="text-primary">Questions</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                Find answers to common questions about our services, pricing, process, privacy, and guarantees.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {faqCategories.map((category) => (
                <div key={category.title}>
                  <h2 className="text-2xl font-bold text-text-main mb-8 pb-4 border-b-2 border-primary">
                    {category.title}
                  </h2>

                  <div className="space-y-3">
                    {category.faqs.map((item, idx) => (
                      <details
                        key={idx}
                        className="rounded-xl bg-surface-lvl2 border border-border-lvl2 overflow-hidden transition-all hover:shadow-md group"
                      >
                        <summary className="flex items-center justify-between w-full text-left p-6 cursor-pointer">
                          <span className="text-sm font-bold text-text-main pr-4 group-open:text-primary transition-colors">
                            {item.question}
                          </span>
                          <svg
                            className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </summary>
                        <div className="px-6 pb-6 text-sm text-text-muted leading-relaxed border-t border-border-lvl2">
                          {item.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions? */}
        <section className="py-20 sm:py-28 bg-surface-lvl1 border-y border-border-lvl2">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-base text-text-muted leading-relaxed mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our support team is ready to help.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <a
                href={`https://wa.me/${siteInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-6 h-12 shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${siteInfo.supportEmail}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-lvl3 bg-surface-lvl2 text-text-main text-sm font-semibold px-6 h-12 shadow-sm hover:bg-surface-lvl1 transition-colors cursor-pointer"
              >
                Send Email
              </a>
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
                Get your free quote in under 2 minutes. No payment required — just submit your requirements and let our experts show you what quality looks like.
              </p>
              <a
                href="/"
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
