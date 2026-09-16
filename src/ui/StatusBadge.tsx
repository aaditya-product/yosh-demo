import type { RequestStatus } from '../store';

// Single source of truth for status presentation across Genie and Luna.
export type BadgeStatus = RequestStatus | 'escalated';

// Measured on luna-dev: a white pill outlined in borderMuted, the label in the
// status colour at type.status. The colour carries the meaning, not the fill.
const look: Record<BadgeStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'text-statusLive' },
  open: { label: 'Open', className: 'text-primary' },
  assigned: { label: 'Assigned', className: 'text-primary' },
  in_progress: { label: 'In progress', className: 'text-statusLive' },
  done: { label: 'Done', className: 'text-textMuted' },
  cancelled: { label: 'Cancelled', className: 'text-textMuted' },
  escalated: { label: 'Escalated', className: 'text-statusEscalated' },
};

export const statusLabel = (status: BadgeStatus) => look[status].label;

// Genie calls a request the resident just raised "Sent". The underlying status
// is unchanged — this is the resident's word for it, not a second status model.
const residentOverride: Partial<Record<BadgeStatus, { label: string; className: string }>> = {
  new: { label: 'Sent', className: 'text-textMuted' },
  open: { label: 'Sent', className: 'text-textMuted' },
};

// The label half of the single source of truth, reusable without the Luna-
// styled pill below — Genie screens style their own pill on genie tokens
// (checklist item 1) but must not invent a second status vocabulary.
export const residentStatusLabel = (status: BadgeStatus) =>
  (residentOverride[status] ?? look[status]).label;

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
    <span
      className={`inline-flex h-statusPill shrink-0 items-center rounded-pill border border-borderMuted bg-surface px-md text-status ${className}`}
      {...rest}
    >
      {label}
    </span>
  );
}
