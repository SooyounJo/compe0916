/** Figma 78:190 — 5단계 좌측 3블롭 진입 순서(우→좌) */
export const UX2_STEP5_FOLLOW_ORDER = ["music", "calendar", "moon"];

export const UX2_STEP5_ENTRY_BASE_S = 0.28;
export const UX2_STEP5_FOLLOW_STAGGER_S = 0.17;

export function ux2Step5EnterDelayS(iconId) {
  const index = UX2_STEP5_FOLLOW_ORDER.indexOf(iconId);
  if (index < 0) {
    return 0;
  }
  return index * UX2_STEP5_FOLLOW_STAGGER_S;
}
