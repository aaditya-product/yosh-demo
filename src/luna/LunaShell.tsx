import { Route, Routes } from 'react-router-dom';
import { Scaffold } from '../Scaffold';

export function LunaShell() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="*" element={<Scaffold route="/luna" />} />
      </Routes>
    </div>
  );
}
