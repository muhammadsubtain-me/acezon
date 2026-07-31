'use client';

import { Search, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select } from '@/components/ui/select';
import { ALL_QUEUES } from '@/config/queue-config';
import { QUEUE_ICON_MAP } from '@/config/queue-icons';
import type { AdminInquiryStats } from '@/features/orders/services/admin-orders';

const SERVICE_FILTER_OPTIONS = [
  { value: 'all',        label: 'All Services' },
  { value: 'essay',      label: 'Essay' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'proofread',  label: 'Proofreading' },
  { value: 'other',      label: 'Custom / Other' },
];

const CONTACT_FILTER_OPTIONS = [
  { value: 'all',       label: 'All Channels' },
  { value: 'whatsapp',  label: 'WhatsApp' },
  { value: 'email',     label: 'Email' },
];

const URGENCY_FILTER_OPTIONS = [
  { value: 'all',     label: 'All Urgencies' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'urgent',  label: 'Urgent (< 24h)' },
  { value: 'ontrack', label: 'On Track (> 24h)' },
];

interface FilterBarProps {
  stats: AdminInquiryStats;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  serviceFilter: string;
  onServiceFilterChange: (value: string) => void;
  contactFilter: string;
  onContactFilterChange: (value: string) => void;
  urgencyFilter: string;
  onUrgencyFilterChange: (value: string) => void;
  onExportCSV: () => void;
}

export function FilterBar({
  stats,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  serviceFilter,
  onServiceFilterChange,
  contactFilter,
  onContactFilterChange,
  urgencyFilter,
  onUrgencyFilterChange,
  onExportCSV,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-subtle">
            <Search className="w-4 h-4" />
          </div>
          <Input
            type="text"
            placeholder="Search by contact or service..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 text-xs w-full"
          />
        </div>

        <Tabs
          value={statusFilter}
          onValueChange={onStatusFilterChange}
          className="w-full md:w-auto shrink-0"
        >
          <TabsList className="flex flex-wrap h-auto gap-1">
            {ALL_QUEUES.map((q) => {
              const Icon = QUEUE_ICON_MAP[q.iconName];
              const count = q.countKey ? (stats[q.countKey] ?? 0) : 0;
              return (
                <TabsTrigger key={q.id} value={q.id} className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${q.color}`} />
                  <span>
                    {q.label}
                    {!q.isCounterless ? ` (${count})` : ''}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-surface-lvl2/60 border border-border-lvl2 rounded-xl text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-text-subtle flex items-center gap-1 uppercase tracking-wider text-[11px]">
            <Filter className="w-3.5 h-3.5 text-primary" />
            Filters:
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] font-medium">Service:</span>
            <Select
              value={serviceFilter}
              onValueChange={onServiceFilterChange}
              options={SERVICE_FILTER_OPTIONS}
              className="h-7 w-36 rounded-md bg-surface-lvl1 py-1 text-xs"
              aria-label="Filter by service"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] font-medium">Contact:</span>
            <Select
              value={contactFilter}
              onValueChange={onContactFilterChange}
              options={CONTACT_FILTER_OPTIONS}
              className="h-7 w-34 rounded-md bg-surface-lvl1 py-1 text-xs"
              aria-label="Filter by contact channel"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] font-medium">Urgency:</span>
            <Select
              value={urgencyFilter}
              onValueChange={onUrgencyFilterChange}
              options={URGENCY_FILTER_OPTIONS}
              className="h-7 w-40 rounded-md bg-surface-lvl1 py-1 text-xs"
              aria-label="Filter by urgency"
            />
          </div>
        </div>

        <Button size="sm" variant="outline" onClick={onExportCSV} className="h-7 text-xs px-2.5">
          <Download className="w-3.5 h-3.5 mr-1" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
