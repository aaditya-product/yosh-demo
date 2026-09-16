import type { BoardFilter } from './state';
import type { Request, RequestType } from './types';

// #0B8 is status 'open' with priority 'escalated'. It belongs under Escalated
// and must not also be counted under Open, or the board reads Open 3.
export function matchesFilter(request: Request, filter: BoardFilter) {
  switch (filter) {
    case 'all':
      return true;
    case 'new':
      return request.status === 'new';
    case 'open':
      return request.status === 'open' && request.priority !== 'escalated';
    case 'escalated':
      return request.priority === 'escalated';
    case 'cancel_requested':
      return request.status === 'cancelled';
  }
}

export const boardFilters: BoardFilter[] = ['all', 'new', 'open', 'escalated', 'cancel_requested'];

export const filterLabels: Record<BoardFilter, string> = {
  all: 'All',
  new: 'New',
  open: 'Open',
  escalated: 'Escalated',
  cancel_requested: 'Cancel req.',
};

// One request pane. Property chips narrow the same list; nothing selected
// means every property flows into it.
export function requestsForProperty(requests: Request[], propertyId: string | null) {
  return propertyId ? requests.filter((r) => r.property === propertyId) : requests;
}

export function filterCounts(requests: Request[]) {
  return Object.fromEntries(
    boardFilters.map((f) => [f, requests.filter((r) => matchesFilter(r, f)).length]),
  ) as Record<BoardFilter, number>;
}

const CLOSED: Request['status'][] = ['done', 'cancelled'];

// Minutes left before the SLA is breached. Negative once it is.
export function slaRemaining(request: Request, now: number) {
  const due = Date.parse(request.createdAt) + request.slaMinutes * 60_000;
  return Math.round((due - now) / 60_000);
}

export function slaState(request: Request, now: number): 'ok' | 'soon' | 'breached' | 'closed' {
  if (CLOSED.includes(request.status)) return 'closed';
  const left = slaRemaining(request, now);
  if (left < 0) return 'breached';
  if (left <= 10) return 'soon';
  return 'ok';
}

export function formatSla(request: Request, now: number) {
  const left = slaRemaining(request, now);
  if (left < 0) return `SLA ${Math.abs(left)} min over`;
  return `SLA ${left} min`;
}

export const typeLabels: Record<RequestType, string> = {
  service: 'Service',
  maintenance: 'Maintenance',
  asset: 'Asset',
  access: 'Access',
  concierge: 'Concierge',
  gathering: 'Gathering',
};

// Timeline entries store actor ids. Screens show names.
export function actorName(
  id: string,
  people: { staff: { id: string; name: string }[]; residents: { id: string; name: string }[] },
) {
  if (id === 'system') return 'System';
  if (id === 'ops') return 'Operations';
  return (
    people.staff.find((s) => s.id === id)?.name ??
    people.residents.find((r) => r.id === id)?.name ??
    id
  );
}

export const statusOptions: { value: Request['status']; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'open', label: 'Open' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const tagColor: Record<string, string> = {
  delayed: 'bg-tagDelayed',
  escalated: 'bg-tagEscalated',
  'high-priority': 'bg-tagHighPriority',
  reopened: 'bg-tagReopened',
  'on-hold': 'bg-tagOnHold',
  'need-attention': 'bg-tagNeedAttention',
};

const OPEN_STATUSES: Request['status'][] = ['new', 'open', 'assigned', 'in_progress'];

export type WorkloadSegment = { status: Request['status']; count: number };

export type Workload = {
  staffId: string;
  open: number;
  segments: WorkloadSegment[];
  closedToday: number;
  avgMinutes: number | null;
};

// Minutes from raised to the entry that closed it.
function completionMinutes(request: Request) {
  const closed = [...request.timeline].reverse().find((t) => t.event === 'Done');
  if (!closed) return null;
  return Math.round((Date.parse(closed.at) - Date.parse(request.createdAt)) / 60_000);
}

export function workloadFor(requests: Request[], staffId: string, now: number): Workload {
  const mine = requests.filter((r) => r.assignee === staffId);
  const open = mine.filter((r) => OPEN_STATUSES.includes(r.status));
  const segments = OPEN_STATUSES.map((status) => ({
    status,
    count: open.filter((r) => r.status === status).length,
  })).filter((s) => s.count > 0);

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const done = mine.filter((r) => r.status === 'done');
  const closedToday = done.filter((r) => {
    const closed = [...r.timeline].reverse().find((t) => t.event === 'Done');
    return closed ? Date.parse(closed.at) >= startOfDay.getTime() : false;
  }).length;

  const times = done.map(completionMinutes).filter((n): n is number => n !== null);
  const avgMinutes = times.length
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : null;

  return { staffId, open: open.length, segments, closedToday, avgMinutes };
}

// Heaviest first.
export function workloadBoard(requests: Request[], staff: { id: string }[], now: number) {
  return staff
    .map((s) => workloadFor(requests, s.id, now))
    .sort((a, b) => b.open - a.open);
}

export const segmentTone: Record<string, string> = {
  new: 'bg-statusLive',
  open: 'bg-primary',
  assigned: 'bg-ink',
  in_progress: 'bg-statusLive',
};
