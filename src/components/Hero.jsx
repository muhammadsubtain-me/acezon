import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

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
    <section className="relative overflow-hidden bg-[var(--color-hero-bg)] min-h-[90vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-24 w-[440px] h-[440px] bg-white/[0.03] rounded-full blur-[90px]" />
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] bg-white/[0.02] rounded-full blur-[80px]" />
        <HeroDots />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[var(--color-text-heading)]">
          Get Help From{' '}
          <span className="text-[var(--color-accent-muted)]">Academic</span>{' '}
          Experts
        </h1>
        <p className="mx-auto text-center text-[var(--color-text-muted)] text-lg leading-[1.7] mb-8 max-w-[560px]">
          Get academic assistance from ZenEdify to earn the grades you desire. We have top professionals in academic assignment writing, essay writing, dissertation proposals, homework, exam preparation and lab task practical services.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/contact" className="inline-flex items-center gap-2">
              Hire Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/samples">View Samples</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 leading-[0]">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          className="block w-full h-[100px]">
          <defs>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d="M0,100 C360,50 1080,50 1440,100 L1440,100 L0,100 Z" fill="#111111" />
          <path d="M0,100 C360,50 1080,50 1440,100" fill="none"
            stroke="rgba(255,255,255,0.45)" strokeWidth="3" filter="url(#glowFilter)" />
        </svg>
      </div>
    </section>
  );
}
