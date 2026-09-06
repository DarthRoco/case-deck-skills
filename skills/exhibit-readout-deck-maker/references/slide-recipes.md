# Slide recipes

Implement these as PptxGenJS layouts. Default canvas is 13.33" × 7.5" 16:9. Discussion-document clones may use 10" × 7.5" or letter-portrait if the user demands a paper-faithful page; say so in Pass 2.

Leave the footer band (y ≥ 7.05 on 16:9) alone.

## Cover lockup

- White or family-primary full-bleed with white type
- Identity label top-left, date top-right
- Document type in mute caps (DISCUSSION DOCUMENT / WHITE PAPER / PRELIMINARY)
- Title 28–36 pt family primary
- One-line governing question or recommendation under the title, 14–16 pt
- Client name if a readout; authors if thought leadership
- No navigator, no photos, no icons

## Agenda contract

- Title “Contents” or the project name
- 4–7 items, numbered, left aligned
- Active item can be bold; do not rainbow them
- Repeat this list as section-divider slides later, highlighting the current item

## Governing situation chart

- Eyebrow section label
- Action title
- Left 62–70% tinted exhibit well with one chart, unit, annotations
- Right 30–38% “Key drivers” / “What this means” rail
- Notes under the well
- SOURCE left, identity + page right

## Waterfall / bridge

- Action title names the delta and the window
- Single waterfall, start and end bars in primary, negative in warning red
- 3 bullets under or to the right naming the load-bearing steps
- Footnotes for one-offs

## Method / proof

- Four rows or four columns: Interviews, Administrative data, Primary research, Secondary
- n and named cohorts on the row
- Scope constraints as a muted box at the bottom

## Choice split

- Two or three stacked bands (Within control / Requires policy / Requires capital)
- Each band: name + 3 fragment bullets + one constraint
- Recommendation banner under the bands, primary fill, one sentence

## Named recommendation

- Banner with the programme name
- Three support columns (why this, why now, why us)
- One number reused from the economics slide
- No fourth column

## Economics

- One hero chart (bridge, distribution curve, P&L stack, multiple vs peers)
- Assumptions as a 4–6 row table, labelled ASSUMPTIONS
- Insights box with 3 bullets including the load-bearing assumption
- Currency and scale declared once

## Operating model / levers

- Pyramid + two pillars *or*
- 4–5 numbered levers as equal tiles *or*
- From / to two-column table
- Do not mix all three on one slide

## Conceptual loop

- Three nodes on a circle (Why / What / How, or Reliability / Cost / Timing)
- One question on each arc
- Family primary as the only chromatic fill
- Caption is the action title, not “Framework”

## Snapshot box

- Three bullets only
- Each bullet is a claim with a number
- Sits on page 2 of a thought-leadership piece, never on a client situation slide

## Roadmap

- Rows = workstreams
- Columns = 30 / 90 / 180 / 365 days, or Phase 1 / 2 / 3
- Owners as a last column
- One “decision required” callout on the phase that needs the room

## Decision frame

- What we recommend
- What we need from this room (approval, funding, data access, sponsor)
- What happens if we wait
- Next meeting date

## Section divider

- Agenda list reused, current item in primary
- Empty otherwise
- Same footer

## Appendix divider

- Word APPENDIX or BACKUP in family primary
- Then exhibits that still have action titles, SOURCE, and page numbers

## Tiny construction notes for PptxGenJS

- `identityFooter(slide, pageNum)` on every slide including title variants
- `exhibitWell(slide, x,y,w,h)` so the tint never drifts
- `actionTitle(slide, title)` locked to TYPE.title
- Charts use family primary + two tints + warning red only when the series is semantic
- When in doubt, one exhibit at 12 pt beats two exhibits at 9 pt
