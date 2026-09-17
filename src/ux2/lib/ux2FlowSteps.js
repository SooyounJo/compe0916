/** UX2 상단 단계 버튼 · 자동 재생 범위 */
export const UX2_MINUS5_STEP = -5;
export const UX2_PRE_STEP_FIRST = -4;
export const UX2_NAV_FIRST_STEP = UX2_MINUS5_STEP;
export const UX2_LAST_STEP = 11;

/** @deprecated pre-step 하한 — UX2_PRE_STEP_FIRST 사용 */
export const UX2_FIRST_STEP = UX2_PRE_STEP_FIRST;

export const UX2_NAV_STEPS = Array.from(
  { length: UX2_LAST_STEP - UX2_NAV_FIRST_STEP + 1 },
  (_, i) => UX2_NAV_FIRST_STEP + i,
);

export function ux2IsMinus5(step) {
  return step === UX2_MINUS5_STEP;
}

export function ux2IsPreStep(step) {
  return step >= UX2_PRE_STEP_FIRST && step <= -1;
}
