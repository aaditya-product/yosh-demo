import type {
  ActionPlan,
  Finding,
  Inspection,
  Property,
  RegistryItem,
  Request,
  RequestType,
  Resident,
  Service,
  Staff,
} from './types';

export type BoardFilter = 'all' | 'new' | 'open' | 'escalated' | 'cancel_requested';

export type VoiceState = 'idle' | 'listening' | 'parsing' | 'confirm' | 'committed';

export type CardField = { label: string; value: string; confidence?: 'low' };

export type ConfirmCard = {
  id: string;
  type: RequestType;
  title: string;
  fields: CardField[];
  source?: string;
};

export type ActionCard = {
  id: string;
  title: string;
  fields: CardField[];
};

export type Toast = {
  id: string;
  message: string;
  undo: boolean;
  ms: number;
};

export type FindingDraft = Finding & { expanded: boolean };

export type Entities = {
  properties: Property[];
  residents: Resident[];
  staff: Staff[];
  requests: Request[];
  registry: RegistryItem[];
  inspections: Inspection[];
  actionPlans: ActionPlan[];
  services: Service[];
};

export type Ui = {
  selectedPropertyId: string | null;
  boardFilter: BoardFilter;
  boardTypeFilter: RequestType | null;
  selectedRequestId: string | null;
  selectedRegistryItemId: string | null;
  activeInspectionId: string | null;
  voiceState: VoiceState;
  transcript: string[];
  confirmCards: ConfirmCard[];
  actionCard: ActionCard | null;
  toast: Toast | null;
  findingDraft: FindingDraft | null;
  createdLinkRef: string | null;
};

export type State = Entities & {
  ui: Ui;
  refCounter: number;
  undo: Entities | null;
};

export const emptyEntities: Entities = {
  properties: [],
  residents: [],
  staff: [],
  requests: [],
  registry: [],
  inspections: [],
  actionPlans: [],
  services: [],
};

export const initialUi: Ui = {
  selectedPropertyId: null,
  boardFilter: 'all',
  boardTypeFilter: null,
  selectedRequestId: null,
  selectedRegistryItemId: null,
  activeInspectionId: null,
  voiceState: 'idle',
  transcript: [],
  confirmCards: [],
  actionCard: null,
  toast: null,
  findingDraft: null,
  createdLinkRef: null,
};

export const initialState: State = {
  ...emptyEntities,
  ui: initialUi,
  refCounter: 0,
  undo: null,
};
