import { Route, Routes } from 'react-router-dom';
import { Scaffold } from '../Scaffold';

export function GenieShell() {
  return (
    <div className="h-full w-full overflow-hidden bg-surface">
      <Routes>
        <Route path="*" element={<Scaffold route="/genie" />} />
      </Routes>
    </div>
  );
}
