/** Figma 78:190 / 8:252 — rim arc 진입, 우→좌 순차 */
export const UX2_STEP4_FOLLOW_ORDER = [
  "people",
  "video",
  "gallery",
  "bookmark",
  "edit",
];

/** globals left-icon-arc-enter 와 동일 */
export const UX2_STEP4_ENTRY_BASE_S = 0.04;
export const UX2_STEP4_FOLLOW_STAGGER_S = 0.11;
export const UX2_STEP4_ENTER_DURATION_S = 1.45;

export function ux2Step4EnterDelayS(iconId) {
  const index = UX2_STEP4_FOLLOW_ORDER.indexOf(iconId);
  if (index < 0) {
    return 0;
  }
  return index * UX2_STEP4_FOLLOW_STAGGER_S;
}
