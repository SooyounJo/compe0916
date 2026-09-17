/** 8단계 좌 카피 blur-in (ux2Step1LeftTextIn.module.css) */
export const UX2_STEP8_LEFT_TEXT_REVEAL_MS = 880;

/** 8단계 — 좌 카피 후 우 「Easier saving」 */
export function ux2Step8RightTextDelayMs() {
  return UX2_STEP8_LEFT_TEXT_REVEAL_MS + 100;
}
