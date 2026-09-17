/** -1 — night → 0단계 BG 변환 (매우 천천히) */
export const UX2_PRE_STEP1_BG_MOTION_PACE = 3.25;

/** -1 진입 — night 영상 유지 후 서서히 퇴장 */
export const UX2_PRE_STEP_NIGHT_HOLD_MS = Math.round(
  520 * UX2_PRE_STEP1_BG_MOTION_PACE,
);
export const UX2_PRE_STEP_NIGHT_FADE_MS = Math.round(
  2450 * UX2_PRE_STEP1_BG_MOTION_PACE,
);

/** -1 — step1-right-bg·좌 gradient와 night 퇴장 길이 맞춤 */
export const UX2_PRE_STEP1_BG_CROSSFADE_MS = UX2_PRE_STEP_NIGHT_FADE_MS;
