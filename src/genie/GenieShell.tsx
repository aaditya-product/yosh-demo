import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductRoot } from '../productRoot';
import { GenieRail } from './GenieRail';
import { GenieRequestDetail } from './GenieRequestDetail';
import { Home } from './Home';
import { MyRequests } from './MyRequests';
import { ServiceBrowse } from './ServiceBrowse';

export function GenieShell({ root = '/' }: { root?: string }) {
  return (
    <ProductRoot root={root}>
      {/* R.1: the rail floats over content and does not push it (09-genie-
          reference.md) — content is now full-bleed, not a flex sibling. */}
      <div className="relative h-full w-full overflow-hidden bg-surface">
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="requests/:requestId" element={<GenieRequestDetail />} />
          <Route path="services" element={<ServiceBrowse />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <GenieRail />
      </div>
    </ProductRoot>
  );
}
