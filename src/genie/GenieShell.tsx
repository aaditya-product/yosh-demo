import { Route, Routes } from 'react-router-dom';
import { Scaffold } from '../Scaffold';

export function GenieShell() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-genie w-genie overflow-hidden rounded-panel bg-surface">
        <Routes>
          <Route path="*" element={<Scaffold route="/genie" />} />
        </Routes>
      </div>
    </div>
  );
}
