import { useCallback, useEffect, useState } from "react";
import DualBlobStage from "@/ux2/components/DualBlobStage";
import ScreenNav from "@/ux2/components/ScreenNav";
import { UX2_FIRST_STEP, UX2_LAST_STEP } from "@/ux2/lib/ux2FlowSteps";

/** 시작(자동 재생) — 단계당 체류 (수동 단계 버튼과 무관) */
const AUTO_PLAY_PACE = 1.4;
const DEFAULT_STEP_MS = Math.round(3000 * AUTO_PLAY_PACE);
const GATHER_MS = Math.round(1000 * AUTO_PLAY_PACE);
/** step 4 진입 후 cluster GONE(1.2s)과 맞춤 */
const GATHER_RELEASE_MS = 1280;
const FIRST_STEP = UX2_FIRST_STEP;
const LAST_STEP = UX2_LAST_STEP;

const STEP_DWELL_MS = {
  [-1]: Math.round(3600 * AUTO_PLAY_PACE),
  0: DEFAULT_STEP_MS,
  1: DEFAULT_STEP_MS,
  /** 2 — 피드·캐러셀·중앙 영상 재생 여유 */
  2: Math.round(4400 * AUTO_PLAY_PACE),
  3: DEFAULT_STEP_MS,
  4: Math.round(3200 * AUTO_PLAY_PACE),
  5: Math.round(5800 * AUTO_PLAY_PACE),
};

function dwellMsForStep(step) {
  return STEP_DWELL_MS[step] ?? DEFAULT_STEP_MS;
}

/** UX2 — -4~11단계 (UX1과 분리된 복사본 트리) */
export default function DualBlobExperience() {
  const [activeStep, setActiveStep] = useState(UX2_FIRST_STEP);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dotsGathering, setDotsGathering] = useState(false);

  const advanceFromStep3 = useCallback(() => {
    setActiveStep(4);
    setTimeout(() => setDotsGathering(false), GATHER_RELEASE_MS);
  }, []);

  const handleSelectStep = useCallback(
    (step) => {
      setIsPlaying(false);
      if (step === 4 && activeStep === 3) {
        setDotsGathering(true);
        setTimeout(advanceFromStep3, GATHER_MS);
        return;
      }
      setDotsGathering(false);
      setActiveStep(step);
    },
    [activeStep, advanceFromStep3],
  );

  const handleStart = useCallback(() => {
    setDotsGathering(false);
    setActiveStep(FIRST_STEP);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    if (activeStep >= LAST_STEP) {
      setIsPlaying(false);
      return;
    }

    if (activeStep === 3) {
      const step3Ms = dwellMsForStep(3);
      const gatherTimer = setTimeout(
        () => setDotsGathering(true),
        step3Ms - GATHER_MS,
      );
      const nextTimer = setTimeout(advanceFromStep3, step3Ms);
      return () => {
        clearTimeout(gatherTimer);
        clearTimeout(nextTimer);
      };
    }

    if (activeStep === 4 || activeStep === 5) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => Math.min(prev + 1, LAST_STEP));
      }, dwellMsForStep(activeStep));
      return () => clearTimeout(timer);
    }

    setDotsGathering(false);
    const timer = setTimeout(() => {
      setActiveStep((prev) => Math.min(prev + 1, LAST_STEP));
    }, dwellMsForStep(activeStep));

    return () => clearTimeout(timer);
  }, [isPlaying, activeStep, advanceFromStep3]);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-black pt-16"
      data-ux="2"
    >
      <button
        type="button"
        onClick={handleStart}
        disabled={isPlaying}
        className="fixed right-4 top-4 z-[60] rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#383645] shadow-md transition-opacity hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isPlaying ? "재생 중…" : "시작"}
      </button>

      <ScreenNav activeStep={activeStep} onSelect={handleSelectStep} />
      <main className="flex w-full min-w-0 flex-1 items-center justify-center overflow-x-auto px-2 sm:px-4">
        <DualBlobStage step={activeStep} dotsGathering={dotsGathering} />
      </main>
    </div>
  );
}
