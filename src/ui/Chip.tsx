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

// Sizes and colours measured on luna-dev.crossbo.com/tasks.
export function Chip({
  variant = 'filter',
  selected = false,
  count,
  lowConfidence = false,
  children,
  onClick,
  ...rest
}: ChipProps) {
  const shape =
    variant === 'property'
      ? 'h-propChip px-md gap-sm'
      : variant === 'filter'
        ? 'h-chip px-sm gap-sm'
        : 'h-chip px-md gap-sm';

  const look =
    variant === 'property'
      ? selected
        ? 'bg-primary text-textOnPrimary border border-primaryBorder'
        : 'bg-surface text-text border border-primaryBorder'
      : variant === 'field'
        ? `bg-primaryFill text-primary ${
            lowConfidence
              ? 'border border-dashed border-primaryBorderStrong'
              : 'border border-primaryBorder'
          } hover:border-primaryBorderStrong`
        : selected
          ? 'bg-primary text-textOnPrimary border border-primaryBorderStrong'
          : 'bg-surface text-text border border-primaryBorderStrong';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center rounded-pill text-bodyMed ${shape} ${look}`}
      {...rest}
    >
      {variant === 'filter' && count !== undefined && (
        <span
          className={`inline-flex h-count w-count items-center justify-center rounded-circle text-bodyMed text-text ${
            selected ? 'bg-surface' : 'bg-page'
          }`}
        >
          {count}
        </span>
      )}
      <span className={variant === 'filter' ? 'pr-sm' : ''}>{children}</span>
    </button>
  );
}
