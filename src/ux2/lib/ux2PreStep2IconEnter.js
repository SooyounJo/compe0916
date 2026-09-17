/** -2 — 좌 검색·인스타 → 우 검색·캘린더·갤러리 순차 opacity·blur */
export const UX2_PRE_STEP2_ICON_ORDER = [
  "left-search",
  "left-instagram",
  "right-search",
  "right-calendar",
  "right-gallery",
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
