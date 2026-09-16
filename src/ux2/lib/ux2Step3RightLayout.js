import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";

const F = F0_RIGHT;
const CX = F / 2;

/** Figma 69:278 — voice recorder (138×138, center at 50%−707.43, 50%−0.43) */
export const STEP3_VOICE = {
  centerX: CX - 707.43,
  centerY: CX - 0.43,
  size: 138,
};

/** Figma 69:353 — "Why not save / today too?" */
export const STEP3_PROMPT = {
  left: CX - 523.43,
  top: 832,
};

export function pctStep3(px) {
  return (px / F) * 100;
}
