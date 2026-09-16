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
import { Avatar, Button, Card, Field, Icon, Select, Tabs } from '../ui';
import { typeIcon } from './typeIcon';

const ID = 'L-02';

const ETA_CHOICES = [
  { value: '20', label: 'ETA 20 min' },
  { value: '40', label: 'ETA 40 min' },
  { value: '60', label: 'ETA 60 min' },
  { value: '120', label: 'ETA 2h' },
];

export function RequestDetail({ request }: { request: Request }) {
  const { properties, residents, staff } = useAppState();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('chat');
  const [draft, setDraft] = useState('');
  const [timelineOpen, setTimelineOpen] = useState(true);

  const property = properties.find((p) => p.id === request.property);
  const resident = residents.find((r) => r.id === request.requester);
  const people = { staff, residents };

  const messages = request.timeline.filter((t) => t.kind === 'message');
  // Events only. The thread below renders the messages; L-14 is where the two
  // interleave into the full audit trail.
  const events = request.timeline.filter((t) => t.kind !== 'message');

  const send = () => {
    if (!draft.trim()) return;
    dispatch({ kind: 'addMessage', id: request.id, actor: 'omar', body: draft.trim() });
    setDraft('');
  };

  return (
    <div className="flex h-full flex-col bg-page">
      <div className="flex items-center justify-between px-lg pt-lg">
        <button
          type="button"
          data-id={`${ID}/close`}
          onClick={() => dispatch({ kind: 'selectRequest', id: null })}
          className="flex h-touch w-touch items-center justify-center text-textMuted"
        >
          <Icon name="close" size={20} />
        </button>
        <span data-id={`${ID}/property-mark`} className="text-metaBold text-textMuted">
          {property?.shortName}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-xl pb-lg">
        <div className="rounded-sheet bg-surface px-xl py-lg">
          <p className="text-panelTitle">
            {property?.name}, {resident?.name ?? 'Operations'}
          </p>
        </div>

        <Card data-id={`${ID}/item`} className="mt-lg rounded-panel p-lg">
          <div className="flex items-center gap-md">
            <span className="flex h-avatarLg w-avatarLg items-center justify-center rounded-circle bg-primaryFill text-primary">
              <Icon name={typeIcon[request.type]} size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-bodyMed">{request.title}</span>
              {request.items.length > 0 && (
                <span className="mt-xs block text-meta text-textMuted">
                  {request.items.map((i) => `${i.label} ×${i.qty}`).join(' · ')}
                </span>
              )}
            </span>
          </div>
        </Card>

        <div className="mt-lg flex items-center gap-sm">
          <span className="text-meta text-textMuted">
            {request.ref} | {relativeTime(request.createdAt)}
          </span>
          {request.priority !== 'normal' && (
            <span
              data-id={`${ID}/priority`}
              className={`inline-flex items-center gap-xs rounded-pill px-sm py-xs text-meta ${
                request.priority === 'escalated'
                  ? 'bg-statusEscalated text-textOnPrimary'
                  : 'bg-primaryFill text-primary'
              }`}
            >
              <Icon name="warning" size={14} />
              {request.priority === 'escalated' ? 'Escalated' : 'High'}
            </span>
          )}
          <span className="ml-auto">
            <span className="relative inline-flex h-select items-center gap-md rounded-pill bg-statusLive pl-lg pr-xl text-nav text-textOnPrimary">
              {statusOptions.find((o) => o.value === request.status)?.label}
              <span className="pointer-events-none text-textOnPrimary">
                <Icon name="chevronRight" size={16} />
              </span>
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

        <div className="mt-lg flex items-end gap-md">
          <span className="flex-1">
            <Select
              data-id={`${ID}/staff`}
              label="Assign to"
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
              label="ETA"
              value=""
              options={[
                {
                  value: '',
                  label: request.eta ? `Arriving ${clockTime(request.eta)}` : 'Set ETA',
                },
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

        <div className="mt-lg overflow-hidden rounded-panel bg-surface">
          <button
            type="button"
            data-id={`${ID}/timeline`}
            onClick={() => setTimelineOpen((v) => !v)}
            className="flex h-accordion w-full items-center gap-sm px-lg text-bodyMed"
          >
            Request timeline
            <span
              className={`ml-auto text-textMuted transition-transform duration-overlay ${
                timelineOpen ? '-rotate-90' : 'rotate-90'
              }`}
            >
              <Icon name="chevronRight" size={18} />
            </span>
          </button>

          {timelineOpen && (
            <ol className="max-h-timeline overflow-y-auto px-lg pb-lg">
              {[...events].reverse().map((t, i, arr) => (
                <li
                  key={`${t.at}-${i}`}
                  data-id={`${ID}/timeline-entry-${i}`}
                  className="flex gap-md"
                >
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

      <div className="shrink-0">
        {tab === 'chat' ? (
          <div data-id={`${ID}/thread`} className="border-t border-border px-lg py-md">
            <div className="flex max-h-thread flex-col gap-sm overflow-y-auto">
              {messages.length === 0 ? (
                <span className="text-meta text-textMuted">No messages yet</span>
              ) : (
                messages.map((m, i) => (
                  <div key={`${m.at}-${i}`} className="flex items-start gap-sm">
                    <Avatar
                      initials={
                        actorName(m.actor, people)
                          .split(' ')
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join('') || '??'
                      }
                      size="sm"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-body">{m.event}</span>
                      <span className="mt-xs block text-meta text-textMuted">
                        {actorName(m.actor, people)} · {clockTime(m.at)}
                      </span>
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-md flex items-end gap-sm">
              <span className="flex-1">
                <Field
                  data-id={`${ID}/reply`}
                  label="Reply"
                  value={draft}
                  placeholder="Rahul is on his way"
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                />
              </span>
              <Button data-id={`${ID}/send`} onClick={send}>
                Send
              </Button>
            </div>
          </div>
        ) : (
          <div data-id={`${ID}/note`} className="border-t border-border px-lg py-md">
            <Field data-id={`${ID}/note-input`} label="Internal note" placeholder="Not visible to the resident" />
          </div>
        )}

        <Tabs
          className="rounded-sheet border border-border shadow-tabBar"
          idPrefix={ID}
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'chat', label: 'Chat', icon: <Icon name="forum" /> },
            { value: 'note', label: 'Note', icon: <Icon name="description" /> },
          ]}
        />
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
