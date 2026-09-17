import { F0 } from "@/ux2/lib/ux2Step0Layout";
import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";

const F_LEFT = F0;
const CX_LEFT = F_LEFT / 2;

const F_RIGHT = F0_RIGHT;
const CX_RIGHT = F_RIGHT / 2;

/** Figma 39:318 — 좌측 4단계 */
export const STEP4_LEFT_VOICE = {
  centerX: CX_LEFT + 730.25,
  centerY: CX_LEFT + 0.25,
  size: 138,
};

export const STEP4_LEFT_DOTS = {
  top: 912,
  height: 55.767,
  width: 138.091,
};

/** Figma 8:282 — 우측 4단계 */
export const STEP4_RIGHT_VOICE = {
  centerX: CX_RIGHT - 707,
  centerY: CX_RIGHT - 0.14,
  size: 138,
};

export const STEP4_RIGHT_PROMPT = {
  left: CX_RIGHT - 519,
  top: 832,
};

export function pctLeft(px) {
  return (px / F_LEFT) * 100;
}

export function pctRight(px) {
  return (px / F_RIGHT) * 100;
}
