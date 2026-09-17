# TASKS

Work top to bottom. One task per turn. After each one: screenshot with
Playwright, look at it, tick the box, say what you built and what you guessed.

Don't start a task until the one above it is ticked. Don't work ahead. Don't
refactor screens you weren't asked to touch.

Stop at every REVIEW GATE and wait.

Read `docs/01-demo-script.md` first - every task below exists to serve a step
in it.

---

## Phase 0 - foundation

- [x] `0.1` Scaffold Vite + React + TS + Tailwind. Tailwind reads
      `src/tokens.ts`. Routes `/genie/*` `/luna/*` `/demo` `/kitchen-sink`.
- [x] `0.2` Store: one context + reducer per `docs/02-ia.md`.
- [x] `0.3` Seed data per `docs/05-data-model.md`. Timestamps relative to load.
      Copy follows `docs/08-copy.md`.
- [x] `0.4` Demo engine per `docs/06-demo-engine.md`. Engine only, no steps yet.
- [x] `0.5` Component library per `docs/04-components.md`.
- [x] `0.6` `/kitchen-sink` - every component, every state, both backgrounds.
- [x] `0.7` `/demo` harness - Genie in a 1280x800 frame left, Luna right,
      one store.

### REVIEW GATE - screenshot `/kitchen-sink` and the empty `/demo`

---

## Phase 1 - the spine (Section B)

Build this first. If the shared store doesn't drive Genie from a Luna action,
everything after it is a lie.

- [x] `1.1` `L-01` Requests board. Property chips, filters with counts, SLA
      clocks, escalation, type icons, external badges.
- [x] `1.2` `L-02` Request detail. Thread, ETA, assign, status, timeline.
- [x] `1.3` `L-03` Nav panel and command bar. Action card, toast, undo.
- [x] `1.4` `G-08` Requests (My Requests) on Genie — minimal spine-test
      surface only: a list, driven by the shared store. The full filterable
      overlay with card actions is built properly in Phase 2; this pass just
      proves Genie reads what Luna writes.
- [ ] `1.5` Wire B2: assign on Luna, watch Genie update with no Genie-side code.
- [ ] `1.6` `L-11` Workload.
- [ ] `1.7` `L-12` Schedule, recurring tasks that create real requests.
- [ ] `1.8` `L-13` Rotas.

### REVIEW GATE - walk Section B end to end

---

## Phase 2 - the resident side (Section A)

Genie's screen catalogue is corrected per `09-genie-reference.md`'s addendum
("Yosh-specific flows") and `02-ia.md`. **No Spa, Activities, Restaurant,
Dining or Store anywhere below — confirmed out of scope for the Yosh
residential product**, see `Never build`. Screen IDs match the rebuilt
`03-screens.md` (`G-00` through `G-11`), not the old Casa Cook numbering used
earlier in this file's history.

For every task below: pull `get_design_context` on the Figma node named, and
open the matching PNG in `docs/assets/genie-yosh/` before writing code. Don't
build from memory of the docs' prose alone.

**There is no floating icon rail in the Yosh build. `GenieRail` as built does
not apply anywhere and gets deleted, not repointed.** `home-orders-banner.png`
and `home-room-controls.png` are the real `G-02` Home and neither shows one.
The rail visible behind the Requests/Profile overlay in
`requests-and-profile.png` is confirmed against Figma node `2033:9248` itself:
it's the *entire old Casa Cook Home frame* (rail, resort tile row, "Experiences
for you" carousel, "Explore Casa Cook & El Gouna" video section, all present
and unhidden at their original Casa Cook positions/content) reused wholesale as
a backdrop for the new Requests/Profile panels layered on top of it. It's real
geometry, not a rendering glitch, but it's stale scaffolding the designer
didn't bother to swap out — not confirmed Yosh chrome. Same treatment applies
wherever else this file's older frames show through: build the overlay
content, ignore what's behind it.

Home's real chrome, confirmed from the two Home PNGs: a weather widget, a
Room/Property number card, an `Open Controls` / `Close Controls` toggle, and
a single ambient chat orb bottom-left (matches the `genie main` /
`ri:chat-ai-3-line` chat-entry component noted in `07-genie-frame-map.md`).
The `Your Orders` status banner carries its own leading circular-arrow
button, styled like the tile cards' own "enter" arrows.

**Two decisions made, documented in `09-genie-reference.md` and
`03-screens.md` as such — not treated as confirmed spec:**
- **Room Controls is out of scope.** The `Open Controls` toggle's panel
  (thermostat, lighting, TV, chandelier, bathroom lights) is real and present
  in the source, but not in the RFI and not relevant to the ops-focused demo
  — same treatment as Spa/Activities/Restaurant/Dining/Store. `2.1` builds
  `Open Controls` as an inert stub (present, does nothing) — the panel behind
  it is not built.
- **Profile's entry point is a designed decision, not confirmed spec.**
  Nothing in the source shows one. Decision: tap the Room/Property card.
- The main body of `09-genie-reference.md` (from the Casa Cook recording)
  claims a bottom-right two-button cluster (chat + home) on every frame.
  Neither Yosh reference confirms this — the single ambient orb below is the
  only confirmed affordance, so there is no cluster task in this phase.

- [x] `2.1` `G-02` Home, real chrome only: weather widget, Room/Property card
      (tap → `G-11`, decision above), `Open Controls` toggle (inert stub,
      decision above), ambient chat orb bottom-left → `G-09`, status banner
      shell with arrow → `G-08` (pill/detail/`Chat with X` content is `2.5`).
      Figma `158:3930`, PNGs `home-orders-banner.png` /
      `home-room-controls.png`. Tiles: `Housekeeping Services` ·
      `Maintenance Services` · `Event Planning` · `Chauffeur Request`. **No
      rail, no bottom-right cluster, no photo hero, no greeting** — checked
      directly against both PNGs, page opens straight into this chrome below
      the status bar (corrected in `09-genie-reference.md`, same class of
      fix as the rail).
- [ ] `2.2` Shared component: `ConfirmationModal` — home icon top-left, X
      top-right, centred green check circle, serif title, one or two lines
      of muted detail, two equal-width outlined pill buttons (`Chat with
      Us` / `Add special instructions`). Add to the kitchen sink.
- [ ] `2.3` Shared component: catalogue-and-cart, `G-04` + `G-05`. Category
      rail left (one active, tinted) with a 2-column item grid right
      (photo, name, `Add` pill). Cart screen: selected items with qty
      steppers, `Recommendations` add-on row, `Special note:` chips plus a
      text field with a trailing mic icon, `Schedule For` (Now/Later),
      `Delivery At` chips with edit pencils, footer `Back to menu` /
      `Place Request`. One component, driven by category set and item
      content only. Add to the kitchen sink.
- [ ] `2.4` Shared component: `BookingPanel` — right-side panel, ~40%
      width, page behind dimmed and visible. Back arrow from step 2
      onward, X throughout, sticky footer whose CTA label changes per
      step, accumulating summary card. Add to the kitchen sink.
- [ ] `2.5` `G-03` status banner on Home, driven by whichever request is
      most recently active. `[status pill] [detail line] [Chat with X]` →
      `G-09` scoped to that request's thread.
- [ ] `2.6` `G-04` Housekeeping, on the catalogue component from `2.3`.
      Figma `158:3930` (`housekeeping-catalogue.png`). Categories: `Most
      Requested` `Laundry` `Cleaning Service` `Towels` `Toiletries`
      `Personal Care` `Electrical Appliances` `Internet`.
- [ ] `2.7` `G-05` cart, reached via `Place Request` from `2.6`. Figma
      `158:3930` (`housekeeping-cart.png`). Submit → `ConfirmationModal`
      from `2.2` → the request appears in `G-08`.
- [ ] `2.8` `G-04`/`G-05` for Maintenance — the identical component from
      `2.3`, Yosh categories (plumbing, electrical, AC/HVAC, appliances,
      structural — finalise against `05-data-model.md`). **Not** a
      separate report-with-photo form.
- [ ] `2.9` `G-07` Chauffeur, on the `BookingPanel` from `2.4`. Figma
      `2033:9249` (`chauffeur-flow.png`). Destination search + chips →
      time wheel (day/hour/minute/AMPM columns, recommended-times pills)
      → vehicle cards + summary strip with `Change` links → `Confirm
      Booking`. **Not** the spa-style detail/enhance/date-time sequence —
      different steps, different count. `BookingPanel` supplies only the
      shared chrome (back arrow, X, sticky footer).
- [ ] `2.10` `G-06` Event Planning request form. Figma `414:16777`. Plain
      form, not a stepper: `Event Type`, `Date`, `Guests Footfall`,
      `Theme`, `Special Notes` (references sub-label, large text area).
      Footer `Discard` / `Request`. Submit → status banner switches to
      `Planning` / theme name / `Chat with Events`.
- [ ] `2.11` `G-09` Chat, with voice. Figma `2033:9247`
      (`chat-voice-states.png`). Thread (sent right, Genie left with
      `GENIE | {time}` byline), quick-reply chip row, input field with a
      trailing mic icon. Tap mic → live transcript builds in the field →
      auto-sends on silence, exactly as Enter would. Reached from Home's
      ambient chat orb (`2.1`), the status banner's `Chat with X`
      (`2.5`), and `Need Help?` on a request card (`2.13`) — this is also
      where gathering follow-through and ad-hoc requests happen, no
      separate composer screen.
- [ ] `2.12` `G-10` Catalogue browse, shared with Luna's `L-07` Registry
      pattern. Figma `419:19544`. Reached contextually from inside `2.11`
      during gathering follow-through, or from a request's detail in
      `2.13` — not a standalone destination anywhere.
- [ ] `2.13` `G-08` Requests, filterable overlay (the full build — `1.4`
      was the minimal spine-test version). Reached via the status
      banner's arrow on Home (`2.1`). Figma `2033:9248`
      (`requests-and-profile.png` — overlay content only, ignore the
      backdrop it's shown against, see the note above). Filter pills:
      `All` `Housekeeping` `Maintenance` `Event` `Transport` `Warehouse`
      `Art` `Access`. Card: type icon + label, status badge, item
      summary, divider, `Request placed at:` / amount where relevant,
      footer `Cancel Request` / `Need Help?`.
- [ ] `2.14` `G-11` Profile. Reached via the Room/Property card on Home
      (`2.1`) — unconfirmed, see the note above; ask before treating this
      as final. Figma `2033:9248` (`requests-and-profile.png` — overlay
      content only). Room/property number, language selector, `Name`
      with edit pencil, `Email`, `Preferences` (dietary, allergies,
      occasion — read-only with one `Edit Preferences` action), `Log
      Out` as an isolated filled red pill at the foot.
- [ ] `2.15` Wire A2/A3: a voice follow-up in `G-09` ("can you also send
      extra pillows") after the towels request placed via `2.6`/`2.7`;
      Maintenance (`2.8`) placed with no voice, to show the pattern
      working identically without it. Voice appears nowhere else on
      Genie.

### REVIEW GATE - Sections A and B as one run

---

## Phase 3 - compliance (Section C)

- [ ] `3.1` `L-04` Inspections list.
- [ ] `3.2` `L-05` Inspection runner, one check at a time.
- [ ] `3.3` Wire C2 and C3. The corrective task appears 400ms after the finding
      saves, not instantly.
- [ ] `3.4` `L-06` Action plans.
- [ ] `3.5` `L-14` Audit trail view.

### REVIEW GATE - Section C

---

## Phase 4 - assets and logistics (Section D)

- [ ] `4.1` `L-07` Registry, four facets, one component.
- [ ] `4.2` `L-08` Registry item sheet. Wardrobe care, art loan, fleet service
      all render from the same sheet with different fields.
- [ ] `4.3` Wire D5 warehouse. Dynamics reference lands 1400ms after confirm.
- [ ] `4.4` Wire D6 gate pass, typed into the command bar.
- [ ] `4.5` `L-15` Travel request detail panel.

### REVIEW GATE - Section D

---

## Phase 5 - running it (Section E)

- [ ] `5.1` `L-16` Admin: roles, permissions, multi-property access.
- [ ] `5.2` `L-17` SSO settings panel.
- [ ] `5.3` `L-18` SLA and escalation configuration.
- [ ] `5.4` `L-19` Integrations panel.
- [ ] `5.5` `L-09` Insights. Every figure computed from the store. Drill-through
      to the filtered board is mandatory.
- [ ] `5.6` `L-20` Report builder.

### REVIEW GATE - Section E, then the full 38 minutes

---

## Phase 6 - polish

- [ ] `6.1` `G-00` Idle `534:20222`, `G-01` Welcome `534:20237`.
- [ ] `6.2` Presenter panel, Cmd+K. Jump to any step, reset, speed.
- [ ] `6.3` Copy pass. Read every string against `docs/08-copy.md`. Fix
      anything that sounds written by a machine.
- [ ] `6.4` Timing pass. Sheets 240ms, overlays 180ms, toasts 6s. Nothing snaps.
- [ ] `6.5` Full rehearsal. Fix whatever breaks the rhythm.

---

## Never build

Animal care, client cost approval, purchase requests, budget management. We told
the client we don't support these. They must not appear anywhere, including in
menus, filters or seed data.

Spa, Activities, Restaurant, In-room Dining, Store — these belong to the
source recording's resort configuration, not Yosh's residential product.
Confirmed out of scope. Delete any trace of them from Genie screens, seed
data and the demo script; do not reference their old screen IDs anywhere.

Auth flows, tests, README files, error boundaries, loading skeletons, responsive
layouts, portrait, dark mode, stub screens behind menu items that aren't in the
script.
