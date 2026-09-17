import { useCallback, useEffect, useState } from "react";
import DualBlobStage from "@/ux2/components/DualBlobStage";
import ScreenNav from "@/ux2/components/ScreenNav";
import {
  UX2_AUTO_PLAY_GATHER_MS,
  ux2AutoPlayDwellMs,
  ux2AutoPlayStep3AdvanceMs,
  ux2AutoPlayStep3GatherStartMs,
} from "@/ux2/lib/ux2AutoPlayDwell";
import {
  UX2_LAST_STEP,
  UX2_MINUS5_STEP,
  UX2_NAV_FIRST_STEP,
  UX2_PRE_STEP_FIRST,
} from "@/ux2/lib/ux2FlowSteps";

/** step 4 진입 후 cluster GONE(1.2s)과 맞춤 */
const GATHER_RELEASE_MS = 1280;
const FIRST_STEP = UX2_NAV_FIRST_STEP;
const LAST_STEP = UX2_LAST_STEP;

/** UX2 — -5~11단계 (UX1과 분리된 복사본 트리) */
export default function DualBlobExperience() {
  const [activeStep, setActiveStep] = useState(UX2_NAV_FIRST_STEP);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dotsGathering, setDotsGathering] = useState(false);
  const [minus5Exiting, setMinus5Exiting] = useState(false);
  const [minus5HandoffShell, setMinus5HandoffShell] = useState(false);
  const [minus5HandoffSettled, setMinus5HandoffSettled] = useState(false);

  const beginMinus5ToMinus4 = useCallback(() => {
    setMinus5HandoffShell(true);
    setMinus5Exiting(true);
  }, []);

  const handleMinus5ExitComplete = useCallback(() => {
    setMinus5Exiting(false);
    setMinus5HandoffShell(false);
    setMinus5HandoffSettled(true);
    setActiveStep(UX2_PRE_STEP_FIRST);
  }, []);

  const advanceFromStep3 = useCallback(() => {
    setActiveStep(4);
    setTimeout(() => setDotsGathering(false), GATHER_RELEASE_MS);
  }, []);

  const handleSelectStep = useCallback(
    (step) => {
      setIsPlaying(false);
      if (step === 4 && activeStep === 3) {
        setDotsGathering(true);
        setTimeout(advanceFromStep3, UX2_AUTO_PLAY_GATHER_MS);
        return;
      }
      setDotsGathering(false);
      if (activeStep === UX2_MINUS5_STEP && step === UX2_PRE_STEP_FIRST) {
        if (!minus5Exiting) beginMinus5ToMinus4();
        return;
      }
      setMinus5Exiting(false);
      setMinus5HandoffShell(false);
      setMinus5HandoffSettled(false);
      setActiveStep(step);
    },
    [activeStep, advanceFromStep3, beginMinus5ToMinus4, minus5Exiting],
  );

  const handleStart = useCallback(() => {
    setDotsGathering(false);
    setMinus5Exiting(false);
    setMinus5HandoffShell(false);
    setMinus5HandoffSettled(false);
    setActiveStep(FIRST_STEP);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (activeStep !== UX2_PRE_STEP_FIRST) {
      setMinus5HandoffSettled(false);
    }
  }, [activeStep]);

  useEffect(() => {
    if (!isPlaying) return;

    if (minus5Exiting) return;

    if (activeStep >= LAST_STEP) {
      setIsPlaying(false);
      return;
    }

    if (activeStep === UX2_MINUS5_STEP) {
      const timer = setTimeout(
        beginMinus5ToMinus4,
        ux2AutoPlayDwellMs(UX2_MINUS5_STEP),
      );
      return () => clearTimeout(timer);
    }

    if (activeStep === 3) {
      const gatherTimer = setTimeout(
        () => setDotsGathering(true),
        ux2AutoPlayStep3GatherStartMs(),
      );
      const nextTimer = setTimeout(
        advanceFromStep3,
        ux2AutoPlayStep3AdvanceMs(),
      );
      return () => {
        clearTimeout(gatherTimer);
        clearTimeout(nextTimer);
      };
    }

    if (activeStep === 4 || activeStep === 5) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => Math.min(prev + 1, LAST_STEP));
      }, ux2AutoPlayDwellMs(activeStep));
      return () => clearTimeout(timer);
    }

    setDotsGathering(false);
    const timer = setTimeout(() => {
      setActiveStep((prev) => Math.min(prev + 1, LAST_STEP));
    }, ux2AutoPlayDwellMs(activeStep));

    return () => clearTimeout(timer);
  }, [
    isPlaying,
    activeStep,
    advanceFromStep3,
    beginMinus5ToMinus4,
    minus5Exiting,
  ]);

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
        <DualBlobStage
          step={activeStep}
          dotsGathering={dotsGathering}
          minus5Exiting={minus5Exiting}
          minus5HandoffShell={minus5HandoffShell}
          minus5HandoffSettled={minus5HandoffSettled}
          onMinus5ExitComplete={handleMinus5ExitComplete}
        />
      </main>
    </div>
  );
}
