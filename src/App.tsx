import { Route, Routes } from 'react-router-dom';
import { KitchenSink } from './KitchenSink';
import { GenieStandalone } from './genie/GenieStandalone';
import { LunaShell } from './luna/LunaShell';

export function App() {
  return (
    <Routes>
      <Route path="/genie/*" element={<GenieStandalone />} />
      <Route path="/luna/*" element={<LunaShell root="/luna" />} />
      <Route path="/kitchen-sink" element={<KitchenSink />} />
    </Routes>
  );
}
