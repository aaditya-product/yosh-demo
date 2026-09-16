import { useState } from 'react';
import { formatHourMinute } from '../data/time';
import {
  instancesForDay,
  requestsForProperty,
  scheduleWeek,
  templatesForProperty,
  useAppState,
} from '../store';
import { Chip, Icon, Sheet } from '../ui';

const ID = 'L-12';

const dayLabel = (d: Date) => d.toLocaleDateString([], { weekday: 'short', day: 'numeric' });

// Local date parts, not toISOString — in a timezone ahead of UTC, local
// midnight falls on the previous UTC calendar day, so an ISO-string key would
// silently disagree with the chip's own (locally rendered) label.
const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// L-12. Reached by the Schedule half of L-01's segmented control, so it keeps
// L-01's property-chip row above it — this is that page's content, not a
// separate screen. Layer C: 03-screens.md is the only source, nothing to
// extract or match pixel-for-pixel.
export function Schedule({ onOpenRequest }: { onOpenRequest: (requestId: string) => void }) {
  const { requests, scheduleTemplates, ui } = useAppState();
  const [dayIndex, setDayIndex] = useState(0);
  const [recurringOn, setRecurringOn] = useState(false);
  const [openTemplateId, setOpenTemplateId] = useState<string | null>(null);

  const week = scheduleWeek();
  const selectedDay = week[dayIndex];

  const scopedRequests = requestsForProperty(requests, ui.selectedPropertyId);
  const scopedTemplates = templatesForProperty(scheduleTemplates, ui.selectedPropertyId);
  const dayTemplates = scopedTemplates.filter((t) => t.weekday === selectedDay.getDay());
  const dayInstances = instancesForDay(scopedTemplates, scopedRequests, selectedDay);

  const openTemplate = scopedTemplates.find((t) => t.id === openTemplateId) ?? null;
  const generated = openTemplate
    ? openTemplate.generatedRequestIds
        .map((id) => requests.find((r) => r.id === id))
        .filter((r): r is NonNullable<typeof r> => Boolean(r))
    : [];

  return (
    <>
      <div className="flex items-center gap-sm px-xl pt-md">
        {week.map((d, i) => {
          const count = recurringOn
            ? scopedTemplates.filter((t) => t.weekday === d.getDay()).length
            : instancesForDay(scopedTemplates, scopedRequests, d).length;
          return (
            <Chip
              key={dayKey(d)}
              data-id={`${ID}/day-${dayKey(d)}`}
              count={count}
              selected={i === dayIndex}
              onClick={() => setDayIndex(i)}
            >
              {dayLabel(d)}
            </Chip>
          );
        })}
        <span className="ml-auto">
          <Chip
            data-id={`${ID}/recurring-toggle`}
            selected={recurringOn}
            onClick={() => setRecurringOn((v) => !v)}
          >
            <span className="mr-sm inline-flex align-middle">
              <Icon name="autorenew" size={16} />
            </span>
            Recurring
          </Chip>
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-xl">
        {recurringOn ? (
          <div className="flex flex-col gap-sm">
            {dayTemplates.length === 0 && (
              <span className="text-body">Nothing recurring this day</span>
            )}
            {dayTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                data-id={`${ID}/template-${t.id}`}
                onClick={() => setOpenTemplateId(t.id)}
                className="flex items-center gap-md rounded-panel border border-dashed border-borderMuted bg-surface p-lg text-left"
              >
                <span className="flex h-leading w-leading shrink-0 items-center justify-center rounded-circle bg-surfaceAlt text-primary">
                  <Icon name="autorenew" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-bodyMed">{t.requestTitle}</span>
                  <span className="mt-xs block text-meta text-textMuted">{t.pattern}</span>
                </span>
                <span className="text-textMuted">
                  <Icon name="chevronRight" size={18} />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-sm">
            {dayInstances.length === 0 && <span className="text-body">Nothing scheduled</span>}
            {dayInstances.map((inst) => (
              <button
                key={`${inst.templateId}-${dayKey(selectedDay)}`}
                type="button"
                data-id={`${ID}/entry-${inst.templateId}-${dayKey(selectedDay)}`}
                onClick={() => inst.requestId && onOpenRequest(inst.requestId)}
                disabled={!inst.requestId}
                className={`flex items-center gap-md rounded-panel p-lg text-left ${
                  inst.state === 'created' ? 'bg-chipSelected' : 'bg-surface'
                }`}
              >
                <span className="w-hourLabel shrink-0 text-meta text-textMuted">
                  {formatHourMinute(inst.hour, inst.minute)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-bodyMed">{inst.title}</span>
                  <span className="mt-xs block text-meta text-textMuted">{inst.area}</span>
                </span>
                {inst.state === 'created' ? (
                  <span className="rounded-pill bg-primary px-md py-xs text-meta text-textOnPrimary">
                    On the board
                  </span>
                ) : (
                  <span className="text-meta text-textMuted">Due</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <Sheet
        idPrefix={ID}
        open={Boolean(openTemplate)}
        width={420}
        onClose={() => setOpenTemplateId(null)}
      >
        {openTemplate && (
          <div className="p-xl">
            <p className="text-panelTitle">{openTemplate.title}</p>
            <p className="mt-sm text-body text-textMuted">{openTemplate.pattern}</p>

            <p className="mt-xl text-metaBold text-textMuted">Requests it has generated</p>
            <div className="mt-sm flex flex-col gap-sm">
              {generated.length === 0 ? (
                <span className="text-meta text-textMuted">None yet</span>
              ) : (
                generated.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    data-id={`${ID}/template-${openTemplate.id}/generated-${r.id}`}
                    onClick={() => {
                      setOpenTemplateId(null);
                      onOpenRequest(r.id);
                    }}
                    className="rounded-card border border-border bg-page px-md py-sm text-left text-bodyMed"
                  >
                    {r.ref} · {r.title}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </Sheet>
    </>
  );
}
