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

// selected and escalated are independent. Selected changes the fill and adds
// the left edge; escalated changes the border. A selected escalated request
// shows both, because losing the escalation styling on selection hides the one
// thing about that card that matters.
export function Card({
  selected = false,
  escalated = false,
  bordered = true,
  children,
  onClick,
  className = '',
  ...rest
}: CardProps) {
  const look = [
    selected ? 'bg-chipSelected' : 'bg-surface',
    escalated
      ? 'border border-statusEscalated'
      : bordered
        ? 'border border-border'
        : '',
    selected ? 'border-l-edge border-l-primaryBorderStrong' : '',
  ]
    .filter(Boolean)
    .join(' ');

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
