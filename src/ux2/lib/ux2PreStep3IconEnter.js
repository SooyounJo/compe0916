/** -3 좌 arc — 좌→우 순차 opacity·blur */
export const UX2_PRE_STEP3_ICON_ORDER = [
  "edit",
  "gallery",
  "video",
  "people",
];

export const UX2_PRE_STEP3_ICON_BASE_S = 0.12;
export const UX2_PRE_STEP3_ICON_STAGGER_S = 0.16;
export const UX2_PRE_STEP3_ICON_DURATION_S = 0.72;

export function ux2PreStep3IconEnterDelayS(iconId) {
  const index = UX2_PRE_STEP3_ICON_ORDER.indexOf(iconId);
  if (index < 0) {
    return 0;
  }
  return UX2_PRE_STEP3_ICON_BASE_S + index * UX2_PRE_STEP3_ICON_STAGGER_S;
}

/** Figma 12:303 — 보이스 슬롯(3시) 인터넷 검색, arc people과 동시 */
export function ux2PreStep3SearchAtVoiceDelayS() {
  return ux2PreStep3IconEnterDelayS("people");
}
