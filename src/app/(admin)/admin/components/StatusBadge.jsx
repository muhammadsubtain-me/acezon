import { STATUS_META } from '../lib/constants';

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
