export type Segment = { value: string; label: string };

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
    <div className="inline-flex items-center gap-xs rounded-pill bg-surfaceMuted p-xs">
      {segments.map((s) => (
        <button
          key={s.value}
          type="button"
          data-id={`${idPrefix}/segment-${s.value}`}
          onClick={() => onChange(s.value)}
          className={`h-btnSm rounded-pill px-lg text-bodyMed ${
            s.value === value ? 'bg-chipSelected text-text' : 'text-textMuted'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
