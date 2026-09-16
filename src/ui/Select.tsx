import type { SelectHTMLAttributes } from 'react';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  'data-id': string;
};

export function Select({ label, options, className = '', ...rest }: SelectProps) {
  return (
    <label className="block">
      {label && <span className="mb-xs block text-meta text-textMuted">{label}</span>}
      <span className="relative block">
        <select
          className={`h-btnMd w-full appearance-none rounded-pill border border-borderMuted bg-surface pl-lg pr-xl text-body text-text outline-none ${className}`}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-lg flex items-center text-textMuted">
          ›
        </span>
      </span>
    </label>
  );
}
