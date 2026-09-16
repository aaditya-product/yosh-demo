# 08 · Copy rules

Every word in the UI. This is not a style preference, it is a hard constraint.
The audience includes an experience director who will notice.

## The test

Would a person who works at this property write this? If it sounds like a
product marketing page or a chatbot, it's wrong.

## Banned outright

Never use these words or anything like them:

seamless · seamlessly · effortless · effortlessly · elevate · empower ·
streamline · unlock · leverage · robust · comprehensive · intuitive ·
cutting-edge · powerful · transform · delight · curated experience ·
journey (unless it's an actual trip) · ecosystem · holistic · bespoke

Never use these phrases:

"Let's get started" · "You're all set" · "Oops" · "Something went wrong" ·
"We'll take it from here" · "Sit back and relax" · "Great choice" ·
"Nice work" · "All done!" · "Ready when you are"

Never use:

- Exclamation marks. Anywhere. There is no exception.
- Em dashes for asides. Use a comma, a full stop, or restructure.
- "Not just X, but Y" and every variant of it.
- A colon before a reveal.
- Emoji.
- Title Case On Buttons Or Headings.
- Words in quotes to make them sound clever.

## How to write instead

**Say the thing.** "Towels, main bathroom" not "Your request has been
successfully submitted".

**Buttons are verbs, and the verb comes back.** A button that says Assign
produces a timeline line that says Assigned. Never Submit, never Send Request,
never Click here, never Continue when Next is what it means.

**Sentence case everywhere.** Headings, buttons, labels, chips.

**Errors state what broke and what to do.** Not "Something went wrong."
"Couldn't reach Dynamics. The request is saved and will send when it's back."

**Empty states say what goes here.** Not "No items to display."
"No inspections scheduled today."

**Times are how people say them.** "29 min ago", "Arriving 16:40",
"Tomorrow, 9am". Not "2026-09-16T16:40:00Z" and not "in approximately 40
minutes".

## Examples, from this build

| Bad | Good |
|---|---|
| Your request has been successfully submitted! | Sent to housekeeping |
| Seamlessly track all your requests in one place | My requests |
| Oops! Nothing here yet. | Nothing open right now |
| Submit Request | Send |
| Estimated Time of Arrival: 40 minutes | Arriving 16:40 |
| Corrective Action Task Successfully Generated | Corrective task created, #0C4 |
| Select Staff Member to Assign | Assign to |
| Would you like to confirm this request? | Confirm |
| Great! Your booking is confirmed. | Booked. Thursday, 2pm |
| Please choose a request to view its details. | Pick a request to see it |
| An error occurred while loading data | Couldn't load. Try again |
| Explore our curated selection of treatments | Treatments |

## Voice transcripts

When a resident or staff member speaks, the transcript is how people actually
talk. Contractions, incomplete sentences, trailing thoughts.

Good: "Can we get some more towels for the main bathroom."
Bad: "I would like to request additional towels for the primary bathroom."

Good: "Laundry pickup from Villa 12, before six."
Bad: "Please schedule a laundry collection service for Villa 12 prior to 6pm."

## Confirm cards

Fields are labels, not sentences. Two or three words.

Good: `8 covers` · `Tonight, 19:30` · `Main House dining`
Bad: `Number of guests: 8` · `Requested time: tonight at 7:30 PM`

## Seed content

Request titles read like something a person typed or said.

Good: "Pool pump making a noise" · "Study window seal" · "Fresh linen, main
bedroom" · "Airport transfer Thursday"

Bad: "Maintenance Request - Pool Equipment" · "Housekeeping Service Request
#4471" · "Client Transportation Requirement"

## If in doubt

Write it the way you would say it out loud to a colleague. Then cut a word.
