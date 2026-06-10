import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, Award, CheckCircle } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { domains, services, contentData } from '../lib/contentData';



export default function DomainPageDetail({ domainId: propDomainId }) {
  const { domainId: paramDomainId } = useParams();
  const domainId = propDomainId || paramDomainId;
  const [activeServiceId, setActiveServiceId] = useState('assignment-help');
  const [fade, setFade] = useState(true);

  // Find the selected domain
  const domain = domains.find((d) => d.id === domainId) || domains[0];

  // Trigger fade-in on tab change
  const handleTabChange = (serviceId) => {
    setFade(false);
    setTimeout(() => {
      setActiveServiceId(serviceId);
      setFade(true);
    }, 150);
  };

  // Reset to first tab on domain change
  useEffect(() => {
    setActiveServiceId('assignment-help');
  }, [domainId]);

  const currentContent = contentData[domain.id]?.[activeServiceId] || {
    title: `${domain.name} Help`,
    desc: 'Professional academic assistance tailored to your requirements.',
    topics: [],
    benefits: []
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <section className="-mt-16 pt-36 pb-20 bg-[var(--color-surface)] relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none bg-[radial-gradient(ellipse,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[72px] mb-4 select-none animate-bounce" style={{ animationDuration: '3s' }}>
            {domain.icon}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-heading)]">
            {domain.name}
          </h1>
          <p className="text-[var(--color-text-muted)] text-[17px] max-w-[560px] mx-auto mb-6">
            Find tailored academic assistance for {domain.name} students. Toggle the services below to view our coverage and topics.
          </p>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link to="/contact" className="inline-flex items-center gap-2">
                Hire {domain.name} Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Switcher (Tabs) */}
      <section className="py-12 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3">Select a Service</Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-heading)]">
              What do you need help with?
            </h2>
          </div>

          {/* Glassmorphic Tab Bar */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl max-w-3xl mx-auto mb-16">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleTabChange(service.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-none cursor-pointer ${
                  activeServiceId === service.id
                    ? 'bg-white text-black shadow-lg scale-102'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{service.icon}</span>
                <span>{service.name}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Overview and Benefits */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-3 text-[var(--color-text-heading)]">
                    {currentContent.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-[1.7] text-[16px]">
                    {currentContent.desc}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {currentContent.benefits.map((benefit, idx) => (
                    <Card key={idx} className="p-5 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                      <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-lg flex items-center justify-center text-xl mb-4">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-sm mb-2">{benefit.title}</CardTitle>
                      <CardDescription className="text-xs leading-normal">{benefit.desc}</CardDescription>
                    </Card>
                  ))}
                  {currentContent.benefits.length === 0 && (
                    <>
                      <Card className="p-5">
                        <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-lg flex items-center justify-center text-xl mb-4">⚙️</div>
                        <CardTitle className="text-sm mb-2">Subject Specialists</CardTitle>
                        <CardDescription className="text-xs leading-normal">Guidance from expert writers holding advanced degrees.</CardDescription>
                      </Card>
                      <Card className="p-5">
                        <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-lg flex items-center justify-center text-xl mb-4">✅</div>
                        <CardTitle className="text-sm mb-2">Plagiarism-Free</CardTitle>
                        <CardDescription className="text-xs leading-normal">100% original calculations and custom-written analysis reports.</CardDescription>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: Topics Covered */}
              <div className="lg:col-span-5">
                <Card className="p-6 border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm">
                  <h4 className="font-display text-lg font-bold mb-5 flex items-center gap-2 text-[var(--color-text-heading)]">
                    <BookOpen className="w-5 h-5 text-neutral-400" />
                    Topics Covered
                  </h4>
                  <ul className="list-none p-0 m-0 flex flex-col gap-3">
                    {currentContent.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-text)]">
                        <CheckCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-[var(--color-section-alt)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-heading)]">
            Ready to Get Started?
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Connect with our verified {domain.name} experts today and get the academic help you deserve.
          </p>
          <Button size="lg" asChild>
            <Link to="/contact" className="inline-flex items-center gap-2">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
