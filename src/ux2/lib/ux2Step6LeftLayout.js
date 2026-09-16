import { F0 } from "@/ux2/lib/ux2Step0Layout";

/** Figma [8:142](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-142) */
const F = F0;
const CX = F / 2;

export function pctLeft6(px) {
  return (px / F) * 100;
}

export function sizeCqwLeft6(px) {
  return (px / F) * 100;
}

export const STEP6_LEFT_DOTS = {
  top: 912,
  height: 55.767,
  width: 138.091,
};

/** 39:353 — 중앙 보이스 */
export const STEP6_LEFT_VOICE = {
  centerX: CX,
  centerY: CX,
  size: 211.482,
};

/** 8:153 — always ask / 뮤직 블롭 */
export const STEP6_LEFT_MUSIC = {
  centerX: CX + 699.13,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

/** 8:150 */
export const STEP6_LEFT_ORBIT_A = {
  centerX: CX + 601.49,
  centerY: 1155 + 258.482 / 2,
  size: 258.482,
};

/** 8:157 */
export const STEP6_LEFT_ORBIT_B = {
  centerX: CX + 7.99,
  centerY: 1586 + 183.482 / 2,
  size: 183.482,
};

/** 8:147 */
export const STEP6_LEFT_ORBIT_C = {
  centerX: CX + 354.99,
  centerY: CX + 590.99,
  size: 235.482,
};

export const STEP6_LEFT_TEXT = {
  top: 1408,
};
