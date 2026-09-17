"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import LeftCompanionAgentLayer from "@/ux2/components/LeftCompanionAgentLayer";
import LeftCompanionIconArc from "@/ux2/components/LeftCompanionIconArc";
import LeftCompanionStep0 from "@/ux2/components/LeftCompanionStep0";
import LeftCompanionStep1 from "@/ux2/components/LeftCompanionStep1";
import LeftCompanionStep2 from "@/ux2/components/LeftCompanionStep2";
import LeftCompanionStep4 from "@/ux2/components/LeftCompanionStep4";
import LeftCompanionStep5 from "@/ux2/components/LeftCompanionStep5";
import LeftCompanionStep6 from "@/ux2/components/LeftCompanionStep6";
import LeftCompanionStep7 from "@/ux2/components/LeftCompanionStep7";
import LeftCompanionStep8 from "@/ux2/components/LeftCompanionStep8";
import LeftCompanionStep9 from "@/ux2/components/LeftCompanionStep9";
import LeftCompanionStep10 from "@/ux2/components/LeftCompanionStep10";
import Ux2Step911LeftQrIcon from "@/ux2/components/Ux2Step911LeftQrIcon";
import Ux2InstagramIconPersist from "@/ux2/components/Ux2InstagramIconPersist";
import Ux2VoiceIconAtSlot from "@/ux2/components/Ux2VoiceIconAtSlot";
import Ux2Step0IconMotion from "@/ux2/components/Ux2Step0IconMotion";
import Ux2LeftAmbientVideo from "@/ux2/components/Ux2LeftAmbientVideo";
import Ux2Step4IconPrefetch from "@/ux2/components/Ux2Step4IconPrefetch";
import step0EdgeGlow from "@/ux2/styles/ux2LeftStep0EdgeGlow.module.css";
import { UX2_LAST_STEP } from "@/ux2/lib/ux2FlowSteps";
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
}) {
  const prevStepRef = useRef(step);
  const [holdAgentExit, setHoldAgentExit] = useState(false);

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;
    if (prev === 3 && step === 4) {
      setHoldAgentExit(true);
      const t = setTimeout(() => setHoldAgentExit(false), AGENT_EXIT_HOLD_MS);
      return () => clearTimeout(t);
    }
    if (step !== 4) {
      setHoldAgentExit(false);
    }
    return undefined;
  }, [step]);

  const showAgentLayer =
    step === 3 ||
    (dotsGathering && step === 3) ||
    holdAgentExit;
  const leftVideoBg = step >= 1 && step <= UX2_LAST_STEP;
  /** 1~2 좌측 원 연보라 rim · 3+ off (0→1은 crossfade로 서서히) */
  const showLavenderEdge = step === 1 || step === 2;

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
          step === 0 ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 900px) 41vmin, 520px"
        priority={step === 0}
      />
      <div
        className={`${step0EdgeGlow.wrap} ${BG_CROSSFADE} ${
          showLavenderEdge ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

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
            step={holdAgentExit ? 4 : step}
            dotsGathering={holdAgentExit ? false : dotsGathering}
          />
        ) : null}
      </BlurFade>

      {step === 4 || step === 5 ? (
        <LeftCompanionIconArc step={step} />
      ) : null}

      <LeftCompanionStep6
        show={step === 6 || step === 7 || step === 8}
        step={step}
      />
      <LeftCompanionStep7 show={step === 7} />
      <LeftCompanionStep8 show={step === 8} />
      <Ux2Step911LeftQrIcon show={step >= 9 && step <= 11} />
      <LeftCompanionStep9 show={step === 9} />
      <LeftCompanionStep10 show={step === 10 || step === 11} />
    </div>
  );
}
