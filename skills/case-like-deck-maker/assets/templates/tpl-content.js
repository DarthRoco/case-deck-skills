// Scaffold — content slide with insight title, 4 cards, chart well, nav, source.
// Copy the structure. Do not ship two airy cards.

function applyContent(pres, H, C, TYPE, BOX, payload) {
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: BOX.pageW, h: BOX.pageH,
    fill: { color: C.canvasAlt || "F6F7F9" }, line: { color: C.canvasAlt || "F6F7F9" },
  });
  H.topBar(s);
  H.insightTitle(s, payload.title, payload.eyebrow);
  const cards = payload.cards || [];
  cards.slice(0, 4).forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = BOX.margin + col * (6.15 + BOX.gutter);
    const y = 1.15 + row * 2.35;
    H.card(s, x, y, 6.15, 2.2, {
      header: c.header,
      title: c.title,
      body: c.body,
      icon: c.icon,
    });
  });
  if (payload.chart) {
    s.addChart(pres.charts.BAR, payload.chart.series, {
      x: payload.chart.x || 7.2,
      y: payload.chart.y || 1.15,
      w: payload.chart.w || 5.6,
      h: payload.chart.h || 4.6,
      barGrouping: "clustered",
      showValue: false,
      chartColors: [C.primary, C.accent],
    });
  }
  H.source(s, payload.source || "SOURCE: ");
  H.drawNav(s, payload.navIndex || 0);
  H.pageChip(s, payload.page || 2);
  return s;
}

module.exports = { applyContent };
