/** UX2 상단 단계 버튼 · 자동 재생 범위 */
export const UX2_FIRST_STEP = -4;
export const UX2_LAST_STEP = 11;

export const UX2_NAV_STEPS = Array.from(
  { length: UX2_LAST_STEP - UX2_FIRST_STEP + 1 },
  (_, i) => UX2_FIRST_STEP + i,
);

export function ux2IsPreStep(step) {
  return step >= UX2_FIRST_STEP && step <= -1;
}
