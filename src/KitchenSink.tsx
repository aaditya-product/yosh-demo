import { useState, type ReactNode } from 'react';
import { relativeTime } from './data/time';
import { useAppState } from './store';
import {
  Avatar,
  Button,
  Card,
  Chip,
  ConfirmCard,
  Field,
  Icon,
  ListRow,
  SegmentedControl,
  Select,
  Sheet,
  StatusBadge,
  Tabs,
  Timeline,
  Toast,
  VoiceIndicator,
  type BadgeStatus,
} from './ui';

const statuses: BadgeStatus[] = [
  'new',
  'open',
  'assigned',
  'in_progress',
  'done',
  'cancelled',
  'escalated',
];

// Every component renders twice, once on color.page and once on color.surface.
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-xl">
      <p className="text-metaBold text-textMuted">{title}</p>
      <div className="mt-sm grid grid-cols-2 gap-lg">
        <div className="rounded-panel border border-border bg-page p-lg">
          <p className="mb-md text-meta text-textMuted">on page</p>
          {children}
        </div>
        <div className="rounded-panel border border-border bg-surface p-lg">
          <p className="mb-md text-meta text-textMuted">on surface</p>
          {children}
        </div>
      </div>
    </section>
  );
}

const Stack = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-sm">{children}</div>
);

export function KitchenSink() {
  const { requests, staff } = useAppState();
  const [segment, setSegment] = useState('request');
  const [tab, setTab] = useState('detail');
  const [sheetOpen, setSheetOpen] = useState(true);
  const [filter, setFilter] = useState('all');

  const request = requests.find((r) => r.ref === '#0A4')!;
  const escalated = requests.find((r) => r.ref === '#0B8')!;
  const plainTimeline = request.timeline.map((t) => ({ at: t.at, event: t.event }));

  return (
    <div className="min-h-full bg-page px-xl pb-xl pt-lg">
      <p className="text-title">Kitchen sink</p>
      <p className="mt-xs text-meta text-textMuted">
        Every component, every state, on both backgrounds.
      </p>

      <Section title="Button">
        <div className="flex flex-col gap-md">
          <Stack>
            <Button data-id="KS/btn-primary">Assign</Button>
            <Button data-id="KS/btn-secondary" variant="secondary">Reassign</Button>
            <Button data-id="KS/btn-ghost" variant="ghost">Cancel</Button>
            <Button data-id="KS/btn-danger" variant="danger">Fail</Button>
          </Stack>
          <Stack>
            <Button data-id="KS/btn-sm" size="sm">Small 32</Button>
            <Button data-id="KS/btn-md" size="md">Medium 40</Button>
            <Button data-id="KS/btn-lg" size="lg">Pass 56</Button>
          </Stack>
          <Stack>
            <Button data-id="KS/btn-disabled" disabled>Disabled</Button>
            <Button data-id="KS/btn-leading" leading={<Icon name="mic" />}>Speak</Button>
            <Button data-id="KS/btn-trailing" variant="secondary" trailing={<Icon name="chevronRight" />}>
              Next
            </Button>
          </Stack>
        </div>
      </Section>

      <Section title="Chip">
        <div className="flex flex-col gap-md">
          <Stack>
            {[
              ['all', 'All', 7],
              ['new', 'New', 1],
              ['open', 'Open', 2],
              ['escalated', 'Escalated', 1],
              ['cancel', 'Cancel req.', 0],
            ].map(([value, label, count]) => (
              <Chip
                key={String(value)}
                data-id={`KS/chip-filter-${value}`}
                count={count as number}
                selected={filter === value}
                onClick={() => setFilter(String(value))}
              >
                {label as string}
              </Chip>
            ))}
            <Chip data-id="KS/chip-nocount">No count</Chip>
          </Stack>
          <Stack>
            <Chip data-id="KS/chip-prop-sel" variant="property" selected>Villa 12</Chip>
            <Chip data-id="KS/chip-prop" variant="property">The Residence</Chip>
            <Chip data-id="KS/chip-prop-2" variant="property">Garden Wing</Chip>
          </Stack>
          <Stack>
            <Chip data-id="KS/chip-field-1" variant="field">8 covers</Chip>
            <Chip data-id="KS/chip-field-2" variant="field">Tonight, 19:30</Chip>
            <Chip data-id="KS/chip-field-low" variant="field" lowConfidence>Normal</Chip>
          </Stack>
        </div>
      </Section>

      <Section title="StatusBadge">
        <Stack>
          {statuses.map((s) => (
            <StatusBadge key={s} status={s} data-id={`KS/status-${s}`} />
          ))}
        </Stack>
      </Section>

      <Section title="Avatar">
        <Stack>
          <Avatar initials={staff[0].initials} size="sm" data-id="KS/avatar-sm" />
          <Avatar initials={staff[1].initials} size="md" data-id="KS/avatar-md" />
          <Avatar initials={staff[2].initials} size="lg" data-id="KS/avatar-lg" />
        </Stack>
      </Section>

      <Section title="Card and ListRow">
        <div className="flex flex-col gap-sm">
          <Card data-id="KS/card">
            <ListRow
              data-id="KS/row"
              leading={<Avatar initials="RM" />}
              title={request.title}
              subtitle={`${request.ref} · ${relativeTime(request.createdAt)}`}
              trailing={<StatusBadge status={request.status} />}
            />
          </Card>
          <Card data-id="KS/card-selected" selected>
            <ListRow
              data-id="KS/row-selected"
              leading={<Avatar initials="DO" />}
              title="Laundry collection"
              subtitle="#0A7 · selected"
              trailing={<StatusBadge status="assigned" />}
            />
          </Card>
          <Card data-id="KS/card-escalated" escalated>
            <ListRow
              data-id="KS/row-escalated"
              leading={<Icon name="build" size={24} />}
              title={escalated.title}
              subtitle={`${escalated.ref} · unassigned`}
              trailing={<StatusBadge status="escalated" />}
            />
          </Card>
          <Card data-id="KS/card-body">
            <ListRow
              data-id="KS/row-body"
              leading={<Icon name="inventory" size={24} />}
              title="Warehouse, table linen ×12"
              subtitle="#0B5 · 3h ago"
              trailing={<StatusBadge status="open" />}
              body={
                <Stack>
                  <Chip data-id="KS/row-body-ext" variant="field">D365 · PR-4468</Chip>
                  <Chip data-id="KS/row-body-dest" variant="field">Villa 12, linen store</Chip>
                </Stack>
              }
            />
          </Card>
          <Card data-id="KS/card-selected-escalated" selected escalated>
            <ListRow
              data-id="KS/row-selected-escalated"
              leading={<Icon name="build" size={24} />}
              title={escalated.title}
              subtitle={`${escalated.ref} · selected and escalated`}
              trailing={<StatusBadge status="escalated" />}
            />
          </Card>
          <Card data-id="KS/card-borderless" bordered={false}>
            <ListRow data-id="KS/row-borderless" title="No border" subtitle="bordered={false}" />
          </Card>
        </div>
      </Section>

      <Section title="Field, Select, SegmentedControl">
        <div className="flex flex-col gap-md">
          <Field data-id="KS/field" label="What do you need?" placeholder="Laundry pickup from Villa 12" />
          <Field
            data-id="KS/field-mic"
            label="Command bar"
            placeholder="Assign the AC job to Rahul"
            trailing={<Icon name="mic" size={20} />}
          />
          <Select
            data-id="KS/select"
            label="Assign to"
            options={staff.map((s) => ({ value: s.id, label: s.name }))}
          />
          <div>
            <SegmentedControl
              idPrefix="KS"
              value={segment}
              onChange={setSegment}
              segments={[
                { value: 'request', label: 'Request' },
                { value: 'schedule', label: 'Schedule' },
              ]}
            />
          </div>
          <div>
            <SegmentedControl
              idPrefix="KS-facet"
              value={segment === 'request' ? 'general' : 'fleet'}
              onChange={() => undefined}
              segments={[
                { value: 'general', label: 'General' },
                { value: 'wardrobe', label: 'Wardrobe' },
                { value: 'art', label: 'Art' },
                { value: 'fleet', label: 'Fleet' },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="VoiceIndicator and Toast">
        <div className="flex flex-col gap-lg">
          <Stack>
            <div className="flex flex-col items-center gap-xs">
              <VoiceIndicator state="idle" data-id="KS/voice-idle" />
              <span className="text-meta text-textMuted">idle</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <VoiceIndicator state="listening" data-id="KS/voice-listening" />
              <span className="text-meta text-textMuted">listening</span>
            </div>
            <div className="flex flex-col items-center gap-xs">
              <VoiceIndicator state="parsing" data-id="KS/voice-parsing" />
              <span className="text-meta text-textMuted">parsing</span>
            </div>
          </Stack>
          <div className="flex flex-col items-start gap-sm">
            <Toast idPrefix="KS" message="Assigned to Rahul Menon" actionLabel="Undo" onAction={() => undefined} />
            <Toast idPrefix="KS-plain" message="Sent to Dynamics 365 · PR-4471" />
          </div>
        </div>
      </Section>

      <Section title="ConfirmCard">
        <div className="flex flex-col gap-md">
          <ConfirmCard
            idPrefix="KS"
            icon={<Icon name="build" size={20} />}
            title="Maintenance"
            source="the AC in the study is rattling"
            fields={[
              { label: 'issue', value: 'AC, rattling' },
              { label: 'location', value: 'Study' },
              { label: 'priority', value: 'Normal', confidence: 'low' },
            ]}
            onConfirm={() => undefined}
            onCancel={() => undefined}
          />
          <ConfirmCard
            idPrefix="KS-gathering"
            icon={<Icon name="celebration" size={20} />}
            title="Gathering setup"
            confirmLabel="Send"
            fields={[
              { label: 'covers', value: '8 covers' },
              { label: 'when', value: 'Tonight, 19:30' },
              { label: 'where', value: 'Main House dining' },
            ]}
            onConfirm={() => undefined}
            onCancel={() => undefined}
          />
        </div>
      </Section>

      <Section title="Timeline and Tabs">
        <div className="flex flex-col gap-lg">
          <div>
            <p className="mb-sm text-meta text-textMuted">numbered</p>
            <Timeline idPrefix="KS" items={request.timeline} formatTime={relativeTime} />
          </div>
          <div>
            <p className="mb-sm text-meta text-textMuted">plain</p>
            <Timeline idPrefix="KS-plain" variant="plain" items={plainTimeline} formatTime={relativeTime} />
          </div>
          <Tabs
            idPrefix="KS"
            value={tab}
            onChange={setTab}
            tabs={[
              { value: 'detail', label: 'Detail', icon: <Icon name="description" /> },
              { value: 'thread', label: 'Thread', icon: <Icon name="forum" /> },
              { value: 'trail', label: 'Trail', icon: <Icon name="history" /> },
            ]}
          />
        </div>
      </Section>

      <Section title="Icon">
        <Stack>
          {(
            [
              'roomService',
              'build',
              'inventory',
              'badge',
              'concierge',
              'celebration',
              'mic',
              'close',
              'chevronRight',
              'checkCircle',
              'warning',
              'description',
              'forum',
              'history',
            ] as const
          ).map((n) => (
            <span key={n} className="flex flex-col items-center gap-xs text-primary">
              <Icon name={n} size={24} />
              <span className="text-meta text-textMuted">{n}</span>
            </span>
          ))}
        </Stack>
      </Section>

      <Section title="Sheet">
        <div className="relative h-sheetDemo overflow-hidden rounded-panel border border-border bg-page">
          <div className="p-lg">
            <Button data-id="KS/sheet-toggle" size="sm" onClick={() => setSheetOpen((v) => !v)}>
              {sheetOpen ? 'Close' : 'Open'}
            </Button>
            <p className="mt-sm text-meta text-textMuted">
              Slides 240ms, scrim rgba(0,0,0,0.25)
            </p>
          </div>
          <Sheet idPrefix="KS" open={sheetOpen} width={360} onClose={() => setSheetOpen(false)}>
            <div className="px-lg pb-lg">
              <p className="text-title">{request.title}</p>
              <p className="mt-xs text-meta text-textMuted">
                {request.ref} · {relativeTime(request.createdAt)}
              </p>
              <div className="mt-lg">
                <Timeline idPrefix="KS-sheet" items={request.timeline} formatTime={relativeTime} />
              </div>
            </div>
          </Sheet>
        </div>
      </Section>
    </div>
  );
}
