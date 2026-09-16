import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { DemoHarness } from './DemoHarness';

// /demo runs two independent navigation stacks side by side, one per product,
// so it sits outside the browser router — react-router allows only one Router
// per tree, and each pane needs its own.
export function Root() {
  const path = window.location.pathname;
  if (path === '/' || path === '/demo') {
    if (path === '/') window.history.replaceState(null, '', '/demo');
    return <DemoHarness />;
  }
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
