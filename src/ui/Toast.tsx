import { Button } from './Button';

export function Toast({
  message,
  actionLabel,
  onAction,
  idPrefix,
}: {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  idPrefix: string;
}) {
  return (
    <div
      data-id={`${idPrefix}/toast`}
      className="pointer-events-auto inline-flex items-center gap-md rounded-pill bg-surface px-lg py-md shadow-toast"
    >
      <span className="text-bodyMed">{message}</span>
      {actionLabel && onAction && (
        <Button data-id={`${idPrefix}/toast-action`} variant="ghost" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
