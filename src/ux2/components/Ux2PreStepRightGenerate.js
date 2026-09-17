"use client";

import { useLayoutEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import { UX2_PRE_STEP_FIRST } from "@/ux2/lib/ux2FlowSteps";
import { ux2PreStep4To3EnterStartMs } from "@/ux2/lib/ux2PreStep4To3Exit";
import {
  UX2_PRE_STEP2_GENERATE_EXIT_MS,
  ux2PreStep2GenerateExitHoldMs,
} from "@/ux2/lib/ux2PreStep2GenerateExit";
import { useUx2PreStep4ExitFade } from "@/ux2/lib/useUx2PreStep4ExitFade";
import generateExitStyles from "@/ux2/styles/ux2PreStep2GenerateExit.module.css";
import Ux2PreStepGenerateDots from "@/ux2/components/Ux2PreStepGenerateDots";
import { UX2_PRE_STEP_NIGHT_VIDEO } from "@/ux2/components/Ux2PreStepRightBackground";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import { PRE_STEP_RIGHT_4_PROMPT } from "@/ux2/lib/ux2PreStepRightLayout";
import styles from "@/ux2/styles/ux2PreStepRightGenerate.module.css";

const BLURRED_PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #efe5a9 0%, #ffffff 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** -4~-2 우측 — night 영상 + 닷 그리드 generate (스텝 간 유지) */
export default function Ux2PreStepRightGenerate({ step = 0 }) {
  const prevStepRef = useRef(null);
  const sceneHoldTimerRef = useRef(null);
  const minus1ExitTimerRef = useRef(null);
  const [sceneStep, setSceneStep] = useState(step);
  const [holdMinus1Exit, setHoldMinus1Exit] = useState(false);

  const exitingToMinus1 = holdMinus1Exit && step === -1;
  const minus1ExitFadeOut = useUx2PreStep4ExitFade(exitingToMinus1);

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (sceneHoldTimerRef.current) {
      clearTimeout(sceneHoldTimerRef.current);
      sceneHoldTimerRef.current = null;
    }

    if (prev === -2 && step === -1) {
      setHoldMinus1Exit(true);
      if (minus1ExitTimerRef.current) {
        clearTimeout(minus1ExitTimerRef.current);
      }
      minus1ExitTimerRef.current = setTimeout(() => {
        minus1ExitTimerRef.current = null;
        setHoldMinus1Exit(false);
      }, ux2PreStep2GenerateExitHoldMs());
      return () => {
        if (minus1ExitTimerRef.current) {
          clearTimeout(minus1ExitTimerRef.current);
          minus1ExitTimerRef.current = null;
        }
      };
    }

    if (step !== -1) {
      setHoldMinus1Exit(false);
    }

    if (prev === UX2_PRE_STEP_FIRST && step === -3) {
      setSceneStep(UX2_PRE_STEP_FIRST);
      sceneHoldTimerRef.current = setTimeout(() => {
        sceneHoldTimerRef.current = null;
        setSceneStep(-3);
      }, ux2PreStep4To3EnterStartMs());
      return () => {
        if (sceneHoldTimerRef.current) {
          clearTimeout(sceneHoldTimerRef.current);
          sceneHoldTimerRef.current = null;
        }
      };
    }

    setSceneStep(step);
    return undefined;
  }, [step]);

  const showLayer = (step >= -4 && step <= -2) || exitingToMinus1;
  if (!showLayer) {
    return null;
  }

  const renderStep = exitingToMinus1 ? -2 : step;
  const sceneClass =
    sceneStep === -4
      ? styles.sceneStep4
      : sceneStep === -3
        ? styles.sceneStep3
        : styles.sceneStep2;

  const rootClass =
    "left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full";

  const inner = (
    <div className={`${styles.root} absolute inset-0`}>
      <div
        className={`${styles.scene} ${sceneClass} absolute inset-0 ${
          exitingToMinus1 ? generateExitStyles.generateSceneUnblur : ""
        }`}
        style={
          exitingToMinus1
            ? {
                "--ux2-pre2-gen-exit-ms": `${UX2_PRE_STEP2_GENERATE_EXIT_MS}ms`,
              }
            : undefined
        }
      >
        <video
          src={UX2_PRE_STEP_NIGHT_VIDEO}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        />
      </div>

      <Ux2PreStepGenerateDots step={renderStep} className="z-[3]" />

      {renderStep === -2 ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`${styles.blurredPrompt} font-doto absolute left-1/2 w-full max-w-[92%] -translate-x-1/2 text-center text-[4.79cqw] font-extrabold leading-none tracking-[-0.02em]`}
            style={{
              top: `${pctCircleRight(PRE_STEP_RIGHT_4_PROMPT.top)}%`,
              ...BLURRED_PROMPT_STYLE,
            }}
          >
            <p className="mb-0 whitespace-nowrap">About Wine,</p>
            <p className="whitespace-nowrap">Our Memories</p>
          </div>
        </div>
      ) : null}
    </div>
  );

  if (exitingToMinus1) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full ${generateExitStyles.generateExitLayer} ${
          minus1ExitFadeOut ? generateExitStyles.generateExitLayerOut : ""
        }`}
        style={{
          "--ux2-pre2-gen-exit-ms": `${UX2_PRE_STEP2_GENERATE_EXIT_MS}ms`,
        }}
        aria-hidden={false}
      >
        {inner}
      </div>
    );
  }

  return (
    <BlurFade show={step >= -4 && step <= -2} className={rootClass}>
      {inner}
    </BlurFade>
  );
}
