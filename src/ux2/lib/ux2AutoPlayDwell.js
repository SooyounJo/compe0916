import { ux2PreStep1HandoffVisualEndMs } from "@/ux2/lib/ux2PreStepRightEnter";
import {
  ux2PreStep2AllBlobsEnterEndS,
} from "@/ux2/lib/ux2PreStep2BlobEnter";
import {
  UX2_PRE_STEP3_ICON_DURATION_S,
  UX2_PRE_STEP3_RIGHT_TEXT_DURATION_S,
  ux2PreStep3IconEnterDelayS,
  ux2PreStep3RightTextEnterDelayS,
  ux2PreStep3SearchAtVoiceDelayS,
} from "@/ux2/lib/ux2PreStep3IconEnter";
import { ux2Step4RightVoiceHideDelayS } from "@/ux2/lib/ux2Step45DualTiming";
import {
  STEP0_ICON_HANDOFF_MS,
  STEP0_TEXT_HANDOFF_MS,
} from "@/ux2/lib/ux2Step0Layout";
import {
  ux2Step1RightIntroEndMs,
  ux2Step2RightMorphDelayMs,
} from "@/ux2/lib/ux2Step1To2Morph";
import { ux2Step5RightPromptDelayMs } from "@/ux2/lib/ux2Step5RightEnter";
import { ux2Step6LeftQrBlurEnterDelayS } from "@/ux2/lib/ux2Step6LeftEnter";
import { STEP7_RIGHT_BG_BLUR_CLEAR_MS } from "@/ux2/lib/ux2Step7RightLayout";
import { ux2Step8RightTextDelayMs } from "@/ux2/lib/ux2Step8CopyTiming";
import { UX2_STEP9_RIGHT_LOADING_BEFORE_CARD_MS } from "@/ux2/lib/ux2Step9RightEnter";
import { UX2_STEP910_CARD_CROSSFADE_MS } from "@/ux2/lib/ux2Step910Crossfade";
import { UX2_MINUS5_STEP } from "@/ux2/lib/ux2FlowSteps";

/** 3→4 — 중앙 닷 gather (CircleUI CENTER_CLUSTER_GATHER) */
export const UX2_AUTO_PLAY_GATHER_MS = 1000;

/**
 * 자동 재생 — 단계별 총 체류(다음 단계로 넘기기까지, ms)
 * UX2 녹화 구간 1~16 → step −5 … 10 (11은 종료 화면)
 *
 * | 구간 | step | 구간 길이 |
 * |------|------|-----------|
 * | 1 | −5 | 2.70s |
 * | 2 | −4 | 5.82s |
 * | 3 | −3 | 8.04s |
 * | 4 | −2 | 4.64s (−0.5s) |
 * | 5 | −1 | 9.70s |
 * | 6 | 0 | 6.30s |
 * | 7 | 1 | 5.46s |
 * | 8 | 2 | 12.63s |
 * | 9 | 3 | 5.72s (gather 1s 포함) |
 * | 10 | 4 | 7.95s |
 * | 11 | 5 | 7.16s |
 * | 12 | 6 | 6.05s |
 * | 13 | 7 | 5.66s |
 * | 14 | 8 | 3.75s |
 * | 15 | 9 | 5.10s |
 * | 16 | 10 | 4.05s |
 */
export const UX2_AUTO_PLAY_STEP_TOTAL_MS = {
  [UX2_MINUS5_STEP]: 2700,
  [-4]: 5820,
  [-3]: 8040,
  [-2]: 4640,
  [-1]: 9700,
  0: 6300,
  1: 5460,
  2: 12630,
  3: 5720,
  4: 7950,
  5: 7160,
  6: 6050,
  7: 5660,
  8: 3750,
  9: 5100,
  10: 4050,
};

/** @deprecated 모션+1초 방식 — 미배정 step 폴백용 */
export const UX2_AUTO_PLAY_HOLD_AFTER_ANIM_MS = 1000;

const UI_BLUR_FADE_MS = 1000;
const LEFT_STEP4_SCENE_MS = 550;
const PRE_STEP4_PROMPT_MS = 880;
const STEP5_PROMPT_BLUR_MS = 880;
const STEP6_QR_BLUR_MS = 1000;
const STEP8_RIGHT_TEXT_MS = 880;
const STEP9_CARD_SLIDE_MS = 1350;

/** RightCompanionStep1To2 — 3단계 피드 퇴장 후 오버레이 */
const STEP3_FEED_EXIT_DELAY_MS = 140;
const STEP3_EXIT_STAGGER_MS = 540;
const STEP3_CARD_EXIT_MS = 1320;
const STEP3_OVERLAY_IN_MS =
  STEP3_FEED_EXIT_DELAY_MS +
  STEP3_EXIT_STAGGER_MS * 2 +
  STEP3_CARD_EXIT_MS +
  80;

const STEP2_HERO_VIDEO_DELAY_MS = 2000;
const STEP2_CAROUSEL_AFTER_VIDEO_MS = 3600;

function ux2PreStep3EnterEndMs() {
  const searchEnd =
    (ux2PreStep3SearchAtVoiceDelayS() + UX2_PRE_STEP3_ICON_DURATION_S) * 1000;
  const textEnd =
    (ux2PreStep3RightTextEnterDelayS() +
      UX2_PRE_STEP3_RIGHT_TEXT_DURATION_S) *
    1000;
  const arcEnd =
    (ux2PreStep3IconEnterDelayS("edit") + UX2_PRE_STEP3_ICON_DURATION_S) *
    1000;
  return Math.max(searchEnd, textEnd, arcEnd);
}

function ux2PreStep4EnterEndMs() {
  return LEFT_STEP4_SCENE_MS + PRE_STEP4_PROMPT_MS + 80;
}

function ux2Step2EnterEndMs() {
  return (
    ux2Step2RightMorphDelayMs() +
    STEP2_HERO_VIDEO_DELAY_MS +
    STEP2_CAROUSEL_AFTER_VIDEO_MS * 2 +
    320
  );
}

function ux2Step3EnterEndMs() {
  return STEP3_OVERLAY_IN_MS + UI_BLUR_FADE_MS;
}

function ux2Step4EnterEndMs() {
  return Math.round(ux2Step4RightVoiceHideDelayS() * 1000) + 420;
}

function ux2Step6EnterEndMs() {
  return Math.round(ux2Step6LeftQrBlurEnterDelayS() * 1000) + STEP6_QR_BLUR_MS;
}

/** 단계 진입 후 “마지막” 모션이 끝나는 시각(ms) — step 변경 t=0 */
export function ux2AutoPlayAnimEndMs(step) {
  switch (step) {
    case UX2_MINUS5_STEP:
      return 1500;
    case -4:
      return ux2PreStep4EnterEndMs();
    case -3:
      return ux2PreStep3EnterEndMs();
    case -2:
      return Math.round(ux2PreStep2AllBlobsEnterEndS() * 1000);
    case -1:
      return ux2PreStep1HandoffVisualEndMs();
    case 0:
      return STEP0_TEXT_HANDOFF_MS + STEP0_ICON_HANDOFF_MS;
    case 1:
      return ux2Step1RightIntroEndMs();
    case 2:
      return ux2Step2EnterEndMs();
    case 3:
      return ux2Step3EnterEndMs();
    case 4:
      return ux2Step4EnterEndMs();
    case 5:
      return ux2Step5RightPromptDelayMs() + STEP5_PROMPT_BLUR_MS;
    case 6:
      return ux2Step6EnterEndMs();
    case 7:
      return STEP7_RIGHT_BG_BLUR_CLEAR_MS + 360;
    case 8:
      return ux2Step8RightTextDelayMs() + STEP8_RIGHT_TEXT_MS;
    case 9:
      return UX2_STEP9_RIGHT_LOADING_BEFORE_CARD_MS + STEP9_CARD_SLIDE_MS + 80;
    case 10:
      return UX2_STEP910_CARD_CROSSFADE_MS + 120;
    case 11:
      return 1600;
    default:
      return UI_BLUR_FADE_MS;
  }
}

/** 자동 재생 — 다음 단계로 넘기기 전 대기 (3단계는 gather 시작 시각) */
export function ux2AutoPlayDwellMs(step) {
  const total = UX2_AUTO_PLAY_STEP_TOTAL_MS[step];
  if (total != null) {
    if (step === 3) return total - UX2_AUTO_PLAY_GATHER_MS;
    return total;
  }
  return ux2AutoPlayAnimEndMs(step) + UX2_AUTO_PLAY_HOLD_AFTER_ANIM_MS;
}

/** 3단계 — gather 시작 */
export function ux2AutoPlayStep3GatherStartMs() {
  return ux2AutoPlayDwellMs(3);
}

/** 3단계 — 4로 advance (구간 9 총 길이) */
export function ux2AutoPlayStep3AdvanceMs() {
  return UX2_AUTO_PLAY_STEP_TOTAL_MS[3];
}
