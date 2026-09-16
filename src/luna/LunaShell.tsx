import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductRoot } from '../productRoot';
import { Icon } from '../ui';
import { NavPanel } from './NavPanel';
import { RequestsBoard } from './RequestsBoard';
import { ToastHost } from './ToastHost';

// The live build has no persistent nav column. The board runs full width and
// the nav is an overlay, opened from the floating cluster bottom right.
export function LunaShell({ root = '/' }: { root?: string }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <ProductRoot root={root}>
      <div className="relative h-full w-full overflow-hidden bg-page">
        <Routes>
          <Route index element={<Navigate to="requests" replace />} />
          <Route path="requests" element={<RequestsBoard />} />
          <Route path="*" element={<RequestsBoard />} />
        </Routes>

        <div className="absolute bottom-xl right-xl flex items-center gap-md rounded-pill bg-surface px-lg py-md shadow-toast">
          <button
            type="button"
            data-id="L-03/open-nav"
            onClick={() => setNavOpen(true)}
            className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle text-textMuted"
          >
            <Icon name="listAlt" size={20} />
          </button>
          <button
            type="button"
            data-id="L-03/open-command"
            onClick={() => setNavOpen(true)}
            className="flex h-iconBtn w-iconBtn items-center justify-center rounded-circle text-textMuted"
          >
            <Icon name="mic" size={20} />
          </button>
          <span className="flex h-segmentInner w-segmentInner items-center justify-center rounded-circle bg-primary text-textOnPrimary">
            <Icon name="forum" size={20} />
          </span>
        </div>

        <NavPanel open={navOpen} onClose={() => setNavOpen(false)} />
        <ToastHost />
      </div>
    </ProductRoot>
  );
}
