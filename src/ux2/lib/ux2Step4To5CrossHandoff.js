import { F0 } from "@/ux2/lib/ux2Step0Layout";
import { ux2Ux1Step4IconExitEndS, ux2Ux1Step4To5ExitTotalS } from "@/ux2/lib/ux2Ux1Step45Timing";

/** 좌 4 arc → 우 5 슬롯 (Figma 8:164) — people·video만 */
export const UX2_CROSS_HANDOFF_IDS = ["people", "video"];

const LEFT_BY_ID = {
  people: { leftPct: (1373 + 296.673 / 2) / F0 * 100, topPct: (1150 + 296.673 / 2) / F0 * 100 },
  video: { leftPct: (1039 + 251.945 / 2) / F0 * 100, topPct: (1447 + 251.945 / 2) / F0 * 100 },
};

/** 좌 arc 전원 퇴장 완료 */
export function ux2Step5LeftExitCompleteS() {
  return ux2Ux1Step4To5ExitTotalS();
}

/** 좌 하단(video) 퇴장 완료 후 우 진입까지 */
export const UX2_STEP5_GAP_AFTER_LEFT_S = 0.12;

export function ux2Step5RightEnterBaseS() {
  return ux2Ux1Step4IconExitEndS("video") + UX2_STEP5_GAP_AFTER_LEFT_S;
}

/** 좌 cross — 살짝 우(duel gap) + 위로 사라짐 */
export function ux2Step4CrossExitStyleVars(iconId) {
  const row = LEFT_BY_ID[iconId];
  const towardSeam = row ? Math.min(14, Math.max(6, (104 - row.leftPct) * 0.35)) : 10;
  return {
    "--handoff-exit-dx": `${towardSeam.toFixed(1)}cqw`,
    "--handoff-exit-dy": "-30cqw",
  };
}

/** 우 rise — showRightIcons 시점 기준 stagger (people → video) */
export function ux2Step5RightRiseStaggerDelayS(iconId) {
  if (iconId === "video") {
    return 0.2;
  }
  return 0;
}

/** step 5 시작 기준 절대 시각 (링·레거시) */
export function ux2Step5RightRiseEnterDelayS(iconId) {
  return ux2Step5RightEnterBaseS() + ux2Step5RightRiseStaggerDelayS(iconId);
}

export function ux2Step5CenterRingEnterDelayS() {
  return ux2Step5RightRiseEnterDelayS("video") + 0.1;
}

/** 우 rise 진입 — 정착점 기준 아래(+dy)에서 올라옴 */
export function ux2Step5RightRiseEnterVars(iconId) {
  const riseFromDy = iconId === "video" ? "26cqw" : "20cqw";
  return {
    "--handoff-rise-from-dx": "0cqw",
    "--handoff-rise-from-dy": riseFromDy,
  };
}
