/** -4 → -3 — -4 전경 opacity 퇴장 후 -3 진입 (겹침 없음) */
export const UX2_PRE_STEP4_EXIT_MS = 880;

/** -4 퇴장 DOM hold (transition 여유) */
export const UX2_PRE_STEP4_EXIT_HOLD_MS = 100;

/** -4가 완전히 사라진 뒤 -3 레이어 시작 전 간격 */
export const UX2_PRE_STEP4_TO3_ENTER_GAP_MS = 140;

export const UX2_PRE_STEP4_TO3_ENTER_MS = 560;

export function ux2PreStep4ExitHoldMs() {
  return UX2_PRE_STEP4_EXIT_MS + UX2_PRE_STEP4_EXIT_HOLD_MS;
}

/** step -3 진입 시 -4→-3 전환: 이 시각 이후 -3 전경 fade-in */
export function ux2PreStep4To3EnterStartMs() {
  return ux2PreStep4ExitHoldMs() + UX2_PRE_STEP4_TO3_ENTER_GAP_MS;
}

/** @deprecated — 순차 전환 (겹침 없음) */
export const UX2_PRE_STEP4_TO3_OVERLAP_MS = ux2PreStep4To3EnterStartMs();
