import type { ReactNode } from 'react';
import type { CardField } from '../store';
import { Button } from './Button';
import { Card } from './Card';
import { Chip } from './Chip';

export function ConfirmCard({
  icon,
  title,
  fields,
  source,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  idPrefix,
}: {
  icon?: ReactNode;
  title: string;
  fields: CardField[];
  source?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  idPrefix: string;
}) {
  return (
    <Card data-id={`${idPrefix}/confirm-card`} className="p-lg">
      <div className="flex items-center gap-sm">
        {icon && <span aria-hidden>{icon}</span>}
        <span className="text-title">{title}</span>
      </div>

      <div className="mt-md flex flex-wrap gap-sm">
        {fields.map((f) => (
          <Chip
            key={f.label}
            data-id={`${idPrefix}/field-${f.label}`}
            variant="field"
            lowConfidence={f.confidence === 'low'}
          >
            {f.value}
          </Chip>
        ))}
      </div>

      {source && <p className="mt-md text-meta text-textMuted">“{source}”</p>}

      <div className="mt-lg flex items-center gap-sm">
        <Button data-id={`${idPrefix}/confirm`} onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button data-id={`${idPrefix}/cancel`} variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
}
