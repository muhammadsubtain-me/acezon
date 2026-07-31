export type StatusBadgeVariant =
  | 'new'
  | 'claimed'
  | 'progress'
  | 'delivered'
  | 'completed'
  | 'destructive'
  | 'outline';

export function getStatusBadgeVariant(status: string): StatusBadgeVariant {
  switch (status) {
    case 'new':         return 'new';
    case 'claimed':     return 'claimed';
    case 'in_progress': return 'progress';
    case 'delivered':   return 'delivered';
    case 'completed':   return 'completed';
    case 'rejected':    return 'destructive';
    default:            return 'outline';
  }
}
