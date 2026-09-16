import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGo } from '../productRoot';
import { Icon, type IconName } from '../ui';

const ID = 'G-02';

// Content per docs/02-ia.md's rail table — kept even though Figma node
// 534:10120's rail lists hotel items (Spa, Restaurant, Taxi, Gym...). This is
// a residential estate, not a resort (docs/00-brief.md), so the content comes
// from the IA doc; only the visual treatment and the three-state behaviour
// (docs/09-genie-reference.md) are pulled from Figma/the product recording.
// The old embedded mic button is gone: 09's recording shows no mic on the
// rail at all, and TASKS 2.6 says voice appears nowhere else on Genie — its
// one home is the bottom-right cluster's chat button, added at R.5.
const items: { id: string; label: string; icon: IconName; to?: string }[] = [
  { id: 'my-requests', label: 'My requests', icon: 'listAlt', to: '/requests' },
  { id: 'housekeeping', label: 'Housekeeping', icon: 'cleaning' },
  { id: 'maintenance', label: 'Maintenance', icon: 'build' },
  { id: 'gatherings', label: 'Gatherings', icon: 'celebration' },
  { id: 'concierge', label: 'Concierge', icon: 'concierge', to: '/services' },
  { id: 'provisions', label: 'Provisions', icon: 'basket' },
  { id: 'property', label: 'Property', icon: 'home' },
  { id: 'profile', label: 'Profile', icon: 'person' },
];

// Three states per 09-genie-reference.md: a barely-visible collapsed sliver, an
// icon-only column, and a labelled expanded card. The recording doesn't say what
// triggers each one on a touch device, so for this mouse-driven demo: hovering
// always reveals the expanded, labelled card (matches "expands on interaction and
// collapses again"); a small chevron — visible only while expanded — is a guessed
// affordance to deliberately tuck the rail away to the sliver, since nothing in
// the source names a control for that state either.
type BaseMode = 'icons' | 'sliver';

export function GenieRail() {
  const go = useGo();
  const location = useLocation();
  const [mode, setMode] = useState<BaseMode>('icons');
  const [hovering, setHovering] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const expanded = hovering;

  useLayoutEffect(() => {
    const el = listRef.current;
    if (el) setOverflowing(el.scrollHeight > el.clientHeight);
  }, []);

  const width =
    expanded ? 'w-railExpanded' : mode === 'sliver' ? 'w-railSliver' : 'w-railIcon';

  return (
    <nav
      data-id={`${ID}/rail`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`absolute left-railLeft top-1/2 z-cluster flex h-rail -translate-y-1/2 flex-col items-stretch overflow-hidden rounded-rail border-railHair border-railBorder bg-surface shadow-railFloat transition-all duration-overlay ${width}`}
    >
      <div
        ref={listRef}
        className="relative flex min-h-0 flex-1 flex-col items-start gap-railItem overflow-y-auto px-railX py-xl"
      >
        {items.map((item) => {
          const active = Boolean(item.to && location.pathname.includes(item.to));
          return (
            <button
              key={item.id}
              type="button"
              data-id={`${ID}/rail-${item.id}`}
              onClick={item.to ? () => go(item.to!) : undefined}
              className={`flex shrink-0 items-center gap-sm whitespace-nowrap text-nav ${
                active ? 'text-primary' : 'text-railLabel'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {expanded && <span>{item.label}</span>}
            </button>
          );
        })}
        {expanded && overflowing && (
          <span
            data-id={`${ID}/rail-scroll-indicator`}
            className="pointer-events-none absolute right-0 top-0 h-full w-hair rounded-pill bg-navDivider"
          />
        )}
      </div>

      {expanded && (
        <button
          type="button"
          data-id={`${ID}/rail-collapse`}
          onClick={() => setMode((m) => (m === 'sliver' ? 'icons' : 'sliver'))}
          className="mb-md flex shrink-0 items-center justify-center self-center text-textMuted"
        >
          <Icon name="chevronRight" size={14} className={mode === 'sliver' ? '' : 'rotate-180'} />
        </button>
      )}
    </nav>
  );
}
