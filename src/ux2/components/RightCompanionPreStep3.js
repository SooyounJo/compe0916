"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2VoiceRecorderFill from "@/ux2/components/Ux2VoiceRecorderFill";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import {
  UX2_PRE_STEP3_RIGHT_TEXT_DURATION_S,
  ux2PreStep3RightTextEnterDelayS,
  ux2PreStep3SearchAtVoiceDelayS,
} from "@/ux2/lib/ux2PreStep3IconEnter";
import {
  PRE_STEP_RIGHT_3_TEXT,
  PRE_STEP_RIGHT_3_VOICE,
} from "@/ux2/lib/ux2PreStepRightLayout";
import { UX2_PRE_STEP_FIRST } from "@/ux2/lib/ux2FlowSteps";
import {
  UX2_PRE_STEP4_TO3_ENTER_MS,
  ux2PreStep4ExitBridging,
  ux2PreStep4To3EnterStartMs,
} from "@/ux2/lib/ux2PreStep4To3Exit";
import {
  UX2_PRE_STEP3_FOREGROUND_EXIT_MS,
  ux2PreStep3ForegroundExitHoldMs,
} from "@/ux2/lib/ux2PreStep3To2ForegroundExit";
import { useUx2PreStep4ExitFade } from "@/ux2/lib/useUx2PreStep4ExitFade";
import preStep4ExitStyles from "@/ux2/styles/ux2PreStep4To3Exit.module.css";
import styles from "@/ux2/styles/ux2PreStepRight3.module.css";

const TEXT_SHADOW = "0 4px 73px rgba(255,255,255,0.8)";

/** Figma [12:202](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-202) — 전경 */
export default function RightCompanionPreStep3({ step = 0 }) {
  const prevStepRef = useRef(null);
  const layerInTimerRef = useRef(null);
  const exitTo2TimerRef = useRef(null);
  const [searchBlobVisible, setSearchBlobVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [layerVisible, setLayerVisible] = useState(step === -3);
  const [holdExitTo2, setHoldExitTo2] = useState(false);
  const [sequentialEnter, setSequentialEnter] = useState(false);
  const [enterActive, setEnterActive] = useState(step === -3);

  const exitingToPreStep2 = holdExitTo2 && step === -2;
  const exitTo2FadeOut = useUx2PreStep4ExitFade(exitingToPreStep2);

  const pre4To3Bridging = ux2PreStep4ExitBridging(
    step,
    prevStepRef.current,
  );
  const sequentialLayer = sequentialEnter || pre4To3Bridging;

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (layerInTimerRef.current) {
      clearTimeout(layerInTimerRef.current);
      layerInTimerRef.current = null;
    }

    if (prev === UX2_PRE_STEP_FIRST && step === -3) {
      setSequentialEnter(true);
      setLayerVisible(false);
      setEnterActive(false);
      setHoldExitTo2(false);
      layerInTimerRef.current = setTimeout(() => {
        layerInTimerRef.current = null;
        setLayerVisible(true);
      }, ux2PreStep4To3EnterStartMs());
      return () => {
        if (layerInTimerRef.current) {
          clearTimeout(layerInTimerRef.current);
          layerInTimerRef.current = null;
        }
      };
    }

    if (prev === -3 && step === -2) {
      setHoldExitTo2(true);
      setSequentialEnter(false);
      setEnterActive(false);
      setLayerVisible(true);
      if (exitTo2TimerRef.current) {
        clearTimeout(exitTo2TimerRef.current);
      }
      exitTo2TimerRef.current = setTimeout(() => {
        exitTo2TimerRef.current = null;
        setHoldExitTo2(false);
        setLayerVisible(false);
      }, ux2PreStep3ForegroundExitHoldMs());
      return () => {
        if (exitTo2TimerRef.current) {
          clearTimeout(exitTo2TimerRef.current);
          exitTo2TimerRef.current = null;
        }
      };
    }

    if (step === -3) {
      setHoldExitTo2(false);
      if (prev !== UX2_PRE_STEP_FIRST) {
        setSequentialEnter(false);
        setEnterActive(true);
        setLayerVisible(true);
      }
    } else {
      setSequentialEnter(false);
      setEnterActive(false);
      if (!holdExitTo2 || step !== -2) {
        setLayerVisible(false);
      }
    }

    return undefined;
  }, [step, holdExitTo2]);

  useEffect(() => {
    if (!layerVisible || !sequentialLayer) {
      return undefined;
    }
    setEnterActive(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setEnterActive(true));
    });
    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [layerVisible, sequentialLayer]);

  useLayoutEffect(() => {
    if (exitingToPreStep2) {
      return undefined;
    }
    if (step !== -3 || !layerVisible) {
      setShowText(false);
      return undefined;
    }

    setShowText(false);
    const delayMs = ux2PreStep3RightTextEnterDelayS() * 1000;
    const timer = setTimeout(() => setShowText(true), delayMs);
    return () => clearTimeout(timer);
  }, [step, layerVisible, exitingToPreStep2]);

  useEffect(() => {
    if (exitingToPreStep2) {
      return undefined;
    }
    if (step !== -3 || !layerVisible) {
      setSearchBlobVisible(false);
      return undefined;
    }

    setSearchBlobVisible(false);
    const delayMs = ux2PreStep3SearchAtVoiceDelayS() * 1000;
    const timer = setTimeout(() => setSearchBlobVisible(true), delayMs);

    return () => clearTimeout(timer);
  }, [step, layerVisible, exitingToPreStep2]);

  const voiceSizePct = pctCircleRight(PRE_STEP_RIGHT_3_VOICE.size);
  const showVoice = step === -3 && !searchBlobVisible && !exitingToPreStep2;
  const displayText = showText || exitingToPreStep2;

  const layerClass =
    "left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[14] overflow-hidden";

  const layerBody = (
    <>
      <div className={`${styles.frost} absolute inset-0`} aria-hidden />

      {showVoice ? (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pctCircleRight(PRE_STEP_RIGHT_3_VOICE.centerX)}%`,
            top: `${pctCircleRight(PRE_STEP_RIGHT_3_VOICE.centerY)}%`,
            width: `${voiceSizePct}%`,
            height: `${voiceSizePct}%`,
          }}
        >
          <Ux2VoiceRecorderFill active glowVariant="slot" />
        </div>
      ) : null}

      {displayText ? (
        <div
          className={`${
            exitingToPreStep2 ? "" : styles.textReveal
          } font-doto absolute max-w-[72%] text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.02em] text-white`}
          style={{
            left: `${pctCircleRight(PRE_STEP_RIGHT_3_TEXT.left)}%`,
            top: `${pctCircleRight(PRE_STEP_RIGHT_3_TEXT.top)}%`,
            textShadow: TEXT_SHADOW,
            ...(exitingToPreStep2
              ? null
              : {
                  animationDuration: `${UX2_PRE_STEP3_RIGHT_TEXT_DURATION_S}s`,
                }),
          }}
        >
          <p className="mb-0 whitespace-pre">{`2022, Memories `}</p>
          <p className="whitespace-pre">of the Seven Sisters</p>
        </div>
      ) : null}
    </>
  );

  if (!layerVisible && !exitingToPreStep2) {
    return null;
  }

  if (exitingToPreStep2) {
    return (
      <div
        className={`${layerClass} ${preStep4ExitStyles.sceneExitLayer} ${
          exitTo2FadeOut ? preStep4ExitStyles.sceneExitLayerOut : ""
        }`}
        style={{
          "--ux2-pre4-exit-ms": `${UX2_PRE_STEP3_FOREGROUND_EXIT_MS}ms`,
        }}
        aria-hidden={false}
      >
        {layerBody}
      </div>
    );
  }

  if (sequentialLayer) {
    return (
      <div
        className={`${layerClass} ${preStep4ExitStyles.layerEnter} ${
          enterActive ? preStep4ExitStyles.layerEnterActive : ""
        }`}
        style={{ "--ux2-pre4-enter-ms": `${UX2_PRE_STEP4_TO3_ENTER_MS}ms` }}
      >
        {layerBody}
      </div>
    );
  }

  return (
    <BlurFade show className={layerClass}>
      {layerBody}
    </BlurFade>
  );
}
