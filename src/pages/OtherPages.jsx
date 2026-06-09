import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion';

/* ── Shared hero banner ─────────────────────────────────────────────────────── */
function PageHero({ title, subtitle }) {
  return (
    <section className="py-20 bg-[var(--color-surface)] text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative max-w-3xl mx-auto px-4">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text-heading)]">{title}</h1>
        <p className="text-[var(--color-text-muted)] text-[17px]">{subtitle}</p>
      </div>
    </section>
  );
}

/* ── ABOUT ──────────────────────────────────────────────────────────────────── */
export function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="About ZenEdify" subtitle="Your trusted academic partner, built on expertise and integrity." />

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Badge className="mb-5">Our Story</Badge>
            <h2 className="font-display text-3xl font-bold mb-5 text-[var(--color-text-heading)]">Who We Are</h2>
            {[
              'ZenEdify was founded with a single mission: to provide students worldwide with access to world-class academic expertise. We believe every student deserves the support they need to reach their full potential.',
              "Our platform connects students with verified subject matter experts who provide personalized, high-quality academic assistance. Whether you're struggling with a complex engineering problem or need help polishing a dissertation, ZenEdify has you covered.",
              "With tutors from top universities across the globe and a commitment to academic excellence, we've helped thousands of students achieve the grades they deserve — on time, every time.",
            ].map((p, i) => (
              <p key={i} className="text-[var(--color-text-muted)] leading-[1.7] mb-4">{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'Empower every student with expert academic support to unlock their true potential.' },
              { icon: '👁️', title: 'Our Vision', desc: 'Become the most trusted global platform for academic excellence and student success.' },
              { icon: '💎', title: 'Our Values', desc: 'Integrity, quality, confidentiality, and student-first thinking in everything we do.' },
              { icon: '🌍', title: 'Global Reach', desc: 'Serving students across 50+ countries with localized expertise and 24/7 support.' },
            ].map((item) => (
              <Card key={item.title} className="p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-section-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-10 text-[var(--color-text-heading)]">Our Expert Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['⚙️ Mechanical', '⚡ Electrical', '🧪 Chemical', '💻 CS & IT'].map((dept) => (
              <Card key={dept} className="p-6 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="text-[40px] mb-3">{dept.split(' ')[0]}</div>
                <div className="font-semibold text-[var(--color-text-heading)]">{dept.split(' ').slice(1).join(' ')}</div>
                <div className="text-[13px] text-[var(--color-text-muted)] mt-1">Department</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── SAMPLES ────────────────────────────────────────────────────────────────── */
const samples = [
  { title: 'Thermodynamics Assignment', subject: 'Mechanical Eng.', pages: 12, grade: 'A+', icon: '⚙️' },
  { title: 'Circuit Analysis Lab Report', subject: 'Electrical Eng.', pages: 8, grade: 'A', icon: '⚡' },
  { title: 'Reaction Kinetics Assignment', subject: 'Chemical Eng.', pages: 15, grade: 'A+', icon: '🧪' },
  { title: 'Data Structures Project', subject: 'Computer Science', pages: 20, grade: 'A', icon: '💻' },
  { title: 'Literature Review Essay', subject: 'English', pages: 10, grade: 'A+', icon: '📝' },
  { title: 'Research Proposal', subject: 'Research Methods', pages: 18, grade: 'A', icon: '🔬' },
  { title: 'Dissertation Chapter', subject: 'Management', pages: 35, grade: 'A+', icon: '🎓' },
  { title: 'MATLAB Analysis', subject: 'Applied Math', pages: 9, grade: 'A', icon: '📊' },
  { title: 'Python ML Project', subject: 'Computer Science', pages: 25, grade: 'A+', icon: '🤖' },
];

export function SamplesPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Work Samples" subtitle="Browse examples of the high-quality academic work our experts deliver." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((s) => (
              <Card key={s.title} className="p-6 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[var(--color-surface-3)] flex items-center justify-center text-2xl">
                    {s.icon}
                  </div>
                  <Badge variant="grade">{s.grade}</Badge>
                </div>
                <CardTitle className="mb-1.5">{s.title}</CardTitle>
                <p className="text-[13px] text-[var(--color-text-muted)] mb-3">{s.subject}</p>
                <div className="flex justify-between text-xs text-[var(--color-text-faint)]">
                  <span>{s.pages} pages</span>
                  <Link to="/contact" className="text-[var(--color-accent-muted)] font-semibold no-underline">Get Similar →</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── CONTACT ────────────────────────────────────────────────────────────────── */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <PageHero title="Contact Us" subtitle="Get in touch and let our experts help you succeed." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="p-8">
            <h2 className="font-display text-2xl font-bold mb-6 text-[var(--color-text-heading)]">Send a Message</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-[56px] mb-4">✅</div>
                <h3 className="font-semibold text-[var(--color-text-heading)] text-xl mb-2">Message Sent!</h3>
                <p className="text-[var(--color-text-muted)]">Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-6 text-[var(--color-accent-muted)] font-semibold bg-transparent border-none cursor-pointer text-sm"
                >Send another message</button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe your assignment or question..." />
                </div>
                <Button onClick={() => setSent(true)} className="w-full">Send Message</Button>
              </div>
            )}
          </Card>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold mb-4 text-[var(--color-text-heading)]">Get in Touch</h2>
              <p className="text-[var(--color-text-muted)] leading-[1.7]">Our team is available 24/7 to assist you with any academic query. Reach out through any channel below.</p>
            </div>
            {[
              { icon: '📍', title: 'UK Office', info: '124 City Road, London, England, EC1V 2NX' },
              { icon: '📍', title: 'Pakistan Office', info: '602 A, Meher Apartments, H-13 Islamabad' },
              { icon: '📧', title: 'Email Us', info: 'support@ZenEdify.com' },
              { icon: '💬', title: 'WhatsApp', info: 'Available 24/7 for instant help' },
            ].map((item) => (
              <Card key={item.title} className="p-5 flex gap-4 items-start">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="font-semibold text-[var(--color-text-heading)] text-sm mb-0.5">{item.title}</div>
                  <div className="text-[var(--color-text-muted)] text-[13px]">{item.info}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── PORTFOLIO ──────────────────────────────────────────────────────────────── */
const portfolioItems = [
  { title: 'FEA Analysis of Beam Structures', category: 'Mechanical', icon: '⚙️', stars: 5 },
  { title: 'Smart Grid Power Distribution System', category: 'Electrical', icon: '⚡', stars: 5 },
  { title: 'Chemical Plant Process Simulation', category: 'Chemical', icon: '🧪', stars: 5 },
  { title: 'Full-Stack E-Commerce Platform', category: 'CS', icon: '💻', stars: 5 },
  { title: 'Heat Exchanger Design Report', category: 'Chemical', icon: '🧪', stars: 5 },
  { title: 'Neural Network Image Classifier', category: 'CS', icon: '🤖', stars: 5 },
  { title: 'PLC Automation Control System', category: 'Electrical', icon: '⚡', stars: 5 },
  { title: 'Fluid Dynamics CFD Simulation', category: 'Mechanical', icon: '⚙️', stars: 5 },
  { title: 'Blockchain Smart Contract App', category: 'CS', icon: '🔗', stars: 5 },
];

const categories = ['All', 'Mechanical', 'Electrical', 'Chemical', 'CS'];

export function PortfolioPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter(p => p.category === active);

  return (
    <div className="min-h-screen">
      <PageHero title="Our Portfolio" subtitle="A showcase of the exceptional academic work delivered by our experts." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={active === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActive(cat)}
              >{cat}</Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Card key={item.title} className="overflow-hidden hover:border-[var(--color-border-hover)] hover:-translate-y-1">
                <div className="h-36 bg-[var(--color-surface-2)] flex items-center justify-center text-[48px]">
                  {item.icon}
                </div>
                <div className="p-5">
                  <Badge variant="secondary">{item.category}</Badge>
                  <h3 className="font-semibold text-[var(--color-text-heading)] mt-3 mb-2">{item.title}</h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[var(--color-star)]" />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── FAQs ───────────────────────────────────────────────────────────────────── */
const faqs = [
  { q: 'How do I place an order?', a: 'Simply click "Hire Expert", fill in your assignment details, and we will match you with the most qualified tutor for your subject.' },
  { q: 'Is my information kept confidential?', a: 'Absolutely. We follow strict data privacy policies. Your personal information and assignment details are never shared with third parties.' },
  { q: 'How fast can you complete my assignment?', a: 'We offer turnarounds from a few hours to several weeks depending on complexity. Express delivery is available for urgent deadlines.' },
  { q: 'What if I am not satisfied with the work?', a: 'We offer unlimited free revisions until you are completely satisfied. Your satisfaction is our top priority.' },
  { q: 'Do you cover all subjects?', a: 'We cover a vast range including Engineering, Computer Science, Business, Medicine, Law, Mathematics, Social Sciences, and many more.' },
  { q: 'Are your tutors qualified?', a: 'Yes. All our tutors are carefully vetted professionals holding advanced degrees (Masters or PhD) from accredited universities.' },
  { q: 'How do I communicate with my tutor?', a: 'You can communicate directly through our messaging system, available 24/7. You will receive real-time updates on your order progress.' },
  { q: 'Is the work plagiarism-free?', a: 'Yes. Every piece of work is original and written from scratch. We provide plagiarism reports upon request.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, PayPal, and other secure payment gateways for your convenience.' },
  { q: 'Can I get a refund?', a: 'We have a clear refund policy. If the work does not meet the agreed requirements after revisions, you may be eligible for a full or partial refund.' },
];

export function FAQsPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about ZenEdify's services." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-12 p-8 text-center">
            <h3 className="font-display text-xl font-bold mb-2 text-[var(--color-text-heading)]">Still have questions?</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-5">Our support team is available 24/7 to help with any queries.</p>
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
