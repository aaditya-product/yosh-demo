import type { ReactNode } from 'react';

export type ListRowProps = {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  body?: ReactNode;
  onClick?: () => void;
  'data-id': string;
};

export function ListRow({ leading, title, subtitle, trailing, body, onClick, ...rest }: ListRowProps) {
  return (
    <div
      onClick={onClick}
      className={`min-h-touch px-lg py-md ${onClick ? 'cursor-pointer' : ''}`}
      {...rest}
    >
      <div className="flex items-center gap-md">
        {leading && <span className="shrink-0">{leading}</span>}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-bodyMed">{title}</span>
          {subtitle && <span className="mt-xs block truncate text-meta text-textMuted">{subtitle}</span>}
        </span>
        {trailing && <span className="shrink-0">{trailing}</span>}
      </div>
      {body && (
        <>
          <hr className="my-md border-0 border-t border-border" />
          {body}
        </>
      )}
    </div>
  );
}
