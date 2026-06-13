import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Samples', path: '/samples' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'FAQs', path: '/faqs' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isLinkActive = (link) => {
    if (link.name === 'Services') {
      return location.pathname.startsWith('/services');
    }
    return location.pathname === link.path;
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isHomePage
            ? scrolled || mobileOpen
              ? 'bg-black/30 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-[#161616]/90 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Liquid glass shimmer line — visible when scrolled or when on other pages */}
        <div
          className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_30%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.2)_70%,transparent_100%)] ${
            !isHomePage || scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <Logo className="w-8 h-8" />
              <span className="text-[var(--color-text-heading)] font-bold text-xl tracking-[-0.02em]">
                Zen<span className="text-[var(--color-accent-muted)]">Edify</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 ml-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium no-underline transition-all duration-150 ${
                    isLinkActive(link)
                      ? 'text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild size="sm" className="ml-3">
                <Link to="/order">Hire Expert</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                scrolled ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 z-40 px-4 pb-24 pt-2 bg-[rgba(5,5,5,0.92)] backdrop-blur-[24px] backdrop-saturate-[180%] overflow-y-auto border-t border-white/[0.08]"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium no-underline transition-all duration-150 ${
                isLinkActive(link)
                  ? 'text-white'
                  : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full">
              <Link to="/order" onClick={() => setMobileOpen(false)}>Hire Expert</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
