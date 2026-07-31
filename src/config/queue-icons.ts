import type { ComponentType } from 'react';
import {
  Inbox, Briefcase, Send, CheckCircle2, Users, Clock, Cog, FileText,
} from 'lucide-react';

/**
 * Maps iconName strings from QueueDefinition to their Lucide icon components.
 * Used by FilterBar and MetricCards — keep in sync with QueueDefinition.iconName.
 */
export const QUEUE_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Inbox,
  Briefcase,
  Send,
  CheckCircle2,
  Users,
  Clock,
  Cog,
  FileText,
};
