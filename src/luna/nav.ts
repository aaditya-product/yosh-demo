// Nav groups per docs/02-ia.md. Only Requests, Registry, Inspections, Action
// plans and Insights are navigable in the demo. The rest render and do nothing
// — a dead-end screen is worse than an inert nav item.
export type NavItem = { id: string; label: string; to?: string };

export const navGroups: { group: string; items: NavItem[] }[] = [
  {
    group: 'Operations',
    items: [
      { id: 'requests', label: 'Requests', to: '/requests' },
      { id: 'my-requests', label: 'My requests' },
      { id: 'workload', label: 'Workload', to: '/workload' },
      { id: 'archive', label: 'Archive' },
    ],
  },
  {
    group: 'Assets',
    items: [
      { id: 'registry', label: 'Registry', to: '/registry' },
      { id: 'inventory', label: 'Inventory' },
      { id: 'fleet', label: 'Fleet' },
    ],
  },
  {
    group: 'Compliance',
    items: [
      { id: 'inspections', label: 'Inspections', to: '/inspections' },
      { id: 'action-plans', label: 'Action plans', to: '/action-plans' },
    ],
  },
  {
    group: 'Guests',
    items: [
      { id: 'feedback', label: 'Feedback' },
      { id: 'client-center', label: 'Guest center' },
      { id: 'chat', label: 'Chat' },
      { id: 'chat-history', label: 'Chat history' },
    ],
  },
  {
    group: 'Admin',
    items: [
      { id: 'admin', label: 'Admin' },
      { id: 'profile', label: 'Profile' },
      { id: 'announcements', label: 'Announcements' },
    ],
  },
];
