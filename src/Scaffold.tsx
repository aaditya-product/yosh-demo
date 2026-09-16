import { beats, useDemo } from './demo';
import { useAppState } from './store';

export function Scaffold({ route }: { route: string }) {
  const state = useAppState();
  const engine = useDemo();
  const { requests } = state;

  const filters = [
    ['All', requests.length],
    ['New', requests.filter((r) => r.status === 'new').length],
    ['Open', requests.filter((r) => r.status === 'open' && r.priority !== 'escalated').length],
    ['Escalated', requests.filter((r) => r.priority === 'escalated').length],
    ['Cancel req.', requests.filter((r) => r.status === 'cancelled').length],
  ] as const;

  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-panel border border-border bg-surface px-xl py-lg text-center">
        <p className="text-title">{route}</p>
        <p className="mt-xs text-meta text-textMuted">Route mounted. No screens built yet.</p>
        <p className="mt-md text-meta text-textMuted">
          {state.properties.length} properties · {state.staff.length} staff ·{' '}
          {state.registry.length} registry rows · {state.services.length} services ·{' '}
          {state.inspections[0]?.items.length ?? 0} inspection checks
        </p>
        <p className="mt-xs text-meta text-textMuted">
          {filters.map(([label, n]) => `${label} ${n}`).join(' · ')}
        </p>
        <p className="mt-xs text-meta text-textMuted">
          Engine ready · {beats.length} beats registered · {engine.speed}x
        </p>
      </div>
    </div>
  );
}
