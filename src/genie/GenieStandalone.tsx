import { GenieShell } from './GenieShell';

// The frame on its own page, for building and screenshotting Genie screens
// outside the /demo harness.
export function GenieStandalone() {
  return (
    <div className="flex h-full items-center justify-center bg-page">
      <div className="h-genie w-genie overflow-hidden rounded-panel border border-border">
        <GenieShell />
      </div>
    </div>
  );
}
