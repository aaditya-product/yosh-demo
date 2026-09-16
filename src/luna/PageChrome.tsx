import type { ReactNode } from 'react';
import { useAppState, useDispatch } from '../store';
import { Chip, Icon } from '../ui';

// The chrome L-01 establishes: property chip row, then the page title with the
// search and add buttons right-aligned. Shared so every Luna page frames the
// same way and the property chips stay a filter, never a per-property view.
export function PageChrome({
  id,
  title,
  actions,
  children,
}: {
  id: string;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { properties, ui } = useAppState();
  const dispatch = useDispatch();

  return (
    <div className="flex h-full flex-col bg-page">
      <div className="flex gap-sm overflow-x-auto px-xl pt-xl">
        {properties.map((p) => (
          <Chip
            key={p.id}
            data-id={`${id}/property-${p.id}`}
            variant="property"
            selected={p.id === ui.selectedPropertyId}
            onClick={() =>
              dispatch({
                kind: 'selectProperty',
                propertyId: p.id === ui.selectedPropertyId ? null : p.id,
              })
            }
          >
            {p.name}
          </Chip>
        ))}
      </div>

      <div className="flex items-center gap-lg px-xl pt-lg">
        <span className="text-title">{title}</span>
        {actions}
        <span className="ml-auto flex items-center gap-sm">
          <button
            type="button"
            data-id={`${id}/search`}
            className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle bg-primaryFill text-primary"
          >
            <Icon name="search" size={18} />
          </button>
          <button
            type="button"
            data-id={`${id}/add`}
            className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle bg-primaryFill text-primary"
          >
            <Icon name="add" size={18} />
          </button>
        </span>
      </div>

      {children}
    </div>
  );
}
