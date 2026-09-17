import { leftExitRimAlongArc } from "@/ux2/lib/dualOrbitHandoffPath";
import { F0 } from "@/ux2/lib/ux2Step0Layout";
import { STEP5_LEFT_ICONS } from "@/ux2/lib/ux2Step5LeftLayout";

const F = F0;
const CX = F / 2;
const CY = F / 2;

const STEP5_BY_ID = Object.fromEntries(
  STEP5_LEFT_ICONS.map((icon) => [icon.id, icon]),
);

/** Figma 4→5 — 우측으로 빠짐 */
export const UX2_HANDOFF_EXIT_IDS = ["people", "gallery"];

/** 4 아이콘 id → 5단계 정착 id */
export const UX2_HANDOFF_RELOCATE = {
  video: "music",
  bookmark: "moon",
};

function parsePct(value) {
  return parseFloat(value);
}

function degFromPct(left, top) {
  const x = (parsePct(left) / 100) * F;
  const y = (parsePct(top) / 100) * F;
  const dx = x - CX;
  const dy = y - CY;
  let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
  if (deg < 0) {
    deg += 360;
  }
  return deg;
}

function lerpPct(fromL, fromT, toL, toT, t) {
  return {
    left: `${parsePct(fromL) + (parsePct(toL) - parsePct(fromL)) * t}%`,
    top: `${parsePct(fromT) + (parsePct(toT) - parsePct(fromT)) * t}%`,
  };
}

function exitVars(left, top) {
  const path = leftExitRimAlongArc(degFromPct(left, top));
  return {
    rimALeft: path.rimA.left,
    rimATop: path.rimA.top,
    rimBLeft: path.rimB.left,
    rimBTop: path.rimB.top,
    dipLeft: path.rimC.left,
    dipTop: path.rimC.top,
    sOutLeft: path.rimD.left,
    sOutTop: path.rimD.top,
    sMidLeft: path.seam.left,
    sMidTop: path.seam.top,
    sBridgeLeft: path.bridge.left,
    sBridgeTop: path.bridge.top,
  };
}

function relocateVars(fromLeft, fromTop, toLeft, toTop) {
  const a = lerpPct(fromLeft, fromTop, toLeft, toTop, 0.38);
  const b = lerpPct(fromLeft, fromTop, toLeft, toTop, 0.72);
  return {
    rimALeft: a.left,
    rimATop: a.top,
    rimBLeft: b.left,
    rimBTop: b.top,
    relocateLeft: toLeft,
    relocateTop: toTop,
  };
}

export function enrichUx2Step4Handoff(icon) {
  if (UX2_HANDOFF_EXIT_IDS.includes(icon.id)) {
    return {
      ...icon,
      handoff: "exit",
      ...exitVars(icon.left, icon.top),
    };
  }

  const targetId = UX2_HANDOFF_RELOCATE[icon.id];
  const target = targetId ? STEP5_BY_ID[targetId] : null;
  if (target) {
    return {
      ...icon,
      handoff: "relocate",
      handoffTargetId: targetId,
      handoffEndLeft: target.left,
      handoffEndTop: target.top,
      handoffSizeCqw: target.sizeCqw,
      ...relocateVars(icon.left, icon.top, target.left, target.top),
    };
  }

  return { ...icon, handoff: "none" };
}
