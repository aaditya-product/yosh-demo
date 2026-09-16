import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useDispatch } from '../store';
import { beats as defaultBeats } from './beats';
import { createEngine, type Engine } from './engine';
import type { Beat } from './types';

const DemoContext = createContext<Engine | null>(null);

export function DemoProvider({ children, beats = defaultBeats }: { children: ReactNode; beats?: Beat[] }) {
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  const engine = useMemo(
    () => createEngine({ dispatch: (a) => dispatchRef.current(a), beats }),
    [beats],
  );

  useEffect(() => engine.cancel, [engine]);

  return <DemoContext.Provider value={engine}>{children}</DemoContext.Provider>;
}

export function useDemo(): Engine {
  const engine = useContext(DemoContext);
  if (!engine) throw new Error('useDemo must be used inside DemoProvider');
  return engine;
}
