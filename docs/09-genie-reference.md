# 09 · Genie reference — from the live product recording

Source: screen recording of the running Genie build, 2026-08-10, 2:31, iPad
landscape. Scrubbed at 1-3 second intervals across the whole runtime.

**This file outranks 03-screens.md wherever the two disagree on Genie.** 03 was
written from Figma frames and prose; this is the shipped product.

## How to use this with Figma

Two sources, two jobs, do not mix them up:

- **This file** — what screens exist, what is on them, in what order, what
  every control is called, how a flow advances, what the real content says.
- **Figma MCP** — exact pixel values. Colours, type sizes, spacing, radii.
  Call `get_design_context` on the node in `07-genie-frame-map.md` for the
  screen you are building, every time, before building it.

Never take a pixel value from this document. Never take a flow structure from
Figma. A screen is done when its structure matches this file and its values
match the Figma node.

Where a screen appears here but has no Figma node, build the structure from
this file and take every token from the nearest sibling screen that does have
a node.

---

## Global chrome

### Left rail

Three states, all observed:

1. **Collapsed sliver** — a thin rounded edge at the far left, barely visible
2. **Icon column** — icons only, no labels, ~52px wide
3. **Expanded** — icons with labels, ~208px wide, white floating card with
   rounded corners and a soft shadow, overlaying the page content

It expands on interaction and collapses again. It floats above content, it
does not push it. It is vertically centred, not full height.

Order, top to bottom, with icons as observed:
`My Requests` (document) · `Spa` (lotus) · `Activities` (person on jetski) ·
`Restaurant` (crossed fork and knife) · `Taxi` (car) · `Store` (shopping bag) ·
`Gym` (dumbbell) · `Hotel info` (i in a circle) · `Profile` (person)

There is a scroll indicator on the rail's right edge when expanded — the list
is taller than the card.

> **For the Yosh build:** keep this behaviour and treatment exactly. Substitute
> the items per `02-ia.md`. The three-state expand is the behaviour to
> replicate, not the hotel item list.

### Bottom-right cluster

Two circular buttons, bottom right, floating above content on every screen.
Present on every single frame observed. Left is a chat/AI mark, right is a
home mark.

### Status bar

iPad status bar is visible at the top of every screen — time left, signal,
wifi, battery right. The recording shows `9:41 Tue Apr 1`.

---

## Screen by screen

### Idle / attract

Full-bleed photograph, no chrome. Centred column:
property wordmark in a serif face, sub-label beneath in small tracked caps,
then a very large time `16:48`, then `Friday · June 12` in small tracked type
beneath it. At the bottom, small tracked caps: `TAP ANYWHERE TO BEGIN`.

Tapping anywhere advances. There is a page-dot indicator just above the
bottom label, so the idle screen cycles through more than one image.

### Home

Top band: a photographic header, edge to edge, rounded at the bottom corners.
On it, left-aligned: `Good Morning,` small, then the resident name large
beneath it. Right side: a circular button with a bell, then a two-line
notice — a tracked-caps line and a temperature beneath — then a chevron.

Below the band, a horizontally scrolling row of **circular** image tiles with
tracked-caps labels underneath:
`ORDER FOOD` `HOUSEKEEPING` `BOOK A SPA` `BOOK A RIDE` `TRY KAYAKING` `STORE`

The row scrolls; tiles are cut off at both edges, which is intentional.

Below that, a two-column region:

- **Left** — a card titled `Experiences for you` in a serif italic face,
  centred, with `curated with care` beneath it in small type. Inside, a
  horizontal carousel of image cards with a title and a line of copy centred
  on the image, and a small tracked-caps promo line at the card's foot. The
  neighbouring cards are visible and dimmed at both edges.
- **Right** — a 2-up then 1-up grid of image cards, each with a short
  two-line title top-left and a circular arrow button bottom-right.

At the very bottom, a tracked-caps section label. The page scrolls.

#### Home, quick actions expanded

Tapping a circular tile expands a panel **in place**, pushing the content
below it down. Observed for `ORDER FOOD`:

- Tracked-caps label `QUICK ACTIONS`
- A wrapping row of pill buttons: `Order Burger` `Order Snacks` `Order Coffee`
  `Order Tea` and repeats
- Beneath, two wide pill buttons side by side, each with a leading icon:
  `VIEW MENU` and `RESTAURANTS`

The expansion is inline, not a modal or a sheet.

---

### Service browse — the shared pattern

Spa and Activities share one layout. Store and Restaurant vary from it.

Page title top-left in large type, plain on the page background. Where present,
a dark pill button top-right with a sparkle icon: `Help me choose`.

Then a **hero band**: a photograph, full width, rounded corners, with centred
type over it — a serif line and a smaller line beneath. Over the lower part of
the hero, a horizontally scrolling row of **category cards**: rounded
rectangles, each with a two-line label left and an image right, partially
overlapping the hero's bottom edge.

Beneath the hero, a tracked-caps label describing the filter dimension, then a
circular filter icon followed by a row of pill chips. Selected chip has a
tinted fill; unselected are outlined.

Then content sections, each with a plain-type section heading and a horizontal
row of item cards. Item card: title two lines left, `Starting from` + price
beneath in a lighter weight with the number heavier, image right, rounded.

Observed copy, spa: hero `Feel better, your way` / `Browse by category or
explore by mood`. Label `EXPLORE TREATMENTS BASED ON YOUR MOOD`. Chips
`Relaxation` `Pain relief` `Detox` `Facials`. Section `Relaxtion` — note this
typo is in the shipped product and in Figma; do not reproduce it, write
`Relaxation`.

Observed copy, activities: label `EXPLORE ACTIVITIES BASED ON YOUR INTEREST`.
Chips `Recommended` `Happening Now` `Water Sports` `City Tours`. Section
`Recommended`. There is also a full-width search field above the chips with
placeholder `Search activities or what you are looking for...` and a trailing
search icon, and a separate `Explore Categories` row of chips
(`Entertainment by Hotel` `Elite Experiences` `Nearby Activities`).

---

### Booking flow — corrected structure

**This supersedes `G-08` in 03-screens.md.** 03 describes a four-step wizard
with a step indicator and Back/Next. That is not what the product does.

It is a **right-side panel, roughly 40% of the width**, that advances in place.
The page behind stays visible and dimmed. There is no step indicator and no
Next button — the footer CTA itself advances, and its label changes each step.

Panel chrome, consistent across all steps:

- **Back arrow**, circular white, top-left — appears from step 2 onward, absent
  on step 1
- **Close X**, circular white, top-right — present on every step
- **Sticky footer**: a wide pill CTA, with the price right-aligned outside it.
  From step 2, a small tracked-caps `SHOW SUMMARY` sits beneath the price.

#### Step 1 — detail

Photographic header at the top of the panel. Over its lower edge: the item
title left, price right, both in white.

Body, scrolling:
- A highlighted intro box, tinted background, one or two sentences
- Two or three paragraphs of body copy
- `You'll love this if:` heading, then a bulleted list
- `Good to know before you book:` heading, then a bulleted list
- `Booking this for:` label, then pill options `Single` `Couple`
- `Session length:` label, then pill options `30 min` `60 min` `90 min`

Selected pills use a tinted fill. Footer CTA: `BOOK NOW`, price to its right.

For activities the options differ: two labelled numeric steppers side by side,
`Adults` and `Children`, each a pill with `-` value `+`, then `Duration` pill
options. The activity panel also has `Description` / `Instructions` tabs
beneath the title, and a row of meta chips with leading icons
(`Every Wednesday` `6 hrs` `Pick up from reception`). Price shows as a value
with `PER GUEST` beneath it.

#### Step 2 — enhance

The header photograph remains, but a **Summary card** now overlays it: a dark
translucent rounded card, `Summary` in bold, then a line listing what has been
chosen so far, comma separated.

Body: heading `Enhance your experience`, then add-on cards. Each add-on card:
title, a small tracked-caps badge `POPULAR CHOICE` on a tinted background,
price, image right, and a full-width tinted strip at the card's foot carrying
one line of benefit copy.

Footer CTA: `Continue`. Price is now the running total.

#### Step 3 — date and time

Summary card grows — it now carries the accumulated selections on one line and
a second line with a clock icon and the chosen date and time.

Body:
- Label `Date of your visit`, then date pills that **wrap onto two rows**.
  Format `Thu, June 22`. Selected pill tinted.
- Label `Start time`, then a segmented control `Morning` `Afternoon` `Evening`
  in a pill-shaped track
- A **four-column grid** of time pills at 15-minute intervals, scrolling
  vertically, `8:00 AM` `8:15 AM` `8:30 AM` `8:45 AM` and so on

Footer CTA: `Confirm Booking`.

#### Step 4 — confirmation

See the shared confirmation modal below.

---

### Cart / order panel — the shared pattern

Used by Restaurant, Store and Housekeeping. Right-side panel, same width and
position as the booking panel.

Chrome: circular back arrow top-left, and a pill button top-right labelled
`Menu`. No X observed on this variant.

Body:
- **Line items** — name left, then a pill stepper `-` qty `+`, then the line
  price right
- **Charges** — a label and amount on its own row, e.g. `Delivery Charges`
- A row with two controls: a pill `+ Special requests`, and an outlined pill
  dropdown `Deliver to: My Room` with a chevron
- A tracked-caps section label — `COMPLETE YOUR MEAL` in dining,
  `COMPLETE YOUR ORDER` in store
- A **segmented tab row** for the upsell: dining shows
  `Popular` `Desserts` `Sides` `Beverages`; store shows
  `Wellness` `Essentials` `Comfort` `Gifting`
- A **4-column grid** of upsell tiles: image background, name and price
  overlaid at the bottom in white, and a circular `+` button top-right of each

Sticky footer: wide pill CTA `Place Order`, with the total right-aligned and a
small `Cart total` label beneath it.

---

### Restaurant — full page, not a panel

The only browse screen that takes over the whole page.

Top bar: circular back arrow left, page title beside it, then a dark pill
button right — `Reserve My Table`.

Then a photographic band with centred serif type over it, two lines.

Then a wide two-option segmented control, `Food` / `Beverages`, selected
segment tinted.

Then the filter icon and category chips `Curated` `Starters` `Main Course`
`Dessert`.

Then sections with plain headings and a **grid** of item cards, four across.
Item card: name, a two-line description in muted type, price, and two small
dietary icons beside it, image right, and an `ADD` pill that appears on the
image.

In-room dining is the same layout with the title changed and an added cart
icon button in the top bar.

---

### Housekeeping

Title left. Top right: an outlined pill `Laundry` and a filled pill
`Place Request` carrying a small count badge in its top-right corner.

Then a three-option segmented control: `Amenities` `Linens` `Maintenance`.

Then a **three-column grid** of item cards. Each: image left, name right,
`ADD` pill beneath the name. Rows scroll.

---

### Transport / bookings

Right-side panel. Chrome: a pill labelled `Bookings` top-left, circular X
top-right.

**Step 1 — vehicle**
- A line of copy: `You are going to` + destination, destination emphasised
- Label `Choice of Vehicle`
- Vehicle cards, each: a tracked-caps ribbon badge `SUGGESTED FOR YOU` on the
  first one only, name, a line of description, a capacity row with a person
  icon and `x8`, vehicle image right, and either a qty stepper `- 1 +` or a
  `SELECT` pill

**Step 2 — time**
- `Select time to leave`, then the chosen value in bold beneath
- A **native-style scrolling time wheel**: three columns, day / hour / minute,
  with an AM/PM column. Centre row is the selection, highlighted with a tinted
  full-width band; rows above and below fade out progressively
- Label `Recommended times:` then a row of outlined pills,
  e.g. `Today, 1:30 PM` `Tomorrow, 10:00 AM` `Friday, 2:15 PM`
- Sticky footer: wide pill CTA `Confirm`

> **Not in 03-screens.md at all.** For Yosh this is the concierge / transport
> request. Add it.

---

### Confirmation modal — one component, used everywhere

Observed identically after spa booking, activity booking, store order, dining
order and housekeeping request. Build it **once**.

Centred modal over a dimmed page. Generous height, mostly empty space.

- Circular button top-left with a **home** icon
- Circular button top-right with an **X**
- Centred, vertically middle: a solid green circle with a white checkmark
- Beneath it, a title in a **serif** face, larger
- Beneath that, one or two lines of specific detail in muted type, centred
- At the foot, two outlined pill buttons side by side, equal width:
  `Chat with Us` and `Add special instructions`

Observed titles and details:

| Context | Title | Detail |
|---|---|---|
| Spa | `Booking Confimed` | `We will see you at the Spa at` / `Tomorrow, 6 PM` |
| Activity | `Booking Confimed` | `Your private tour has been confirmed` / `for 22nd February, 8:00 AM.` |
| Housekeeping | `Request Placed` | `Your Items will be delivered shortly` |
| Laundry | `Request Placed` | `Your laundry items will be picked up shortly` |

`Confimed` is misspelled in the shipped product. Write `Confirmed`.

Per `08-copy.md`, rewrite these for the Yosh build — sentence case, no
title-case headings. Keep the structure and the two-button foot exactly.

---

## What this changes in the existing docs

1. **`G-08` is not a wizard.** Replace the four-screen spec with the
   advancing right-panel described above: back arrow, accumulating summary
   card, changing footer CTA, no step indicator, no Next button.
2. **Add a transport / concierge booking screen.** Vehicle choice then time
   wheel. Nothing equivalent exists in 03.
3. **`ConfirmationModal` is a shared component.** Add it to
   `04-components.md`. It is not a per-flow screen.
4. **`OrderPanel` is a shared component.** Line items, charges, special
   requests, deliver-to, upsell tabs, upsell grid, sticky total footer. Used by
   three flows.
5. **The rail has three states**, not two. Collapsed sliver, icon column,
   expanded with labels. It floats over content and is vertically centred.
6. **Browse pages have a hero band with category cards overlapping its lower
   edge**, then a mood/interest chip row. 03 describes the chips but not the
   hero or the overlap.
7. **Every screen carries the bottom-right two-button cluster.**

## Content note

All observed content is hotel and resort — Casa Cook El Gouna, guest Thomas,
prices in euro, spa treatments, kayaking, in-hotel events. Per `00-brief.md`
this build is a residential estate. Keep every structure, treatment and
interaction above. Replace the content per `05-data-model.md` and the copy
rules in `08-copy.md`.

---

# Addendum — Yosh-specific flows (Abu Dhabi Figma source)

Source: `figma.com/design/C1ZiMoq2vDXGt9xILvVIQ2/Abu-Dhabi-app`, nodes `158:3930`,
`414:16777`, `2033:9247`, `2033:9249`, `2033:9248`. Confirmed by the person
directly against these exact screens — **this section is not inferred, it is
confirmed spec.**

This is the same base app as the rest of this document. Only the service
flows differ. **What changes is which tiles exist and what they open.**

> **Corrected — no rail, no photo hero, no greeting on Yosh's Home.** The
> claim above used to say "same photo, same 'Good Morning, Thomas' header,
> same weather widget, same rail chrome" wholesale. Checked directly against
> `docs/assets/genie-yosh/home-orders-banner.png` and `home-room-controls.png`
> (the real `G-02` Home) and against Figma node `2033:9248`: only the weather
> widget carries over. There is no floating icon rail anywhere in this Home —
> the rail visible behind the Requests/Profile overlay in
> `requests-and-profile.png` is the entire old Casa Cook Home frame (rail,
> resort tile row, carousel, video section — all present, unhidden, at their
> original Casa Cook content) reused wholesale as a backdrop for the new
> overlay panels layered on top of it, not something to replicate. And
> neither PNG shows a photographic hero band or a "Good Morning, {name}"
> greeting anywhere — the page starts directly below the status bar with the
> weather/property/controls stack and the `Your Orders` banner, on a plain
> page background. Same goes for the bottom-right two-button cluster the
> main body claims is on every frame: neither Yosh reference confirms two
> buttons anywhere. The only confirmed floating affordance on Home is a
> single ambient chat orb, bottom-left.

## Home — Yosh tile set and real chrome

Replace the resort tile row (`Order Food` / `Book a Spa` / `Try Kayaking` /
`Store`) with:

`Food Order` · `Housekeeping Services` · `Maintenance Services` ·
`Event Planning` · `Chauffeur Request`

Same square card treatment as before — bold two-line label, circular arrow
button bottom-right. For Yosh, drop `Food Order` (not in the RFI).

Home's actual left-edge chrome, confirmed from the two PNGs above: a weather
widget, a Room/Property number card, an `Open Controls` / `Close Controls`
toggle, and a single ambient chat orb bottom-left (opens Chat, scoped
ad-hoc/unscoped — matches the `genie main` / `ri:chat-ai-3-line` component
noted in `07-genie-frame-map.md`).

**Room Controls — observed, explicitly excluded.** `Open Controls` reveals a
right-side panel: thermostat dial, room lighting toggle + slider, TV
transport controls + volume, chandelier toggle, bathroom lights toggle. Real
feature in the source, genuinely present in both PNGs — but out of scope for
this build, same treatment as Spa/Activities/Restaurant/Dining/Store below.
Not in the RFI, not relevant to the ops-focused demo. Do not build it; do not
delete the observation.

**Profile entry point — a designed decision, not confirmed spec.** Nothing in
the source shows how Profile is reached from this Home — no chevron, no
button styling, no confirmed tap target anywhere in either PNG. Decision:
tapping the Room/Property card opens `G-11` Profile. This is a guess made to
close a real gap, not something observed — flagged the same way as any other
invented affordance in this document.

### Status banner — one component, several fillings

The `Your Orders` band at the top of home is not order-specific. It's a
generic **active-request banner**:

```
[status pill] [detail line]                    [Chat with X]
```

Observed fillings:
- Food: `Preparing` / `17 mins` / `Continental Breakfast (1), Oriental...` /
  `Chat with Kitchen`
- Event: `Planning` / `Royal Arabian wedding on 30th May` / `Chat with Events`

Build one `StatusBanner` component. It reads whatever the resident's most
recent active request is and fills accordingly. Tapping the chat button opens
the Chat overlay scoped to that request's thread.

## Housekeeping — and Maintenance, same component

**Confirmed: Maintenance uses the identical UI as Housekeeping.** Category
rail left, item grid right, cart on request. Do not build Maintenance as a
separate report-with-photo form — that was my earlier guess and it's wrong.

Structure:
- Back arrow + page title left, `Place Request` pill right with a count badge
- Left rail of category chips, one active (tinted fill): `Most Requested` /
  `Laundry` / `Cleaning Service` / `Towels` / `Toiletries` / `Personal Care` /
  `Electrical Appliances` / `Internet`
- Right side: **2-column grid**, each row is item-photo-left,
  name-and-Add-button-right. Photo is a small square, rounded.

Maintenance's own category rail differs in content (`Plumbing`, `Electrical`,
`AC/HVAC`, `Appliances`, `Structural` or similar Yosh-relevant categories) but
the component is identical.

### Cart / place-request screen

Reached via `Place Request`:
- Left: a light-tinted panel listing selected items, each with a pill qty
  stepper `- 1 +`
- Right: `Recommendations` — a row of suggested add-on items with photo, name,
  `Add` button
- `Special note:` — a row of suggestion chips (`Refresh these daily` /
  `Leave at the door` / `Add matching body lotion`) above a text field with a
  **trailing mic icon**
- `Schedule For` — `Now` / `Later` toggle pills
- `Delivery At` — property and room/area chips, each with an edit pencil
- Footer: `Back to menu` outlined pill left, `Place Request` filled pill right

## Chat — with voice bolted on

**Structural source**: node `2033:9247`. Overlay, same position and chrome as
the Casa Cook confirm-card overlay documented above (home icon top-left,
X top-right).

Layout, top to bottom:
- Sent message: right-aligned, filled pill, e.g. `Order Coffee` with a
  timestamp
- Genie response: left-aligned, light card, body text, `GENIE | {time}` byline
  beneath
- **Quick-reply chip row** — outlined pills matching options in the response,
  e.g. `Add Nescafe` `Add Cappuccino` `Add Iced Mocha` `American Cuisine`
- **Input row** at the foot: a rounded field `Type here`, with a **trailing
  mic icon inside the field**, and a separate leading-edge send arrow inside
  the field on the left

### Voice behaviour — confirmed, this is the spec

Not shown as a distinct visual state in Figma — the person specified this
behaviour directly:

1. Idle: field shows placeholder `Type here`, mic icon visible trailing
2. Tap the mic: field enters a **listening/transcribing** state — text
   populates live as the person speaks, replacing the placeholder. Use the
   same live-transcript-builds-word-by-word treatment as elsewhere in this doc
3. On the person finishing speaking (silence-detected or explicit stop): the
   transcribed text **auto-sends**, exactly as if Enter had been pressed
4. Conversation continues in the same thread — Genie's next response and any
   new quick-reply chips render below

Typed input still works identically alongside voice — same field, same send
behaviour, just no transcription step.

This chat is reached two ways: tapping a `Chat with X` button on the status
banner (scoped to that request), or tapping `Need Help?` on a card in
Requests (see below). This is also where **custom/ad-hoc requests** and
**follow-ups on an open request** happen — there is no separate composer
screen for those; it's this same chat.

## Chauffeur / transport — confirmed structure

Right-side panel, `Bookings` pill top-left, X top-right. Three steps, same
panel chrome pattern as the booking flow described earlier in this document
(back arrow appears from step 2, sticky footer CTA):

1. **Destination** — search field `Where are you going?`, then a row of
   destination chips (property/site names for Yosh, replacing
   `Downtown Bazaar` etc.)
2. **Time** — `You are going to {destination}`, `Select time to leave`, chosen
   value in bold, then a native scrolling time wheel (day/hour/minute/AMPM
   columns, centre row highlighted), then `Recommended times` outlined pill
   row. Footer `Confirm`.
3. **Vehicle** — `Choice of Vehicle`, vehicle cards each with a name, one line
   of description, a capacity row (person icon + count), vehicle image right,
   and a `SELECT` pill or a qty stepper on the suggested one. Footer becomes a
   summary strip on the right showing destination / time / vehicle each with
   a `Change` link, then `Confirm Booking`.
4. On confirm — a text field `Add a special request` sits above the confirm
   button on the summary step.

## Requests — filterable list

Reached from the rail's `My Requests`. **Overlay**, not a route change —
title `Requests`, X top-right.

- Filter pills across the top: `All` `Dining` `Housekeeping` `Store` `Taxi` —
  for Yosh, replace with the actual type set (Housekeeping, Maintenance,
  Event, Transport, Warehouse, Art, Access)
- Each request is a card: a small type icon and label top-left (`STORE`),
  a `REQUESTED` status badge top-right, item summary line, a divider, then
  `Request placed at: {time}` and `Order total: {amount}` (amount only
  applies where relevant — drop for non-priced request types), and a footer
  row with **two actions**: `Cancel Request` (outlined) and `Need Help?`
  (filled, tinted)

**`Need Help?` opens the Chat overlay**, scoped to that specific request's
thread. This is the follow-up mechanism — confirmed.

## Profile

Reached by tapping the Room/Property card on Home — a designed decision, not
confirmed spec, see the note under "Home — Yosh tile set and real chrome"
above.

Overlay, `Profile` title, X top-right.
- Large room/property number, language selector top-right
- `Dates of stay` (for Yosh: length of current arrangement, if relevant, or
  drop this field — residents aren't transient guests)
- `Name`, with an edit pencil
- `Email`
- `Preferences` section: labelled rows (`Dietary Preferences`,
  `Allergies`, `Occasion of stay`), each showing the current values as plain
  text, with a single `Edit Preferences` action for the whole section
- Destructive action (`Log Out`) styled as a filled red pill, isolated at the
  bottom

## What this supersedes

Everything in the main body of this document above about **Spa, Activities,
Restaurant, In-room Dining, and Store is superseded for the Yosh build.**
Those flows do not appear in the Yosh product at all. Do not build them, do
not reference their screens in `03-screens.md`.

What is **not** superseded and still applies exactly as documented above: the
rail (three states, floating, vertically centred), the home hero band and
weather widget, the photographic idle/welcome screens, the general
confirmation-modal pattern (still used, see Housekeeping's request placement
and Chauffeur's booking confirmation), and the overlay chrome pattern (home
icon top-left, X top-right, dimmed background).

## Genie catalogue browsing — inventory, warehouse, art

Genie-side inventory/warehouse/art browsing reuses the **same catalogue
pattern** documented in `03-screens.md` for Luna's Registry (category rail
left, item grid right with photo/qty/View), sourced from Figma node
`419:19544`. On Genie, `View` leads to a **request action** (raise a warehouse
or art request for that item) rather than Luna's admin `Add item` action.
This is reached contextually — from within Event Planning when selecting
items for a gathering, per the flow documented in `03-screens.md` `G-11` — not
as its own rail destination on Genie.
