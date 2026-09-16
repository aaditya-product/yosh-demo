import { useState } from 'react';
import { relativeTime } from './data/time';
import { useAppState } from './store';
import {
  Avatar,
  Button,
  Card,
  Chip,
  ConfirmCard,
  Field,
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

const statuses: BadgeStatus[] = ['new', 'open', 'assigned', 'in_progress', 'done', 'cancelled', 'escalated'];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-lg py-md">
      <span className="w-avatarLg shrink-0 text-meta text-textMuted">{label}</span>
      <div className="flex flex-1 flex-wrap items-center gap-sm">{children}</div>
    </div>
  );
}

export function KitchenSink() {
  const { requests, staff } = useAppState();
  const [segment, setSegment] = useState('request');
  const [tab, setTab] = useState('detail');
  const [sheetOpen, setSheetOpen] = useState(true);
  const request = requests[1];

  return (
    <div className="min-h-full bg-page p-xl">
      <p className="text-title">Kitchen sink</p>

      <div className="mt-lg rounded-panel bg-surface p-lg">
        <Row label="Button">
          <Button data-id="KS/btn-primary">Assign</Button>
          <Button data-id="KS/btn-secondary" variant="secondary">Reassign</Button>
          <Button data-id="KS/btn-ghost" variant="ghost">Cancel</Button>
          <Button data-id="KS/btn-danger" variant="danger">Fail</Button>
          <Button data-id="KS/btn-sm" size="sm">Small</Button>
          <Button data-id="KS/btn-lg" size="lg">Pass</Button>
          <Button data-id="KS/btn-disabled" disabled>Disabled</Button>
        </Row>

        <Row label="Chip">
          <Chip data-id="KS/chip-all" count={7}>All</Chip>
          <Chip data-id="KS/chip-esc" count={1} selected>Escalated</Chip>
          <Chip data-id="KS/chip-prop" variant="property" selected>Villa 12</Chip>
          <Chip data-id="KS/chip-prop2" variant="property">The Residence</Chip>
          <Chip data-id="KS/chip-field" variant="field">8 covers</Chip>
          <Chip data-id="KS/chip-field-low" variant="field" lowConfidence>Normal</Chip>
        </Row>

        <Row label="Status">
          {statuses.map((s) => (
            <StatusBadge key={s} status={s} data-id={`KS/status-${s}`} />
          ))}
        </Row>

        <Row label="Avatar">
          {staff.slice(0, 3).map((s, i) => (
            <Avatar key={s.id} initials={s.initials} size={(['sm', 'md', 'lg'] as const)[i]} />
          ))}
        </Row>

        <Row label="Voice">
          <VoiceIndicator state="idle" data-id="KS/voice-idle" />
          <VoiceIndicator state="listening" data-id="KS/voice-listening" />
          <VoiceIndicator state="parsing" data-id="KS/voice-parsing" />
        </Row>

        <Row label="Inputs">
          <div className="w-genieHalf">
            <Field data-id="KS/field" label="What do you need?" placeholder="Laundry pickup from Villa 12" />
          </div>
          <div className="w-genieHalf">
            <Select
              data-id="KS/select"
              label="Assign to"
              options={staff.map((s) => ({ value: s.id, label: s.name }))}
            />
          </div>
          <SegmentedControl
            idPrefix="KS"
            value={segment}
            onChange={setSegment}
            segments={[
              { value: 'request', label: 'Request' },
              { value: 'schedule', label: 'Schedule' },
            ]}
          />
        </Row>
      </div>

      <div className="mt-lg grid grid-cols-3 gap-lg">
        <div className="flex flex-col gap-sm">
          <span className="text-meta text-textMuted">Card and ListRow</span>
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
            <ListRow data-id="KS/row-selected" title="Selected" subtitle="chipSelected, left edge" />
          </Card>
          <Card data-id="KS/card-escalated" escalated>
            <ListRow
              data-id="KS/row-escalated"
              title="Study window seal"
              subtitle="#0B8 · unassigned"
              trailing={<StatusBadge status="escalated" />}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-sm">
          <span className="text-meta text-textMuted">ConfirmCard</span>
          <ConfirmCard
            idPrefix="KS"
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
          <div className="mt-md flex justify-center">
            <Toast idPrefix="KS" message="Assigned to Rahul Menon" actionLabel="Undo" onAction={() => undefined} />
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <span className="text-meta text-textMuted">Timeline</span>
          <Card data-id="KS/card-timeline" className="p-lg">
            <Timeline idPrefix="KS" items={request.timeline} formatTime={relativeTime} />
          </Card>
          <Card data-id="KS/card-tabs" bordered={false}>
            <Tabs
              idPrefix="KS"
              value={tab}
              onChange={setTab}
              tabs={[
                { value: 'detail', label: 'Detail', icon: '▤' },
                { value: 'thread', label: 'Thread', icon: '✉' },
                { value: 'trail', label: 'Trail', icon: '◷' },
              ]}
            />
          </Card>
        </div>
      </div>

      <div className="mt-lg">
        <span className="text-meta text-textMuted">Sheet</span>
        <div className="relative mt-sm h-sheetDemo overflow-hidden rounded-panel border border-border bg-page">
          <div className="p-lg">
            <Button data-id="KS/sheet-open" onClick={() => setSheetOpen((v) => !v)}>
              {sheetOpen ? 'Close' : 'Open'}
            </Button>
          </div>
          <Sheet idPrefix="KS" open={sheetOpen} width={420} onClose={() => setSheetOpen(false)}>
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
      </div>
    </div>
  );
}
