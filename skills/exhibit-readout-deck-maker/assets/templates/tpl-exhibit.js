// Scaffold — one action title, one exhibit well, notes, SOURCE, identity footer.
// If payload claims a trajectory / gap / mix, payload.chart MUST be set.

function applyExhibit(pres, H, C, TYPE, BOX, payload) {
  const s = pres.addSlide();
  H.topRule(s);
  H.eyebrow(s, payload.eyebrow || "SITUATION");
  H.actionTitle(s, payload.title);
  const wellY = 1.15;
  const wellH = 4.85;
  H.exhibitWell(s, BOX.margin, wellY, BOX.pageW - BOX.margin * 2, wellH);
  if (payload.chart) {
    s.addChart(payload.chart.type || pres.charts.BAR, payload.chart.series, {
      x: BOX.margin + 0.25,
      y: wellY + 0.2,
      w: 8.4,
      h: 4.1,
      showValue: false,
      chartColors: [C.primary, C.accent],
    });
  }
  if (payload.notes) {
    H.noteLines(s, BOX.margin + 0.2, wellY + wellH - 0.45, 12, payload.notes);
  }
  H.source(s, payload.source || "SOURCE: ");
  H.identityFooter(s, payload.page || 2);
  return s;
}

module.exports = { applyExhibit };
