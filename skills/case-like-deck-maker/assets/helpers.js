// CaseLikeDeckMaker helpers — require this from presentation.js
// Usage:
//   const { makeHelpers } = require("./helpers");
//   const H = makeHelpers(pres, { C, TYPE, BOX, NAV });
//   H.drawNav(slide, 2); H.card(slide, x,y,w,h,{title, body, icon});
//
// Do not fork these primitives mid-deck. Change tokens, not geometry.

const fs = require("fs");
const path = require("path");
const ICON_DIR = path.join(__dirname, "icons");
const ICON_ATLAS = path.join(__dirname, "icon-atlas.png");
let ICON_MAP = {};
try {
  ICON_MAP = require("./icon-map.json");
} catch (e) {
  ICON_MAP = {};
}

function listIconFiles() {
  if (!fs.existsSync(ICON_DIR)) return [];
  return fs.readdirSync(ICON_DIR).filter((n) => /\.png$/i.test(n));
}

function resolveIcon(name) {
  if (!name) return null;
  const mapped = ICON_MAP[name] && ICON_MAP[name].file;
  if (mapped) {
    const p = path.join(__dirname, mapped);
    if (fs.existsSync(p)) return p;
  }
  const direct = path.join(ICON_DIR, name + ".png");
  if (fs.existsSync(direct)) return direct;
  return null;
}

function makeHelpers(pres, tokens) {
  const { C, TYPE, BOX, NAV } = tokens;
  const pageW = BOX.pageW || 13.33;
  const pageH = BOX.pageH || 7.5;
  const m = BOX.margin || 0.45;
  const footerY = BOX.footerY || 7.08;
  const radius = BOX.radius || 6;

  function topBar(slide) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: pageW, h: 0.06,
      fill: { color: C.primary }, line: { color: C.primary },
    });
  }

  function drawNav(slide, activeIndex) {
    const labels = NAV || [];
    if (!labels.length) return;
    const n = labels.length;
    const tabH = 0.28;
    const y = footerY - 0.02;
    const gap = 0.06;
    const totalW = pageW - m * 2 - 0.42;
    const tabW = (totalW - gap * (n - 1)) / n;
    labels.forEach((label, i) => {
      const x = m + i * (tabW + gap);
      const on = i === activeIndex;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: tabW, h: tabH,
        fill: { color: on ? C.primary : C.primarySoft || "EEF1F4" },
        line: { color: on ? C.primary : C.line || "D5DAE1" },
        rectRadius: 0.04,
      });
      slide.addText(label, {
        x, y, w: tabW, h: tabH,
        fontFace: "Calibri", fontSize: 10, bold: on,
        color: on ? C.white : C.mute,
        align: "center", valign: "middle", margin: 0,
      });
    });
  }

  function pageChip(slide, n) {
    const s = 0.28;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: pageW - m - s, y: footerY - 0.02, w: s, h: s,
      fill: { color: C.accent || C.primary },
      line: { color: C.accent || C.primary },
      rectRadius: 0.04,
    });
    slide.addText(String(n), {
      x: pageW - m - s, y: footerY - 0.02, w: s, h: s,
      fontFace: "Calibri", fontSize: TYPE.page || 11, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0,
    });
  }

  function source(slide, text) {
    slide.addText(text, {
      x: m, y: 7.22, w: pageW - m * 2 - 0.5, h: 0.2,
      fontFace: "Calibri", fontSize: TYPE.source || 9,
      color: C.mute, margin: 0,
    });
  }

  function insightTitle(slide, text, eyebrow) {
    if (eyebrow) {
      slide.addText(eyebrow.toUpperCase(), {
        x: m, y: 0.16, w: pageW - m * 2, h: 0.2,
        fontFace: "Calibri", fontSize: 10, bold: true,
        color: C.accent || C.primary, margin: 0,
      });
    }
    slide.addText(text, {
      x: m, y: BOX.titleY || 0.34, w: pageW - m * 2, h: BOX.titleH || 0.5,
      fontFace: "Calibri", fontSize: TYPE.title || 20, bold: true,
      color: C.primary, margin: 0, valign: "middle",
    });
  }

  function card(slide, x, y, w, h, opts) {
    opts = opts || {};
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h,
      fill: { color: opts.fill || C.white },
      line: { color: opts.line || C.line || "D5DAE1" },
      rectRadius: (opts.radius != null ? opts.radius : radius) / 72,
    });
    if (opts.header) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x, y, w, h: 0.32,
        fill: { color: opts.headerFill || C.primary },
        line: { color: opts.headerFill || C.primary },
      });
      slide.addText(opts.header, {
        x: x + 0.12, y, w: w - 0.2, h: 0.32,
        fontFace: "Calibri", fontSize: 11, bold: true,
        color: C.white, valign: "middle", margin: 0,
      });
    }
    if (opts.icon && resolveIcon(opts.icon)) {
      icon(slide, opts.icon, x + 0.12, y + (opts.header ? 0.4 : 0.12), 0.28);
    }
    const textX = x + 0.12 + (opts.icon && resolveIcon(opts.icon) ? 0.34 : 0);
    if (opts.title) {
      slide.addText(opts.title, {
        x: textX, y: y + (opts.header ? 0.38 : 0.1),
        w: w - (textX - x) - 0.12, h: 0.28,
        fontFace: "Calibri", fontSize: TYPE.cardTitle || 13, bold: true,
        color: C.primary, margin: 0,
      });
    }
    if (opts.body) {
      const body = Array.isArray(opts.body) ? opts.body.map((b) => ({ text: b, options: { bullet: false } })) : opts.body;
      const by = y + (opts.header ? 0.68 : 0.4);
      slide.addText(typeof opts.body === "string" ? opts.body : body, {
        x: x + 0.12, y: by, w: w - 0.24, h: h - (by - y) - 0.1,
        fontFace: "Calibri", fontSize: TYPE.body || 12,
        color: C.text, margin: 0, valign: "top",
      });
    }
  }

  function kpiTile(slide, x, y, w, h, opts) {
    opts = opts || {};
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h,
      fill: { color: opts.fill || C.primary },
      line: { color: opts.fill || C.primary },
      rectRadius: radius / 72,
    });
    slide.addText(String(opts.value), {
      x, y: y + 0.08, w, h: h * 0.55,
      fontFace: "Calibri", fontSize: TYPE.hero || 26, bold: true,
      color: opts.color || C.accent || C.white, align: "center", valign: "middle", margin: 0,
    });
    slide.addText(opts.label || "", {
      x: x + 0.06, y: y + h * 0.58, w: w - 0.12, h: h * 0.32,
      fontFace: "Calibri", fontSize: 11,
      color: opts.labelColor || C.white, align: "center", valign: "top", margin: 0,
    });
  }

  function icon(slide, name, x, y, size) {
    const file = resolveIcon(name);
    if (!file) return;
    slide.addImage({
      path: file,
      x, y, w: size || 0.28, h: size || 0.28,
    });
  }

  function quoteBlock(slide, x, y, w, h, opts) {
    opts = opts || {};
    card(slide, x, y, w, h, { fill: opts.fill || C.primarySoft || "F4F1EA" });
    slide.addText((opts.who || "").toUpperCase(), {
      x: x + 0.16, y: y + 0.1, w: w - 0.32, h: 0.22,
      fontFace: "Calibri", fontSize: 10, bold: true,
      color: C.accent || C.primary, margin: 0,
    });
    slide.addText("\u201c" + (opts.quote || "") + "\u201d", {
      x: x + 0.16, y: y + 0.36, w: w - 0.32, h: h - 0.48,
      fontFace: "Calibri", fontSize: 13, italic: true,
      color: C.text, margin: 0,
    });
  }

  function comparisonTable(slide, x, y, w, h, rows) {
    slide.addTable(rows, {
      x, y, w, h,
      colW: null,
      border: [{ pt: 0.5, color: C.line || "D5DAE1" }],
      fontFace: "Calibri",
      fontSize: TYPE.table || 10,
      color: C.text,
      align: "left",
      valign: "middle",
    });
  }

  return {
    topBar, drawNav, pageChip, source, insightTitle,
    card, kpiTile, icon, quoteBlock, comparisonTable,
    ICON_ATLAS, ICON_MAP,
  };
}

module.exports = { makeHelpers, ICON_ATLAS, ICON_MAP };
