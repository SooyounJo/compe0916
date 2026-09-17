/** -2 — -3 검색 유지 → arc → 좌 검색 */
export const UX2_PRE_STEP2_ICON_ORDER = [
  "right-search",
  "right-gallery",
  "right-calendar",
  "left-search",
];

export const UX2_PRE_STEP2_ICON_BASE_S = 0.1;
export const UX2_PRE_STEP2_ICON_STAGGER_S = 0.14;
export const UX2_PRE_STEP2_ICON_DURATION_S = 0.72;

export function ux2PreStep2IconEnterDelayS(iconId) {
  const index = UX2_PRE_STEP2_ICON_ORDER.indexOf(iconId);
  if (index < 0) {
    return 0;
  }
  return UX2_PRE_STEP2_ICON_BASE_S + index * UX2_PRE_STEP2_ICON_STAGGER_S;
}
