// ExhibitReadoutDeckMaker helpers — require this from presentation.js
// Usage:
//   const { makeHelpers } = require("./helpers");
//   const H = makeHelpers(pres, { C, TYPE, BOX, FAMILY });
//   H.eyebrow(slide, "SITUATION");
//   H.actionTitle(slide, "Losses are volume- and pre-funding-driven, not a one-off.");
//   H.identityFooter(slide, 4);
//   H.source(slide, "SOURCE: Client exhibits; n = 6 interviews.");
//
// Do not add campus tab navigators or decorative icons.

function makeHelpers(pres, tokens) {
  const { C, TYPE, BOX, FAMILY } = tokens;
  const pageW = BOX.pageW || 13.33;
  const pageH = BOX.pageH || 7.5;
  const m = BOX.margin || 0.5;
  const footerY = BOX.footerY || 7.08;

  function topRule(slide) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: pageW, h: FAMILY === "red-navy" ? 0.08 : 0.045,
      fill: { color: C.primary }, line: { color: C.primary },
    });
  }

  function eyebrow(slide, text) {
    slide.addText((text || "").toUpperCase(), {
      x: m, y: BOX.eyebrowY || 0.16, w: pageW - m * 2, h: 0.2,
      fontFace: "Calibri", fontSize: TYPE.eyebrow || 11, bold: true,
      color: C.mute, margin: 0,
    });
  }

  function actionTitle(slide, text) {
    slide.addText(text, {
      x: m, y: BOX.titleY || 0.34, w: pageW - m * 2, h: BOX.titleH || 0.5,
      fontFace: "Calibri", fontSize: TYPE.title || 20, bold: true,
      color: C.primary, margin: 0, valign: "middle",
    });
  }

  function exhibitWell(slide, x, y, w, h) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.well || "E8F1FA" },
      line: { color: C.well || "E8F1FA" },
    });
  }

  function source(slide, text) {
    slide.addText(text, {
      x: m, y: 7.22, w: pageW * 0.62, h: 0.2,
      fontFace: "Calibri", fontSize: TYPE.source || 9,
      color: C.mute, margin: 0,
    });
  }

  function identityFooter(slide, n) {
    const name = C.footerName || "Prepared for the working session";
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 7.42, w: pageW, h: 0.08,
      fill: { color: C.footerBar || C.well || "D6E6F5" },
      line: { color: C.footerBar || C.well || "D6E6F5" },
    });
    slide.addText(name + "  |  " + String(n), {
      x: pageW * 0.55, y: 7.2, w: pageW * 0.45 - m, h: 0.22,
      fontFace: "Calibri", fontSize: TYPE.page || 11,
      color: C.primary, align: "right", margin: 0,
    });
  }

  function noteLines(slide, x, y, w, lines) {
    slide.addText(
      (lines || []).map((line, i) => ({
        text: (i + 1) + "  " + (line || ""),
        options: { breakLine: true },
      })),
      {
        x, y, w, h: 0.42,
        fontFace: "Calibri", fontSize: 10, color: C.mute, margin: 0,
      }
    );
  }

  function snapshotBox(slide, x, y, w, h, bullets) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.wellAlt || C.well },
      line: { color: C.line || "D0D7DE" },
    });
    slide.addText("SNAPSHOT", {
      x: x + 0.16, y: y + 0.1, w: w - 0.32, h: 0.22,
      fontFace: "Calibri", fontSize: 11, bold: true, color: C.primary, margin: 0,
    });
    slide.addText(
      (bullets || []).map((b) => ({ text: b, options: { bullet: true, breakLine: true } })),
      {
        x: x + 0.16, y: y + 0.36, w: w - 0.32, h: h - 0.48,
        fontFace: "Calibri", fontSize: 13, color: C.text, margin: 0,
      }
    );
  }

  function pickedColumn(slide, x, y, w, h) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.well },
      line: { color: C.well },
    });
  }

  return {
    topRule, eyebrow, actionTitle, exhibitWell,
    source, identityFooter, noteLines, snapshotBox, pickedColumn,
  };
}

module.exports = { makeHelpers };
