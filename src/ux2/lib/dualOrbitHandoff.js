/** 4→5 한 흐름 — rim 이탈 → S자 gap → 우측 진입 */
export const HANDOFF_ANIM_S = 2.1;
export const HANDOFF_EASE = "cubic-bezier(0.33, 0, 0.15, 1)";

const EXIT_AT_S = {
  people: 0.2,
  burger: 0.42,
};

const RELOCATE_AT_S = {
  moon: 0.22,
  calendar: 0.36,
  cocktail: 0.5,
};

/** 좌 이탈 seam(≈82%) 직전 우 진입 — 정착은 Figma inset 그대로 */
const RIGHT_ENTER_AT_S = {
  burger: 1.05,
  music: 1.28,
};

export function handoffExitDelay(iconId) {
  return EXIT_AT_S[iconId] ?? 0;
}

export function handoffRelocateDelay(iconId) {
  return RELOCATE_AT_S[iconId] ?? 0;
}

export const RIGHT_STEP5_HANDOFF = [
  { id: "burger", delayS: RIGHT_ENTER_AT_S.burger },
  { id: "music", delayS: RIGHT_ENTER_AT_S.music },
];

export function handoffRightEnterDelay(iconId) {
  return RIGHT_ENTER_AT_S[iconId] ?? 0.6;
}

/** 우 와인·좌 보이스 morph — burger handoff 슬롯 근처 */
export const STEP5_WINE_SETTLE_DELAY_S =
  RIGHT_ENTER_AT_S.burger + HANDOFF_ANIM_S * 0.78;
export const STEP5_WINE_SETTLE_DURATION_S = 1;
export const STEP5_LEFT_VOICE_MORPH_DELAY_S =
  STEP5_WINE_SETTLE_DELAY_S + STEP5_WINE_SETTLE_DURATION_S + 0.08;
export const STEP5_LEFT_VOICE_MORPH_DURATION_S = 1.2;
