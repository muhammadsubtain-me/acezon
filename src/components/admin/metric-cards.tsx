import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { SUMMARY_CARDS } from '@/config/queue-config';
import { QUEUE_ICON_MAP } from '@/config/queue-icons';
import type { AdminInquiryStats } from '@/features/orders/services/admin-orders';

interface MetricCardsProps {
  stats: AdminInquiryStats;
}

export function MetricCards({ stats }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SUMMARY_CARDS.map((card) => {
        const Icon = QUEUE_ICON_MAP[card.iconName];
        const count = card.countKey ? (stats[card.countKey] ?? 0) : 0;
        return (
          <Card key={card.id} className="border-border-lvl2 bg-surface-lvl2">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{card.label}</span>
              <div className={`w-8 h-8 rounded-lg ${card.bgColor} ${card.color} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className={`text-2xl font-extrabold ${card.color}`}>{count}</div>
              <p className="text-xs text-text-muted mt-1">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
