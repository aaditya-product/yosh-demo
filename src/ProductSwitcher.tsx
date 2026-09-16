import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './ui';

// One tab, one store. Genie and Luna are full-screen views of the same running
// app, and this flips between them client-side — a real navigation would remount
// StoreProvider and reset every cross-product moment in the script back to seed.
export function ProductSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const product = pathname.startsWith('/genie') ? 'genie' : 'luna';

  // Remember where each product was, so switching mid-demo returns you to the
  // screen you left rather than its index.
  const lastPath = useRef<{ genie: string; luna: string }>({
    genie: '/genie/home',
    luna: '/luna/requests',
  });

  useEffect(() => {
    if (pathname.startsWith('/genie')) lastPath.current.genie = pathname;
    if (pathname.startsWith('/luna')) lastPath.current.luna = pathname;
  }, [pathname]);

  if (!pathname.startsWith('/genie') && !pathname.startsWith('/luna')) return null;

  const go = (next: 'genie' | 'luna') => {
    if (next === product) return;
    navigate(lastPath.current[next]);
  };

  return (
    <div
      data-id="SWITCH/product"
      className="fixed bottom-xl left-xl z-switcher flex items-center gap-xs rounded-pill border border-panelBorder bg-surface p-xs shadow-nav"
    >
      {(
        [
          ['genie', 'Genie', 'home'],
          ['luna', 'Luna', 'listAlt'],
        ] as const
      ).map(([value, label, icon]) => (
        <button
          key={value}
          type="button"
          data-id={`SWITCH/${value}`}
          onClick={() => go(value)}
          className={`flex h-navItem items-center gap-sm rounded-pill px-md text-nav ${
            product === value ? 'bg-navSelected text-primary' : 'text-textMuted'
          }`}
        >
          <Icon name={icon} size={18} />
          {label}
        </button>
      ))}
    </div>
  );
}
