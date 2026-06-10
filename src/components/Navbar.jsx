import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  { name: 'Assignment Help', path: '/services/assignment-help', icon: '📋' },
  { name: 'Dissertation Help', path: '/services/dissertation-help', icon: '🎓' },
  { name: 'Exam Preparation', path: '/services/exam-prep', icon: '📚' },
  { name: 'Lab & Projects Help', path: '/services/lab-projects', icon: '🛠️' },
];

const domains = [
  { name: 'Mechanical Engineering', path: '/domains/mechanical', icon: '⚙️' },
  { name: 'Electrical Engineering', path: '/domains/electrical', icon: '⚡' },
  { name: 'Computer Science', path: '/domains/computer-science', icon: '💻' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', hasDropdown: true, dropdownType: 'services' },
  { name: 'Domains', path: '/domains/mechanical', hasDropdown: true, dropdownType: 'domains' },
  { name: 'Samples', path: '/samples' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'FAQs', path: '/faqs' },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [location.pathname]);

  const handleMouseEnter = (type) => { clearTimeout(timeoutRef.current); setActiveDropdown(type); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150); };

  const isLinkActive = (link) => {
    if (link.dropdownType === 'services') {
      return location.pathname.startsWith('/services') && !location.pathname.startsWith('/services/mechanical') && !location.pathname.startsWith('/services/electrical') && !location.pathname.startsWith('/services/chemical') && !location.pathname.startsWith('/services/computer-science');
    }
    if (link.dropdownType === 'domains') {
      return location.pathname.startsWith('/domains') || location.pathname.startsWith('/services/mechanical') || location.pathname.startsWith('/services/electrical') || location.pathname.startsWith('/services/chemical') || location.pathname.startsWith('/services/computer-science');
    }
    return location.pathname === link.path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-black/30 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      {/* Liquid glass shimmer line — visible only when scrolled */}
      <div
        className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_30%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.2)_70%,transparent_100%)] ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline">
            <span className="text-[var(--color-text-heading)] font-bold text-xl tracking-[-0.02em]">
              Zen<span className="text-[var(--color-accent-muted)]">Edify</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative"
                  onMouseEnter={() => handleMouseEnter(link.dropdownType)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className={`flex items-center px-4 py-2 text-sm font-medium border-none cursor-pointer transition-all duration-150 bg-transparent gap-1.5 ${
                    isLinkActive(link)
                      ? 'text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}>
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className={`absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden transition-all duration-200 bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] backdrop-saturate-[160%] border border-[rgba(255,255,255,0.1)] shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] ${
                    activeDropdown === link.dropdownType
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  >
                    <div className="p-2">
                      {(link.dropdownType === 'domains' ? domains : services).map((item) => (
                        <Link key={item.name} to={item.path} onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text)] no-underline transition-all duration-150 hover:bg-white/10 hover:text-white"
                        >
                          <span>{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.name} to={link.path}
                  className={`px-4 py-2 text-sm font-medium no-underline transition-all duration-150 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
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
          <button
            className={`lg:hidden ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
              scrolled ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t border-white/[0.08] px-4 pb-4 pt-2 bg-[rgba(5,5,5,0.85)] backdrop-blur-[24px] backdrop-saturate-[180%] max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link to={link.path} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium no-underline transition-all duration-150 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3 mb-2">
                  {(link.dropdownType === 'domains' ? domains : services).map((s) => (
                    <Link key={s.name} to={s.path} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] no-underline hover:text-white hover:bg-white/[0.07] transition-all duration-150"
                    >
                      <span>{s.icon}</span>
                      <span>{s.name}</span>
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
