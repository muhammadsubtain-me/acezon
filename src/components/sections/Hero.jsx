'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function HeroDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COLORS = [
      'rgba(255, 255, 255, VAL)',
      'rgba(220, 220, 220, VAL)',
      'rgba(180, 180, 180, VAL)',
      'rgba(140, 140, 140, VAL)',
      'rgba(255, 255, 255, VAL)',
    ];

    let W, H, dots, raf;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function makeDot() {
      const r = 1.5 + Math.random() * 3;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const alpha = 0.2 + Math.random() * 0.5;
      return {
        x: Math.random() * W, y: Math.random() * H, r,
        color: color.replace('VAL', alpha),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.006 + Math.random() * 0.012,
        baseR: r, alpha,
      };
    }

    function init() {
      resize();
      const count = Math.floor((W * H) / 12000);
      dots = Array.from({ length: count }, makeDot);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      dots.forEach(d => {
        d.pulse += d.pulseSpeed;
        const scale = 1 + Math.sin(d.pulse) * 0.2;
        d.x += d.vx; d.y += d.vy;
        if (d.x < -20) d.x = W + 20;
        if (d.x > W + 20) d.x = -20;
        if (d.y < -20) d.y = H + 20;
        if (d.y > H + 20) d.y = -20;
        const R = d.baseR * scale;
        const outerGrd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, R * 12);
        outerGrd.addColorStop(0, `rgba(255,255,255,${d.alpha * 0.18})`);
        outerGrd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(d.x, d.y, R * 12, 0, Math.PI * 2);
        ctx.fillStyle = outerGrd; ctx.fill();
        const innerGrd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, R * 6);
        innerGrd.addColorStop(0, `rgba(255,255,255,${d.alpha * 0.45})`);
        innerGrd.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(d.x, d.y, R * 6, 0, Math.PI * 2);
        ctx.fillStyle = innerGrd; ctx.fill();
        ctx.beginPath(); ctx.arc(d.x, d.y, R, 0, Math.PI * 2);
        ctx.fillStyle = d.color; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    init(); draw();
    window.addEventListener('resize', init);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-hero-bg)] min-h-screen flex items-center -mt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-24 w-[440px] h-[440px] bg-white/[0.03] rounded-full blur-[90px]" />
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] bg-white/[0.02] rounded-full blur-[80px]" />
        <HeroDots />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 3xl:px-0 pt-28 pb-32 xl:pt-36 xl:pb-44 3xl:pt-44 3xl:pb-52 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold leading-tight mb-6 text-[var(--color-text-heading)]">
          Get Help From{' '}
          <span className="text-[var(--color-accent-muted)]">Academic</span>{' '}
          Experts
        </h1>
        <p className="mx-auto text-center text-[var(--color-text-muted)] text-base md:text-lg xl:text-xl 3xl:text-2xl leading-[1.7] mb-8 max-w-[560px] xl:max-w-[680px] 3xl:max-w-[860px]">
          Get expert academic assistance from Acezon to earn the grades you desire. Our professional team specializes in Mechanical, Electrical, Chemical Engineering, and CS &amp; IT — delivering premium support for homework assignments, coding tasks, lab projects, exam preparation, and technical report writing.
        </p>

        <div className="flex flex-col sm:flex-row md:flex-row gap-3 md:gap-4 xl:gap-5 justify-center">
          <Button size="lg" asChild>
            <Link href="/order" className="inline-flex items-center gap-2">
              Hire Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/samples">View Samples</Link>
          </Button>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_15%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.7)_60%,rgba(255,255,255,0.15)_85%,transparent_100%)] shadow-[0_0_8px_1px_rgba(255,255,255,0.35),0_0_24px_4px_rgba(255,255,255,0.15)]"
      />
    </section>
  );
}
