import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import StatsSection from '@/components/sections/StatsSection';
import Testimonials from '@/components/sections/Testimonials';
import HireExpertCTA from '@/components/sections/HireExpertCTA';

export const metadata = {
  title: 'Professional Academic Assistance & Tutoring',
  description:
    'Acezon provides expert, 24/7 academic assistance, subject tutoring, solved assignment samples, and technical report writing across engineering and computer science.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <HireExpertCTA />
    </>
  );
}
