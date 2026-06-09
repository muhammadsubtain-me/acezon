import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  { name: 'Mechanical', path: '/services/mechanical', icon: '⚙️' },
  { name: 'Electrical', path: '/services/electrical', icon: '⚡' },
  { name: 'Chemical', path: '/services/chemical', icon: '🧪' },
  { name: 'Computer Science', path: '/services/computer-science', icon: '💻' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', hasDropdown: true },
  { name: 'Samples', path: '/samples' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'FAQs', path: '/faqs' },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = () => { clearTimeout(timeoutRef.current); setDropdownOpen(true); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150); };

  return (
    <header className={`sticky top-0 z-50 bg-black transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : 'shadow-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 bg-[var(--color-surface-2)] border border-[var(--color-border-hover)] flex items-center justify-center">
              <span className="text-[var(--color-text-heading)] font-extrabold text-lg">Z</span>
            </div>
            <span className="text-[var(--color-text-heading)] font-bold text-xl tracking-[-0.02em]">
              ZenEdify
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium border-none cursor-pointer transition-all duration-150 ${
                    location.pathname.startsWith('/services')
                      ? 'bg-[var(--color-surface-2)] text-[var(--color-text-heading)]'
                      : 'bg-transparent text-[var(--color-text-muted)]'
                  }`}>
                    Services <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className={`absolute top-full left-0 mt-1 w-56 bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-lg)] transition-all duration-200 ${
                    dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="p-2">
                      {services.map((service) => (
                        <Link key={service.name} to={service.path} onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-text)] no-underline transition-all duration-150 hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-heading)]"
                        >
                          <span>{service.icon}</span>
                          <span className="font-medium">{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.name} to={link.path}
                  className={`px-4 py-2 text-sm font-medium no-underline transition-all duration-150 ${
                    location.pathname === link.path
                      ? 'bg-[var(--color-surface-2)] text-[var(--color-text-heading)]'
                      : 'bg-transparent text-[var(--color-text-muted)]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <Button asChild size="sm" className="ml-3">
              <Link to="/contact">Hire Expert</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] px-4 pb-4 pt-2 bg-black/60 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link to={link.path} onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-[var(--color-text)] no-underline"
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div className="ml-4 mt-1">
                  {services.map((s) => (
                    <Link key={s.name} to={s.path} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-muted)] no-underline"
                    >
                      <span>{s.icon}</span>{s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Hire Expert</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
