import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";

const F = F0_RIGHT;
const CX = F / 2;

export function pctRight6(px) {
  return (px / F) * 100;
}

export function sizeCqwRight6(px) {
  return (px / F) * 100;
}

export const STEP6_RIGHT_ALWAYS_ASK = {
  centerX: CX - 714.55,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

export const UX2_STEP5_CENTER_HALFTONE = "/figma/ux2/step5/center-halftone.png";
/** 6단계 우측 BG (7에 잘못 묶여 있던 할프톤 전면) */
export const UX2_STEP6_RIGHT_BG = "/figma/ux2/step7/right-halftone-bg.png";
