'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { siteInfo } from '@/shared/config/site';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#features' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-lvl1/90 backdrop-blur-lg border-b border-border-lvl2 shadow-2xs'
          : 'bg-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Acezon home"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-text-main text-lg tracking-tight">{siteInfo.name}</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-3.5 py-2 text-sm font-semibold text-text-muted hover:text-text-main rounded-lg hover:bg-surface-lvl1 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#order')}
            className="ml-2 inline-flex items-center justify-center rounded-lg bg-primary text-white text-sm font-semibold px-4 h-9 shadow-sm hover:bg-primary-hover transition-colors active:scale-[0.98] cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-text-main hover:bg-surface-lvl1 transition-colors cursor-pointer"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-lvl1 border-b border-border-lvl2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left px-3 py-2.5 text-sm font-semibold text-text-muted hover:text-text-main hover:bg-surface-lvl2 rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#order')}
              className="block w-full text-center mt-2 rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2.5 shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
