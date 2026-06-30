import { getTeamColor, getTeamInitials } from '../lib/format';

export default function MemberAvatar({ name, size = 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-xl bg-gradient-to-br ${getTeamColor(name)} flex items-center justify-center font-bold text-white shrink-0`}>
      {getTeamInitials(name)}
    </div>
  );
}
