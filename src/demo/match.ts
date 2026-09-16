import type { Beat, InputKind } from './types';

const terms = (match: string) =>
  match
    .split(/\s+OR\s+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

export function matchesInput(beat: Beat, screen: string, kind: InputKind, input: string) {
  const { trigger } = beat;
  if (trigger.kind === 'click') return false;
  if (trigger.screen !== screen) return false;
  if (trigger.kind !== kind) return false;
  const text = input.toLowerCase();
  return terms(trigger.match).some((t) => text.includes(t));
}

export function beatsForScreen(beats: Beat[], screen: string) {
  return beats.filter((b) => b.trigger.kind !== 'click' && b.trigger.screen === screen);
}

export function findBeatForInput(
  beats: Beat[],
  screen: string,
  kind: InputKind,
  input: string,
): { beat: Beat; fallback: boolean } | null {
  const hit = beats.find((b) => matchesInput(b, screen, kind, input));
  if (hit) return { beat: hit, fallback: false };

  // A demo must never show a dead end. Run the nearest beat for this screen.
  const nearest = beatsForScreen(beats, screen)[0];
  if (!nearest) return null;
  console.warn(`[demo] no beat matched "${input}" on ${screen}, running ${nearest.id}`);
  return { beat: nearest, fallback: true };
}

export function findBeatForClick(beats: Beat[], dataId: string) {
  return beats.find((b) => b.trigger.kind === 'click' && b.trigger.dataId === dataId) ?? null;
}
