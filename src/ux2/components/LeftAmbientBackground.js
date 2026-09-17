"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import LeftCompanionAgentLayer from "@/ux2/components/LeftCompanionAgentLayer";
import LeftCompanionIconArc from "@/ux2/components/LeftCompanionIconArc";
import LeftCompanionPreStep, {
  LeftCompanionPreStepAmbient,
} from "@/ux2/components/LeftCompanionPreStep";
import { ux2IsPreStep } from "@/ux2/lib/ux2FlowSteps";
import LeftCompanionStep0 from "@/ux2/components/LeftCompanionStep0";
import LeftCompanionStep1 from "@/ux2/components/LeftCompanionStep1";
import LeftCompanionStep2 from "@/ux2/components/LeftCompanionStep2";
import LeftCompanionStep4 from "@/ux2/components/LeftCompanionStep4";
import LeftCompanionStep5 from "@/ux2/components/LeftCompanionStep5";
import LeftCompanionStep6 from "@/ux2/components/LeftCompanionStep6";
import LeftCompanionStep7 from "@/ux2/components/LeftCompanionStep7";
import LeftCompanionStep8 from "@/ux2/components/LeftCompanionStep8";
import LeftCompanionStep9 from "@/ux2/components/LeftCompanionStep9";
import Ux2InstagramIconPersist from "@/ux2/components/Ux2InstagramIconPersist";
import Ux2LeftPreStepSearchPersist from "@/ux2/components/Ux2LeftPreStepSearchPersist";
import Ux2VoiceIconAtSlot from "@/ux2/components/Ux2VoiceIconAtSlot";
import Ux2Step0IconMotion from "@/ux2/components/Ux2Step0IconMotion";
import Ux2LeftAmbientVideo from "@/ux2/components/Ux2LeftAmbientVideo";
import Ux2Step4IconPrefetch from "@/ux2/components/Ux2Step4IconPrefetch";
import step0EdgeGlow from "@/ux2/styles/ux2LeftStep0EdgeGlow.module.css";
import step7RightEdgeGlow from "@/ux2/styles/ux2LeftStep7RightEdgeGlow.module.css";
import { UX2_FIRST_STEP, UX2_LAST_STEP } from "@/ux2/lib/ux2FlowSteps";
import { ux2PreStep3ArcExitTotalMs } from "@/ux2/lib/ux2PreStep3IconEnter";
import {
  ux2PreStep3ForegroundExitHoldMs,
} from "@/ux2/lib/ux2PreStep3To2ForegroundExit";
import { useUx2PreStep4ExitFade } from "@/ux2/lib/useUx2PreStep4ExitFade";
import {
  UX2_PRE_STEP4_TO3_ENTER_MS,
  ux2PreStep4ExitBridging,
  ux2PreStep4To3EnterStartMs,
} from "@/ux2/lib/ux2PreStep4To3Exit";
import preStep4ExitStyles from "@/ux2/styles/ux2PreStep4To3Exit.module.css";
import { UX2_PRE_STEP_FIRST } from "@/ux2/lib/ux2FlowSteps";
import {
  centerOf,
  pctCircle,
  STEP0_INSTAGRAM_BLOB,
  STEP0_SEARCH_BLOB,
} from "@/ux2/lib/ux2Step0Layout";

const LEFT_BLOB_BG_STEP1 = "/figma/ux2/step1-left-bg.png";
const LEFT_BLOB_BG_FROM_STEP2 = "/figma/left-blob/ambient-bg.png";

const BG_CROSSFADE =
  "transition-opacity duration-[1200ms] ease-[cubic-bezier(0.33,0,0.15,1)]";

const SEARCH_SLOT = centerOf(STEP0_SEARCH_BLOB);
const IG_ORIGIN = centerOf(STEP0_INSTAGRAM_BLOB);
const LEFT_BLOB_CQW = pctCircle(STEP0_SEARCH_BLOB.size);
const AGENT_EXIT_HOLD_MS = 1250;

/** UX2 좌측 원 — 단계 UI는 BlurFade로 교차 (unmount 없음) */
export default function LeftAmbientBackground({
  step = 1,
  dotsGathering = false,
  showIgPersist = false,
  onIgSlotReady,
  preStep4TextReady = false,
  preStep4HandoffInstant = false,
  preStepForegroundWrapClass = "",
}) {
  const prevStepRef = useRef(null);
  const [holdAgentExit, setHoldAgentExit] = useState(false);
  const [preStep3ArcKey, setPreStep3ArcKey] = useState(0);
  const [holdPreStep3Arc, setHoldPreStep3Arc] = useState(step === -3);
  const [preStep3ForegroundIn, setPreStep3ForegroundIn] = useState(
    step === -3,
  );
  const [preStep3SequentialEnter, setPreStep3SequentialEnter] = useState(false);
  const [preStep3EnterActive, setPreStep3EnterActive] = useState(false);
  const [holdPreStep3ForegroundExit, setHoldPreStep3ForegroundExit] =
    useState(false);
  const preStep3InTimerRef = useRef(null);
  const arcExitTimerRef = useRef(null);
  const foregroundExitTimerRef = useRef(null);
  const agentExitTimerRef = useRef(null);

  const pre4To3Bridging = ux2PreStep4ExitBridging(
    step,
    prevStepRef.current,
  );
  const preStep3Sequential =
    preStep3SequentialEnter || pre4To3Bridging;

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (preStep3InTimerRef.current) {
      clearTimeout(preStep3InTimerRef.current);
      preStep3InTimerRef.current = null;
    }

    if (prev === UX2_PRE_STEP_FIRST && step === -3) {
      setPreStep3SequentialEnter(true);
      setPreStep3ForegroundIn(false);
      setPreStep3EnterActive(false);
      setPreStep3ArcKey((k) => k + 1);
      setHoldPreStep3Arc(true);
      preStep3InTimerRef.current = setTimeout(() => {
        preStep3InTimerRef.current = null;
        setPreStep3ForegroundIn(true);
      }, ux2PreStep4To3EnterStartMs());
    } else if (step === -3) {
      if (prev !== -3) {
        setPreStep3ArcKey((k) => k + 1);
        setHoldPreStep3Arc(true);
      }
      if (prev !== UX2_PRE_STEP_FIRST) {
        setPreStep3SequentialEnter(false);
        setPreStep3EnterActive(true);
        setPreStep3ForegroundIn(true);
      }
    } else {
      setPreStep3SequentialEnter(false);
      setPreStep3ForegroundIn(false);
      setPreStep3EnterActive(false);
      if (step < -3) {
        setHoldPreStep3Arc(false);
      }
    }

    if (prev === -3 && step === -2) {
      setHoldPreStep3Arc(true);
      setHoldPreStep3ForegroundExit(true);
      if (arcExitTimerRef.current) clearTimeout(arcExitTimerRef.current);
      arcExitTimerRef.current = setTimeout(() => {
        arcExitTimerRef.current = null;
        setHoldPreStep3Arc(false);
      }, ux2PreStep3ArcExitTotalMs());
      if (foregroundExitTimerRef.current) {
        clearTimeout(foregroundExitTimerRef.current);
      }
      foregroundExitTimerRef.current = setTimeout(() => {
        foregroundExitTimerRef.current = null;
        setHoldPreStep3ForegroundExit(false);
      }, ux2PreStep3ForegroundExitHoldMs());
    }

    if (prev === 3 && step === 4) {
      setHoldAgentExit(true);
      if (agentExitTimerRef.current) clearTimeout(agentExitTimerRef.current);
      agentExitTimerRef.current = setTimeout(() => {
        agentExitTimerRef.current = null;
        setHoldAgentExit(false);
      }, AGENT_EXIT_HOLD_MS);
    }
    if (step !== 4) {
      setHoldAgentExit(false);
    }

    return () => {
      if (preStep3InTimerRef.current) {
        clearTimeout(preStep3InTimerRef.current);
        preStep3InTimerRef.current = null;
      }
    };
  }, [step]);

  useEffect(
    () => () => {
      if (arcExitTimerRef.current) clearTimeout(arcExitTimerRef.current);
      if (foregroundExitTimerRef.current) {
        clearTimeout(foregroundExitTimerRef.current);
      }
      if (agentExitTimerRef.current) clearTimeout(agentExitTimerRef.current);
    },
    [],
  );

  const exitingPreStep3Foreground =
    holdPreStep3ForegroundExit && step === -2;
  const preStep3ForegroundExitFade = useUx2PreStep4ExitFade(
    exitingPreStep3Foreground,
  );

  useEffect(() => {
    if (!preStep3ForegroundIn || !preStep3Sequential) {
      return undefined;
    }
    setPreStep3EnterActive(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setPreStep3EnterActive(true));
    });
    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [preStep3ForegroundIn, preStep3Sequential]);

  const showAgentLayer =
    step === 3 || (dotsGathering && step <= 4) || holdAgentExit;
  const leftVideoBg = step >= 1 && step <= UX2_LAST_STEP;
  /** 1~2 좌측 원 연보라 rim · 3+ off (0→1은 crossfade로 서서히) */
  const showLavenderEdge = step === 1 || step === 2;
  const showStep7RightEdgeGold = step >= 7 && step <= 8;
  const showStep9RightEdgeLilac = step >= 9 && step <= UX2_LAST_STEP;
  const showIntroLeftPhoto = step === 0;
  const showPreStepLeftPhoto = ux2IsPreStep(step);

  return (
    <div
      className="left-ambient absolute inset-0 overflow-hidden rounded-full"
      data-step={step}
    >
      <Ux2LeftAmbientVideo step={step} />

      <Image
        src={LEFT_BLOB_BG_FROM_STEP2}
        alt=""
        fill
        className={`left-ambient__photo object-cover object-center ${BG_CROSSFADE} ${
          !leftVideoBg && step >= 2 && step < 7 ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 900px) 41vmin, 520px"
        priority={step >= 2 && !leftVideoBg}
      />
      <Image
        src={LEFT_BLOB_BG_STEP1}
        alt=""
        fill
        className={`left-ambient__photo object-cover object-center ${BG_CROSSFADE} ${
          showIntroLeftPhoto || showPreStepLeftPhoto ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 900px) 41vmin, 520px"
        priority={showIntroLeftPhoto || showPreStepLeftPhoto}
      />
      <div
        className={`${step0EdgeGlow.wrap} ${BG_CROSSFADE} ${
          showLavenderEdge ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <BlurFade
        show={showStep7RightEdgeGold}
        className={`${step7RightEdgeGlow.root} pointer-events-none absolute inset-0 z-[2]`}
        aria-hidden={!showStep7RightEdgeGold}
      >
        <div
          className={`${step7RightEdgeGlow.wrap} ${step7RightEdgeGlow.toneCbc495}`}
          aria-hidden
        >
          <div className={step7RightEdgeGlow.bloom} aria-hidden />
        </div>
      </BlurFade>

      <BlurFade
        show={showStep9RightEdgeLilac}
        className={`${step7RightEdgeGlow.root} pointer-events-none absolute inset-0 z-[2]`}
        aria-hidden={!showStep9RightEdgeLilac}
      >
        <div
          className={`${step7RightEdgeGlow.wrap} ${step7RightEdgeGlow.toneCaaedf}`}
          aria-hidden
        >
          <div className={step7RightEdgeGlow.bloom} aria-hidden />
        </div>
      </BlurFade>

      <Ux2Step0IconMotion
        show={step === 0}
        slotCenterX={SEARCH_SLOT.x}
        slotCenterY={SEARCH_SLOT.y}
        originCenterX={IG_ORIGIN.x}
        originCenterY={IG_ORIGIN.y}
        blobSizeCqw={LEFT_BLOB_CQW}
        toPct={pctCircle}
        onSettled={onIgSlotReady}
        handoffMode="rise"
        iconFillColor="#9A93AA"
        emphasized
      />
      <Ux2InstagramIconPersist
        show={showIgPersist}
        slotCenterX={SEARCH_SLOT.x}
        slotCenterY={SEARCH_SLOT.y}
        blobSizeCqw={LEFT_BLOB_CQW}
        toPct={pctCircle}
        iconFillColor="#9A93AA"
        emphasized
      />
      <Ux2VoiceIconAtSlot
        show={step === 3}
        slotCenterX={SEARCH_SLOT.x}
        slotCenterY={SEARCH_SLOT.y}
        iconSizeCqw={LEFT_BLOB_CQW * 0.58}
        toPct={pctCircle}
      />

      <Ux2LeftPreStepSearchPersist step={step} />
      <LeftCompanionPreStepAmbient
        show={step === -3 && preStep3ForegroundIn}
        exiting={exitingPreStep3Foreground}
        exitFadeOut={preStep3ForegroundExitFade}
        enterSoft={preStep3Sequential}
        enterActive={preStep3EnterActive}
      />
      {(step === -3 && preStep3ForegroundIn) || holdPreStep3Arc ? (
        preStep3Sequential && step === -3 ? (
          <div
            className={`pointer-events-none absolute inset-0 z-[6] overflow-hidden ${preStep4ExitStyles.layerEnter} ${
              preStep3EnterActive ? preStep4ExitStyles.layerEnterActive : ""
            }`}
            style={{ "--ux2-pre4-enter-ms": `${UX2_PRE_STEP4_TO3_ENTER_MS}ms` }}
          >
            <LeftCompanionIconArc
              key={`ux2-pre-step-3-arc-${preStep3ArcKey}`}
              step={-3}
            />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
            <LeftCompanionIconArc
              key={`ux2-pre-step-3-arc-${preStep3ArcKey}`}
              step={step === -3 ? -3 : -2}
              forcePreStep3Exit={holdPreStep3Arc && step === -2}
            />
          </div>
        )
      ) : null}
      <div
        className={`pointer-events-none absolute inset-0 ${
          preStepForegroundWrapClass || ""
        }`.trim()}
      >
        <LeftCompanionPreStep
          step={step}
          preStep4TextReady={preStep4TextReady}
          preStep4HandoffInstant={preStep4HandoffInstant}
        />
      </div>
      <LeftCompanionStep0 show={step === 0} />
      <LeftCompanionStep1 show={step === 1} />
      <LeftCompanionStep2 show={step === 2} />
      <LeftCompanionStep4 show={step === 4} />
      <LeftCompanionStep5 show={step === 5} />

      {step === 3 ? <Ux2Step4IconPrefetch /> : null}

      <BlurFade
        show={showAgentLayer}
        className="pointer-events-none absolute left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2"
        style={{ top: "50%" }}
      >
        {showAgentLayer ? (
          <LeftCompanionAgentLayer
            step={step}
            dotsGathering={dotsGathering}
          />
        ) : null}
      </BlurFade>

      {step === 4 || step === 5 ? (
        <LeftCompanionIconArc step={step} />
      ) : null}

      <LeftCompanionStep6
        show={step >= 6 && step <= 11}
        step={step}
      />
      <LeftCompanionStep7 show={step === 7} />
      <LeftCompanionStep8 show={step === 8} />
      <LeftCompanionStep9 show={step >= 9 && step <= 11} />
    </div>
  );
}
