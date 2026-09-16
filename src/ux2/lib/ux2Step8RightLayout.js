import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";
import { UX2_DINNER_PHOTO_BG } from "@/ux2/lib/ux2SharedPhotoBg";

/** Figma [50:489](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-489) */
const F = F0_RIGHT;
const CX = F / 2;

export function pctRight8(px) {
  return (px / F) * 100;
}

export function sizeCqwRight8(px) {
  return (px / F) * 100;
}

export const UX2_STEP8_RIGHT_BG = UX2_DINNER_PHOTO_BG;

/** 50:498 compose 블롭 — 6단계 always ask와 동일 슬롯 */
export const STEP8_RIGHT_COMPOSE_BLOB = {
  centerX: CX - 714.55,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

export const STEP8_RIGHT_PROMPT = {
  left: CX - 519.43,
  top: 888,
};
