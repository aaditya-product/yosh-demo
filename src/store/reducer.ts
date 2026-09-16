import type { NewRequest, StoreAction } from './actions';
import type { Entities, State } from './state';
import { initialState, initialUi } from './state';
import type { Request, RequestStatus } from './types';

const entitiesOf = (s: State): Entities => ({
  properties: s.properties,
  residents: s.residents,
  staff: s.staff,
  requests: s.requests,
  registry: s.registry,
  inspections: s.inspections,
  actionPlans: s.actionPlans,
  services: s.services,
  scheduleTemplates: s.scheduleTemplates,
  weather: s.weather,
});

const now = () => new Date().toISOString();

const makeRef = (n: number) => `#${n.toString(16).toUpperCase().padStart(3, '0')}`;

// A button that says Assign produces a line that says Assigned. Statuses read
// the way they read on the badge, never as the raw enum.
const statusText: Record<RequestStatus, string> = {
  new: 'New',
  open: 'Open',
  assigned: 'Assigned',
  in_progress: 'In progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

const clock = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

const entry = (actor: string, event: string, kind: 'event' | 'message' = 'event') => ({
  at: now(),
  actor,
  event,
  kind,
});

function patchRequest(
  state: State,
  id: string,
  patch: (r: Request) => Request,
): State {
  return {
    ...state,
    requests: state.requests.map((r) => (r.id === id ? patch(r) : r)),
  };
}

// Shared by 'createRequest' and 'generateFromTemplate' — a request raised by a
// person and one raised by the schedule engine are built the same way.
function buildRequest(n: number, r: NewRequest): Request {
  return {
    id: r.id ?? `REQ-${String(1000 + n)}`,
    ref: r.ref ?? makeRef(n),
    type: r.type,
    property: r.property,
    requester: r.requester ?? 'system',
    origin: r.origin,
    title: r.title,
    items: r.items ?? [],
    status: r.status ?? 'new',
    priority: r.priority ?? 'normal',
    assignee: r.assignee ?? null,
    eta: r.eta ?? null,
    slaMinutes: r.slaMinutes ?? 60,
    createdAt: r.createdAt ?? now(),
    timeline: r.timeline ?? [entry(r.requester ?? 'system', 'Raised')],
    external: r.external ?? null,
    tags: r.tags ?? [],
  };
}

// Weekly cadence: the same weekday and time, seven days on.
const oneWeekLater = (iso: string) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + 7);
  return d.toISOString();
};

export function reducer(state: State, action: StoreAction): State {
  switch (action.kind) {
    case 'seed':
      return {
        ...state,
        ...action.entities,
        refCounter: action.refSeed ?? action.entities.requests.length,
        undo: null,
        ui: { ...initialUi, selectedPropertyId: action.selectedPropertyId },
      };

    case 'reset':
      return initialState;

    case 'checkpoint':
      return { ...state, undo: entitiesOf(state) };

    case 'createRequest': {
      const n = state.refCounter + 1;
      const request = buildRequest(n, action.request);
      return {
        ...state,
        refCounter: n,
        requests: [request, ...state.requests],
      };
    }

    case 'generateFromTemplate': {
      const template = state.scheduleTemplates.find((t) => t.id === action.templateId);
      if (!template) return state;

      const n = state.refCounter + 1;
      const request = buildRequest(n, {
        type: template.requestType,
        title: template.requestTitle,
        origin: 'schedule',
        property: template.propertyId,
        requester: 'system',
        timeline: [entry('system', 'Raised', 'event')],
      });

      return {
        ...state,
        refCounter: n,
        requests: [request, ...state.requests],
        scheduleTemplates: state.scheduleTemplates.map((t) =>
          t.id === template.id
            ? {
                ...t,
                nextDueAt: oneWeekLater(t.nextDueAt),
                generatedRequestIds: [...t.generatedRequestIds, request.id],
              }
            : t,
        ),
      };
    }

    case 'assignRequest': {
      const name = state.staff.find((s) => s.id === action.staffId)?.name ?? action.staffId;
      return patchRequest(state, action.id, (r) => ({
        ...r,
        assignee: action.staffId,
        timeline: [...r.timeline, entry('ops', `Assigned to ${name}`)],
      }));
    }

    case 'setEta':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        eta: action.eta,
        timeline: [...r.timeline, entry('ops', `Arriving ${clock(action.eta)}`)],
      }));

    case 'setStatus':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        status: action.status,
        timeline: [...r.timeline, entry('ops', statusText[action.status])],
      }));

    case 'setPriority':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        priority: action.priority,
        timeline: [
          ...r.timeline,
          entry('system', action.priority === 'escalated' ? 'Escalated' : `Priority ${action.priority}`),
        ],
      }));

    case 'setExternal':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        external: action.external,
        timeline: [
          ...r.timeline,
          entry('system', `Sent to ${action.external.system} · ${action.external.ref}`),
        ],
      }));

    case 'setTags':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        tags: action.tags as Request['tags'],
      }));

    case 'addMessage':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        timeline: [...r.timeline, entry(action.actor, action.body, 'message')],
      }));

    case 'cancelRequest':
      return patchRequest(state, action.id, (r) => ({
        ...r,
        status: 'cancelled',
        timeline: [...r.timeline, entry(action.actor, 'Cancelled')],
      }));

    case 'setInspectionResult':
      return {
        ...state,
        inspections: state.inspections.map((i) =>
          i.id === action.inspectionId
            ? {
                ...i,
                items: i.items.map((it) =>
                  it.id === action.itemId ? { ...it, result: action.result } : it,
                ),
              }
            : i,
        ),
      };

    case 'expandFindingForm':
      return {
        ...state,
        ui: {
          ...state.ui,
          findingDraft: state.ui.findingDraft ?? {
            expanded: true,
            severity: 'medium',
            note: '',
            photo: null,
          },
        },
      };

    case 'fillFinding':
      return {
        ...state,
        ui: {
          ...state.ui,
          findingDraft: {
            expanded: true,
            severity: action.severity,
            note: action.note,
            photo: action.photo,
          },
        },
      };

    case 'recordFinding':
      return {
        ...state,
        ui: { ...state.ui, findingDraft: null },
        inspections: state.inspections.map((i) =>
          i.id === action.inspectionId
            ? {
                ...i,
                items: i.items.map((it) =>
                  it.id === action.itemId
                    ? { ...it, result: 'fail' as const, finding: action.finding }
                    : it,
                ),
              }
            : i,
        ),
      };

    case 'createActionPlan':
      return {
        ...state,
        actionPlans: [
          {
            id: `AP-${String(100 + state.actionPlans.length + 1)}`,
            finding: action.finding,
            inspectionId: action.inspectionId,
            ownerId: action.ownerId,
            dueAt: action.dueAt,
            status: 'open',
            requestRef: state.requests[0]?.ref ?? null,
          },
          ...state.actionPlans,
        ],
      };

    case 'selectProperty':
      return { ...state, ui: { ...state.ui, selectedPropertyId: action.propertyId } };

    case 'setBoardFilter':
      return { ...state, ui: { ...state.ui, boardFilter: action.filter } };

    case 'setBoardTypeFilter':
      return { ...state, ui: { ...state.ui, boardTypeFilter: action.type } };

    case 'selectRequest':
      return { ...state, ui: { ...state.ui, selectedRequestId: action.id } };

    case 'selectRegistryItem':
      return { ...state, ui: { ...state.ui, selectedRegistryItemId: action.id } };

    case 'openInspection':
      return { ...state, ui: { ...state.ui, activeInspectionId: action.id } };

    case 'setVoiceState':
      return { ...state, ui: { ...state.ui, voiceState: action.state } };

    case 'setTranscript':
      return { ...state, ui: { ...state.ui, transcript: action.words } };

    case 'showConfirmCards':
      return {
        ...state,
        ui: { ...state.ui, voiceState: 'confirm', confirmCards: action.cards },
      };

    case 'dismissConfirmCard': {
      const confirmCards = state.ui.confirmCards.filter((c) => c.id !== action.id);
      return {
        ...state,
        ui: {
          ...state.ui,
          confirmCards,
          voiceState: confirmCards.length ? state.ui.voiceState : 'committed',
        },
      };
    }

    case 'showActionCard':
      return { ...state, ui: { ...state.ui, voiceState: 'confirm', actionCard: action.card } };

    case 'dismissActionCard':
      return { ...state, ui: { ...state.ui, actionCard: null, voiceState: 'committed' } };

    case 'showToast':
      return { ...state, ui: { ...state.ui, toast: action.toast } };

    case 'dismissToast':
      return { ...state, ui: { ...state.ui, toast: null } };

    case 'showCreatedLink':
      return { ...state, ui: { ...state.ui, createdLinkRef: action.ref } };

    case 'undo':
      return state.undo
        ? { ...state, ...state.undo, undo: null, ui: { ...state.ui, toast: null } }
        : state;
  }
}
