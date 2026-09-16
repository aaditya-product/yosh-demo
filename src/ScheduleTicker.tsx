import { useEffect } from 'react';
import { useAppState, useDispatch } from './store';

// L-12 / B6. A template that comes due creates a real request — this is true
// regardless of which screen is open, the same way an SLA clock keeps running
// off-screen. Checked every 5s; cheap, and nothing here is visible faster than
// that anyway.
export function ScheduleTicker() {
  const { scheduleTemplates } = useAppState();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      for (const t of scheduleTemplates) {
        if (Date.parse(t.nextDueAt) <= now) {
          dispatch({ kind: 'generateFromTemplate', templateId: t.id });
        }
      }
    }, 5000);
    return () => clearInterval(id);
  }, [scheduleTemplates, dispatch]);

  return null;
}
