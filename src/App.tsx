import { Navigate, Route, Routes } from 'react-router-dom';
import { KitchenSink } from './KitchenSink';
import { Scaffold } from './Scaffold';
import { GenieShell } from './genie/GenieShell';
import { LunaShell } from './luna/LunaShell';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/demo" replace />} />
      <Route path="/genie/*" element={<GenieShell />} />
      <Route path="/luna/*" element={<LunaShell />} />
      <Route path="/demo" element={<Scaffold route="/demo" />} />
      <Route path="/kitchen-sink" element={<KitchenSink />} />
    </Routes>
  );
}
