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
          reference.md) — content is full-bleed, not a flex sibling. Rail
          clearance (checklist item 3) is applied once here, on every route,
          rather than by each screen — see tokens.ts's `genieContentX`. */}
      <div className="relative h-full w-full overflow-hidden bg-surface">
        <div className="h-full w-full overflow-hidden pl-genieContentX">
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="requests" element={<MyRequests />} />
            <Route path="requests/:requestId" element={<GenieRequestDetail />} />
            <Route path="services" element={<ServiceBrowse />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <GenieRail />
      </div>
    </ProductRoot>
  );
}
