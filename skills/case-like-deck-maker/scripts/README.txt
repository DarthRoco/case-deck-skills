No standalone demo required. Orchestration lives in SKILL.md.

Build order
1. Copy assets/token-block.js and assets/helpers.js next to presentation.js
   (or require them from this skill path).
2. Start from assets/templates/tpl-cover.js, tpl-content.js, tpl-annexure.js.
3. Call H.drawNav / H.card / H.icon / H.source / H.pageChip. Do not restyle chrome.
4. If assets/icons/ has PNG files, use them via H.icon(slide, name, x, y).
   If that folder is empty, use numbered geometric markers. Do not invent clip-art.
5. After pack: python scripts/density-critic.py deck.pptx
   Then overlap check + render.

If density-critic fails, rebuild the named slides. Do not ship.
