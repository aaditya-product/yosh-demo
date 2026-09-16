import type { StoreAction } from '../store';

export type Trigger =
  | { kind: 'voice'; screen: string; match: string }
  | { kind: 'type'; screen: string; match: string }
  | { kind: 'click'; dataId: string };

export type Effect = { after: number; action: StoreAction };

export type Beat = {
  id: string;
  trigger: Trigger;
  transcript?: string[];
  effects: Effect[];
  // Effects to run when the resident or staff member confirms the card this
  // beat put on screen. Same shape, timed from the confirm.
  onConfirm?: Effect[];
};

export type InputKind = 'voice' | 'type';

export const TRANSCRIPT_STAGGER_MS = 120;
