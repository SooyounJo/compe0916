import { F0_RIGHT } from "@/ux2/lib/ux2Step0Layout";
import { UX2_DINNER_PHOTO_BG } from "@/ux2/lib/ux2SharedPhotoBg";

const F = F0_RIGHT;

export function pctRight7(px) {
  return (px / F) * 100;
}

export function sizeCqwRight7(px) {
  return (px / F) * 100;
}

/** 7단계 우측 — 식사 사진 (6에 잘못 묶여 있던 BG) */
export const UX2_STEP7_RIGHT_BG = UX2_DINNER_PHOTO_BG;

/** Figma [50:465](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-465) — always ask video 블롭 */
export const STEP7_RIGHT_ICON_BLOB = {
  centerX: 84 + 275.75 / 2,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

/** Figma 50:491 — 프레임 대비 사진 (~2013×1963 on ~1873) */
export const STEP7_RIGHT_BG_IMAGE_SCALE = 1.04;