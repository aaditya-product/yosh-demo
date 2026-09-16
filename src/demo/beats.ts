import { staff } from '../data/seed';
import type { Beat } from './types';

// b2-assign, the L-03 half. docs/06-demo-engine.md targets `#0BE · AC rattling`,
// the request Beat 1 creates on Genie — that request does not exist until b1 is
// wired at task 2.6, so this targets the escalated Study window seal instead.
// Retarget when b1 lands.
const TARGET = 'REQ-0918';
const RAHUL = staff.find((s) => s.id === 'rahul')!;

const etaIn = (minutes: number) => new Date(Date.now() + minutes * 60_000);
const clock = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

export const beats: Beat[] = [
  {
    id: 'b2-assign',
    trigger: { kind: 'type', screen: 'L-03', match: 'assign OR rahul OR ac' },
    effects: [
      { after: 0, action: { kind: 'setVoiceState', state: 'listening' } },
      { after: 1800, action: { kind: 'setVoiceState', state: 'parsing' } },
      {
        after: 2400,
        action: {
          kind: 'showActionCard',
          card: {
            id: 'b2-assign',
            title: 'Assign request',
            fields: [
              { label: 'request', value: '#0B8 · Study window seal' },
              { label: 'staff', value: RAHUL.name },
              { label: 'eta', value: `ETA 40 min, ${clock(etaIn(40))}` },
            ],
          },
        },
      },
    ],
    onConfirm: [
      { after: 0, action: { kind: 'assignRequest', id: TARGET, staffId: 'rahul' } },
      { after: 0, action: { kind: 'setEta', id: TARGET, eta: etaIn(40).toISOString() } },
      { after: 0, action: { kind: 'setStatus', id: TARGET, status: 'assigned' } },
      {
        after: 300,
        action: {
          kind: 'showToast',
          toast: { id: 'b2-toast', message: `Assigned to ${RAHUL.name}`, undo: true, ms: 6000 },
        },
      },
    ],
  },
];
