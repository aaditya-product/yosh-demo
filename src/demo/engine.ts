import type { StoreAction } from '../store';
import { findBeatForClick, findBeatForInput } from './match';
import { TRANSCRIPT_STAGGER_MS, type Beat, type Effect, type InputKind } from './types';

export type EngineOptions = {
  dispatch: (action: StoreAction) => void;
  beats: Beat[];
  speed?: number;
};

export type Engine = ReturnType<typeof createEngine>;

export function createEngine({ dispatch, beats, speed = 1 }: EngineOptions) {
  let timers: ReturnType<typeof setTimeout>[] = [];
  let rate = speed;
  let running: string | null = null;

  const at = (ms: number, fn: () => void) => {
    timers.push(setTimeout(fn, ms / rate));
  };

  const cancel = () => {
    timers.forEach(clearTimeout);
    timers = [];
    running = null;
  };

  const runEffects = (effects: Effect[]) => {
    effects.forEach((e) => at(e.after, () => dispatch(e.action)));
  };

  const playTranscript = (words: string[]) => {
    words.forEach((_, i) => {
      at(i * TRANSCRIPT_STAGGER_MS, () => dispatch({ kind: 'setTranscript', words: words.slice(0, i + 1) }));
    });
  };

  const runBeat = (beat: Beat) => {
    cancel();
    running = beat.id;
    // One undo reverses the whole beat, not just its last effect.
    dispatch({ kind: 'checkpoint' });
    dispatch({ kind: 'setTranscript', words: [] });
    if (beat.transcript) playTranscript(beat.transcript);
    runEffects(beat.effects);
    return beat;
  };

  return {
    get running() {
      return running;
    },
    get speed() {
      return rate;
    },
    setSpeed(next: number) {
      rate = next > 0 ? next : 1;
    },
    cancel,

    beatById(id: string) {
      return beats.find((b) => b.id === id) ?? null;
    },

    runBeatById(id: string) {
      const beat = beats.find((b) => b.id === id);
      if (!beat) {
        console.warn(`[demo] no beat ${id}`);
        return null;
      }
      return runBeat(beat);
    },

    submitInput(screen: string, kind: InputKind, input: string) {
      const found = findBeatForInput(beats, screen, kind, input);
      if (!found) {
        console.warn(`[demo] no beats registered for ${screen}`);
        return null;
      }
      return runBeat(found.beat);
    },

    submitClick(dataId: string) {
      const beat = findBeatForClick(beats, dataId);
      return beat ? runBeat(beat) : null;
    },

    confirm(beatId: string) {
      const beat = beats.find((b) => b.id === beatId);
      if (!beat?.onConfirm) return null;
      cancel();
      running = beat.id;
      runEffects(beat.onConfirm);
      return beat;
    },
  };
}
