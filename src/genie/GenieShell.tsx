import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductRoot } from '../productRoot';
import { GenieRequestDetail } from './GenieRequestDetail';
import { Home } from './Home';
import { MyRequests } from './MyRequests';
import { ServiceBrowse } from './ServiceBrowse';

// GenieRail deleted at 2.1: there is no floating icon rail in the Yosh
// build (docs/09-genie-reference.md's corrected addendum). Content is
// full-bleed with no rail clearance to apply — each screen owns its own
// layout directly.
export function GenieShell({ root = '/' }: { root?: string }) {
  return (
    <ProductRoot root={root}>
      <div className="relative h-full w-full overflow-hidden bg-surface">
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="requests/:requestId" element={<GenieRequestDetail />} />
          <Route path="services" element={<ServiceBrowse />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </ProductRoot>
  );
}
