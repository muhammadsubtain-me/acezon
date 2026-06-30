// ─── Acezon Team Configuration ────────────────────────────────────────────────
// Single source of truth for all team-member data.
// Add new members here only — the admin dashboard components import from here.

export const TEAM_AVATARS = {
  Zain:    { initials: 'Z', color: 'from-violet-500 to-purple-600' },
  Hasnain: { initials: 'H', color: 'from-blue-500 to-cyan-600' },
  Sibtain: { initials: 'S', color: 'from-emerald-500 to-teal-600' },
};

// Maps admin login email → display name used throughout the dashboard
export const EMAIL_TO_NAME = {
  'admsibtain@acezon.app': 'Sibtain',
  'admzain@acezon.app':    'Zain',
  'admhasnain@acezon.app': 'Hasnain',
};
