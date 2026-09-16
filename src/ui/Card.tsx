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
  // 04 specifies primaryBorderStrong here, but at 20% opacity over chipSelected
  // the edge is invisible. Full-strength primary, agreed with the user.
  const look = selected
    ? 'bg-chipSelected border-l-edge border-l-primary'
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
