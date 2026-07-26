'use client';

import React from 'react';
import {
  Inbox, Briefcase, Send, CheckCircle2, Users, Clock, Cog, FileText,
  Search, Filter, Download,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ALL_QUEUES } from '@/config/queue-config';
import type { AdminInquiryStats } from '@/features/orders/services/admin-orders';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Inbox, Briefcase, Send, CheckCircle2, Users, Clock, Cog, FileText,
};

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
        {/* Search Bar */}
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

        {/* Queue Tabs */}
        <Tabs
          value={statusFilter}
          onValueChange={onStatusFilterChange}
          className="w-full md:w-auto shrink-0"
        >
          <TabsList className="flex flex-wrap h-auto gap-1">
            {ALL_QUEUES.map((q) => {
              const Icon = ICON_MAP[q.iconName] || Inbox;
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

      {/* Advanced Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-surface-lvl2/60 border border-border-lvl2 rounded-xl text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-text-subtle flex items-center gap-1 uppercase tracking-wider text-[11px]">
            <Filter className="w-3.5 h-3.5 text-primary" />
            Filters:
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] font-medium">Service:</span>
            <select
              value={serviceFilter}
              onChange={(e) => onServiceFilterChange(e.target.value)}
              className="bg-surface-lvl1 border border-border-lvl2 text-text-main rounded-md px-2 py-1 text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">All Services</option>
              <option value="essay">Essay</option>
              <option value="assignment">Assignment</option>
              <option value="proofread">Proofreading</option>
              <option value="other">Custom / Other</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] font-medium">Contact:</span>
            <select
              value={contactFilter}
              onChange={(e) => onContactFilterChange(e.target.value)}
              className="bg-surface-lvl1 border border-border-lvl2 text-text-main rounded-md px-2 py-1 text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">All Channels</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] font-medium">Urgency:</span>
            <select
              value={urgencyFilter}
              onChange={(e) => onUrgencyFilterChange(e.target.value)}
              className="bg-surface-lvl1 border border-border-lvl2 text-text-main rounded-md px-2 py-1 text-xs focus:outline-none focus:border-primary"
            >
              <option value="all">All Urgencies</option>
              <option value="overdue">🔴 Overdue</option>
              <option value="urgent">🟠 Urgent (&lt; 24h)</option>
              <option value="ontrack">🟢 On Track (&gt; 24h)</option>
            </select>
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
