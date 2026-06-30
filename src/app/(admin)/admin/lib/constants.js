// ─── Admin dashboard constants ─────────────────────────────────────────────────

export const STATUS_META = {
  new:         { label: 'New',         dot: 'bg-blue-400',    badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20'     },
  claimed:     { label: 'Claimed',     dot: 'bg-amber-400',   badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20'   },
  in_progress: { label: 'In Progress', dot: 'bg-violet-400',  badge: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  completed:   { label: 'Completed',   dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
};

export const FILTER_TABS = [
  { key: 'inbox', label: 'Inbox' },
  { key: 'work',  label: 'My Work' },
  { key: 'done',  label: 'Done' },
];

export const TABLE_HEADERS       = ['Client', 'Contact', 'Service', 'Subject', 'Time', 'Status', 'Assigned', 'Actions'];
export const TABLE_HEADERS_TEAM  = ['Client', 'Contact', 'Service', 'Subject', 'Time', 'Status', 'Assigned'];
export const HEADER_HIDDEN_CLASS = { Service: 'hidden lg:table-cell', Subject: 'hidden md:table-cell', Time: 'hidden xl:table-cell', Assigned: 'hidden md:table-cell' };
