'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { stats } from '@/lib/data';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);

        return () => clearInterval(timer);
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={containerRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-[var(--color-surface)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1680px] 4xl:max-w-[2200px]">
        <div className="text-center mb-14">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl font-bold mb-3 text-[var(--color-text-heading)]">
            Our Track Record of Student Success
          </h2>
          <p className="text-[var(--color-text-muted)] text-[17px]">Numbers that speak to our commitment and excellence</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 xl:gap-6 3xl:gap-8">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-6 text-center bg-[var(--color-surface-2)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-3)]"
            >
              <div className="text-[28px] mb-2">{stat.icon}</div>
              <div className="font-display text-4xl font-bold mb-1 text-[var(--color-text-heading)]">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[var(--color-text-muted)] text-[13px] font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
