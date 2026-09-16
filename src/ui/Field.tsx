import type { InputHTMLAttributes, ReactNode } from 'react';

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  trailing?: ReactNode;
  'data-id': string;
};

export function Field({ label, trailing, className = '', ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-xs block text-meta text-textMuted">{label}</span>
      <span className="flex h-btnMd items-center gap-sm rounded-card border border-border bg-surface px-md">
        <input
          className={`min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-textMuted ${className}`}
          {...rest}
        />
        {trailing}
      </span>
    </label>
  );
}
