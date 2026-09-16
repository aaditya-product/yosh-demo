import type { Entities } from '../store/state';
import type {
  ActionPlan,
  Inspection,
  Property,
  RegistryItem,
  Request,
  Resident,
  Service,
  Staff,
} from '../store/types';
import { hoursAgo, minutesAgo, minutesFromNow, nextWeekdayAt, todayAt, tomorrowAt } from './time';

export const DEFAULT_PROPERTY_ID = 'villa-12';

// First runtime-created request lands on #0BE, which is the ref the demo script
// uses for the AC job raised in Beat 1.
export const REF_SEED = 0xbd;

export const properties: Property[] = [
  { id: 'villa-12', name: 'Villa 12', shortName: 'V12' },
  { id: 'the-residence', name: 'The Residence', shortName: 'RES' },
  { id: 'main-house', name: 'Main House', shortName: 'MH' },
  { id: 'garden-wing', name: 'Garden Wing', shortName: 'GW' },
  { id: 'lakeside-lodge', name: 'Lakeside Lodge', shortName: 'LL' },
  { id: 'stable-court', name: 'Stable Court', shortName: 'SC' },
];

export const residents: Resident[] = [
  { id: 'aisha', name: 'Aisha Al Mansoori', propertyId: 'villa-12', initials: 'AM' },
  { id: 'thomas', name: 'Thomas Reiner', propertyId: 'the-residence', initials: 'TR' },
  { id: 'leila', name: 'Leila Haddad', propertyId: 'garden-wing', initials: 'LH' },
];

export const staff: Staff[] = [
  { id: 'rahul', name: 'Rahul Menon', role: 'Technician', initials: 'RM', department: 'Maintenance' },
  { id: 'marta', name: 'Marta Silva', role: 'Supervisor', initials: 'MS', department: 'Housekeeping' },
  { id: 'omar', name: 'Omar Farouk', role: 'Estate Manager', initials: 'OF', department: 'Operations' },
  { id: 'priya', name: 'Priya Nair', role: 'HSE Officer', initials: 'PN', department: 'Compliance' },
  { id: 'daniel', name: 'Daniel Okoro', role: 'Attendant', initials: 'DO', department: 'Housekeeping' },
];

export const requests: Request[] = [
  {
    id: 'REQ-0901',
    ref: '#0A1',
    type: 'service',
    property: 'villa-12',
    requester: 'aisha',
    origin: 'catalogue',
    title: 'Fresh linen, main bedroom',
    items: [{ label: 'Bed linen, king', qty: 1 }],
    status: 'done',
    priority: 'normal',
    assignee: 'marta',
    eta: hoursAgo(1),
    slaMinutes: 120,
    createdAt: hoursAgo(2),
    timeline: [
      { at: hoursAgo(2), actor: 'aisha', event: 'Raised' },
      { at: minutesAgo(112), actor: 'omar', event: 'Assigned to Marta Silva' },
      { at: hoursAgo(1), actor: 'marta', event: 'Done' },
    ],
    external: null,
    tags: [],
  },
  {
    id: 'REQ-0904',
    ref: '#0A4',
    type: 'maintenance',
    property: 'villa-12',
    requester: 'aisha',
    origin: 'chat',
    title: 'Pool pump making a noise',
    items: [],
    status: 'in_progress',
    priority: 'high',
    assignee: 'rahul',
    eta: minutesAgo(25),
    slaMinutes: 120,
    createdAt: minutesAgo(145),
    timeline: [
      { at: minutesAgo(145), actor: 'aisha', event: 'Raised' },
      { at: minutesAgo(144), actor: 'aisha', event: 'It started this morning, quite loud.', kind: 'message' },
      { at: minutesAgo(138), actor: 'omar', event: 'Assigned to Rahul Menon' },
      { at: minutesAgo(136), actor: 'marta', event: 'Rahul is on his way.', kind: 'message' },
      { at: minutesAgo(130), actor: 'rahul', event: 'On site' },
    ],
    external: null,
    tags: ['delayed'],
  },
  {
    id: 'REQ-0907',
    ref: '#0A7',
    type: 'service',
    property: 'villa-12',
    requester: 'aisha',
    origin: 'catalogue',
    title: 'Laundry collection',
    items: [{ label: 'Laundry bag', qty: 2 }],
    status: 'assigned',
    priority: 'normal',
    assignee: 'daniel',
    eta: minutesFromNow(15),
    slaMinutes: 90,
    createdAt: minutesAgo(40),
    timeline: [
      { at: minutesAgo(40), actor: 'aisha', event: 'Raised' },
      { at: minutesAgo(34), actor: 'marta', event: 'Assigned to Daniel Okoro' },
    ],
    external: null,
    tags: [],
  },
  {
    id: 'REQ-0912',
    ref: '#0B2',
    type: 'access',
    property: 'villa-12',
    requester: 'omar',
    origin: 'command',
    title: 'Gate pass, florist delivery',
    items: [],
    status: 'open',
    priority: 'normal',
    assignee: null,
    eta: todayAt(14, 0),
    slaMinutes: 240,
    createdAt: minutesAgo(95),
    timeline: [{ at: minutesAgo(95), actor: 'omar', event: 'Raised' }],
    external: null,
    tags: [],
  },
  {
    id: 'REQ-0915',
    ref: '#0B5',
    type: 'asset',
    property: 'villa-12',
    requester: 'marta',
    origin: 'command',
    title: 'Warehouse, table linen ×12',
    items: [{ label: 'Table linen', qty: 12 }],
    status: 'open',
    priority: 'normal',
    assignee: null,
    eta: null,
    slaMinutes: 480,
    createdAt: minutesAgo(180),
    timeline: [
      { at: minutesAgo(180), actor: 'marta', event: 'Raised' },
      { at: minutesAgo(176), actor: 'system', event: 'Sent to D365 · PR-4468' },
    ],
    external: { system: 'D365', ref: 'PR-4468' },
    tags: [],
  },
  {
    id: 'REQ-0918',
    ref: '#0B8',
    type: 'maintenance',
    property: 'villa-12',
    requester: 'aisha',
    origin: 'chat',
    title: 'Study window seal',
    items: [],
    status: 'open',
    priority: 'escalated',
    assignee: null,
    eta: null,
    slaMinutes: 120,
    createdAt: minutesAgo(215),
    timeline: [
      { at: minutesAgo(215), actor: 'aisha', event: 'Raised' },
      { at: minutesAgo(95), actor: 'system', event: 'Escalated, no response within 2h' },
    ],
    external: null,
    tags: ['escalated', 'delayed'],
  },
  {
    id: 'REQ-0921',
    ref: '#0C1',
    type: 'concierge',
    property: 'villa-12',
    requester: 'aisha',
    origin: 'chat',
    title: 'Airport transfer Thursday',
    items: [],
    status: 'new',
    priority: 'normal',
    assignee: null,
    eta: null,
    slaMinutes: 240,
    createdAt: minutesAgo(12),
    timeline: [{ at: minutesAgo(12), actor: 'aisha', event: 'Raised' }],
    external: null,
    tags: [],
  },
];

// One shared queue. Villa 12 still carries the demo activity, but other
// properties have live work too, so the board reads as a single pane that the
// property chips narrow rather than a separate view per property.
export const otherPropertyRequests: Request[] = [
  {
    id: 'REQ-0931',
    ref: '#0D2',
    type: 'service',
    property: 'the-residence',
    requester: 'thomas',
    origin: 'catalogue',
    title: 'Coffee and pastries, terrace',
    items: [{ label: 'Cappuccino', qty: 2 }],
    status: 'assigned',
    priority: 'normal',
    assignee: 'daniel',
    eta: minutesFromNow(25),
    slaMinutes: 60,
    createdAt: minutesAgo(18),
    timeline: [{ at: minutesAgo(18), actor: 'thomas', event: 'Raised' }],
    external: null,
    tags: [],
  },
  {
    id: 'REQ-0934',
    ref: '#0D5',
    type: 'maintenance',
    property: 'garden-wing',
    requester: 'leila',
    origin: 'chat',
    title: 'Irrigation timer stuck',
    items: [],
    status: 'open',
    priority: 'normal',
    assignee: null,
    eta: null,
    slaMinutes: 180,
    createdAt: minutesAgo(52),
    timeline: [{ at: minutesAgo(52), actor: 'leila', event: 'Raised' }],
    external: null,
    tags: [],
  },
  {
    id: 'REQ-0937',
    ref: '#0D8',
    type: 'concierge',
    property: 'main-house',
    requester: 'omar',
    origin: 'command',
    title: 'Dinner reservation, four covers',
    items: [],
    status: 'done',
    priority: 'normal',
    assignee: 'omar',
    eta: hoursAgo(1),
    slaMinutes: 240,
    createdAt: hoursAgo(3),
    timeline: [{ at: hoursAgo(3), actor: 'omar', event: 'Raised' }],
    external: null,
    tags: [],
  },
  {
    id: 'REQ-0940',
    ref: '#0E1',
    type: 'asset',
    property: 'lakeside-lodge',
    requester: 'marta',
    origin: 'command',
    title: 'Replace jetty lighting',
    items: [{ label: 'Deck light', qty: 4 }],
    status: 'new',
    priority: 'normal',
    assignee: null,
    eta: null,
    slaMinutes: 480,
    createdAt: minutesAgo(7),
    timeline: [{ at: minutesAgo(7), actor: 'marta', event: 'Raised' }],
    external: null,
    tags: [],
  },
];

export const registry: RegistryItem[] = [
  // general
  { id: 'gen-1', facet: 'general', name: 'Table linen', category: 'Linen', location: 'Linen store', qty: 3, status: 'Low' },
  { id: 'gen-2', facet: 'general', name: 'Bath towels, large', category: 'Linen', location: 'Linen store', qty: 46, status: 'In stock' },
  { id: 'gen-3', facet: 'general', name: 'Pool chemicals, chlorine', category: 'Consumables', location: 'Pool plant room', qty: 12, status: 'In stock' },
  { id: 'gen-4', facet: 'general', name: 'Dinner service, 12 cover', category: 'Crockery', location: 'Pantry', qty: 2, status: 'In stock' },
  { id: 'gen-5', facet: 'general', name: 'Garden furniture covers', category: 'Outdoor', location: 'Garden store', qty: 8, status: 'In stock' },

  // wardrobe
  { id: 'war-1', facet: 'wardrobe', name: 'Navy wool suit', category: 'Tailoring', location: 'Villa 12', qty: 1, status: 'Ready', owner: 'Aisha Al Mansoori', storage: 'Dressing room, rail 2', condition: 'Good', lastCare: 'Dry cleaned 9 days ago' },
  { id: 'war-2', facet: 'wardrobe', name: 'Silk evening gown, ivory', category: 'Evening', location: 'Villa 12', qty: 1, status: 'At cleaners', owner: 'Aisha Al Mansoori', storage: 'Cold store', condition: 'Delicate', lastCare: 'Collected 2 days ago' },
  { id: 'war-3', facet: 'wardrobe', name: 'Cashmere coat, camel', category: 'Outerwear', location: 'Villa 12', qty: 1, status: 'Ready', owner: 'Aisha Al Mansoori', storage: 'Dressing room, rail 1', condition: 'Good', lastCare: 'Brushed 3 weeks ago' },
  { id: 'war-4', facet: 'wardrobe', name: 'Linen shirts, set of 6', category: 'Day wear', location: 'The Residence', qty: 6, status: 'Ready', owner: 'Thomas Reiner', storage: 'Wardrobe 3', condition: 'Good', lastCare: 'Pressed 4 days ago' },
  { id: 'war-5', facet: 'wardrobe', name: 'Riding boots', category: 'Footwear', location: 'Stable Court', qty: 1, status: 'Needs care', owner: 'Thomas Reiner', storage: 'Boot room', condition: 'Scuffed', lastCare: 'Polished 6 weeks ago' },

  // art
  { id: 'art-1', facet: 'art', name: 'Untitled, blue field', category: 'Painting', location: 'Main House, hall', qty: 1, status: 'On display', artist: 'M. Haddad', condition: 'Good', valuationDate: 'Valued March 2026' },
  { id: 'art-2', facet: 'art', name: 'Desert study no. 4', category: 'Painting', location: 'On loan, Sharjah Art Foundation', qty: 1, status: 'On loan', artist: 'R. Al Qasimi', condition: 'Good', valuationDate: 'Valued January 2026' },
  { id: 'art-3', facet: 'art', name: 'Bronze figure', category: 'Sculpture', location: 'Villa 12, library', qty: 1, status: 'On display', artist: 'Unknown', condition: 'Good', valuationDate: 'Valued March 2026' },
  { id: 'art-4', facet: 'art', name: 'Persian rug, Tabriz', category: 'Textile', location: 'The Residence, salon', qty: 1, status: 'On display', artist: 'Workshop piece', condition: 'Fair, edge wear', valuationDate: 'Valued November 2025' },
  { id: 'art-5', facet: 'art', name: 'Photographic series, harbour', category: 'Photography', location: 'Store, climate room', qty: 3, status: 'In storage', artist: 'L. Fenn', condition: 'Good', valuationDate: 'Valued March 2026' },

  // fleet
  { id: 'fle-1', facet: 'fleet', name: 'Range Rover', category: 'Estate car', location: 'Villa 12, garage', qty: 1, status: 'Service due', reg: 'D 44821', driver: 'Omar Farouk', nextService: 'Due Friday' },
  { id: 'fle-2', facet: 'fleet', name: 'Mercedes V-Class', category: 'People carrier', location: 'Main House, garage', qty: 1, status: 'Available', reg: 'D 19067', driver: 'Pool vehicle', nextService: 'Due in 6 weeks' },
  { id: 'fle-3', facet: 'fleet', name: 'Estate pickup', category: 'Utility', location: 'Stable Court', qty: 1, status: 'In use', reg: 'D 70233', driver: 'Rahul Menon', nextService: 'Due in 3 weeks' },
  { id: 'fle-4', facet: 'fleet', name: 'Golf buggy', category: 'Grounds', location: 'Garden Wing', qty: 2, status: 'Available', reg: 'Not registered', driver: 'Grounds team', nextService: 'Due in 2 months' },
  { id: 'fle-5', facet: 'fleet', name: 'Boat tender', category: 'Marine', location: 'Lakeside Lodge, jetty', qty: 1, status: 'Laid up', reg: 'LL-04', driver: 'Lakeside team', nextService: 'Due in 4 months' },
];

const inspectionChecks: { area: string; check: string }[] = [
  { area: 'Pool terrace', check: 'Pool gate self-closes and latches' },
  { area: 'Pool terrace', check: 'Rescue ring and pole in place' },
  { area: 'Pool plant room', check: 'Chemical store secured and labelled' },
  { area: 'Pool plant room', check: 'Eye wash station clear and in date' },
  { area: 'Kitchen', check: 'Fire blanket and extinguisher in place' },
  { area: 'Kitchen', check: 'Fridge and freezer temperatures logged' },
  { area: 'Kitchen', check: 'Gas shut-off accessible' },
  { area: 'Plant room', check: 'Electrical panel clear of storage' },
  { area: 'Plant room', check: 'Emergency lighting works' },
  { area: 'Grounds', check: 'Walkways free of trip hazards' },
  { area: 'Grounds', check: 'Generator fuel level above half' },
  { area: 'Staff areas', check: 'First aid kit stocked' },
];

export const inspections: Inspection[] = [
  {
    id: 'INS-01',
    name: 'Weekly HSE walkthrough',
    area: 'Villa 12, whole property',
    propertyId: 'villa-12',
    assigneeId: 'priya',
    dueAt: todayAt(11, 0),
    items: inspectionChecks.map((c, i) => ({
      id: `INS-01-${i + 1}`,
      area: c.area,
      check: c.check,
      result: null,
    })),
  },
];

export const actionPlans: ActionPlan[] = [];

export const services: Service[] = [
  {
    id: 'svc-aromatherapy',
    name: 'Aromatherapy massage',
    category: 'Massage therapy',
    mood: 'Relaxation',
    description:
      'A gentle, oil-based full-body massage to calm your nervous system and reset after travel or long days.',
    longCopy:
      'This treatment combines a soothing full-body massage with the natural healing benefits of essential oils. Each aroma carries its own therapeutic effect, some energise, some soothe, some help reset emotional balance. Your therapist works with light to medium pressure, focusing on slow, continuous movements that improve circulation and quiet the nervous system. The result is a sense of clarity, softness, and deep relaxation that stays with you long after the session ends. You will love this if: you feel mentally overloaded and need to switch off. Your body feels tight from flights, long drives, or desk work. You prefer gentle to medium pressure over deep tissue work. Good to know before you book: 30 min focuses on back, neck and shoulders, 60 and 90 min are full-body with extra time for feet and scalp. Please let us know if you are pregnant, breastfeeding, or have any recent injuries or surgeries. We recommend avoiding heavy meals and alcohol in the hour before your treatment.',
    priceFrom: 60,
    options: [
      { id: 'booking-for', label: 'Booking this for', values: ['Single', 'Couple'] },
      { id: 'session-length', label: 'Session length', values: ['30 min', '60 min', '90 min'] },
      { id: 'enhancement', label: 'Enhance your experience', values: ['Head and neck massage'] },
      { id: 'time', label: 'Time', values: ['Morning', 'Afternoon', 'Evening'] },
    ],
  },
  {
    id: 'svc-hot-stone',
    name: 'Hot stone massage',
    category: 'Massage therapy',
    mood: 'Pain relief',
    description: 'Warm basalt stones worked through the back and shoulders to release held tension.',
    longCopy: '',
    priceFrom: 75,
    options: [{ id: 'session-length', label: 'Session length', values: ['60 min', '90 min'] }],
  },
  {
    id: 'svc-deep-tissue',
    name: 'Deep tissue massage',
    category: 'Massage therapy',
    mood: 'Pain relief',
    description: 'Firm, focused pressure on the areas that carry the most load.',
    longCopy: '',
    priceFrom: 70,
    options: [{ id: 'session-length', label: 'Session length', values: ['60 min', '90 min'] }],
  },
  {
    id: 'svc-hammam',
    name: 'Traditional hammam',
    category: 'Hammam therapy',
    mood: 'Detox',
    description: 'Steam, black soap cleanse and a full exfoliation.',
    longCopy: '',
    priceFrom: 85,
    options: [{ id: 'session-length', label: 'Session length', values: ['45 min', '75 min'] }],
  },
  {
    id: 'svc-hammam-couple',
    name: 'Hammam for two',
    category: 'Hammam therapy',
    mood: 'Relaxation',
    description: 'The same ritual in the double chamber, with tea afterwards.',
    longCopy: '',
    priceFrom: 150,
    options: [{ id: 'session-length', label: 'Session length', values: ['75 min'] }],
  },
  {
    id: 'svc-hydrating-facial',
    name: 'Hydrating facial',
    category: 'Facials',
    mood: 'Facials',
    description: 'Cleanse, gentle exfoliation and a hydrating mask for dry or sun-exposed skin.',
    longCopy: '',
    priceFrom: 65,
    options: [{ id: 'session-length', label: 'Session length', values: ['45 min', '60 min'] }],
  },
];

// Genie screen copy, extracted from the Figma frames and de-branded.
// The Figma source is a hotel spa (Casa Cook El Gouna, guest "Thomas", prices
// in euro). Layout and structure are kept exactly; the words are moved to a
// residential estate. Anything rendered on G-01, G-07 or G-08 reads from here,
// so the hotel copy cannot creep back in when those screens get built.
export const currency = 'AED';

export const formatPrice = (amount: number) => `${currency} ${amount}`;

export const genieCopy = {
  // G-01 welcome. Figma: "WELCOME, Thomas" — the resident is the Genie user.
  welcomeName: 'Aisha',

  // G-07 service browse. Figma title was "Spa Booking".
  catalogueTitle: 'Wellness',
  catalogueHeadline: 'Feel better, your way',
  catalogueSubhead: 'Browse by category or explore by mood',
  moodPrompt: 'Explore treatments based on your mood',
  helpChip: 'Help me choose',
  priceFromLabel: 'From',

  // G-08 booking stepper.
  bookingForLabel: 'Booking this for',
  sessionLengthLabel: 'Session length',
  enhancementLabel: 'Enhance your experience',
  enhancementTag: 'Popular choice',
  summaryLabel: 'Summary',
  bookCta: 'Book',
  continueCta: 'Next',
} as const;

export const moods = ['Relaxation', 'Pain relief', 'Detox', 'Facials'] as const;

export const serviceEnhancement = {
  name: 'Head and neck massage',
  note: 'Boost circulation and soothe post massage',
  price: 20,
};

export function buildSeed(): Entities {
  return {
    properties,
    residents,
    staff,
    requests: [...requests, ...otherPropertyRequests],
    registry,
    inspections,
    actionPlans,
    services,
  };
}

export const gatheringSlots = {
  tonight: todayAt(19, 30),
  thursdayTransfer: nextWeekdayAt(4, 9, 0),
  gatePassTomorrow: tomorrowAt(9, 0),
};
