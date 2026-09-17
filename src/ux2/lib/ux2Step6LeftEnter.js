import {
  UX2_UX1_STEP4_ENTRY_STAGGER_S,
} from "@/ux2/lib/ux2Ux1Step45Timing";

/** 6단계 좌 — centerX 좌→右 (4단계 arc와 동일 stagger 간격) */
export const UX2_STEP6_LEFT_ENTER_ORDER = [
  "dots",
  "orbit_c",
  "orbit_a",
  "music",
];

export function ux2Step6LeftEnterDelayS(id) {
  const index = UX2_STEP6_LEFT_ENTER_ORDER.indexOf(id);
  if (index < 0) {
    return 0;
  }
  return index * UX2_UX1_STEP4_ENTRY_STAGGER_S;
}
