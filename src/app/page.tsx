import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { Services } from '@/components/site/services';
import { HowItWorks } from '@/components/site/how-it-works';
import { Features } from '@/components/site/features';
import { Testimonials } from '@/components/site/testimonials';
import { Faq } from '@/components/site/faq';
import { CtaBanner } from '@/components/site/cta-banner';
import { OrderSection } from '@/components/site/order-section';
import { Footer } from '@/components/site/footer';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Features />
        <OrderSection />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
