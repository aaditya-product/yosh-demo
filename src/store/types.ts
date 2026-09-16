export type RequestType =
  | 'service'
  | 'maintenance'
  | 'asset'
  | 'access'
  | 'concierge'
  | 'gathering';

export type RequestOrigin = 'voice' | 'chat' | 'catalogue' | 'inspection' | 'command';

export type RequestStatus =
  | 'new'
  | 'open'
  | 'assigned'
  | 'in_progress'
  | 'done'
  | 'cancelled';

export type RequestPriority = 'normal' | 'high' | 'escalated';

export type ExternalSystem = 'D365' | 'CAFM';

export type RequestItem = { label: string; qty: number };

// 02-ia.md types this as { at, actor, event }. B2 needs a two-way thread as
// well as an audit trail, so entries carry a kind and live in one array —
// the trail then shows everything, in order, which is what C4 asks for.
export type TimelineEntry = {
  at: string;
  actor: string;
  event: string;
  kind?: 'event' | 'message';
};

export type ExternalRef = { system: ExternalSystem; ref: string };

// Tags shown on the request's dot pill. Delayed and Escalated are written by
// the system; the rest are set by staff from the Select tags sheet.
export const TAGS = [
  { id: 'delayed', label: 'Delayed', system: true },
  { id: 'escalated', label: 'Escalated', system: true },
  { id: 'high-priority', label: 'High Priority', system: false },
  { id: 'reopened', label: 'Reopened', system: true },
  { id: 'on-hold', label: 'On Hold', system: false },
  { id: 'need-attention', label: 'Need Attention', system: false },
] as const;

export type TagId = (typeof TAGS)[number]['id'];

export type Request = {
  id: string;
  ref: string;
  type: RequestType;
  property: string;
  requester: string;
  origin: RequestOrigin;
  title: string;
  items: RequestItem[];
  status: RequestStatus;
  priority: RequestPriority;
  assignee: string | null;
  eta: string | null;
  slaMinutes: number;
  createdAt: string;
  timeline: TimelineEntry[];
  external: ExternalRef | null;
  tags: TagId[];
};

export type Property = { id: string; name: string; shortName: string };

export type Resident = { id: string; name: string; propertyId: string; initials: string };

export type Staff = {
  id: string;
  name: string;
  role: string;
  initials: string;
  department: string;
};

export type RegistryFacet = 'general' | 'wardrobe' | 'art' | 'fleet';

export type RegistryItem = {
  id: string;
  facet: RegistryFacet;
  name: string;
  category: string;
  location: string;
  qty: number;
  status: string;
  owner?: string;
  storage?: string;
  condition?: string;
  lastCare?: string;
  artist?: string;
  valuationDate?: string;
  reg?: string;
  driver?: string;
  nextService?: string;
};

export type InspectionResult = 'pass' | 'fail' | 'na';

export type InspectionItem = {
  id: string;
  area: string;
  check: string;
  result: InspectionResult | null;
  finding?: Finding;
};

export type Inspection = {
  id: string;
  name: string;
  area: string;
  propertyId: string;
  assigneeId: string;
  dueAt: string;
  items: InspectionItem[];
};

export type FindingSeverity = 'low' | 'medium' | 'high';

export type Finding = {
  severity: FindingSeverity;
  note: string;
  photo: string | null;
};

export type ActionPlanStatus = 'open' | 'in_progress' | 'closed';

export type ActionPlan = {
  id: string;
  finding: string;
  inspectionId: string;
  ownerId: string;
  dueAt: string;
  status: ActionPlanStatus;
  requestRef: string | null;
};

export type ServiceOption = { id: string; label: string; values: string[] };

export type Service = {
  id: string;
  name: string;
  category: string;
  mood: string;
  description: string;
  longCopy: string;
  priceFrom: number;
  options: ServiceOption[];
};
