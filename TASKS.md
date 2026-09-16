# TASKS

Work top to bottom. One task per turn. After each one: screenshot with
Playwright, look at it, tick the box, say what you built and what you guessed.

Don't start a task until the one above it is ticked. Don't work ahead. Don't
refactor screens you weren't asked to touch.

Stop at every REVIEW GATE and wait.

27 screens. Read `docs/01-demo-script.md` first - every task below exists to
serve a step in it.

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
- [x] `1.4` `G-05` My requests, `G-06` Request detail on Genie.
- [x] `1.5` Wire B2: assign on Luna, watch Genie update with no Genie-side code.
      Verified against the real `G-05`/`G-06` through the product switcher, one
      tab, one store. Still to do at 2.6: retarget `b2-assign` from `#0A4` to
      `#0BE` once Beat 1 raises that request.
- [x] `1.6` `L-11` Workload.
- [ ] `1.7` `L-12` Schedule, recurring tasks that create real requests.
- [ ] `1.8` `L-13` Rotas.

### REVIEW GATE - walk Section B end to end

---

## Phase 2 - the resident side (Section A)

- [ ] `2.1` `G-02` Home. Figma `534:9809`, rail `534:10120`.
- [ ] `2.2` `G-07` Service browse. Figma `534:11085`.
- [ ] `2.3` `G-08` Booking stepper, four steps, one component.
      Figma `534:13171` `534:13414` `534:13657` `534:13925`.
- [ ] `2.4` `G-09` Confirmed. Figma `534:14216`.
- [ ] `2.5` `G-03` Voice capture, `G-04` Confirm card.
- [ ] `2.6` Wire A2 towels and A3 coffee. Voice appears nowhere else on Genie.
- [ ] `2.7` `G-12` Maintenance report with photo.
- [ ] `2.8` `G-13` Profile and preferences.
- [ ] `2.9` `G-10` Gatherings list, `G-11` Gathering planner.

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

Auth flows, tests, README files, error boundaries, loading skeletons, responsive
layouts, portrait, dark mode, stub screens behind menu items that aren't in the
script.
