import { faqs } from '@/config/site-content';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Questions</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            Everything you need to know before placing your first order.
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" defaultValue="faq-0" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

