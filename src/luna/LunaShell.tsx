import { Navigate, Route, Routes } from 'react-router-dom';
import { RequestsBoard } from './RequestsBoard';

export function LunaShell() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Navigate to="requests" replace />} />
        <Route path="luna" element={<Navigate to="/luna/requests" replace />} />
        <Route path="requests" element={<RequestsBoard />} />
        <Route path="luna/requests" element={<RequestsBoard />} />
        <Route path="*" element={<RequestsBoard />} />
      </Routes>
    </div>
  );
}
