#!/usr/bin/env python3
"""Lint a CaseLikeDeckMaker or exhibit-readout deck before calling it done.

Usage:
  python scripts/density-critic.py deck.pptx
  python scripts/density-critic.py deck.pptx --mode readout
"""
from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}

LABEL_TITLES = {
    "overview",
    "financials",
    "financial analysis",
    "our idea",
    "roadmap",
    "primary research",
    "recommendations",
    "next steps",
}

CHART_WORDS = re.compile(
    r"\b(trajectory|fee meter|months[- ]to[- ]exit|cagr|waterfall|power curve|mix|funnel|p&l|breakeven|break-even)\b",
    re.I,
)


def texts(slide_xml: str) -> list[str]:
    root = ET.fromstring(slide_xml)
    out = []
    for t in root.findall(".//a:t", NS):
        if t.text and t.text.strip():
            out.append(t.text.strip())
    return out


def counts(slide_xml: str) -> dict:
    root = ET.fromstring(slide_xml)
    return {
        "charts": len(root.findall(".//c:chart", NS)) + len(root.findall(".//{http://schemas.openxmlformats.org/drawingml/2006/chart}chart")),
        "pics": len(root.findall(".//p:pic", NS)),
        "tables": len(root.findall(".//a:tbl", NS)),
        "shapes": len(root.findall(".//p:sp", NS)),
        "cxn": len(root.findall(".//p:cxnSp", NS)),
    }


def first_title(ts: list[str]) -> list[str] if False else str:
    for t in ts:
        if len(t) >= 8:
            return t
    return ts[0] if ts else ""


def lint_slide(i: int, xml: str, mode: str) -> list[str]:
    fails = []
    ts = texts(xml)
    blob = " ".join(ts)
    title = first_title(ts)
    c = counts(xml)
    modules = c["charts"] + c["pics"] + c["tables"] + max(0, c["shapes"] - 4)

    if title.lower().strip(" .:") in LABEL_TITLES:
        fails.append(f"slide {i}: title is a label — '{title}'")

    if CHART_WORDS.search(blob) and c["charts"] == 0 and c["tables"] == 0:
        fails.append(f"slide {i}: claims a chartable metric but has no chart/table")

    if mode == "casecomp":
        if i > 1 and modules < 3 and "annexure" not in blob.lower() and "appendix" not in blob.lower():
            fails.append(f"slide {i}: fewer than 3 modules (shapes={c['shapes']} charts={c['charts']} tables={c['tables']} pics={c['pics']})")
        if i == 1 and c["pics"] == 0 and len(blob) < 80:
            fails.append("slide 1: cover looks empty — no image lockup and thin identity text")
    else:
        if i > 1 and c["charts"] + c["tables"] + c["pics"] == 0 and "appendix" not in blob.lower():
            if c["shapes"] < 8:
                fails.append(f"slide {i}: no exhibit (chart/table/image) on a working slide")
    return fails


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("pptx")
    ap.add_argument("--mode", choices=["casecomp", "readout"], default="casecomp")
    args = ap.parse_args()
    path = Path(args.pptx)
    if not path.exists():
        print(f"FAIL: missing {path}", file=sys.stderr)
        return 2

    fails: list[str] = []
    with zipfile.ZipFile(path) as z:
        names = sorted(
            n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)
        )
        if not names:
            print("FAIL: no slides", file=sys.stderr)
            return 2
        for n in names:
            i = int(re.search(r"slide(\d+)", n).group(1))
            fails.extend(lint_slide(i, z.read(n).decode("utf-8"), args.mode))

    if fails:
        print("DENSITY CRITIC FAIL")
        for f in fails:
            print(" -", f)
        print("Rebuild the failing slides. Do not ship.")
        return 1
    print(f"DENSITY CRITIC PASS ({args.mode}, {len(names)} slides)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
