import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Logo from '@/components/Logo';

const subjects = [
  'Calculus I & II',
  'Linear Algebra',
  'Differential Equations',
  'Numerical Methods',
  'Probability & Statistics',
  'Discrete Mathematics',
  'Thermodynamics',
  'Fluid Mechanics',
  'Heat Transfer',
  'Machine Design',
  'Manufacturing Engineering',
  'CAD/CAM',
  'Finite Element Analysis',
  'Mechanical Vibrations',
  'Power Plant Engineering',
  'Internal Combustion Engines',
  'Mechanics of Materials',
  'Signals and Systems',
  'Power Systems',
  'Control Systems',
  'Electromagnetic Fields',
  'Digital Logic Design',
  'Electrical Machines',
  'Microprocessors & Microcontrollers',
  'Mass Transfer',
  'Process Control',
  'Chemical Process Design',
  'Transport Phenomena',
  'Reaction Engineering',
  'Data Structures & Algorithms',
  'Operating Systems',
  'Database Systems',
  'Computer Networks',
  'Software Engineering',
  'Computer Organization & Architecture',
  'Artificial Intelligence',
  'Theory of Computation'
];

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const visibleSubjects = expanded ? subjects : subjects.slice(0, 15);

  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit no-underline">
              <Logo className="w-8 h-8" />
              <span className="text-[var(--color-footer-head)] font-bold text-xl tracking-[-0.02em]">
                Zen<span className="text-[var(--color-accent-muted)]">Edify</span>
              </span>
            </Link>
            <p className="text-sm leading-[1.7] mb-6">
              Expert academic assistance to help students achieve the grades they deserve. Available 24/7.
            </p>
            <div className="text-sm leading-loose">
              <div className="flex gap-2"><span>🇬🇧</span><span>124 City Road, London, England, EC1V 2NX</span></div>
              <div className="flex gap-2"><span>🇵🇰</span><span>602 A, Meher Apartments, H-13 Islamabad</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-5 text-xs uppercase tracking-[0.08em]">Quick Links</h4>
            <ul className="list-none p-0 m-0">
              {[
                { name: 'FAQs', path: '/faqs' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Samples', path: '/samples' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Hire Expert', path: '/order' },
              ].map((link) => (
                <li key={link.name} className="mb-2.5">
                  <Link to={link.path}
                    className="text-sm text-[var(--color-footer-text)] no-underline transition-colors duration-150 hover:text-[var(--color-text)]"
                  >{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div className="lg:col-span-2 md:col-span-2 flex flex-col items-start">
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-5 text-xs uppercase tracking-[0.08em]">Subjects We Cover</h4>
            <div className="flex flex-wrap gap-2 transition-all duration-300">
              {visibleSubjects.map((sub) => (
                <span key={sub}
                  className="text-[11px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 rounded-lg text-[var(--color-footer-text)] cursor-default transition-all duration-150 hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
                >{sub}</span>
              ))}
            </div>
            {subjects.length > 15 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-accent-muted)] hover:text-white transition-colors duration-150 cursor-pointer"
              >
                {expanded ? (
                  <>
                    Show Less <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Show More (+{subjects.length - 15} more) <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm m-0">© 2024 ZenEdify. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            {[
              { name: 'Facebook', icon: 'f', href: '#' },
              { name: 'Instagram', icon: '📷', href: '#' },
              { name: 'Twitter', icon: '𝕏', href: '#' },
              { name: 'LinkedIn', icon: 'in', href: '#' },
              { name: 'YouTube', icon: '▶', href: '#' },
            ].map((social) => (
              <a key={social.name} href={social.href} aria-label={social.name}
                className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex items-center justify-center text-xs font-bold text-[var(--color-footer-text)] no-underline transition-all duration-200 hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-heading)]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
