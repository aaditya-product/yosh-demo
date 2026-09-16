# 03 · Screen specs

20 screens. Build strictly to these. Where a spec is silent, ask — do not invent.

> **Genie screens: read `09-genie-reference.md` first.** It is derived from a
> recording of the shipped Genie product and **outranks this file** wherever the
> two disagree. This file was written from Figma frames and prose before that
> recording was available. Known corrections are marked inline below.

Layer key: **A** replicate from live Luna · **B** extract from Genie Figma ·
**C** new design, spec is the only source.

Figma file key for all B screens: `wDL5ESB8yofxIbXjSha7I5`. Call
`get_design_context` on the node before building; add any new colours to
`src/tokens.ts` in the same change.

---

# GENIE · 1280 × 800 fixed landscape

## `G-00` Idle / attract · B · node `534:20222`

Full-bleed. Property mark, large clock, date, "TAP ANYWHERE TO BEGIN".
Tapping anywhere → `G-01`.

`G-00/surface`

## `G-01` Welcome · B · node `534:20237`

Greeting with resident name, language selector (6 options), ENTER.
ENTER → `G-02`. Language selection is visual only.

`G-01/lang-{code}` · `G-01/enter`

## `G-02` Home · B · nodes `534:9809` base, `534:10120` rail open

Greeting, time-aware. Weather chip. Quick action tiles. Experience cards below.
Rail persistent on left with voice affordance at foot.

`G-02/rail-{item}` · `G-02/voice-trigger` · `G-02/quick-{n}` · `G-02/weather`

Tapping `G-02/voice-trigger` → `G-03`.

## `G-03` Voice capture · C

Overlay on the current screen, not a route change. Dims the screen behind to
`rgba(0,0,0,0.35)`.

Centred panel, 720 wide, on `color.surface`, `radius.panel`:
- Animated listening indicator at top — a soft pulsing ring in `color.primary`,
  not a literal waveform
- Live transcript, `type.bodyLg`, building word by word. Words appear in
  `color.textMuted` then settle to `color.text` — a 120ms per-word stagger
- "Cancel" text button, bottom left
- No confirm button. The panel advances itself when the script beat completes.

States: `listening` → `parsing` (indicator switches to a slow sweep, transcript
greys) → dismisses into `G-04`.

`G-03/panel` · `G-03/indicator` · `G-03/transcript` · `G-03/cancel`

## `G-04` Confirm card · C

**The most important screen in the build.** Same overlay position as `G-03`.

Renders **one or more** cards stacked vertically, 16px gap. Multi-intent
produces multiple. Each card:

```
┌──────────────────────────────────────────┐
│ [type icon]  Gathering setup             │   type.bodyMed, icon 20px
│                                          │
│  ( 8 covers )  ( Tonight, 19:30 )        │   editable chips
│  ( Main House dining )                   │   radius.pill, primaryFill bg
│                                          │
│  "table set for eight tonight"           │   type.meta, textMuted, italic
│                                          │
│                         [ Confirm ]      │   primary button
└──────────────────────────────────────────┘
```

- Chips are the parsed fields. Tapping one opens an inline edit — for the demo
  this only needs to visibly focus, not actually edit.
- The quoted line beneath is the source fragment from the transcript. This is
  what makes the parsing legible. Do not omit it.
- Cards confirm independently. Confirming all dismisses the overlay → `G-05`.

`G-04/card-{n}` · `G-04/card-{n}/chip-{field}` · `G-04/card-{n}/confirm` ·
`G-04/card-{n}/source`

## `G-05` My Requests · C

Rail persists. Content area: page title, then a vertical list of request cards.

Card: type icon left, title, status pill right, item lines below a hairline
divider, relative timestamp. Matches Luna's card rhythm — same radius, same
8px gap — but on Genie's lighter surface.

Status pill colours: sent `textMuted` · assigned `primary` ·
in progress `statusLive` · done `textMuted`.

Tapping a card → `G-06`.

`G-05/list` · `G-05/card-{reqId}` · `G-05/card-{reqId}/status`

## `G-06` Request detail · C

Rail persists. Content area:

- Header: title, ref, type
- **Status timeline** — vertical, most recent at top, each entry showing event
  and timestamp. When an ETA exists, render it as a prominent line above the
  timeline: "Arriving 16:40 · Rahul" with a small avatar.
- Item list
- Message thread below, resident messages right-aligned in `primaryFill`, staff
  left-aligned on `surfaceMuted`
- Composer at foot with a mic button

This screen must visibly re-render when Luna changes the request in Beat 2.

`G-06/eta` · `G-06/timeline` · `G-06/timeline-entry-{n}` · `G-06/thread` ·
`G-06/composer` · `G-06/composer/mic`

## `G-07` Service browse · B · node `534:11085`

Category chips across the top, mood/interest grouping, service cards with image,
name, "Starting from" price.

`G-07/chip-{category}` · `G-07/card-{serviceId}`

## `G-08` Service booking panel · B · nodes `534:13171` `534:13414` `534:13657` `534:13925`

> **Corrected.** This was previously specced as a four-step wizard with a step
> indicator and Back/Next. The shipped product does not work that way. Build it
> per `09-genie-reference.md` § Booking flow.

A right-side panel, ~40% width, over the dimmed browse page. It advances in
place. **No step indicator. No Next button.** The sticky footer CTA advances
and its label changes per step.

Chrome: circular back arrow top-left from step 2 onward, circular X top-right
always, sticky footer with a wide pill CTA and the price right-aligned outside
it. `SHOW SUMMARY` in small tracked caps beneath the price from step 2.

1. **Detail** — photo header, title and price over it, intro box, body copy,
   `You'll love this if:` list, `Good to know before you book:` list, then
   option pill groups. CTA `Book now`.
2. **Enhance** — a Summary card overlays the photo header showing selections so
   far. Add-on cards with a `Popular choice` badge and a tinted benefit strip.
   CTA `Continue`, price becomes a running total.
3. **Time** — Summary card gains a second line with a clock icon and the chosen
   datetime. Date pills wrapping two rows, a `Morning / Afternoon / Evening`
   segmented control, then a four-column grid of 15-minute time pills.
   CTA `Confirm booking`.
4. **Confirmation** — the shared `ConfirmationModal`, not a step of this panel.

The activity variant swaps the option groups for `Adults` / `Children` steppers
and a `Duration` pill group, and adds `Description` / `Instructions` tabs plus a
meta chip row. See `09-genie-reference.md`.

`G-08/panel` · `G-08/back` · `G-08/close` · `G-08/summary` ·
`G-08/option-{field}-{value}` · `G-08/date-{date}` · `G-08/period-{name}` ·
`G-08/slot-{time}` · `G-08/cta` · `G-08/show-summary`

## `G-09` Booking confirmed · B · node `534:14216`

Confirmation panel, booking summary, "Booking confirmed". Returns to `G-02`
after a tap.

`G-09/summary` · `G-09/done`

## `G-10` `G-11` Gatherings — **stretch only, do not build in Phases 0–4**

---

# LUNA · full width

## `L-01` Requests board · A · live reference

Match the live build. Top to bottom:

- Property chip row, horizontally scrolling, selected chip `color.primary` with
  white text
- Page title `Requests` + segmented control `Request | Schedule`
- Search icon, add icon, right-aligned
- Filter pill row with counts: All · New · Open · Escalated · Cancel Req.
  Count badge is a circle at the pill's left edge.
- Master-detail: list column ~750px, detail panel fills remainder
- Empty detail state: centred `Please choose a request to view its details.`

**Additions beyond the live build**, needed for the demo:

- **SLA chip** on each card — remaining time, `type.meta`. Turns
  `statusEscalated` under 10 minutes. Counts down live.
- **ETA chip** on assigned cards
- **Type icon** in the card's leading circle, differing by request type
- **External badge** when `external` is set — e.g. `D365 · PR-4471`

`L-01/property-{id}` · `L-01/segment-{request|schedule}` ·
`L-01/filter-{status}` · `L-01/card-{reqId}` · `L-01/card-{reqId}/sla` ·
`L-01/card-{reqId}/eta`

## `L-02` Request detail · A · live reference

- Close X top left, property mark top right
- Title `{property} — {resident}`
- Item card
- Meta line `#{ref} | {relative time}`, status dropdown right-aligned
- `Select Staff` dropdown
- `Request Timeline` accordion — expanded shows numbered entries with event
  text and absolute timestamp
- Foot tabs: `Chat` · `Note`

**Additions:** ETA field beside the staff selector, and a priority indicator in
the meta line.

`L-02/close` · `L-02/status` · `L-02/staff` · `L-02/eta` ·
`L-02/timeline` · `L-02/tab-{chat|note}`

## `L-03` Command overlay · A extended

The existing nav panel, plus command behaviour.

Panel content per `02-ia.md` nav groups. Foot: the `What do you need?` field
with the orb to its right.

On submit — typed or spoken — the panel content area is replaced by the parsed
action:

```
┌────────────────────────────────────────┐
│  Assign request                        │
│                                        │
│  ( #0BE · AC rattling )                │
│  ( Rahul Menon )                       │
│  ( ETA 40 min → 16:40 )                │
│                                        │
│  [ Cancel ]            [ Confirm ]     │
└────────────────────────────────────────┘
```

Same chip language as `G-04`. After confirm, a toast with **Undo** persists 6s.

`L-03/nav-{item}` · `L-03/command-input` · `L-03/command-mic` ·
`L-03/action-card` · `L-03/action-confirm` · `L-03/undo`

## `L-04` Inspections · C

Property chips and page chrome as `L-01`.

Two sections: **Scheduled today**, **Recent**. Cards show inspection name, area,
assignee avatar, due time, and a progress ring when partially complete.

`L-04/card-{inspId}` · `L-04/card-{inspId}/start`

## `L-05` Inspection runner · C

**One item at a time**, not a scrolling list. This is deliberate — it reads as
a field tool and it demos better.

- Header: inspection name, `Item 3 of 12`, thin progress bar
- Large item card, centred, max 720 wide: area name `type.title`, check
  description `type.bodyLg`
- Three large actions: `Pass` · `Fail` · `N/A`. Minimum 56px tall.
- On `Fail`, the card expands in place to a finding form: severity segmented
  control, note field with a mic button, photo attach showing a thumbnail once
  attached
- On finding save, a confirmation line: **"Corrective task created · #{ref}"**
  linking to the new request

`L-05/progress` · `L-05/item` · `L-05/pass` · `L-05/fail` · `L-05/na` ·
`L-05/finding` · `L-05/finding/mic` · `L-05/finding/photo` ·
`L-05/finding/save` · `L-05/created-link`

## `L-06` Action plans · C

Table. Columns: finding, source inspection, owner, due date, status, linked
request ref. Overdue rows show the due cell in `statusEscalated`.

`L-06/row-{planId}` · `L-06/row-{planId}/owner`

## `L-07` Registry · C

**One table, four facets.** Facet switcher is a segmented control:
`General | Wardrobe | Art | Fleet`.

Column sets per facet:

| Facet | Columns |
|---|---|
| General | Item · Category · Location · Qty · Status |
| Wardrobe | Garment · Owner · Storage · Condition · Last care |
| Art | Work · Artist · Location · Valuation date · Status |
| Fleet | Vehicle · Reg · Driver · Next service · Status |

Same component, same row height, same typography. Only the column config
changes. Low-stock rows show the Qty cell in `statusEscalated`.

`L-07/facet-{name}` · `L-07/row-{itemId}`

## `L-08` Registry item · C

Side sheet from the right, 560 wide. Item name, image, attribute list, and an
action row:

`Request from warehouse` · `Check out` · `Log care activity`

`Request from warehouse` opens a confirm card in the same chip language as
`G-04`, then creates an asset-type request with
`external: { system: 'D365', ref: 'PR-4471' }`.

`L-08/sheet` · `L-08/action-warehouse` · `L-08/action-checkout` ·
`L-08/action-care` · `L-08/confirm`

## `L-09` Insights · C

Four blocks, two-column grid:

1. **SLA compliance by type** — horizontal bars, one per request type
2. **Open findings and overdue actions** — two large figures with small labels
3. **Workload by assignee** — stacked horizontal bars
4. **Request volume by type** — donut. This is the chart that proves the single
   spine; give it the most space.

**Every figure is tappable** and drills through to `L-01` pre-filtered. This is
non-negotiable — it is the entire point of the beat.

All values compute from the live store, never hardcoded. Records created during
the demo must appear here.

`L-09/block-{n}` · `L-09/figure-{key}` · `L-09/drill-{filter}`

## `L-10` Nav panel · A

Covered by `L-03`. The idle state of the same panel.

---

# Added for full RFI coverage

Voice scope, restated because it changed: `G-03` and `G-04` are used only for
the towels and coffee steps. `L-03` accepts voice only for taking a request
over the phone. Nowhere else. Every other screen is tapping and typing.

## `G-10` Gatherings list · C

Rail persists. Upcoming gatherings as cards, past ones below in a quieter
treatment. Card shows date, guest count, property, status.

`G-10/card-{id}` · `G-10/new`

## `G-11` Gathering planner · C

The most involved Genie screen. Single scrolling page, four blocks:

1. **Basics** - date picker, guest count stepper, property
2. **What you need** - inventory picker. Two columns: available items on the
   left grouped by category (crockery, linen, furniture), chosen items on the
   right with quantities. Unavailable items are visible but dimmed, with the
   date they free up.
3. **Menu** - add dishes, note dietary requirements per guest
4. **Guests** - name and any note, added one at a time

Foot: `Send to the team`. Sending creates one gathering-type request with the
whole thing attached.

`G-11/date` · `G-11/guests` · `G-11/inventory-available-{id}` ·
`G-11/inventory-chosen-{id}` · `G-11/menu-add` · `G-11/guest-add` · `G-11/send`

## `G-12` Maintenance report · C

Rail persists. Form, single column, 720 wide:

- What's wrong - text field with a mic button
- Where - property area picker, chips
- Photo - attach, shows thumbnails
- How urgent - three chips, normal / soon / urgent

Foot: `Send`.

`G-12/description` · `G-12/area-{id}` · `G-12/photo` · `G-12/urgency-{level}` ·
`G-12/send`

## `G-13` Profile · C

Rail persists. Three sections: about you, preferences, household.
Preferences are editable chips - dietary, room temperature, wake time, allergies
shown as a note field. Important dates listed with type and date.

`G-13/pref-{key}` · `G-13/date-{id}` · `G-13/household-{id}`

## `L-11` Workload · C

Page chrome as `L-01`. Horizontal bars, one per staff member, segmented by
request status. Bar length is open request count. Sorted heaviest first.
Right side: a small panel showing average completion time and count closed
today, per person, for whoever is selected.

`L-11/bar-{staffId}` · `L-11/detail`

## `L-12` Schedule · A extended

The live build's day view, reached by the `Request | Schedule` segmented control
on `L-01`. Day chips with counts, hourly grid, entries as blocks.

**Added:** a `Recurring` toggle beside the day chips. When on, the grid shows
recurring templates instead of instances. A template opens a small sheet showing
the pattern - "Every Monday, 9am, main house, deep clean" - and which requests it
has generated.

`L-12/day-{date}` · `L-12/recurring-toggle` · `L-12/entry-{id}` ·
`L-12/template-{id}`

## `L-13` Rotas · C

Week grid. Rows are staff, columns are days. Cells show shift blocks with start
and end. Uncovered slots show as a dashed outline in `statusEscalated`.
Clicking a cell opens a small sheet to set the shift.

`L-13/cell-{staffId}-{day}` · `L-13/gap-{day}` · `L-13/shift-sheet`

## `L-14` Audit trail · C

Opens from a request's timeline as a full-height sheet. Table, newest first:
when, who, what changed, from and to. Filterable by actor.

`L-14/row-{n}` · `L-14/filter-actor`

## `L-15` Travel request panel · C

Not a screen. The type-specific panel inside `L-02` when a request is type
`concierge` with a travel subtype. Shows destination, dates, transport,
passengers, special requirements. Everything else on `L-02` is unchanged.

`L-02/panel-travel/{field}`

## `L-16` Admin - roles and access · C

Two columns. Left: role list - Estate Manager, Supervisor, Team, Support Office,
Admin. Right: what the selected role can see and do, as a checklist grouped by
area, plus which properties it covers.

Show that one person can hold access across several properties and switch
between them.

`L-16/role-{id}` · `L-16/permission-{key}` · `L-16/property-{id}`

## `L-17` Sign-in settings · C

Small screen, deliberately. Identity provider set to Microsoft Entra ID,
connected. Toggles for MFA and automatic provisioning and removal. A line
showing when it last synced.

`L-17/provider` · `L-17/mfa` · `L-17/provisioning` · `L-17/last-sync`

## `L-18` SLA and escalation · C

Table, one row per request type. Columns: type, response target, resolution
target, then the escalation ladder as three chips - first, second, third.
Clicking a chip shows who it goes to and after how long.

`L-18/row-{type}` · `L-18/escalation-{type}-{step}`

## `L-19` Integrations · C

Cards, one per connected system. Each shows name, status, what it syncs and when
it last ran. Seed with: Dynamics 365, CAFM, Oracle OPERA, Entra ID.

Below: an API section showing the endpoint base and a short list of what's
exposed. Enough to make the point, not a full reference.

`L-19/card-{system}` · `L-19/api`

## `L-20` Report builder · C

Left: criteria - date range, property, request type, status, assignee.
Right: a live preview table that updates as criteria change.
Foot: `Generate` and a format picker.

Preview must compute from the real store, so a report run during the demo
includes what happened during the demo.

`L-20/criteria-{field}` · `L-20/preview` · `L-20/generate` · `L-20/format`


---

# Added from the product recording

See `09-genie-reference.md` for full structural detail on each.

## `G-14` Transport booking panel · C

Not previously specced. Right-side panel. Pill labelled `Bookings` top-left,
circular X top-right.

1. **Vehicle** — destination line, `Choice of vehicle` label, vehicle cards
   each with a name, one line of description, a capacity row with a person icon,
   image right, and either a qty stepper or a `Select` pill. The first card
   carries a `Suggested for you` ribbon badge.
2. **Time** — `Select time to leave` with the chosen value in bold, a scrolling
   three-column time wheel with a tinted centre band and fading rows above and
   below, then a `Recommended times` row of outlined pills. Sticky footer CTA
   `Confirm`.

`G-14/vehicle-{id}` · `G-14/vehicle-{id}/qty` · `G-14/wheel-{column}` ·
`G-14/recommended-{n}` · `G-14/confirm`

## `G-15` Order panel · C — shared

Used by dining, store and housekeeping. Right-side panel. Circular back arrow
top-left, pill button top-right.

Line items with qty steppers and line prices, a charges row, a `+ Special
requests` pill beside a `Deliver to` dropdown, then a tracked-caps upsell
heading, a segmented tab row, and a four-column grid of upsell tiles with the
name and price overlaid and a circular `+` top-right of each. Sticky footer:
wide pill CTA `Place order`, total right-aligned with a `Cart total` label
beneath.

`G-15/item-{id}/qty` · `G-15/special-requests` · `G-15/deliver-to` ·
`G-15/upsell-tab-{name}` · `G-15/upsell-{id}/add` · `G-15/place-order`

## `G-16` Restaurant browse · B · full page, not a panel

The only browse screen that takes over the page. Back arrow and title in a top
bar with a dark pill action button right. Photographic band with centred serif
type. A `Food` / `Beverages` segmented control, then filter icon and category
chips, then sections with a four-across grid of item cards carrying an `Add`
pill on the image and dietary icons beside the price.

`G-16/back` · `G-16/reserve` · `G-16/segment-{name}` · `G-16/chip-{category}` ·
`G-16/item-{id}/add`
