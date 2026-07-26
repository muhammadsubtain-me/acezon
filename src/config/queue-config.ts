import type { AdminInquiryStats } from '@/features/orders/services/admin-orders';

export interface QueueDefinition {
  id: string;
  label: string;
  iconName: 'Inbox' | 'Briefcase' | 'Send' | 'CheckCircle2' | 'Users' | 'Clock' | 'Cog' | 'FileText';
  color: string;           // e.g. text-amber-500
  bgColor: string;         // e.g. bg-amber-500/10
  borderColor: string;     // e.g. border-amber-500/20
  description: string;
  isCounterless?: boolean;
  hasActionsColumn?: boolean;
  countKey?: keyof AdminInquiryStats;
  showInSummaryCards?: boolean;
  summaryOrder?: number;
}

export const QUEUES: Record<string, QueueDefinition> = {
  new: {
    id: 'new',
    label: 'Inbox',
    iconName: 'Inbox',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    description: 'Pending new orders',
    hasActionsColumn: true,
    countKey: 'newCount',
    showInSummaryCards: true,
    summaryOrder: 1,
  },
  my_work: {
    id: 'my_work',
    label: 'Active Tasks',
    iconName: 'Briefcase',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'Assigned to you',
    hasActionsColumn: true,
    countKey: 'myWorkCount',
    showInSummaryCards: true,
    summaryOrder: 2,
  },
  delivered: {
    id: 'delivered',
    label: 'Delivered',
    iconName: 'Send',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    description: 'Delivered orders',
    hasActionsColumn: false,
    countKey: 'deliveredCount',
    showInSummaryCards: true,
    summaryOrder: 3,
  },
  completed: {
    id: 'completed',
    label: 'Completed',
    iconName: 'CheckCircle2',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    description: 'Completed orders',
    hasActionsColumn: false,
    countKey: 'completedCount',
    showInSummaryCards: true,
    summaryOrder: 4,
  },
  team: {
    id: 'team',
    label: 'Team',
    iconName: 'Users',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    description: 'Global team overview',
    isCounterless: true,
    hasActionsColumn: false,
    countKey: 'teamCount',
    showInSummaryCards: false,
  },
};

export const SUMMARY_CARDS = Object.values(QUEUES)
  .filter((q) => q.showInSummaryCards)
  .sort((a, b) => (a.summaryOrder || 0) - (b.summaryOrder || 0));

export const ALL_QUEUES = Object.values(QUEUES);

export function getQueueConfig(id: string): QueueDefinition {
  return QUEUES[id] || QUEUES.new;
}
