import { useEffect, useRef, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GenieShell } from './genie/GenieShell';
import { LunaShell } from './luna/LunaShell';
import { frame } from './tokens';

// Genie is authored at exactly 1280x800 and scaled to fit the presenter's
// screen. Everything inside the frame still measures in real frame pixels.
function useFitScale(maxWidthFraction: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(
        Math.min(1, (width * maxWidthFraction) / frame.genie.w, height / frame.genie.h),
      );
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [maxWidthFraction]);

  return { ref, scale };
}

export function DemoHarness() {
  const { ref, scale } = useFitScale(0.5);

  return (
    <div ref={ref} className="flex h-full w-full items-stretch gap-lg bg-page p-lg">
      <div className="flex shrink-0 items-center" style={{ width: frame.genie.w * scale }}>
        <div
          data-id="DEMO/genie-frame"
          className="overflow-hidden rounded-panel border border-border bg-surface"
          style={{ width: frame.genie.w * scale, height: frame.genie.h * scale }}
        >
          <div
            className="h-genie w-genie origin-top-left"
            style={{ transform: `scale(${scale})` }}
          >
            <MemoryRouter initialEntries={['/']}>
              <GenieShell />
            </MemoryRouter>
          </div>
        </div>
      </div>

      <div
        data-id="DEMO/luna-pane"
        className="h-full min-w-0 flex-1 overflow-hidden rounded-panel border border-border bg-surface"
      >
        <MemoryRouter initialEntries={['/']}>
          <LunaShell />
        </MemoryRouter>
      </div>
    </div>
  );
}
