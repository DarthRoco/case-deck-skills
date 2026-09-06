// Scaffold — title lockup. Not an 80%-empty Keynote cover.
// Put the governing claim on the page. Optional agenda strip at the bottom.

function applyTitle(pres, H, C, TYPE, BOX, payload) {
  const s = pres.addSlide();
  H.topRule(s);
  s.addText((payload.stamp || "DISCUSSION DOCUMENT").toUpperCase(), {
    x: BOX.margin, y: 1.6, w: 12, h: 0.24,
    fontFace: "Calibri", fontSize: 11, bold: true, color: C.mute, margin: 0,
  });
  s.addText(payload.title, {
    x: BOX.margin, y: 2.05, w: 12.2, h: 1.3,
    fontFace: "Calibri", fontSize: TYPE.cover, bold: true, color: C.primary, margin: 0,
  });
  s.addText(payload.meta || "", {
    x: BOX.margin, y: 3.5, w: 12.2, h: 0.35,
    fontFace: "Calibri", fontSize: 14, color: C.mute, margin: 0,
  });
  if (payload.hero) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: BOX.margin, y: 4.3, w: 4.2, h: 1.6,
      fill: { color: C.well }, line: { color: C.well },
    });
    s.addText(String(payload.hero.value), {
      x: BOX.margin, y: 4.4, w: 4.2, h: 0.85,
      fontFace: "Calibri", fontSize: 28, bold: true, color: C.primary, align: "center", margin: 0,
    });
    s.addText(payload.hero.label || "", {
      x: BOX.margin + 0.15, y: 5.25, w: 3.9, h: 0.45,
      fontFace: "Calibri", fontSize: 12, color: C.mute, align: "center", margin: 0,
    });
  }
  s.addText(payload.byline || "", {
    x: BOX.margin, y: 6.7, w: 12.2, h: 0.28,
    fontFace: "Calibri", fontSize: 12, color: C.mute, margin: 0,
  });
  return s;
}

module.exports = { applyTitle };
