import { AlertCircle, Zap, CheckCircle2 } from 'lucide-react';

export default function StatsRow({ stats }) {
  const cards = [
    { label: 'Unclaimed',       value: stats.unclaimed,      icon: AlertCircle,  color: 'text-amber-400',   bg: 'bg-amber-400/[0.06]'  },
    { label: 'My Active',       value: stats.myActive,       icon: Zap,          color: 'text-violet-400',  bg: 'bg-violet-400/[0.06]' },
    { label: 'Completed Today', value: stats.completedToday, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/[0.06]' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[var(--color-text-muted)] text-xs font-medium">{c.label}</span>
              <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${c.color}`} />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-[var(--color-text-heading)]">{c.value}</div>
          </div>
        );
      })}
    </div>
  );
}
