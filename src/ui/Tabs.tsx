import type { ReactNode } from 'react';

export type Tab = { value: string; label: string; icon: ReactNode };

export function Tabs({
  tabs,
  value,
  onChange,
  idPrefix,
  className = '',
}: {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  idPrefix: string;
  className?: string;
}) {
  return (
    <div className={`flex items-stretch bg-surface ${className || 'border-t border-border'}`}>
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          data-id={`${idPrefix}/tab-${t.value}`}
          onClick={() => onChange(t.value)}
          className={`flex min-h-touch flex-1 flex-col items-center justify-center gap-xs py-sm text-meta ${
            t.value === value ? 'text-primary' : 'text-textMuted'
          }`}
        >
          <span aria-hidden>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
