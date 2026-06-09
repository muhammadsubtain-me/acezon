import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';

const features = [
  { icon: '🏅', title: 'World-Class Experts', desc: 'Our tutors are vetted professionals with advanced degrees in their fields.' },
  { icon: '⏱️', title: 'On-Time Delivery', desc: 'We guarantee timely submissions, no matter how tight the deadline.' },
  { icon: '🔒', title: '100% Confidential', desc: 'Your privacy is our priority — all interactions remain strictly secure.' },
  { icon: '✏️', title: 'Original Work', desc: 'Every submission is custom-written and plagiarism-free, guaranteed.' },
  { icon: '💰', title: 'Affordable Pricing', desc: 'Premium academic help that fits every student budget without compromise.' },
  { icon: '🔄', title: 'Unlimited Revisions', desc: 'We refine your work until you are completely satisfied with the outcome.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Badge className="mb-5">Why Choose Us</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight text-[var(--color-text-heading)]">
              ZenEdify –{' '}
              <span className="text-[var(--color-accent-muted)]">Place of Experts</span>
            </h2>
            <p className="text-[var(--color-text-muted)] leading-[1.7] mb-5">
              Our world-class academic advisers enable professionals and students to succeed by offering top-quality academic solutions. Our experienced team members are skilled tutors who use their expertise to produce a fantastic paper for you.
            </p>
            <p className="text-[var(--color-text-muted)] leading-[1.7] mb-8">
              ZenEdify provides the best in coursework, dissertation, lab tasks, exam preparations, programming assignments and essays. There are no restrictions on what we may offer — bring any assignment and our professional academic tutors will do their best to assist you.
            </p>
            <Button asChild>
              <Link to="/about" className="inline-flex items-center gap-2">
                About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="p-5 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="w-10 h-10 bg-[var(--color-surface-3)] flex items-center justify-center text-xl mb-3">
                  {f.icon}
                </div>
                <CardTitle className="text-[13px] mb-1.5">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
