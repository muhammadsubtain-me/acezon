import { Inbox } from 'lucide-react';

export default function EmptyState({ activeTab, search }) {
  const isSearching = Boolean(search.trim());
  const emptyCopy = {
    inbox: 'No unclaimed inquiries',
    work:  'No active work',
    team:  'No assigned inquiries',
    done:  'No completed inquiries yet',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center mb-5">
        <Inbox className="w-7 h-7 text-[var(--color-text-faint)]" />
      </div>
      <h3 className="font-semibold text-[var(--color-text-heading)] mb-2">
        {isSearching ? 'No results found' : emptyCopy[activeTab] || 'No inquiries yet'}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
        {isSearching
          ? 'Try adjusting your search or filter.'
          : 'When clients submit the Hire Expert form, inquiries will appear here.'}
      </p>
    </div>
  );
}
