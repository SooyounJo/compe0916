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

/** 7단계 우측 — 루프 배경 영상 */
export const UX2_STEP7_RIGHT_BG_VIDEO = "/video/ux2-step7-right-bg.mp4";

/** 7단계 진입 — BG 블러 서서히 해제 */
export const STEP7_RIGHT_BG_BLUR_START_PX = 14;
export const STEP7_RIGHT_BG_BLUR_END_PX = 0;
export const STEP7_RIGHT_BG_BLUR_CLEAR_MS = 3200;

/** Figma [50:465](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-465) — always ask video 블롭 */
export const STEP7_RIGHT_ICON_BLOB = {
  centerX: 84 + 275.75 / 2,
  centerY: 809 + 275.75 / 2,
  size: 275.75,
};

/** 7단계 — 카메라 글리프 #FFFFFF */
export const UX2_STEP7_VIDEO_BLOB_WHITE =
  "/figma/ux2/step7/video-blob-white.svg";

/** Figma 50:491 — 프레임 대비 사진 (~2013×1963 on ~1873) */
export const STEP7_RIGHT_BG_IMAGE_SCALE = 1.04;

/** Figma [8:393](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-393) — 8:408 QR (F0_RIGHT) */
const CX7 = F / 2;

export const STEP7_RIGHT_QR_BLOB = {
  centerX: CX7 + 601.49,
  centerY: 1155 + 258.482 / 2,
  size: 258.482,
};

export const UX2_STEP7_QR_BLOB_SRC = "/figma/ux2/step7/qr-blob.svg";

/** 7단계 우측 — QR 글리프 #FFFFFF (video-blob-white와 동일) */
export const UX2_STEP7_QR_BLOB_WHITE =
  "/figma/ux2/step7/qr-blob-white.svg";