import { staff } from '../data/seed';
import type { Beat } from './types';

// b2-assign, per docs/06-demo-engine.md.
//
// 06 targets `#0BE · AC rattling`, the request Beat 1 raises on Genie. b1 is
// wired at task 2.6, so until then this targets #0A4, which is also Aisha's and
// so also appears on G-05 and G-06 — the point of the beat is that assigning on
// Luna re-renders Genie, and any request of hers proves it. Retarget at 2.6.
const TARGET = 'REQ-0904';
const TARGET_REF = '#0A4';
const TARGET_TITLE = 'Pool pump making a noise';
const RAHUL = staff.find((s) => s.id === 'rahul')!;

const etaIn = (minutes: number) => new Date(Date.now() + minutes * 60_000);
const clock = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

export const beats: Beat[] = [
  {
    id: 'b2-assign',
    trigger: { kind: 'type', screen: 'L-03', match: 'assign OR rahul OR ac OR pool' },
    transcript: ['Assign', 'the', 'pool', 'pump', 'job', 'to', 'Rahul,', 'ETA', '40.'],
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
              { label: 'request', value: `${TARGET_REF} · ${TARGET_TITLE}` },
              { label: 'staff', value: RAHUL.name },
              { label: 'eta', value: `ETA 40 min, ${clock(etaIn(40))}` },
            ],
          },
        },
      },
    ],
    // Genie re-renders from the store. There is deliberately no Genie-side
    // effect here — if the shared store is not driving that update, the beat
    // is a lie.
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
