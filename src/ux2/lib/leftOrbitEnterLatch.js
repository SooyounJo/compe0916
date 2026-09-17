/** UX2 — 4·5단계 arc 진입 1회 재생 래치 */
let enterCycleId = 0;
let enter4PlayedForCycle = -1;
let step5VisitId = 0;
let step5EnterPlayedForVisit = -1;

export function resetLeftOrbitEnterLatch() {
  enterCycleId += 1;
  enter4PlayedForCycle = -1;
}

export function shouldPlayLeftOrbitEnter(step) {
  if (step < 4) {
    resetLeftOrbitEnterLatch();
    return false;
  }
  if (step > 4) {
    return false;
  }
  return enter4PlayedForCycle !== enterCycleId;
}

export function bumpLeftOrbitEnterCycle() {
  enterCycleId += 1;
}

export function markLeftOrbitEnterPlayed() {
  enter4PlayedForCycle = enterCycleId;
}

export function shouldPlayLeftStep5Enter(step) {
  if (step !== 5) {
    return false;
  }
  return step5EnterPlayedForVisit !== step5VisitId;
}

export function markLeftStep5EnterPlayed() {
  step5EnterPlayedForVisit = step5VisitId;
}

export function notifyLeftStep5Enter() {
  step5VisitId += 1;
  step5EnterPlayedForVisit = -1;
}
