import type { ReactNode } from 'react';

type Variant = 'filter' | 'field' | 'property';

export type ChipProps = {
  variant?: Variant;
  selected?: boolean;
  count?: number;
  lowConfidence?: boolean;
  children: ReactNode;
  onClick?: () => void;
  'data-id': string;
};

export function Chip({
  variant = 'filter',
  selected = false,
  count,
  lowConfidence = false,
  children,
  onClick,
  ...rest
}: ChipProps) {
  const base = 'inline-flex items-center gap-sm rounded-pill h-chip px-md text-bodyMed';

  const look =
    variant === 'property'
      ? selected
        ? 'bg-primary text-textOnPrimary'
        : 'bg-surface border border-border text-text'
      : variant === 'field'
        ? `bg-primaryFill text-primary ${
            lowConfidence ? 'border border-dashed border-primaryBorderStrong' : 'border border-primaryBorder'
          } hover:border-primaryBorderStrong`
        : selected
          ? 'bg-chipSelected text-text'
          : 'bg-surface border border-border text-text';

  return (
    <button type="button" onClick={onClick} className={`${base} ${look}`} {...rest}>
      {variant === 'filter' && count !== undefined && (
        <span
          className={`inline-flex h-count w-count items-center justify-center rounded-circle text-meta ${
            selected ? 'bg-primary text-textOnPrimary' : 'bg-primaryFill text-primary'
          }`}
        >
          {count}
        </span>
      )}
      {children}
    </button>
  );
}
