import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import { AboutPage, SamplesPage, ContactPage, PortfolioPage, FAQsPage } from './pages/OtherPages';
import ServicesOverview from './pages/ServicesOverview';
import DomainPageDetail from './pages/DomainPageDetail';
import ServicePageDetail from './pages/ServicePageDetail';

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
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/services/mechanical" element={<DomainPageDetail domainId="mechanical" />} />
                <Route path="/services/electrical" element={<DomainPageDetail domainId="electrical" />} />
                <Route path="/services/chemical" element={<DomainPageDetail domainId="chemical" />} />
                <Route path="/services/computer-science" element={<DomainPageDetail domainId="computer-science" />} />
                <Route path="/services/:serviceId" element={<ServicePageDetail />} />
                <Route path="/domains/:domainId" element={<DomainPageDetail />} />
                <Route path="/samples" element={<SamplesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
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

