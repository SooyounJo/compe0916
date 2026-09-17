/** -1 — night → 0단계 BG 변환 */
export const UX2_PRE_STEP1_BG_MOTION_PACE = 3.25;

/** -1 진입 — night 유지 후 handoff 시작 */
export const UX2_PRE_STEP_NIGHT_HOLD_MS = Math.round(
  380 * UX2_PRE_STEP1_BG_MOTION_PACE,
);

/** night 레이어 opacity out — 이미지 교체 구간 (짧게) */
export const UX2_PRE_STEP_NIGHT_OPACITY_FADE_MS = Math.round(
  520 * UX2_PRE_STEP1_BG_MOTION_PACE,
);

/** step1-right-bg opacity in */
export const UX2_PRE_STEP1_BG_OPACITY_IN_MS = Math.round(
  160 * UX2_PRE_STEP1_BG_MOTION_PACE,
);

/** step1-right-bg blur out — 선명해지는 구간 (길게) */
export const UX2_PRE_STEP1_BG_BLUR_OUT_MS = Math.round(
  1180 * UX2_PRE_STEP1_BG_MOTION_PACE,
);

/** handoff·autoplay — night opacity vs BG blur 중 긴 쪽 */
export function ux2PreStep1HandoffVisualEndMs() {
  return (
    UX2_PRE_STEP_NIGHT_HOLD_MS +
    Math.max(
      UX2_PRE_STEP_NIGHT_OPACITY_FADE_MS,
      UX2_PRE_STEP1_BG_BLUR_OUT_MS,
    )
  );
}

/** @deprecated — night opacity fade (기존 import 호환) */
export const UX2_PRE_STEP_NIGHT_FADE_MS = UX2_PRE_STEP_NIGHT_OPACITY_FADE_MS;

/** 일반 step1 BG crossfade */
export const UX2_PRE_STEP1_BG_CROSSFADE_MS = UX2_PRE_STEP1_BG_BLUR_OUT_MS;
