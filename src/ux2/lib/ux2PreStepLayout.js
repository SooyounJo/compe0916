import { F0, STEP0_SEARCH_BLOB } from "@/ux2/lib/ux2Step0Layout";
import {
  STEP4_LEFT_DOTS,
  STEP4_LEFT_VOICE,
} from "@/ux2/lib/ux2Step4Layout";

const F = F0;
const CX = F / 2;

export function pctPre(px) {
  return (px / F) * 100;
}

export function sizeCqwPre(px) {
  return (px / F) * 100;
}

/** Figma 1:572 — -4 */
export const PRE_STEP_4_COCKTAIL = {
  centerX: CX + 672.13,
  centerY: 847 + 275.75 / 2,
  size: 275.75,
};

export const PRE_STEP_4_PROMPT = {
  top: 1407,
};

/** Figma 12:496 — -2 */
export const PRE_STEP_2_SEARCH = {
  centerX: CX + 699.13,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

export const PRE_STEP_2_PROMPT = {
  top: 1404,
};

/** Figma 12:691 — -1 */
export const PRE_STEP_1_SEARCH = PRE_STEP_2_SEARCH;

/** 0단계와 동일 블롭 diameter (275.75) — -2·-1 공통 인스타 슬롯 */
export const PRE_STEP_1_INSTAGRAM = {
  centerX: CX + 535.75,
  centerY: CYFromHalf(352.75),
  size: STEP0_SEARCH_BLOB.size,
};

export const PRE_STEP_2_INSTAGRAM = PRE_STEP_1_INSTAGRAM;

export const PRE_STEP_0_MATCH_BLOB_SIZE = STEP0_SEARCH_BLOB.size;

function CYFromHalf(offsetFromCenter) {
  return CX + offsetFromCenter;
}

export const PRE_STEP_1_PROMPT = {
  left: CX - 685.75,
  top: CX - 107.75,
};

export { STEP4_LEFT_DOTS as PRE_STEP_DOTS, STEP4_LEFT_VOICE as PRE_STEP_VOICE };

export const PRE_STEP_GRADIENT =
  "linear-gradient(180deg, #ffffff 2.5%, #fffff8 40%, #ffc8d7 97.8%)";
