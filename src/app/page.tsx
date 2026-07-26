import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { Services } from '@/components/site/services';
import { ResultsShowcase } from '@/components/site/results-showcase';
import { HowItWorks } from '@/components/site/how-it-works';
import { Features } from '@/components/site/features';
import { Guarantees } from '@/components/site/guarantees';
import { PricingSection } from '@/components/site/pricing-section';
import { OrderSection } from '@/components/site/order-section';
import { Testimonials } from '@/components/site/testimonials';
import { BlogSection } from '@/components/site/blog-section';
import { Faq } from '@/components/site/faq';
import { CtaBanner } from '@/components/site/cta-banner';
import { Footer } from '@/components/site/footer';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ResultsShowcase />
        <HowItWorks />
        <Features />
        <Guarantees />
        <PricingSection />
        <OrderSection />
        <Testimonials />
        <BlogSection />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
