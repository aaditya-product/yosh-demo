import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { REF_SEED, buildSeed } from '../data/seed';
import type { StoreAction } from './actions';
import { reducer } from './reducer';
import { initialState, type State } from './state';

const seeded = (): State =>
  reducer(initialState, {
    kind: 'seed',
    entities: buildSeed(),
    selectedPropertyId: null,
    refSeed: REF_SEED,
  });

type Store = { state: State; dispatch: (action: StoreAction) => void };

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, seeded);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used inside StoreProvider');
  return store;
}

export const useAppState = () => useStore().state;
export const useDispatch = () => useStore().dispatch;
export const useUi = () => useStore().state.ui;
