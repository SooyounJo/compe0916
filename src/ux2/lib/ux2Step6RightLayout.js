import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";
import { ux2RightVideoBlobCenterPx } from "@/ux2/lib/ux2Step5RightLayout";

const F = F0_RIGHT;

export function pctRight6(px) {
  return (px / F) * 100;
}

export function sizeCqwRight6(px) {
  return (px / F) * 100;
}

/** 6단계 우측 카메라 — 5단계 handoff 도착점과 동일 */
export const STEP6_RIGHT_VIDEO_BLOB = ux2RightVideoBlobCenterPx();

/** Figma 97:494 — 5단계 우측 중앙 원 */
export const UX2_STEP5_CENTER_HALFTONE = "/figma/ux2/step5/center-halftone.png";
/** 6단계 우측 BG (7에 잘못 묶여 있던 할프톤 전면) */
export const UX2_STEP6_RIGHT_BG = "/figma/ux2/step7/right-halftone-bg.png";
