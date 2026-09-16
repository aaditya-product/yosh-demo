import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { clockTime, relativeTime } from '../data/time';
import { useGo } from '../productRoot';
import { actorName, typeLabels, useAppState, useDispatch } from '../store';
import { Avatar, Button, Card, Field, Icon, StatusBadge } from '../ui';
import { typeIcon } from '../luna/typeIcon';

const ID = 'G-06';
const RESIDENT = 'aisha';

export function GenieRequestDetail() {
  const { requestId } = useParams();
  const go = useGo();
  const { requests, staff, residents } = useAppState();
  const dispatch = useDispatch();
  const [draft, setDraft] = useState('');

  const request = requests.find((r) => r.id === requestId);
  if (!request) {
    go('requests');
    return null;
  }

  const people = { staff, residents };
  const assignee = staff.find((s) => s.id === request.assignee);
  const messages = request.timeline.filter((t) => t.kind === 'message');
  // Status timeline shows events. Messages render in the thread below, so
  // showing them in both places prints every reply twice. Most recent at top.
  const trail = [...request.timeline].filter((t) => t.kind !== 'message').reverse();

  const send = () => {
    if (!draft.trim()) return;
    dispatch({ kind: 'addMessage', id: request.id, actor: RESIDENT, body: draft.trim() });
    setDraft('');
  };

  return (
    <div className="flex h-full flex-col px-xl py-lg">
      <div className="flex items-center gap-md">
        <button
          type="button"
          data-id={`${ID}/back`}
          onClick={() => go('requests')}
          className="flex h-touch w-touch items-center justify-center text-textMuted"
        >
          <Icon name="close" size={20} />
        </button>
        <span className="flex h-avatarLg w-avatarLg items-center justify-center rounded-circle bg-primaryFill text-primary">
          <Icon name={typeIcon[request.type]} size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-title">{request.title}</span>
          <span className="mt-xs block text-meta text-textMuted">
            {request.ref} · {typeLabels[request.type]}
          </span>
        </span>
        <StatusBadge
          status={request.priority === 'escalated' ? 'escalated' : request.status}
          audience="resident"
          data-id={`${ID}/status`}
        />
      </div>

      <div className="mt-lg min-h-0 flex-1 overflow-y-auto">
        {request.eta && request.status !== 'done' && request.status !== 'cancelled' && (
          <Card data-id={`${ID}/eta`} className="flex items-center gap-md px-lg py-md">
            {assignee && <Avatar initials={assignee.initials} />}
            <span className="text-bodyLg">
              Arriving {clockTime(request.eta)}
              {assignee ? ` · ${assignee.name.split(' ')[0]}` : ''}
            </span>
          </Card>
        )}

        {request.items.length > 0 && (
          <div className="mt-md flex flex-wrap gap-sm">
            {request.items.map((i) => (
              <span
                key={i.label}
                className="rounded-pill bg-surfaceMuted px-md py-xs text-meta text-textMuted"
              >
                {i.label} ×{i.qty}
              </span>
            ))}
          </div>
        )}

        <ol data-id={`${ID}/timeline`} className="mt-lg flex flex-col gap-md">
          {trail.map((t, i) => (
            <li key={`${t.at}-${i}`} data-id={`${ID}/timeline-entry-${i}`} className="flex gap-md">
              <span className="mt-xs h-count w-count shrink-0 rounded-circle bg-primaryFill" />
              <span className="min-w-0 flex-1">
                <span className="block text-body">{t.event}</span>
                <span className="mt-xs block text-meta text-textMuted">
                  {clockTime(t.at)} · {actorName(t.actor, people)}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div data-id={`${ID}/thread`} className="mt-xl flex flex-col gap-sm">
          {messages.map((m, i) => {
            const fromResident = m.actor === RESIDENT;
            return (
              <div
                key={`${m.at}-${i}`}
                className={`flex ${fromResident ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-bubble rounded-panel px-lg py-md ${
                    fromResident ? 'bg-primaryFill text-text' : 'bg-surfaceMuted text-text'
                  }`}
                >
                  <span className="block text-body">{m.event}</span>
                  <span className="mt-xs block text-meta text-textMuted">
                    {actorName(m.actor, people)} · {relativeTime(m.at)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div data-id={`${ID}/composer`} className="mt-md flex items-end gap-sm">
        <span className="min-w-0 flex-1">
          <Field
            data-id={`${ID}/composer-input`}
            label="Message"
            value={draft}
            placeholder="Any update on this?"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            trailing={
              <button type="button" data-id={`${ID}/composer/mic`} className="text-textMuted">
                <Icon name="mic" size={20} />
              </button>
            }
          />
        </span>
        <Button data-id={`${ID}/send`} onClick={send} leading={<Icon name="send" size={18} />}>
          Send
        </Button>
      </div>
    </div>
  );
}
