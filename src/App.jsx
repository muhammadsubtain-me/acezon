import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Home from '@/pages/Home';
import AboutPage from '@/pages/AboutPage';
import SamplesPage from '@/pages/SamplesPage';
import ContactPage from '@/pages/ContactPage';
import PortfolioPage from '@/pages/PortfolioPage';
import FAQsPage from '@/pages/FAQsPage';
import OrderPage from '@/pages/OrderPage';
import ServicesPage from '@/pages/ServicesPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">
          <PageTransition>
            {(location) => (
              <Routes location={location}>
                <Route path="/" element={<Home />} />

                <Route path="/services" element={<ServicesPage />} />
                <Route path="/samples" element={<SamplesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            )}
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

