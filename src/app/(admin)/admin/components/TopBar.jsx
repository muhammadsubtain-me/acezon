import { LogOut } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import MemberAvatar from './MemberAvatar';

export default function TopBar({ userName, inquiries, onLogout }) {
  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <header className="sticky top-0 z-30 bg-black/60 backdrop-blur-[20px] border-b border-white/[0.07]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <Logo className="w-7 h-7" />
          <span className="font-bold text-white text-base tracking-[-0.02em] hidden sm:block">Acezon</span>
          <span className="text-[var(--color-border-hover)] text-sm hidden sm:block">/</span>
          <span className="text-[var(--color-text-muted)] text-sm font-medium hidden sm:block">Admin</span>
        </div>

        {newCount > 0 && (
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {newCount} new
          </span>
        )}

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            <MemberAvatar name={userName} size="sm" />
            <span className="text-sm font-medium text-[var(--color-text)] hidden sm:block">{userName}</span>
          </div>
          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-faint)] hover:text-white hover:bg-white/[0.06] transition-all"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
