import { useCallback, useEffect, useState } from "react";
import DualBlobStage from "@/ux1/components/DualBlobStage";
import ScreenNav from "@/ux1/components/ScreenNav";
import { UX1_STEP4_DWELL_MS } from "@/ux1/lib/leftOrbitStep4";

const DEFAULT_STEP_MS = 3000;
const GATHER_MS = 1500;
const LAST_STEP = 6;

const STEP_DWELL_MS = {
  1: DEFAULT_STEP_MS,
  2: DEFAULT_STEP_MS,
  3: DEFAULT_STEP_MS,
  4: UX1_STEP4_DWELL_MS,
  5: 5800,
};

function dwellMsForStep(step) {
  return STEP_DWELL_MS[step] ?? DEFAULT_STEP_MS;
}

/** UX1 — 듀얼 블롭 6단계 (독립 컴포넌트 트리) */
export default function DualBlobExperience() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dotsGathering, setDotsGathering] = useState(false);

  const advanceFromStep3 = useCallback(() => {
    setActiveStep(4);
    setTimeout(() => setDotsGathering(false), 1100);
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
    setActiveStep(1);
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
      data-ux="1"
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
      <main className="flex w-full flex-1 items-center justify-center px-2 sm:px-4">
        <DualBlobStage step={activeStep} dotsGathering={dotsGathering} />
      </main>
    </div>
  );
}
