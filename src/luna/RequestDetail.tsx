import { useState } from 'react';
import { clockTime, longStamp, relativeTime } from '../data/time';
import {
  actorName,
  statusOptions,
  useAppState,
  useDispatch,
  type Request,
  type RequestStatus,
} from '../store';
import { Avatar, Button, Icon, Select, Tabs } from '../ui';
import { typeIcon } from './typeIcon';

const ID = 'L-02';

const ETA_CHOICES = [
  { value: '20', label: 'ETA 20 min' },
  { value: '40', label: 'ETA 40 min' },
  { value: '60', label: 'ETA 60 min' },
  { value: '120', label: 'ETA 2h' },
];

const statusTone = (r: Request) => {
  if (r.priority === 'escalated') return 'bg-statusEscalated';
  if (r.status === 'done' || r.status === 'cancelled') return 'bg-textMuted';
  if (r.status === 'new' || r.status === 'in_progress') return 'bg-statusLive';
  return 'bg-primary';
};

// White block on the page-coloured panel, radius 12, 16 padding — the wrapper
// every section of the live detail panel uses.
function Block({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-panel bg-surface p-lg ${className}`}>{children}</div>;
}

// Chips sit on a grey inset inside the white block, and are themselves white.
function DetailChip({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <span
      data-id={id}
      className="inline-flex h-detailChip items-center rounded-card border border-chipBorder bg-surface px-md text-bodyMed"
    >
      {children}
    </span>
  );
}

export function RequestDetail({ request }: { request: Request }) {
  const { properties, residents, staff } = useAppState();
  const dispatch = useDispatch();
  const [sheet, setSheet] = useState<'chat' | 'note' | null>(null);
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState('');
  const [timelineOpen, setTimelineOpen] = useState(false);

  const property = properties.find((p) => p.id === request.property);
  const resident = residents.find((r) => r.id === request.requester);
  const assignee = staff.find((s) => s.id === request.assignee);
  const people = { staff, residents };

  const messages = request.timeline.filter((t) => t.kind === 'message');
  const events = request.timeline.filter((t) => t.kind !== 'message');

  const send = () => {
    if (!draft.trim()) return;
    dispatch({ kind: 'addMessage', id: request.id, actor: 'omar', body: draft.trim() });
    setDraft('');
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-page">
      <div className="flex shrink-0 items-center justify-between px-xl pt-lg">
        <button
          type="button"
          data-id={`${ID}/close`}
          onClick={() => dispatch({ kind: 'selectRequest', id: null })}
          className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle bg-surface text-text"
        >
          <Icon name="close" size={18} />
        </button>
        <span data-id={`${ID}/property-mark`} className="text-metaBold text-textMuted">
          {property?.name}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-lg overflow-y-auto px-xl py-lg">
        <div data-id={`${ID}/title`} className="flex h-titleCard items-center rounded-sheet bg-surface px-lg">
          <span className="text-panelTitle">
            {property?.name}, {resident?.name ?? 'Operations'}
          </span>
        </div>

        <Block>
          <div data-id={`${ID}/item`} className="rounded-card bg-page p-md">
            <div className="flex flex-wrap items-center gap-md">
              <DetailChip id={`${ID}/chip-type`}>
                <Icon name={typeIcon[request.type]} size={16} />
                <span className="ml-sm">{request.title}</span>
              </DetailChip>
              {request.items.map((i) => (
                <DetailChip key={i.label} id={`${ID}/chip-${i.label}`}>
                  {i.label} | {i.qty}
                </DetailChip>
              ))}
              {request.eta && (
                <DetailChip id={`${ID}/chip-eta`}>Arriving {clockTime(request.eta)}</DetailChip>
              )}
              {request.external && (
                <DetailChip id={`${ID}/chip-external`}>
                  {request.external.system} · {request.external.ref}
                </DetailChip>
              )}
            </div>

            {assignee && (
              <div className="mt-md flex h-detailChip items-center justify-between rounded-card border-dashed border-borderMuted bg-surface px-md text-bodyMed">
                <span>Assigned to</span>
                <span className="flex items-center gap-sm">
                  <Avatar initials={assignee.initials} size="sm" />
                  {assignee.name}
                </span>
              </div>
            )}
          </div>

          <div className="mt-lg flex items-center gap-md">
            <span className="text-meta text-textMuted">
              {request.ref} | {relativeTime(request.createdAt)}
            </span>
            <span className="ml-auto flex items-center gap-md">
              <span className="flex h-statusCluster items-center gap-sm rounded-pill border border-borderMuted bg-surface px-md">
                <span className="h-dot w-dot rounded-circle bg-statusWarn" />
                {request.priority === 'escalated' && (
                  <span className="h-dot w-dot rounded-circle bg-statusEscalated" />
                )}
              </span>
              <span
                className={`relative inline-flex h-select items-center gap-md rounded-pill pl-lg pr-lg text-nav text-textOnPrimary ${statusTone(request)}`}
              >
                {statusOptions.find((o) => o.value === request.status)?.label}
                <Icon name="chevronRight" size={16} />
                <select
                  data-id={`${ID}/status`}
                  value={request.status}
                  onChange={(e) =>
                    dispatch({
                      kind: 'setStatus',
                      id: request.id,
                      status: e.target.value as RequestStatus,
                    })
                  }
                  className="absolute inset-0 cursor-pointer opacity-0"
                >
                  {statusOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </span>
            </span>
          </div>
        </Block>

        <Block>
          <div className="flex items-end gap-md">
            <span className="flex-1">
              <Select
                data-id={`${ID}/staff`}
                value={request.assignee ?? ''}
                options={[
                  { value: '', label: 'Select staff' },
                  ...staff.map((s) => ({ value: s.id, label: `${s.name} · ${s.role}` })),
                ]}
                onChange={(e) =>
                  e.target.value &&
                  dispatch({ kind: 'assignRequest', id: request.id, staffId: e.target.value })
                }
              />
            </span>
            <span className="w-etaSelect">
              <Select
                data-id={`${ID}/eta`}
                value=""
                options={[
                  { value: '', label: request.eta ? `Arriving ${clockTime(request.eta)}` : 'Set ETA' },
                  ...ETA_CHOICES,
                ]}
                onChange={(e) =>
                  e.target.value &&
                  dispatch({
                    kind: 'setEta',
                    id: request.id,
                    eta: new Date(Date.now() + Number(e.target.value) * 60_000).toISOString(),
                  })
                }
              />
            </span>
          </div>
        </Block>

        <div className="overflow-hidden rounded-panel bg-surface">
          <button
            type="button"
            data-id={`${ID}/timeline`}
            onClick={() => setTimelineOpen((v) => !v)}
            className="flex h-accordion w-full items-center px-lg text-bodyMed"
          >
            Request timeline
            <span
              className={`ml-auto text-text transition-transform duration-overlay ${
                timelineOpen ? '-rotate-90' : 'rotate-90'
              }`}
            >
              <Icon name="chevronRight" size={18} />
            </span>
          </button>

          {timelineOpen && (
            <ol className="max-h-timeline overflow-y-auto px-lg pb-lg">
              {[...events].reverse().map((t, i, arr) => (
                <li key={`${t.at}-${i}`} data-id={`${ID}/timeline-entry-${i}`} className="flex gap-md">
                  <span className="flex flex-col items-center">
                    <span
                      className={`flex h-marker w-marker shrink-0 items-center justify-center rounded-circle text-status text-textOnPrimary ${
                        /escalat|breach/i.test(t.event) ? 'bg-statusEscalated' : 'bg-ink'
                      }`}
                    >
                      {arr.length - i}
                    </span>
                    {i < arr.length - 1 && <span className="w-px flex-1 bg-ink" />}
                  </span>
                  <span className="flex-1 pb-lg">
                    <span
                      className={`block text-event ${
                        /escalat/i.test(t.event) ? 'text-statusEscalated' : 'text-text'
                      }`}
                    >
                      {t.event}
                    </span>
                    <span className="mt-xs block text-meta text-textMuted">
                      {longStamp(t.at)} · {actorName(t.actor, people)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="shrink-0 px-xl pb-lg">
        <Tabs
          className="rounded-sheet border border-border shadow-tabBar"
          idPrefix={ID}
          value={sheet ?? ''}
          onChange={(v) => setSheet(v as 'chat' | 'note')}
          tabs={[
            { value: 'chat', label: 'Chat', icon: <Icon name="forum" /> },
            { value: 'note', label: 'Note', icon: <Icon name="description" /> },
          ]}
        />
      </div>

      <div
        data-id={`${ID}/sheet-scrim`}
        onClick={() => setSheet(null)}
        className={`absolute inset-0 z-sheet bg-scrim transition-opacity duration-overlay ${
          sheet ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        data-id={`${ID}/sheet`}
        className={`absolute inset-x-0 bottom-0 z-sheet flex h-detailSheet flex-col rounded-t-sheet bg-surface transition-transform duration-sheet ease-out ${
          sheet ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <span className="mx-auto mt-md h-handleBar w-handleBar shrink-0 rounded-pill bg-borderMuted" />

        {sheet === 'note' ? (
          <div data-id={`${ID}/note`} className="flex min-h-0 flex-1 flex-col px-xl py-lg">
            <p className="text-bodyMed">Internal note</p>
            <p className="mt-xs text-meta text-textMuted">Not visible to the resident</p>
            <textarea
              data-id={`${ID}/note-input`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Part ordered, fitting tomorrow morning"
              className="mt-md min-h-0 flex-1 resize-none rounded-card border border-border bg-page p-lg text-body outline-none placeholder:text-textMuted"
            />
            <div className="mt-md flex shrink-0 justify-end">
              <Button data-id={`${ID}/note-save`} onClick={() => setSheet(null)}>
                Save note
              </Button>
            </div>
          </div>
        ) : (
          <div data-id={`${ID}/thread`} className="flex min-h-0 flex-1 flex-col px-xl py-lg">
            <div className="flex min-h-0 flex-1 flex-col gap-md overflow-y-auto">
              {messages.map((m, i) => (
                <div key={`${m.at}-${i}`} className="flex items-start gap-sm">
                  <Avatar
                    initials={actorName(m.actor, people)
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                    size="sm"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-body">{m.event}</span>
                    <span className="mt-xs block text-meta text-textMuted">
                      {actorName(m.actor, people)} · {clockTime(m.at)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-lg flex h-commandRow shrink-0 items-center gap-md rounded-pill border border-border bg-page px-xl">
              <input
                data-id={`${ID}/reply`}
                value={draft}
                placeholder="Type here"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                className="min-w-0 flex-1 bg-transparent text-nav outline-none placeholder:text-textMuted"
              />
              <button
                type="button"
                data-id={`${ID}/send`}
                onClick={send}
                className="flex h-iconBtn w-iconBtn shrink-0 items-center justify-center rounded-circle bg-primary text-textOnPrimary"
              >
                <Icon name="send" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function EmptyDetail() {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="text-body">Pick a request to see it</span>
    </div>
  );
}
