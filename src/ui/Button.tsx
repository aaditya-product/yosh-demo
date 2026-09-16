import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-textOnPrimary',
  secondary: 'bg-surface border border-primaryBorder text-primary',
  ghost: 'bg-transparent text-text',
  danger: 'bg-statusEscalated text-textOnPrimary',
};

// Touch targets never below 44px, so sm and md pad out with a transparent
// hit area rather than shrinking the tappable box.
const sizes: Record<Size, string> = {
  sm: 'h-btnSm px-md text-metaBold',
  md: 'h-btnMd px-lg text-bodyMed',
  lg: 'h-btnLg px-xl text-bodyLg',
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leading?: ReactNode;
  trailing?: ReactNode;
  'data-id': string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  leading,
  trailing,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-sm rounded-pill disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {leading}
      {children}
      {trailing}
    </button>
  );
}
