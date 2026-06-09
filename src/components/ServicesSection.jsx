import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';

const services = [
  { icon: '📝', title: 'Essay Writing Services', desc: 'Professional essay writing across all academic disciplines and formats.' },
  { icon: '🎓', title: 'Dissertation Writing', desc: 'Comprehensive dissertation support from proposal to final submission.' },
  { icon: '🔍', title: 'Proofreading & Editing', desc: 'Meticulous editing to polish grammar, structure, and academic tone.' },
  { icon: '🧪', title: 'Lab Task Practical', desc: 'Hands-on practical lab reports and experimental analysis support.' },
  { icon: '💻', title: 'Coding & Programming', desc: 'Expert help with assignments across all major programming languages.' },
  { icon: '📊', title: 'Research Proposal Writing', desc: 'Well-structured research proposals that set the foundation for success.' },
  { icon: '📚', title: 'Exam Preparation', desc: 'Targeted study plans and mock tests to maximize exam performance.' },
  { icon: '👨‍🏫', title: 'Subject Tutoring', desc: 'One-on-one tutoring sessions tailored to your learning pace.' },
  { icon: '🏗️', title: 'Semester Projects', desc: 'End-to-end support for semester-long projects and presentations.' },
  { icon: '📋', title: 'HomeWorks & Assignments', desc: 'Timely, accurate homework solutions across all subjects.' },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[var(--color-section-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">What We Offer</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-heading)]">
            Our Popular Services
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-[560px] mx-auto text-[17px]">
            From essays to dissertations, coding to lab reports — ZenEdify covers every academic need with expert precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service) => (
            <Card key={service.title}
              className="p-5 cursor-pointer hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] hover:-translate-y-1"
            >
              <div className="w-11 h-11 bg-[var(--color-surface-3)] flex items-center justify-center text-xl mb-4">
                {service.icon}
              </div>
              <CardTitle className="text-[13px] mb-2 leading-snug">{service.title}</CardTitle>
              <CardDescription>{service.desc}</CardDescription>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link to="/services" className="inline-flex items-center gap-2">
              Explore All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
