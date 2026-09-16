import { F0 } from "@/ux2/lib/ux2Step0Layout";
import { withUx2IconEntryPath } from "@/ux2/lib/ux2IconEntryPath";
import { enrichUx2Step4Handoff } from "@/ux2/lib/ux2LeftOrbitStep4Handoff";

/** Figma [8:252](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-252) — 1879.5 원, 중심 % */
const F = F0;
const CX = F / 2;
const CY = F / 2;

function pct(px) {
  return `${(px / F) * 100}%`;
}

function sizeCqw(px) {
  return (px / F) * 100;
}

/** Figma 8:252 대비 화면상 arc가 높게 보이는 보정 — 하단 rim 쪽으로 */
const STEP4_ARC_Y_NUDGE_PX = 82;
/** people(맨 우)만 arc보다 위 — Figma 8:268 */
const STEP4_PEOPLE_LIFT_PX = 100;

/** Figma 프레임 → 블롭 중심 px */
function centerFromFigma({ centerX, centerY, left, top, size }) {
  if (centerX != null && centerY != null) {
    return { x: centerX, y: centerY };
  }
  if (centerX != null && top != null) {
    return { x: centerX, y: top + size / 2 };
  }
  if (left != null && top != null) {
    return { x: left + size / 2, y: top + size / 2 };
  }
  return { x: CX, y: CY };
}

function iconDef(def) {
  const nudged = { ...def };
  const yAdd =
    STEP4_ARC_Y_NUDGE_PX -
    (nudged.id === "people" ? STEP4_PEOPLE_LIFT_PX : 0);
  if (nudged.top != null) {
    nudged.top += yAdd;
  }
  if (nudged.centerY != null) {
    nudged.centerY += yAdd;
  }
  const { x, y } = centerFromFigma(nudged);
  return {
    id: def.id,
    left: pct(x),
    top: pct(y),
    sizeCqw: sizeCqw(def.size),
    src: def.src,
    iconSrc: def.iconSrc,
    opacity: def.opacity ?? 1,
  };
}

/** 8:259 … 8:280 — composite blob SVG */
const ICON_DEFS = [
  iconDef({
    id: "edit",
    left: 142,
    top: 940,
    size: 183.482,
    src: "/figma/ux2/step4/edit-blob.svg",
  }),
  iconDef({
    id: "bookmark",
    left: 297,
    top: 1248,
    size: 183.482,
    src: "/figma/ux2/step4/bookmark-blob.svg",
  }),
  iconDef({
    id: "gallery",
    left: 575,
    top: 1453,
    size: 251.945,
    src: "/figma/ux2/step4/gallery-blob.svg",
  }),
  iconDef({
    id: "video",
    left: 1039,
    top: 1447,
    size: 251.945,
    src: "/figma/ux2/step4/video-blob.svg",
  }),
  iconDef({
    id: "people",
    left: 1373,
    top: 1150,
    size: 296.673,
    src: "/figma/ux2/step4/people-blob.svg",
  }),
];

export const UX2_LEFT_ORBIT_STEP4_ICONS = ICON_DEFS.map(withUx2IconEntryPath).map(
  enrichUx2Step4Handoff,
);
