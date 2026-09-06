# Visual system

Pick one family per deck and do not mix.

## Family A — consulting-grid

Use for merger, ops, policy, tech-strategy, analytics.

- Canvas `#FFFFFF` or `#F6F7F9`
- Primary `#0B1F3A` (navy) or teal `#0E4D6B` or deep purple `#3C1E6E`
- Accent — one only. Gold `#C9A227` or lime `#6FBF73`
- Text `#1B1E23` / mute `#5C6570`
- RAG `#1B7F4E` / `#C48A00` / `#C0392B`
- Cards 4–6 px radius, 1 pt `#D5DAE1` hairline or filled header bar in primary
- Top 6 px primary bar optional
- Navigator — bottom tabs or top chevrons
- Icons — monochrome line or solid on a 28–32 px circle in 10–15% primary tint

## Family B — brand-campaign

Use for product, brand, consumer journey, campus brand challenges.

- Take the client's two colours and lock them. Do not invent a third brand language mid-deck.
- Canvas off-white
- Cards 8–12 px radius
- Product photography and UI frames are first-class, not decorations
- Navigator can be a thin brand bar + page number rather than full tabs
- Cover may be full-bleed photography; body slides stay grid-disciplined so the deck does not fall apart after slide 1

## Dark-dashboard variant (analytics only)

- Canvas `#0E1621`
- Panels `#152033`
- Super vs non-super (or good vs bad) as two hues (cyan vs coral)
- Accuracy / KPI pills
- Still keep insight titles in white, not neon body paragraphs

## Type scale (16:9, 13.33" × 7.5")

| Role | Size | Weight |
|---|---|---|
| Cover title | 28–36 | Bold |
| Slide insight title | 18–22 | Bold |
| Subtitle | 11–13 | Regular, mute |
| Card heading | 12–14 | Semibold |
| Body / bullet | 11–12 | Regular |
| Table header | 10–11 | Semibold |
| Table body | 10 | Regular |
| Hero number | 22–32 | Bold |
| Source / footer | 8–9 | Regular |
| Page number | 10–12 | Semibold |

One typeface family for the whole deck (Calibri, Arial, Inter equivalent). A second display face is allowed on the cover only.

## Layout tokens

- Outer margin 0.45" (never < 0.4")
- Gutter between cards 0.14–0.18"
- Footer reserved band 0.38" (tabs + sources + page number)
- Title band 0.7–0.85" from top including subtitle
- Content box starts below title band, ends above footer band
- Max 3 columns on a content slide; 4 only for equal icon+label tiles
- Left rail if used is 1.3–1.5" and the content grid shrinks accordingly

## Navigator patterns

**Bottom tabs**
- Full-width row of 5–7 labels
- Active tab filled primary, white text
- Inactive tabs light gray text on `#EEF1F4`
- Page number in a primary square at the far right

**Top chevrons**
- Section names as a process bar
- Current section filled, future sections outlined

**Left rail**
- Vertical list, active item inverted
- Use only when personas or chapters repeat and the judge needs a map

Highlight the section the slide actually belongs to. A roadmap slide must not highlight "Executive Summary."

## Factory

Do not draw chrome from memory. Require `assets/helpers.js` and start from `assets/templates/`. Check `assets/icons/` first. If PNG files are present, content cards may take icons from that folder via `H.icon`. If the folder is empty, use numbered geometric markers. If a slide looks like a startup pitch (two padded cards, 40% unused canvas), it failed the family.

## Icon rules

- One optical size per row
- Same style family on a slide (do not mix isometric 3D with 1 pt hairline)
- Icon is a label for a card, never a header ornament with no counterpart
- Prefer simple metaphors (handshake, factory, rupee, megaphone, shield)
- If no icon pack is available, use filled geometric markers (1 / 2 / 3 in circles) rather than random clip-art

## Photography and logos

- Circular headshots with a 2 pt ring in primary or white
- UI mockups sit on a light device frame or raw rounded rect; never perspective-skew
- Region maps only when geography is the argument (sourcing, rollout)
- Partner logo strips at consistent height (~0.28–0.35")
- Never stretch. Never place text on a busy photo without a dark scrim (60–75% overlay)
- Only use marks the user supplied

## Anti-patterns

- More than two accent colours plus RAG plus six competitor-brand colours on one slide
- Body text under 10 pt on a slide that will be projected
- Footer tabs colliding with the last content row
- Wikipedia screenshots, watermarked free icons, WordArt bevels
- Default PowerPoint chart styles (blue/orange 3D pies, grey plot area with border)
- Leftover author comments, "click here", "lorem", "xxxx"
- Cover poster energy with body slides that look like a different file
- Mixing Family A navy tables with Family B paint-splash headers

## Accessibility floor

- Contrast on body text ≥ 7:1 against canvas
- White text only on primary or on a dark photo scrim
- RAG never as the only encoding — also write LOW / MED / HIGH
