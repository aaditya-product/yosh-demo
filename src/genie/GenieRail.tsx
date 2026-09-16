import { useLocation } from 'react-router-dom';
import { useGo } from '../productRoot';
import { Icon, type IconName } from '../ui';

const ID = 'G-RAIL';

// Rail pattern per docs/02-ia.md: vertical, persistent, pill container, icon
// above label, teal icons. Items without `to` render and highlight but do not
// navigate — a dead-end screen is worse than an inert rail item. The Figma
// rail node 534:10120 gets matched at task 2.1.
const items: { id: string; label: string; icon: IconName; to?: string }[] = [
  { id: 'my-requests', label: 'My requests', icon: 'listAlt', to: '/requests' },
  { id: 'housekeeping', label: 'Housekeeping', icon: 'cleaning' },
  { id: 'maintenance', label: 'Maintenance', icon: 'build' },
  { id: 'gatherings', label: 'Gatherings', icon: 'celebration' },
  { id: 'concierge', label: 'Concierge', icon: 'concierge' },
  { id: 'provisions', label: 'Provisions', icon: 'basket' },
  { id: 'property', label: 'Property', icon: 'home' },
  { id: 'profile', label: 'Profile', icon: 'person' },
];

export function GenieRail() {
  const go = useGo();
  const location = useLocation();

  return (
    <nav className="flex h-full w-rail shrink-0 flex-col items-center gap-sm rounded-pill bg-surfaceMuted px-sm py-lg">
      {items.map((item) => {
        const active = Boolean(item.to && location.pathname.includes(item.to));
        return (
          <button
            key={item.id}
            type="button"
            data-id={`${ID}/${item.id}`}
            onClick={item.to ? () => go(item.to!) : undefined}
            className={`flex min-h-touch w-full flex-col items-center justify-center gap-xs rounded-pill px-xs py-sm text-meta ${
              active ? 'bg-surface text-primary' : 'text-textMuted hover:bg-surface'
            }`}
          >
            <span className="text-primary">
              <Icon name={item.icon} size={20} />
            </span>
            <span className="text-center leading-none">{item.label}</span>
          </button>
        );
      })}

      <button
        type="button"
        data-id={`${ID}/voice`}
        className="mt-auto flex h-btnLg w-btnLg items-center justify-center rounded-circle bg-primary text-textOnPrimary"
      >
        <Icon name="mic" size={22} />
      </button>
    </nav>
  );
}
