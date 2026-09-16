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
import { Card, Chip, Icon, SegmentedControl, StatusBadge } from '../ui';
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
      className={`inline-flex items-center rounded-card px-sm py-sm text-bodyMed ${
        state === 'ok' ? 'bg-page text-text' : 'bg-statusEscalated text-textOnPrimary'
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
      bordered={false}
      selected={selected}
      escalated={request.priority === 'escalated'}
      onClick={onSelect}
    >
      <div className="px-lg py-lg">
        <div className="flex items-center gap-md">
          <span className="flex h-leading w-leading shrink-0 items-center justify-center rounded-circle bg-surfaceAlt text-text">
            {assigneeInitials ? (
              <span className="text-metaBold text-primary">{assigneeInitials}</span>
            ) : (
              <Icon name={typeIcon[request.type]} size={20} />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-title">{request.title}</span>
            <span className="mt-xs block text-body text-textMuted">
              {request.ref} · {relativeTime(request.createdAt)}
            </span>
          </span>
          <StatusBadge
            status={request.priority === 'escalated' ? 'escalated' : request.status}
            data-id={`${ID}/card-${request.id}/status`}
          />
        </div>

        {chips.length > 0 && (
          <>
            <hr className="my-lg border-0 border-t border-divider" />
            <div className="flex flex-wrap items-center gap-sm">
            <SlaChip request={request} now={now} />
            {request.eta && !CLOSED.includes(request.status) && (
              <span
                data-id={`${ID}/card-${request.id}/eta`}
                className="inline-flex items-center rounded-card bg-page px-sm py-sm text-bodyMed text-text"
              >
                Arriving {clockTime(request.eta)}
              </span>
            )}
            {request.external && (
              <span
                data-id={`${ID}/card-${request.id}/external`}
                className="inline-flex items-center rounded-card bg-page px-sm py-sm text-bodyMed text-text"
              >
                {request.external.system} · {request.external.ref}
              </span>
            )}
            </div>
          </>
        )}
      </div>
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
      <div className="flex gap-sm overflow-x-auto px-xl pt-xl">
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

      <div className="flex items-center gap-lg px-xl pt-lg">
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
          <button
            type="button"
            data-id={`${ID}/search`}
            className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle bg-primaryFill text-primary"
          >
            <Icon name="search" size={18} />
          </button>
          <button
            type="button"
            data-id={`${ID}/add`}
            className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle bg-primaryFill text-primary"
          >
            <Icon name="add" size={18} />
          </button>
        </span>
      </div>

      <div className="flex gap-sm px-xl pt-md">
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

      <div className="flex min-h-0 flex-1 gap-lg p-xl">
        <div data-id={`${ID}/list`} className="scrollbar-none flex w-boardList shrink-0 flex-col gap-lg overflow-y-auto">
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
          className={`min-w-0 flex-1 overflow-hidden rounded-card ${
            selected ? 'bg-surface' : ''
          }`}
        >
          {selected ? <RequestDetail request={selected} /> : <EmptyDetail />}
        </div>
      </div>
    </div>
  );
}
