import React from 'react';
import { GraduationCap, Mail, Phone, MessageSquare, MapPin } from 'lucide-react';
import { siteInfo, paymentMethods } from '@/shared/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-lvl1 border-t border-border-lvl2 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-text-main text-lg tracking-tight">{siteInfo.name}</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">{siteInfo.tagline}</p>
            <div className="flex items-center gap-2 text-xs text-text-subtle">
              <MapPin className="w-3.5 h-3.5" />
              <span>{siteInfo.address}</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-subtle mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Essay Writing', href: '#services' },
                { label: 'Assignments', href: '#services' },
                { label: 'Proofreading', href: '#services' },
                { label: 'Dissertations', href: '#services' },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-subtle mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Services', href: '/services' },
                { label: 'Why Choose Us', href: '/benefits' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-subtle mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteInfo.supportEmail}`}
                  className="flex items-center gap-2.5 text-sm text-text-muted hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {siteInfo.supportEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-text-muted hover:text-primary transition-colors"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  WhatsApp Chat
                </a>
              </li>
              {siteInfo.supportPhones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-12 pt-8 border-t border-border-lvl2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs font-semibold text-text-subtle uppercase tracking-wider mr-1">We Accept</span>
              {paymentMethods.map((m) => (
                <div
                  key={m.name}
                  className="h-8 px-3 rounded-md bg-surface-lvl2 border border-border-lvl2 flex items-center text-xs font-bold text-text-muted"
                >
                  {m.name}
                </div>
              ))}
            </div>
            <p className="text-xs text-text-subtle text-center sm:text-right">{siteInfo.copyright.replace('2026', String(year))}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
