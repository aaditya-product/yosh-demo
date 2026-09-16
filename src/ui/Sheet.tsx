import type { ReactNode } from 'react';
import { Icon } from './Icon';

export function Sheet({
  open,
  width,
  onClose,
  children,
  idPrefix,
}: {
  open: boolean;
  width: number;
  onClose: () => void;
  children: ReactNode;
  idPrefix: string;
}) {
  return (
    <div className={`absolute inset-0 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        data-id={`${idPrefix}/sheet-scrim`}
        onClick={onClose}
        className={`absolute inset-0 bg-scrim transition-opacity duration-overlay ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        data-id={`${idPrefix}/sheet`}
        style={{ width }}
        className={`absolute inset-y-0 right-0 bg-surface transition-transform duration-sheet ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center px-sm pt-sm">
            <button
              type="button"
              data-id={`${idPrefix}/sheet-close`}
              onClick={onClose}
              className="flex h-touch w-touch items-center justify-center text-textMuted"
            >
              <Icon name="close" size={20} />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
