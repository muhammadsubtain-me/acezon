import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const serviceCategories = [
  {
    title: 'Mechanical Engineering', path: '/services/mechanical', icon: '⚙️',
    desc: 'Thermodynamics, fluid mechanics, CAD/CAM, robotics, and more.',
    topics: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'Materials Science'],
  },
  {
    title: 'Electrical Engineering', path: '/services/electrical', icon: '⚡',
    desc: 'Circuit analysis, power systems, digital electronics, and signal processing.',
    topics: ['Circuit Analysis', 'Power Systems', 'VLSI Design', 'Embedded Systems'],
  },
  {
    title: 'Chemical Engineering', path: '/services/chemical', icon: '🧪',
    desc: 'Reaction kinetics, process design, mass transfer, and thermodynamics.',
    topics: ['Reaction Kinetics', 'Process Design', 'Mass Transfer', 'Separation Processes'],
  },
  {
    title: 'Computer Science', path: '/services/computer-science', icon: '💻',
    desc: 'Algorithms, machine learning, web development, databases, and AI.',
    topics: ['Data Structures', 'Machine Learning', 'Web Development', 'Cybersecurity'],
  },
];

export default function ServicesOverview() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-[var(--color-surface)] text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <Badge className="mb-5">Expert Assistance</Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5 text-[var(--color-text-heading)]">Our Services</h1>
          <p className="text-[var(--color-text-muted)] text-[17px]">
            ZenEdify provides specialized academic assistance across four core engineering and technology disciplines. Select your field below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <Link key={service.title} to={service.path} className="no-underline">
                <Card className="overflow-hidden hover:border-[var(--color-border-hover)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] transition-all duration-300">
                  <div className="p-8 relative overflow-hidden bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
                    <div className="absolute -right-6 -top-6 text-[96px] opacity-[0.08]">{service.icon}</div>
                    <div className="text-[48px] mb-4">{service.icon}</div>
                    <h2 className="font-display text-2xl font-bold text-[var(--color-text-heading)]">{service.title}</h2>
                  </div>
                  <div className="p-6">
                    <p className="text-[var(--color-text-muted)] text-sm leading-[1.7] mb-5">{service.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.topics.map((topic) => (
                        <Badge key={topic} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-semibold text-sm">
                      Explore {service.title}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-section-alt)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-heading)]">Can't find your subject?</h2>
          <p className="text-[var(--color-text-muted)] mb-8">We cover many more disciplines beyond our core engineering services. Contact us and we'll connect you with the right expert.</p>
          <Button size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
