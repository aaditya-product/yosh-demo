export type TimelineItem = { at: string; actor?: string; event: string };

export function Timeline({
  items,
  variant = 'numbered',
  idPrefix,
  formatTime,
}: {
  items: TimelineItem[];
  variant?: 'numbered' | 'plain';
  idPrefix: string;
  formatTime: (iso: string) => string;
}) {
  return (
    <ol className="flex flex-col">
      {items.map((item, i) => (
        <li key={`${item.at}-${i}`} className="flex gap-md" data-id={`${idPrefix}/timeline-entry-${i}`}>
          <span className="flex flex-col items-center">
            <span
              className={`flex h-avatarSm w-avatarSm shrink-0 items-center justify-center rounded-circle text-meta ${
                variant === 'numbered'
                  ? 'bg-primaryFill text-primary'
                  : 'bg-primary text-textOnPrimary'
              }`}
            >
              {variant === 'numbered' ? i + 1 : ''}
            </span>
            {i < items.length - 1 && <span className="w-px flex-1 bg-border" />}
          </span>
          <span className="flex-1 pb-lg">
            <span className="block text-body">{item.event}</span>
            <span className="mt-xs block text-meta text-textMuted">
              {formatTime(item.at)}
              {item.actor ? ` · ${item.actor}` : ''}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
