import { useState } from 'react';
import {
  requestsForProperty,
  segmentTone,
  useAppState,
  workloadBoard,
} from '../store';
import { Avatar, statusLabel } from '../ui';
import { useNow } from '../useNow';
import { PageChrome } from './PageChrome';

const ID = 'L-11';

const hoursMinutes = (minutes: number) =>
  minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes} min`;

export function Workload() {
  const { requests, staff, ui } = useAppState();
  const now = useNow(30_000);
  const [selected, setSelected] = useState<string | null>(null);

  const scoped = requestsForProperty(requests, ui.selectedPropertyId);
  const rows = workloadBoard(scoped, staff, now);
  const heaviest = Math.max(1, ...rows.map((r) => r.open));
  const person = rows.find((r) => r.staffId === selected) ?? null;
  const personName = staff.find((s) => s.id === person?.staffId);

  return (
    <PageChrome id={ID} title="Workload">
      <div className="flex min-h-0 flex-1 gap-lg p-xl">
        <div className="flex w-boardList shrink-0 flex-col gap-lg overflow-y-auto">
          {rows.map((row) => {
            const member = staff.find((s) => s.id === row.staffId)!;
            return (
              <button
                key={row.staffId}
                type="button"
                data-id={`${ID}/bar-${row.staffId}`}
                onClick={() => setSelected(row.staffId)}
                className={`rounded-panel p-lg text-left ${
                  selected === row.staffId ? 'bg-chipSelected' : 'bg-surface'
                }`}
              >
                <div className="flex items-center gap-md">
                  <Avatar initials={member.initials} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-bodyMed">{member.name}</span>
                    <span className="mt-xs block text-meta text-textMuted">
                      {member.role} · {member.department}
                    </span>
                  </span>
                  <span className="text-title">{row.open}</span>
                </div>

                <div className="mt-md flex h-bar w-full items-stretch gap-xs overflow-hidden rounded-pill bg-page">
                  {row.open === 0 ? null : (
                    row.segments.map((seg) => (
                      <span
                        key={seg.status}
                        title={`${statusLabel(seg.status)} ${seg.count}`}
                        style={{ width: `${(seg.count / heaviest) * 100}%` }}
                        className={`${segmentTone[seg.status]} first:rounded-l-pill last:rounded-r-pill`}
                      />
                    ))
                  )}
                </div>

                <div className="mt-sm flex flex-wrap gap-md">
                  {row.open === 0 ? (
                    <span className="text-meta text-textMuted">Nothing open</span>
                  ) : (
                    row.segments.map((seg) => (
                      <span key={seg.status} className="flex items-center gap-xs text-meta text-textMuted">
                        <span className={`h-dot w-dot rounded-circle ${segmentTone[seg.status]}`} />
                        {statusLabel(seg.status)} {seg.count}
                      </span>
                    ))
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div data-id={`${ID}/detail`} className="min-w-0 flex-1">
          {person && personName ? (
            <div className="flex flex-col gap-lg">
              <div className="flex h-titleCard items-center gap-md rounded-sheet bg-surface px-lg">
                <Avatar initials={personName.initials} size="lg" />
                <span>
                  <span className="block text-panelTitle">{personName.name}</span>
                  <span className="mt-xs block text-meta text-textMuted">
                    {personName.role} · {personName.department}
                  </span>
                </span>
              </div>

              <div className="rounded-panel bg-surface p-lg">
                <p className="text-meta text-textMuted">Average completion time</p>
                <p className="mt-xs text-title">
                  {person.avgMinutes === null ? 'No closed requests yet' : hoursMinutes(person.avgMinutes)}
                </p>
              </div>

              <div className="rounded-panel bg-surface p-lg">
                <p className="text-meta text-textMuted">Closed today</p>
                <p className="mt-xs text-title">{person.closedToday}</p>
              </div>

              <div className="rounded-panel bg-surface p-lg">
                <p className="text-meta text-textMuted">Open now</p>
                <p className="mt-xs text-title">{person.open}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-body">Pick someone to see their numbers</span>
            </div>
          )}
        </div>
      </div>
    </PageChrome>
  );
}
