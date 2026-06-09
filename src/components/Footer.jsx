import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';

const subjects = [
  'Computer Science', 'Applied Sciences', 'Social Sciences', 'Mathematics', 'Programming',
  'Business', 'Management', 'Engineering', 'Physics', 'Chemistry',
  'English', 'Biology', 'History', 'Finance', 'Statistics',
  'Law', 'Accounting', 'Electronics', 'Psychology', 'Numerical Methods',
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit no-underline">
              <div className="w-9 h-9 bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center">
                <span className="text-[var(--color-footer-head)] font-extrabold text-lg">Z</span>
              </div>
              <span className="text-[var(--color-footer-head)] font-bold text-xl tracking-[-0.02em]">ZenEdify</span>
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
                { name: 'Hire Expert', path: '/contact' },
              ].map((link) => (
                <li key={link.name} className="mb-2.5">
                  <Link to={link.path}
                    className="text-sm text-[var(--color-footer-text)] no-underline transition-colors duration-150 hover:text-[var(--color-text)]"
                  >{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-5 text-xs uppercase tracking-[0.08em]">Our Services</h4>
            <ul className="list-none p-0 m-0">
              {[
                { name: 'Mechanical Engineering', path: '/services/mechanical' },
                { name: 'Electrical Engineering', path: '/services/electrical' },
                { name: 'Chemical Engineering', path: '/services/chemical' },
                { name: 'Computer Science', path: '/services/computer-science' },
              ].map((s) => (
                <li key={s.name} className="mb-2.5">
                  <Link to={s.path}
                    className="text-sm text-[var(--color-footer-text)] no-underline transition-colors duration-150 hover:text-[var(--color-text)]"
                  >{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-5 text-xs uppercase tracking-[0.08em]">Subjects We Cover</h4>
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub) => (
                <span key={sub}
                  className="text-[11px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-[var(--color-footer-text)] cursor-default transition-all duration-150 hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
                >{sub}</span>
              ))}
            </div>
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
                className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-xs font-bold text-[var(--color-footer-text)] no-underline transition-all duration-200 hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-heading)]"
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
