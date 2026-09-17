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

# GENIE · 1280 x 800 fixed landscape

**Source of truth for every screen below: `09-genie-reference.md` addendum
("Yosh-specific flows"), confirmed directly against the Abu Dhabi Figma file
by the person.** Do not build Spa, Activities, Restaurant, Dining or Store —
out of scope, confirmed. Where this section and the main body of
`09-genie-reference.md` disagree about which flows exist, this section wins.
**The main body's rail and bottom-right-cluster chrome notes do not apply —
checked directly against the Yosh reference PNGs and Figma, neither exists in
this build, see `G-02` below.** The home hero and photographic treatment
notes still apply.

Figma file key for this addendum: `C1ZiMoq2vDXGt9xILvVIQ2`.

## `G-00` Idle / attract · B · node `534:20222` (Casa Cook file)

Unchanged from the main body of `09-genie-reference.md`.

## `G-01` Welcome · B · node `534:20237` (Casa Cook file)

Unchanged from the main body of `09-genie-reference.md`.

## `G-02` Home · C

Structure per `09-genie-reference.md` § "Home — Yosh tile set and real
chrome", tokens per the `genie` namespace in `tokens.ts`. **No photographic
hero, no greeting** — checked directly against both Home reference PNGs,
neither has one; the page opens directly below the status bar. Weather chip,
then the **status banner** (see below), then the tile row.

Tile set, confirmed: `Housekeeping Services` · `Maintenance Services` ·
`Event Planning` · `Chauffeur Request`. No Food Order.

**No rail.** `02-ia.md`'s rail section is superseded for Home — checked
directly against the Yosh reference PNGs and against Figma, there is no
floating icon rail anywhere in this Home. Left-edge chrome is a weather
widget, a Room/Property card, and an `Open Controls` toggle. `Room Controls`
(thermostat, lighting, TV) is observed in the source behind that toggle but
is explicitly out of scope for this build — do not build it. A single
ambient chat orb, bottom-left, opens `G-09`.

`G-02/tile-{name}` · `G-02/status-banner` · `G-02/status-banner/chat` ·
`G-02/room-property-card` · `G-02/open-controls` · `G-02/chat-orb`

## `G-03` Status banner · C — shared component

Not a screen — a component on Home. `[status pill] [detail line] [Chat with X]`.
Reads whichever request is most recently active for the resident. Tapping
`Chat with X` opens `G-09` Chat scoped to that request's thread.

`G-03/pill` · `G-03/detail` · `G-03/chat-cta`

## `G-04` Housekeeping / Maintenance catalogue · C — shared component

**One component, two entry points.** Housekeeping and Maintenance are
structurally identical — category rail left (active category tinted), 2-column
item grid right (photo, name, `Add` pill per row). Only the category set and
item content differ per entry point.

Housekeeping categories: `Most Requested` `Laundry` `Cleaning Service`
`Towels` `Toiletries` `Personal Care` `Electrical Appliances` `Internet`.

Maintenance categories: Yosh-appropriate set — plumbing, electrical,
AC/HVAC, appliances, structural (finalise against `05-data-model.md` seed).

`G-04/category-{name}` · `G-04/item-{id}/add` · `G-04/place-request`

## `G-05` Cart / place request · C

Reached via `Place Request` from `G-04`. Left: selected items with qty
steppers. Right: `Recommendations` add-on row, `Special note:` suggestion
chips plus a text field with a trailing mic icon, `Schedule For` (Now/Later),
`Delivery At` (property/area chips with edit pencils). Footer: `Back to menu`
/ `Place Request`.

On submit → the shared confirmation modal (see main body of
`09-genie-reference.md`), then the request appears in `G-08` Requests.

`G-05/item-{id}/qty` · `G-05/recommend-{id}/add` · `G-05/note-chip-{n}` ·
`G-05/note-field` · `G-05/note-field/mic` · `G-05/schedule-{now|later}` ·
`G-05/deliver-{field}/edit` · `G-05/back-to-menu` · `G-05/place-request`

## `G-06` Event Planning — request form · C

Reached from the `Event Planning` tile. Simple form, not a stepper: `Event
Type`, `Date`, `Guests Footfall`, `Theme` — all as filled fields — then
`Special Notes` with a references sub-label (`You can add links for
references here`), a large text area. Footer: `Discard` (outlined) /
`Request` (filled).

For the gathering-planning depth (inventory selection, guest list) described
elsewhere in this repo: that happens **inside the chat thread after
submission**, not on this form — see `G-09` and the catalogue note below.

On submit → home's status banner switches to show `Planning` / the theme name
/ `Chat with Events`.

`G-06/event-type` · `G-06/date` · `G-06/guests` · `G-06/theme` ·
`G-06/notes` · `G-06/discard` · `G-06/request`

## `G-07` Chauffeur / transport booking · C

Right-side panel, `Bookings` pill top-left, X top-right. Three steps, back
arrow from step 2, sticky footer:

1. **Destination** — search field, then destination chips (Yosh sites)
2. **Time** — `You are going to {destination}`, time wheel (day/hour/minute/
   AMPM columns, centre row highlighted), `Recommended times` pill row,
   footer `Confirm`
3. **Vehicle** — vehicle cards (name, description, capacity, image, `Select`
   or qty stepper), summary strip right with `Change` links per field, a
   special-request text field, footer `Confirm Booking`

`G-07/destination-{id}` · `G-07/wheel-{column}` · `G-07/recommended-{n}` ·
`G-07/vehicle-{id}/select` · `G-07/special-request` · `G-07/confirm-booking`

## `G-08` Requests · C

Overlay, `Requests` title, X top-right. Filter pills: for Yosh, the request
type set (Housekeeping, Maintenance, Event, Transport, Warehouse, Art,
Access) plus `All`. Cards: type icon + label, status badge, item summary,
divider, `Request placed at:` / amount where relevant, footer actions
`Cancel Request` / `Need Help?`.

`Need Help?` → `G-09` Chat, scoped to that request.

`G-08/filter-{type}` · `G-08/card-{reqId}` · `G-08/card-{reqId}/cancel` ·
`G-08/card-{reqId}/need-help`

## `G-09` Chat · C — with voice

Overlay, home icon top-left, X top-right. Message thread (sent bubbles right,
Genie responses left with `GENIE | {time}` byline), quick-reply chip row
beneath the latest response, input field at the foot with a trailing mic icon.

**This is where custom/ad-hoc requests and follow-ups on open requests
happen.** No separate composer screen.

Voice, confirmed behaviour: tap mic → field shows live transcript building as
the person speaks → auto-sends on silence detected, exactly as Enter would.
Typed input works identically alongside it in the same field.

For Event Planning specifically: once a gathering request is submitted via
`G-06`, this chat thread is where inventory selection happens — Genie can
present the catalogue (see below) inline via quick-reply chips or an inline
link, and guest-list / menu detail gets captured conversationally.

`G-09/thread` · `G-09/quick-reply-{n}` · `G-09/input` · `G-09/input/mic` ·
`G-09/input/send`

## `G-10` Catalogue browse · C — shared with Luna's Registry pattern

Category rail left, item grid right (photo, name, qty available, `View`).
Same component as Luna's `L-07` Registry, sourced from Figma node
`419:19544`. On Genie, `View` leads to a request action (raise a warehouse or
art request for that item), not Luna's admin actions.

Reached contextually from within `G-09` Chat during gathering planning, or
from a request's detail in `G-08` — not a rail destination.

`G-10/category-{name}` · `G-10/item-{id}/view` · `G-10/item-{id}/request`

## `G-11` Profile · C

Reached by tapping the Room/Property card on `G-02` Home — a designed
decision, not confirmed spec; nothing in the source shows a Profile entry
point from this Home treatment. See `09-genie-reference.md`.

Overlay, `Profile` title, X top-right. Room/property number large, language
selector top-right, `Name` with edit pencil, `Email`, `Preferences` section
(labelled rows: dietary, allergies, occasion — read-only display with one
`Edit Preferences` action), `Log Out` as an isolated filled red pill at the
foot.

`G-11/language` · `G-11/name/edit` · `G-11/preferences/edit` · `G-11/logout`
