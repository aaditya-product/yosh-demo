import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductRoot } from '../productRoot';
import { GenieRail } from './GenieRail';
import { GenieRequestDetail } from './GenieRequestDetail';
import { MyRequests } from './MyRequests';

export function GenieShell({ root = '/' }: { root?: string }) {
  return (
    <ProductRoot root={root}>
      <div className="flex h-full w-full gap-lg overflow-hidden bg-page p-lg">
        <GenieRail />
        <div className="min-w-0 flex-1 overflow-hidden rounded-panel bg-surface">
          <Routes>
            <Route index element={<Navigate to="requests" replace />} />
            <Route path="requests" element={<MyRequests />} />
            <Route path="requests/:requestId" element={<GenieRequestDetail />} />
            <Route path="*" element={<MyRequests />} />
          </Routes>
        </div>
      </div>
    </ProductRoot>
  );
}
