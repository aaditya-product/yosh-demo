# 01 · Demo script

Everything in this repo serves this file. If a screen isn't needed by a step
below, it doesn't get built.

The client asked about roughly 30 things in the RFI. This walks all of them
except the four we said we don't support: animal care, client cost approval,
purchase requests, budget management. Those are never mentioned and never
appear in the UI.

Runtime ~38 min. Five sections. Presented from `/demo` with Genie in a
1280x800 frame on the left and Luna on the right, sharing one store.

## Where voice is used

Three places only:

- Genie, asking for towels
- Genie, ordering coffee
- Luna, raising a request on behalf of a resident who phoned

Everywhere else is normal tapping and typing. Voice is a shortcut for the
things people ask for constantly, not the way the product works.

---

# Section A - The resident side
**~8 min - Genie**

Confirmed against the Abu Dhabi Figma source in `09-genie-reference.md`. No
spa, dining, activities or store anywhere in this section.

### A1 - Home
Open on home. Rail, status banner (idle if nothing active yet), the four
tiles - Housekeeping, Maintenance, Event Planning, Chauffeur.

*Covers: service catalogue browsing, request tracking entry point*

### A2 - Housekeeping, then a follow-up by voice
Open Housekeeping. Browse categories, add a couple of items, place the
request. Then reopen it from My Requests and tap Need Help - this opens
Chat. Speak a follow-up: "can you also send extra pillows." Watch the field
transcribe live and auto-send.

*Covers: housekeeping catalogue, cart, ad-hoc follow-up via voice, chat*

### A3 - Maintenance
Same catalogue-and-cart component as A2, different categories. Report a
plumbing or AC issue, add it, place the request. No voice here - shows the
pattern working identically without it.

*Covers: maintenance requests*

### A4 - Chauffeur, by voice
Tap Chauffeur. Say a destination and time by voice into the destination
search field, or type it. Walk the three steps - destination, time wheel,
vehicle - to Confirm Booking.

*Covers: travel and transport requests*

### A5 - Event Planning
Tap Event Planning. Fill the form - type, date, guest count, theme, a
reference link in special notes. Submit. Show the home status banner switch
to Planning with a Chat with Events button.

*Covers: event and gathering planning intake*

### A6 - Gathering follow-through, in chat
Open Chat with Events. Continue the conversation - Genie offers the
inventory catalogue inline (chairs, floral, linen). Pick a couple of items
by tapping through the catalogue link. This is the same catalogue component
Luna's Registry uses.

*Covers: inventory selection for gatherings, catalogue access*

### A7 - Requests
Open My Requests. Filter by type. Show one card fully - status, item
summary, timestamp - with Cancel Request and Need Help actions.

*Covers: request tracking, cancellation, follow-up entry point*

### A8 - Profile
Room number, name, email, preferences summary with a single edit action.

*Covers: client profile management*

# Section B · Intake and dispatch
**~10 min · Luna**

### B1 · The board
Everything from Section A is here, typed and timestamped. Show the property
chips across the top, the filters with live counts, SLA clocks running, one
item already escalated.

*Covers: unified request queue, multi-site, SLA monitoring, escalation*

### B2 · Working a request
Open the towels request. Reply to the resident in the thread. Set an ETA.
Assign it. Change the status. Show the timeline filling in underneath.

*Covers: staff response, ETA setting, assignment, status updates, audit trail*

### B3 · Reassigning
Open the escalated one. Reassign it to someone else. Show the escalation
badge and why it fired.

*Covers: reassignment, escalation handling*

### B4 · Taking a request over the phone
A resident has called. Use the command bar by voice: "Laundry pickup from
Villa 12, before six." Card comes back pre-filled, confirm, it's on the board.

*Covers: ops-side request creation, laundry, voice for staff*

### B5 · Who's busy
Open workload. Show the split across the team, who's loaded, who isn't.

*Covers: staff utilisation, workload balancing, task efficiency*

### B6 · Recurring work
Open Schedule. Show the recurring cleaning rota - it creates real requests on
the board when they come due.

*Covers: scheduled and recurring tasks*

### B7 · Rotas
Open the roster. Show the week, who's on, where the gaps are.

*Covers: staff rotas and duty rosters*

---

# Section C · Safety and compliance
**~6 min · Luna**

### C1 · Inspections
Show what's scheduled. Open the weekly walkthrough.

*Covers: inspection planning*

### C2 · Running a walkthrough
One check at a time. Pass, pass, then a fail on the pool plant room. Type the
finding, attach a photo, set severity, save.

*Covers: customisable checklists by area, recording findings*

### C3 · What happens next
A corrective task is created automatically. Go to Requests - it's sitting in
the same queue as the towels. Go to Action Plans - it's tracked there too, with
an owner and a due date.

**This is the point of the section.** Findings don't sit in a compliance folder.
They become work in the same pipeline as everything else.

*Covers: automatic corrective actions, action plans, closure tracking*

### C4 · The record
Open the audit trail on the request. Every change, who made it, when.

*Covers: audit trail for compliance*

---

# Section D · Assets and logistics
**~8 min · Luna**

### D1 · The registry
Open Registry. Switch between General, Wardrobe, Art and Fleet. Same table,
different columns each time.

*Covers: inventory, wardrobe management, art register, fleet*

### D2 · Wardrobe
Open a garment. Show storage location, condition, when it was last cleaned. Log
a care activity.

*Covers: garment care tracking*

### D3 · Art
Open a piece. Show documentation, condition, current status. One item is out on
loan.

*Covers: art inventory, documentation, loan requests*

### D4 · Fleet
Open a vehicle. Registration, usage log, service history. One is due for service
this week.

*Covers: vehicle registrations, usage logs, service reminders, handovers*

### D5 · Warehouse
Back to General. Table linen is low. Raise a warehouse request from the item.
It goes onto the board and comes back with a Dynamics reference.

*Covers: warehouse requests, WMS and D365 integration*

### D6 · Gate passes
Command bar, typed this time: "Gate pass for the AC contractor tomorrow at
nine." Card, confirm. It's on the board as an access request.

*Covers: visitor access requests, gate passes*

### D7 · Travel
Open a travel request. Destination, dates, transport, special requirements.

*Covers: travel and destination management*

---

# Section E · Running it
**~6 min · Luna**

### E1 · Roles and access
Open Admin. Show roles, what each can see, how someone gets access to more than
one property.

*Covers: RBAC, multi-site access, permissions*

### E2 · Signing in
Show the SSO setting - Entra ID, users provisioned and removed automatically.
One screen, mention it, move on.

*Covers: corporate login, SSO, automated provisioning*

### E3 · SLAs and escalation
Show where response times are set per request type, and the escalation ladder
when they're missed.

*Covers: SLA configuration, escalation matrices*

### E4 · Connecting to other systems
Show the integrations panel. What's connected, what the API exposes.

*Covers: API and custom connectors, third-party integration*

### E5 · Dashboards
Open Insights. SLA performance by type. Open findings. Workload. Volume by
request type.

Tap any number. It opens the board filtered to exactly those records - including
the towels from Section A and the corrective task from Section C.

**Everything on this screen came from the last half hour.** Say that.

*Covers: analytics, dashboards, operational reporting*

### E6 · Reports
Open the report builder. Pick a date range, a property, a request type. Generate.

*Covers: custom report generation*

---

## Coverage check

Everything in the RFI marked Supported, Supported with Customization, or
Supported with Integration appears above, except the four we said we don't do.

Deliberately not built as separate screens, because they're request types rather
than modules: laundry (B4), access requests (D6), travel (D7). They appear on
the board with their own type panel, which is the honest answer - one pipeline,
not fourteen inboxes.

## If you run short

Cut in this order: D7 travel, E6 reports, E2 SSO, A8 profile, D3 art.
Never cut B1-B3, C3, or E5.

## Notes for the presenter

- Section C3 and E5 are the two moments worth slowing down for.
- Don't open anything not in this script. Half-finished screens behind a menu
  are the fastest way to lose a technical audience.
- When something is a request type rather than its own module, say so. The CIO
  will ask, and "it's the same queue" is a better answer than fourteen tabs.
