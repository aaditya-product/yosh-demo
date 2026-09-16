import { GenieShell } from './GenieShell';

// Genie renders in a fixed 1280x800 frame, centred on the page.
export function GenieStandalone() {
  return (
    <div className="flex h-full items-center justify-center bg-page">
      <div className="h-genie w-genie overflow-hidden rounded-panel border border-border">
        <GenieShell root="/genie" />
      </div>
    </div>
  );
}
