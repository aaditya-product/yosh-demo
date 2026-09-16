import type { RequestStatus } from '../store';

// Single source of truth for status presentation across Genie and Luna.
export type BadgeStatus = RequestStatus | 'escalated';

const look: Record<BadgeStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-statusLive text-textOnPrimary' },
  open: { label: 'Open', className: 'bg-primary text-textOnPrimary' },
  assigned: { label: 'Assigned', className: 'bg-primary text-textOnPrimary' },
  in_progress: { label: 'In progress', className: 'bg-statusLive text-textOnPrimary' },
  done: { label: 'Done', className: 'bg-surfaceMuted text-textMuted' },
  cancelled: { label: 'Cancelled', className: 'bg-surfaceMuted text-textMuted' },
  escalated: { label: 'Escalated', className: 'bg-statusEscalated text-textOnPrimary' },
};

export const statusLabel = (status: BadgeStatus) => look[status].label;

// Genie calls a request the resident just raised "Sent". The underlying status
// is unchanged — this is the resident's word for it, not a second status model.
const residentOverride: Partial<Record<BadgeStatus, { label: string; className: string }>> = {
  new: { label: 'Sent', className: 'bg-surfaceMuted text-textMuted' },
  open: { label: 'Sent', className: 'bg-surfaceMuted text-textMuted' },
};

export function StatusBadge({
  status,
  audience = 'staff',
  ...rest
}: {
  status: BadgeStatus;
  audience?: 'staff' | 'resident';
  'data-id'?: string;
}) {
  const { label, className } =
    (audience === 'resident' ? residentOverride[status] : undefined) ?? look[status];
  return (
    <span className={`inline-flex items-center rounded-pill px-sm py-xs text-meta ${className}`} {...rest}>
      {label}
    </span>
  );
}
