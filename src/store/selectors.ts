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
