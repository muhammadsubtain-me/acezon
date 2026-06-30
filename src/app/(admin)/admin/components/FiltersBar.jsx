import { Search, X, Users } from 'lucide-react';
import { FILTER_TABS } from '../lib/constants';

export default function FiltersBar({ search, setSearch, activeTab, setActiveTab, counts }) {
  const isTeamView = activeTab === 'team';

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-faint)] pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name, subject, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-focus)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <div className="flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-x-auto">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                activeTab === tab.key ? 'bg-white text-black' : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
            >
              {tab.label}
              {counts[tab.key] > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.key ? 'bg-black/20' : 'bg-white/10'}`}>
                  {counts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveTab(isTeamView ? 'inbox' : 'team')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            isTeamView
              ? 'bg-violet-500/15 text-violet-400 border-violet-500/30 hover:bg-violet-500/25'
              : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-white hover:border-[var(--color-border-hover)]'
          }`}
          title="Toggle team view"
        >
          <Users className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Team Activity</span>
        </button>
      </div>
    </div>
  );
}
