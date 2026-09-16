/** 4단계 arc 진입 — 리마운트·Strict Mode에서도 1회만 재생 */
let enterCycleId = 0;
let enterPlayedForCycle = -1;

export function resetLeftOrbitEnterLatch() {
  enterCycleId += 1;
  enterPlayedForCycle = -1;
}

export function shouldPlayLeftOrbitEnter(step) {
  if (step < 4) {
    resetLeftOrbitEnterLatch();
    return false;
  }
  if (step > 4) return false;
  return enterPlayedForCycle !== enterCycleId;
}

export function markLeftOrbitEnterPlayed() {
  enterPlayedForCycle = enterCycleId;
}
