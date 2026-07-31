import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteInfo } from '@/shared/config/site';

export function CtaBanner() {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 sm:p-14 text-center shadow-xl">
          <div className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to Ace Your Assignment?
          </h2>
          <p className="mt-4 text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
            Join thousands of students who trust {siteInfo.name} for reliable, high-quality
            academic assistance. Get your free quote in minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-primary text-sm font-bold px-6 h-12 shadow-sm hover:bg-white/90 transition-all active:scale-[0.98] cursor-pointer"
            >
              Start Your Order
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${siteInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 text-white text-sm font-semibold px-6 h-12 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
