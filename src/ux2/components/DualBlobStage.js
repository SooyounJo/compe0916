"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CircleUI from "@/ux2/components/CircleUI";
import CompanionLeftBlob from "@/ux2/components/CompanionLeftBlob";
import Ux2Minus5Stage from "@/ux2/minus5/Ux2Minus5Stage";
import {
  UX2_MINUS5_OVERLAY_DISSOLVE_MS,
} from "@/ux2/lib/ux2Minus5ToMinus4Exit";
import exitStyles from "@/ux2/styles/ux2Minus5ToMinus4Exit.module.css";
import {
  UX2_MINUS5_STEP,
  UX2_PRE_STEP_FIRST,
  ux2IsPreStep,
} from "@/ux2/lib/ux2FlowSteps";
import { Ux2PreStep1HandoffProvider } from "@/ux2/lib/ux2PreStep1Handoff";

const DUAL_MAIN_KEY = "ux2-dual-main";

export default function DualBlobStage({
  step = 1,
  dotsGathering = false,
  minus5Exiting = false,
  minus5HandoffShell = false,
  onMinus5ExitComplete,
}) {
  const [overlayDissolving, setOverlayDissolving] = useState(false);

  const minus5HandoffActive =
    step === UX2_MINUS5_STEP ||
    (step === UX2_PRE_STEP_FIRST && minus5HandoffShell);

  const dissolveTimerRef = useRef(null);

  const handleMorphEnd = useCallback(() => {
    setOverlayDissolving(true);

    if (dissolveTimerRef.current) clearTimeout(dissolveTimerRef.current);
    dissolveTimerRef.current = setTimeout(() => {
      dissolveTimerRef.current = null;
      setOverlayDissolving(false);
      onMinus5ExitComplete?.();
    }, UX2_MINUS5_OVERLAY_DISSOLVE_MS);
  }, [onMinus5ExitComplete]);

  useEffect(
    () => () => {
      if (dissolveTimerRef.current) clearTimeout(dissolveTimerRef.current);
    },
    [],
  );

  if (minus5HandoffActive) {
    const showMinus5Layer = step === UX2_MINUS5_STEP;
    const showOverlay =
      showMinus5Layer && (minus5Exiting || overlayDissolving);
    const revealUnderlay =
      showOverlay || (step === UX2_PRE_STEP_FIRST && minus5HandoffShell);
    const parkUnderlayForeground = showOverlay && !overlayDissolving;

    return (
      <div className="relative w-fit max-w-full">
        <div
          className={
            revealUnderlay
              ? ""
              : "pointer-events-none absolute inset-0 opacity-0 invisible"
          }
          aria-hidden={!revealUnderlay}
          style={{
            "--ux2-m5-dissolve-ms": `${UX2_MINUS5_OVERLAY_DISSOLVE_MS}ms`,
          }}
        >
          <DualBlobStageMain
            key={DUAL_MAIN_KEY}
            step={UX2_PRE_STEP_FIRST}
            dotsGathering={dotsGathering}
            preStep4TextReady={!parkUnderlayForeground}
            preStep4HandoffInstant={minus5HandoffShell}
            parkUnderlayForeground={parkUnderlayForeground}
          />
        </div>
        {showMinus5Layer ? (
          <div
            className={`${
              showOverlay
                ? "pointer-events-none absolute inset-0 z-[20]"
                : ""
            } ${
              overlayDissolving ? exitStyles.overlayShellDissolve : ""
            }`}
            style={{
              "--ux2-m5-dissolve-ms": `${UX2_MINUS5_OVERLAY_DISSOLVE_MS}ms`,
            }}
          >
            <Ux2Minus5Stage
              exiting={minus5Exiting}
              holdEndState={overlayDissolving}
              onExitComplete={handleMorphEnd}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <DualBlobStageMain
      step={step}
      dotsGathering={dotsGathering}
      preStep4TextReady={step === UX2_PRE_STEP_FIRST}
    />
  );
}

function DualBlobStageMain({
  step = 1,
  dotsGathering = false,
  preStep4TextReady = false,
  preStep4HandoffInstant = false,
  parkUnderlayForeground = false,
}) {
  const [igSlotReady, setIgSlotReady] = useState(false);

  useEffect(() => {
    if (ux2IsPreStep(step) || step === 0) {
      setIgSlotReady(false);
    } else if (step >= 1 && step <= 3) {
      setIgSlotReady(true);
    }
  }, [step]);

  const handleIgSlotReady = useCallback(() => {
    setIgSlotReady(true);
  }, []);

  const showIgPersist =
    !ux2IsPreStep(step) && step <= 2 && (step >= 1 || igSlotReady);

  const foregroundWrapClass = parkUnderlayForeground
    ? exitStyles.handoffForegroundParked
    : "";

  return (
    <Ux2PreStep1HandoffProvider step={step}>
      <div className="dual-blob-stage flex-nowrap">
        <CompanionLeftBlob
          step={step}
          dotsGathering={dotsGathering}
          className="dual-blob__size"
          showIgPersist={showIgPersist}
          onIgSlotReady={handleIgSlotReady}
          preStep4TextReady={preStep4TextReady}
          preStep4HandoffInstant={preStep4HandoffInstant}
          preStepForegroundWrapClass={foregroundWrapClass}
        />
        <div className="dual-blob__right dual-blob__size">
          <CircleUI
            step={step}
            dotsGathering={dotsGathering}
            dualRight
            rootClassName="!h-full !w-full !max-w-none"
            showIgPersist={showIgPersist}
            onIgSlotReady={handleIgSlotReady}
            preStep4TextReady={preStep4TextReady}
            preStep4HandoffInstant={preStep4HandoffInstant}
            preStepForegroundWrapClass={foregroundWrapClass}
          />
        </div>
      </div>
    </Ux2PreStep1HandoffProvider>
  );
}
