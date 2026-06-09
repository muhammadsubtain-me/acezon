import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Clients', icon: '😊' },
  { value: 4800, suffix: '+', label: 'Feedbacks', icon: '💬' },
  { value: 200, suffix: '+', label: 'Expert Tutors', icon: '👩‍🏫' },
  { value: 10000, suffix: '+', label: 'Completed Projects', icon: '🏆' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[var(--color-surface)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-[var(--color-text-heading)]">
            Better Strategy With Quality Business
          </h2>
          <p className="text-[var(--color-text-muted)] text-[17px]">Numbers that speak to our commitment and excellence</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label}
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
