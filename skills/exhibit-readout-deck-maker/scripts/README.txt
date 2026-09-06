No standalone demo required. Orchestration lives in SKILL.md.

Build order
1. Copy assets/token-block.js and assets/helpers.js next to presentation.js.
2. Start from assets/templates/tpl-title.js, tpl-exhibit.js, tpl-appendix.js.
3. Call H.eyebrow / H.actionTitle / H.exhibitWell / H.source / H.identityFooter.
4. Do not add campus tab navigators or decorative icons.
5. After pack: python scripts/density-critic.py deck.pptx --mode readout
   Then overlap check + render.

If the slide claims a trajectory, gap, mix, fee, or months-to-exit, addChart
must be on that slide. A sentence describing the chart is a fail.
