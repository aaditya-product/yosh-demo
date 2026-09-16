import type { ActionCard, BoardFilter, ConfirmCard, Entities, Toast, VoiceState } from './state';
import type {
  ExternalRef,
  Finding,
  FindingSeverity,
  Request,
  RequestStatus,
  RequestType,
} from './types';

export type NewRequest = Partial<Request> &
  Pick<Request, 'type' | 'title' | 'origin' | 'property'>;

export type StoreAction =
  // seed and reset
  | { kind: 'seed'; entities: Entities; selectedPropertyId: string | null; refSeed?: number }
  | { kind: 'reset' }

  // undo checkpoint — dispatch before a group of actions that one undo must reverse
  | { kind: 'checkpoint' }

  // requests
  | { kind: 'createRequest'; request: NewRequest }
  | { kind: 'assignRequest'; id: string; staffId: string }
  | { kind: 'setEta'; id: string; eta: string }
  | { kind: 'setStatus'; id: string; status: RequestStatus }
  | { kind: 'setPriority'; id: string; priority: Request['priority'] }
  | { kind: 'setExternal'; id: string; external: ExternalRef }
  | { kind: 'setTags'; id: string; tags: string[] }
  | { kind: 'addMessage'; id: string; actor: string; body: string }
  | { kind: 'cancelRequest'; id: string; actor: string }

  // inspections and action plans
  | { kind: 'setInspectionResult'; inspectionId: string; itemId: string; result: 'pass' | 'na' }
  | { kind: 'expandFindingForm' }
  | { kind: 'fillFinding'; severity: FindingSeverity; note: string; photo: string | null }
  | { kind: 'recordFinding'; inspectionId: string; itemId: string; finding: Finding }
  | { kind: 'createActionPlan'; finding: string; inspectionId: string; ownerId: string; dueAt: string }

  // navigation and filters
  | { kind: 'selectProperty'; propertyId: string | null }
  | { kind: 'setBoardFilter'; filter: BoardFilter }
  | { kind: 'setBoardTypeFilter'; type: RequestType | null }
  | { kind: 'selectRequest'; id: string | null }
  | { kind: 'selectRegistryItem'; id: string | null }
  | { kind: 'openInspection'; id: string | null }

  // voice and cards
  | { kind: 'setVoiceState'; state: VoiceState }
  | { kind: 'setTranscript'; words: string[] }
  | { kind: 'showConfirmCards'; cards: ConfirmCard[] }
  | { kind: 'dismissConfirmCard'; id: string }
  | { kind: 'showActionCard'; card: ActionCard }
  | { kind: 'dismissActionCard' }
  | { kind: 'showToast'; toast: Toast }
  | { kind: 'dismissToast' }
  | { kind: 'showCreatedLink'; ref: string | null }
  | { kind: 'undo' };
