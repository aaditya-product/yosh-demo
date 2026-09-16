export type Segment = { value: string; label: string };

// Measured on luna-dev: white pill container with a chipSelected outline, the
// selected segment filled chipSelected.
export function SegmentedControl({
  segments,
  value,
  onChange,
  idPrefix,
}: {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
  idPrefix: string;
}) {
  return (
    <div className="inline-flex h-segment items-center rounded-pill border border-chipSelected bg-surface p-xs">
      {segments.map((s) => (
        <button
          key={s.value}
          type="button"
          data-id={`${idPrefix}/segment-${s.value}`}
          onClick={() => onChange(s.value)}
          className={`h-segmentInner rounded-pill px-xl text-bodyMed ${
            s.value === value ? 'bg-chipSelected text-text' : 'text-text'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
