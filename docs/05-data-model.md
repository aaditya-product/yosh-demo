# 05 · Data model and seed

All content lives in `src/data/seed.ts`. No inline strings in components.

> **Replace before the demo:** property and resident names below are
> placeholders. Swap for real Yosh names if available. Everything else can stay.

## Entities

```ts
Property   { id, name, shortName }
Resident   { id, name, propertyId, initials }
Staff      { id, name, role, initials, department }
Request    // see 02-ia.md for the full shape
RegistryItem {
  id, facet: 'general'|'wardrobe'|'art'|'fleet',
  name, category, location, qty, status,
  // facet-specific
  owner?, storage?, condition?, lastCare?,
  artist?, valuationDate?,
  reg?, driver?, nextService?
}
Inspection { id, name, area, propertyId, assigneeId, dueAt, items: InspectionItem[] }
InspectionItem { id, area, check, result: 'pass'|'fail'|'na'|null, finding? }
ActionPlan { id, finding, inspectionId, ownerId, dueAt, status, requestRef }
Service    { id, name, category, mood, description, longCopy, priceFrom, options[] }
```

## Properties — 6

`Villa 12` · `The Residence` · `Main House` · `Garden Wing` ·
`Lakeside Lodge` · `Stable Court`

`Villa 12` is selected by default and carries all demo activity.

## Residents — 3

| Name | Property |
|---|---|
| Aisha Al Mansoori | Villa 12 |
| Thomas Reiner | The Residence |
| Leila Haddad | Garden Wing |

`Aisha Al Mansoori` is the Genie user throughout.

## Staff — 5

| Name | Role | Dept |
|---|---|---|
| Rahul Menon | Technician | Maintenance |
| Marta Silva | Supervisor | Housekeeping |
| Omar Farouk | Estate Manager | Operations |
| Priya Nair | HSE Officer | Compliance |
| Daniel Okoro | Attendant | Housekeeping |

`Rahul Menon` is the Beat 2 assignee. `Priya Nair` runs the Beat 4 inspection.

## Seed requests — 7 pre-existing

Enough to make the board look lived-in, with the filter counts non-trivial.

| Ref | Type | Title | Status | Notes |
|---|---|---|---|---|
| `#0A1` | service | Fresh linen, main bedroom | done | 2h ago |
| `#0A4` | maintenance | Pool pump noise | in_progress | assigned Rahul, ETA passed — shows an overdue SLA |
| `#0A7` | service | Laundry collection | assigned | Daniel, ETA 15 min |
| `#0B2` | access | Gate pass — florist delivery | open | today 14:00 |
| `#0B5` | asset | Warehouse — table linen ×12 | open | `external: D365 · PR-4468` |
| `#0B8` | maintenance | Study window seal | escalated | unassigned, SLA breached |
| `#0C1` | concierge | Airport transfer, Thursday | new | — |

Filter counts land at: All 7 · New 1 · Open 2 · Escalated 1 · Cancel Req. 0.
Adjust seed if the demo needs different counts, but keep at least one escalated
and one overdue-SLA item visible on load.

## Registry — 4 facets, 5 rows each

General must include one low-stock row: **Table linen · Linen store · Qty 3 ·
Low**. This is the Beat 5 item.

Wardrobe, Art and Fleet rows only need to be plausible and consistent. Art
includes an item on loan; Fleet includes one vehicle with service due this week.

## Inspection — 1 scheduled

**Weekly HSE walkthrough** · Priya Nair · Villa 12 · due today 11:00 · 12 items.

Items 1 and 2 pass. **Item 3 is the scripted fail**:

> Area: Pool plant room
> Check: Chemical store secured and labelled

Items 4–12 are plausible filler — the runner never reaches them in the demo but
the progress bar must read `3 of 12` correctly.

## Services — for `G-07` / `G-08`

6 services across 3 categories. One must have full long copy, options
(party size, duration), an enhancement add-on, and time slots — that is the
Beat 3 path. Pull its content from Figma node `534:11085` and its detail nodes
rather than writing new copy.

## Timestamps

All relative to app load, computed at runtime. Never hardcode absolute dates —
a demo showing yesterday's date is the kind of detail a CTO notices.
