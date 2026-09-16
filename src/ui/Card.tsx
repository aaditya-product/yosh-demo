import type { ReactNode } from 'react';

export type CardProps = {
  selected?: boolean;
  escalated?: boolean;
  bordered?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  'data-id': string;
};

export function Card({
  selected = false,
  escalated = false,
  bordered = true,
  children,
  onClick,
  className = '',
  ...rest
}: CardProps) {
  const look = selected
    ? 'bg-chipSelected border-l-edge border-l-primaryBorderStrong'
    : escalated
      ? 'bg-surface border border-statusEscalated'
      : `bg-surface ${bordered ? 'border border-border' : ''}`;

  return (
    <div
      onClick={onClick}
      className={`rounded-card ${look} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
