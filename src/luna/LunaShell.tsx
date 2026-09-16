import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductRoot } from '../productRoot';
import { NavPanel } from './NavPanel';
import { RequestsBoard } from './RequestsBoard';
import { ToastHost } from './ToastHost';

export function LunaShell({ root = '/' }: { root?: string }) {
  return (
    <ProductRoot root={root}>
      <div className="relative flex h-full w-full overflow-hidden">
        <NavPanel />
        <div className="min-w-0 flex-1">
          <Routes>
            <Route index element={<Navigate to="requests" replace />} />
            <Route path="requests" element={<RequestsBoard />} />
            <Route path="*" element={<RequestsBoard />} />
          </Routes>
        </div>
        <ToastHost />
      </div>
    </ProductRoot>
  );
}
