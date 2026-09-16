import { useState } from 'react';
import { clockTime, relativeTime } from '../data/time';
import {
  boardFilters,
  filterCounts,
  filterLabels,
  formatSla,
  matchesFilter,
  requestsForProperty,
  slaState,
  useAppState,
  useDispatch,
  type Request,
} from '../store';
import { Avatar, Card, Chip, Icon, ListRow, SegmentedControl, StatusBadge } from '../ui';
import { useNow } from '../useNow';
import { EmptyDetail, RequestDetail } from './RequestDetail';
import { typeIcon } from './typeIcon';

const ID = 'L-01';

// A finished request does not advertise an arrival time.
const CLOSED: Request['status'][] = ['done', 'cancelled'];

function SlaChip({ request, now }: { request: Request; now: number }) {
  const state = slaState(request, now);
  if (state === 'closed') return null;
  return (
    <span
      data-id={`${ID}/card-${request.id}/sla`}
      className={`inline-flex items-center rounded-pill px-sm py-xs text-meta ${
        state === 'ok' ? 'bg-surfaceMuted text-textMuted' : 'bg-statusEscalated text-textOnPrimary'
      }`}
    >
      {formatSla(request, now)}
    </span>
  );
}

function RequestCard({
  request,
  selected,
  onSelect,
  now,
  assigneeInitials,
}: {
  request: Request;
  selected: boolean;
  onSelect: () => void;
  now: number;
  assigneeInitials?: string;
}) {
  const closed = CLOSED.includes(request.status);
  const chips = [
    slaState(request, now) !== 'closed',
    Boolean(request.eta) && !closed,
    Boolean(request.external),
  ].filter(Boolean);

  return (
    <Card
      data-id={`${ID}/card-${request.id}`}
      selected={selected}
      escalated={request.priority === 'escalated'}
      onClick={onSelect}
    >
      <ListRow
        data-id={`${ID}/card-${request.id}/row`}
        leading={
          assigneeInitials ? (
            <Avatar initials={assigneeInitials} />
          ) : (
            <span className="flex h-avatarMd w-avatarMd items-center justify-center rounded-circle bg-primaryFill text-primary">
              <Icon name={typeIcon[request.type]} size={18} />
            </span>
          )
        }
        title={request.title}
        subtitle={`${request.ref} · ${relativeTime(request.createdAt)}`}
        trailing={
          <StatusBadge
            status={request.priority === 'escalated' ? 'escalated' : request.status}
            data-id={`${ID}/card-${request.id}/status`}
          />
        }
        body={
          chips.length === 0 ? undefined : (
          <div className="flex flex-wrap items-center gap-sm">
            <SlaChip request={request} now={now} />
            {request.eta && !CLOSED.includes(request.status) && (
              <span
                data-id={`${ID}/card-${request.id}/eta`}
                className="inline-flex items-center rounded-pill bg-primaryFill px-sm py-xs text-meta text-primary"
              >
                Arriving {clockTime(request.eta)}
              </span>
            )}
            {request.external && (
              <span
                data-id={`${ID}/card-${request.id}/external`}
                className="inline-flex items-center rounded-pill border border-border px-sm py-xs text-meta text-textMuted"
              >
                {request.external.system} · {request.external.ref}
              </span>
            )}
          </div>
          )
        }
      />
    </Card>
  );
}

export function RequestsBoard() {
  const { requests, properties, staff, ui } = useAppState();
  const dispatch = useDispatch();
  const now = useNow();
  const [segment, setSegment] = useState('request');

  const scoped = requestsForProperty(requests, ui.selectedPropertyId);
  const counts = filterCounts(scoped);
  const visible = scoped.filter((r) => matchesFilter(r, ui.boardFilter));
  const selected = visible.find((r) => r.id === ui.selectedRequestId) ?? null;

  return (
    <div className="flex h-full flex-col bg-page">
      <div className="flex gap-sm overflow-x-auto px-lg pt-lg">
        {properties.map((p) => (
          <Chip
            key={p.id}
            data-id={`${ID}/property-${p.id}`}
            variant="property"
            selected={p.id === ui.selectedPropertyId}
            onClick={() => dispatch({ kind: 'selectProperty', propertyId: p.id })}
          >
            {p.name}
          </Chip>
        ))}
      </div>

      <div className="flex items-center gap-lg px-lg pt-lg">
        <span className="text-title">Requests</span>
        <SegmentedControl
          idPrefix={ID}
          value={segment}
          onChange={setSegment}
          segments={[
            { value: 'request', label: 'Request' },
            { value: 'schedule', label: 'Schedule' },
          ]}
        />
        <span className="ml-auto flex items-center gap-sm text-textMuted">
          <button type="button" data-id={`${ID}/search`} className="flex h-touch w-touch items-center justify-center">
            <Icon name="search" size={20} />
          </button>
          <button type="button" data-id={`${ID}/add`} className="flex h-touch w-touch items-center justify-center">
            <Icon name="add" size={20} />
          </button>
        </span>
      </div>

      <div className="flex gap-sm px-lg pt-md">
        {boardFilters.map((f) => (
          <Chip
            key={f}
            data-id={`${ID}/filter-${f}`}
            count={counts[f]}
            selected={f === ui.boardFilter}
            onClick={() => dispatch({ kind: 'setBoardFilter', filter: f })}
          >
            {filterLabels[f]}
          </Chip>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 gap-lg p-lg">
        <div data-id={`${ID}/list`} className="flex w-boardList shrink-0 flex-col gap-sm overflow-y-auto">
          {visible.map((r) => (
            <RequestCard
              key={r.id}
              request={r}
              now={now}
              selected={r.id === ui.selectedRequestId}
              onSelect={() => dispatch({ kind: 'selectRequest', id: r.id })}
              assigneeInitials={staff.find((s) => s.id === r.assignee)?.initials}
            />
          ))}
        </div>

        <div
          data-id={`${ID}/detail`}
          className="min-w-0 flex-1 overflow-hidden rounded-card border border-border bg-surface"
        >
          {selected ? <RequestDetail request={selected} /> : <EmptyDetail />}
        </div>
      </div>
    </div>
  );
}
