import { useLocation } from 'react-router-dom';
import { useGo } from '../productRoot';
import { Icon, type IconName } from '../ui';

const ID = 'G-02';

// Content per docs/02-ia.md's rail table — kept even though Figma node
// 534:10120's rail lists hotel items (Spa, Restaurant, Taxi, Gym...). This is
// a residential estate, not a resort (docs/00-brief.md), so the content comes
// from the IA doc; only the visual treatment (white floating card, icon beside
// label, not icon-above-label in a pill) is pulled from that Figma frame.
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
    <nav className="flex h-full w-rail shrink-0 flex-col justify-center rounded-panel border border-border bg-surface px-lg py-xl shadow-nav">
      <div className="flex flex-col gap-lg">
        {items.map((item) => {
          const active = Boolean(item.to && location.pathname.includes(item.to));
          return (
            <button
              key={item.id}
              type="button"
              data-id={`${ID}/rail-${item.id}`}
              onClick={item.to ? () => go(item.to!) : undefined}
              className={`flex min-h-touch items-center gap-md text-bodyMed ${
                active ? 'text-primary' : 'text-textMuted'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        data-id={`${ID}/voice-trigger`}
        className="mt-xl flex h-btnLg w-btnLg items-center justify-center self-center rounded-circle bg-primary text-textOnPrimary"
      >
        <Icon name="mic" size={22} />
      </button>
    </nav>
  );
}
