"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";
import Ux2PreStepBlobReveal from "@/ux2/components/Ux2PreStepBlobReveal";
import Ux2Ux1Step7CenterLoadingDots from "@/ux2/components/Ux2Ux1Step7CenterLoadingDots";
import Ux2VoiceRecorderFill from "@/ux2/components/Ux2VoiceRecorderFill";
import { pctCircle, STEP0_SEARCH_BLOB } from "@/ux2/lib/ux2Step0Layout";
import { LEFT_TEXT_GRADIENT } from "@/ux2/lib/ux2Step1Layout";
import { UX2_PRE_STEP_PROMPTS } from "@/ux2/lib/ux2PreStepCopy";
import { useUx2PreStep4TextReveal } from "@/ux2/lib/useUx2PreStep4TextReveal";
import { UX2_PRE_STEP_FIRST } from "@/ux2/lib/ux2FlowSteps";
import { useUx2PreStep1Handoff } from "@/ux2/lib/ux2PreStep1Handoff";
import { UX2_PRE_STEP_NIGHT_FADE_MS } from "@/ux2/lib/ux2PreStepRightEnter";
import preStepBgStyles from "@/ux2/styles/ux2PreStepRightBackground.module.css";
import {
  UX2_PRE_STEP4_EXIT_MS,
  UX2_PRE_STEP4_TO3_ENTER_MS,
  ux2PreStep4ExitHoldMs,
} from "@/ux2/lib/ux2PreStep4To3Exit";
import preStep4ExitStyles from "@/ux2/styles/ux2PreStep4To3Exit.module.css";
import {
  UX2_PRE_STEP2_BLOB_ENTER_DURATION_S,
  ux2PreStep2AllBlobsEnterEndS,
  ux2PreStep2BlobEnterDelayS,
} from "@/ux2/lib/ux2PreStep2BlobEnter";
import {
  pctPre,
  PRE_STEP_1_INSTAGRAM,
  PRE_STEP_1_PROMPT,
  PRE_STEP_1_SEARCH,
  PRE_STEP_2_PROMPT,
  PRE_STEP_4_COCKTAIL,
  PRE_STEP_4_PROMPT,
  PRE_STEP_DOTS,
  PRE_STEP_GRADIENT,
  PRE_STEP_VOICE,
  sizeCqwPre,
} from "@/ux2/lib/ux2PreStepLayout";

const GRADIENT_TEXT = {
  backgroundImage: LEFT_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const PURPLE_TEXT = {
  backgroundImage: "linear-gradient(90deg, #644577 0%, #30094c 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

function PreStepAmbient({
  children,
  showGradient = true,
  slowGradientFade = false,
}) {
  const gradientFadeStyle = slowGradientFade
    ? {
        "--ux2-pre1-night-fade-s": `${UX2_PRE_STEP_NIGHT_FADE_MS / 1000}s`,
      }
    : undefined;

  return (
    <>
      <BlurFade
        show={showGradient}
        className={`left-step4-ui-blur-in pointer-events-none absolute inset-0 overflow-hidden ${
          slowGradientFade ? preStepBgStyles.ux2PreStep1SlowBlur : ""
        }`}
        style={gradientFadeStyle}
      >
        <div
          className="absolute inset-0 opacity-[0.42] mix-blend-soft-light"
          style={{ background: PRE_STEP_GRADIENT }}
          aria-hidden
        />
      </BlurFade>
      {children}
    </>
  );
}

function PreStepCenterDots() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        top: `${pctPre(PRE_STEP_DOTS.top)}%`,
        width: `${sizeCqwPre(PRE_STEP_DOTS.width)}%`,
        height: `${sizeCqwPre(PRE_STEP_DOTS.height)}%`,
      }}
    >
      <Ux2Ux1Step7CenterLoadingDots />
    </div>
  );
}

function PreStepVoiceAndDots({ showCenterDots = true, showVoice = true }) {
  const voiceSize = sizeCqwPre(PRE_STEP_VOICE.size);
  return (
    <>
      {showCenterDots ? <PreStepCenterDots /> : null}
      {showVoice ? (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pctPre(PRE_STEP_VOICE.centerX)}%`,
            top: `${pctPre(PRE_STEP_VOICE.centerY)}%`,
            width: `${voiceSize}%`,
            height: `${voiceSize}%`,
          }}
        >
          <Ux2VoiceRecorderFill active glowVariant="slot" />
        </div>
      ) : null}
    </>
  );
}

const STEP0_LEFT_ICON_FILL = "#9A93AA";

/** 0단계 Ux2Step0IconMotion과 동일 블롭·glyph 비율 */
function Step0MatchIconBlob({
  centerX,
  centerY,
  iconSrc,
  iconSizePct,
  blobId,
  enter = false,
  enterDelayS,
  blobSize = STEP0_SEARCH_BLOB.size,
}) {
  const blobCqw = pctCircle(blobSize);
  return (
    <Ux2PreStepBlobReveal
      blobId={blobId}
      enter={enter}
      enterDelayS={enterDelayS}
      style={{
        left: `${pctPre(centerX)}%`,
        top: `${pctPre(centerY)}%`,
        width: `${blobCqw}cqw`,
        height: `${blobCqw}cqw`,
      }}
    >
      <Ux2IconBlob
        iconSrc={iconSrc}
        iconSizePct={iconSizePct}
        iconFillColor={STEP0_LEFT_ICON_FILL}
        emphasized
        style={{ width: "100%", height: "100%" }}
      />
    </Ux2PreStepBlobReveal>
  );
}

function IconBlob({ centerX, centerY, size, blobSrc, iconSrc, iconInsetPct = 25 }) {
  const blobCqw = pctCircle(size);
  const iconInset = `${iconInsetPct}%`;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pctPre(centerX)}%`,
        top: `${pctPre(centerY)}%`,
        width: `${blobCqw}cqw`,
        height: `${blobCqw}cqw`,
      }}
    >
      <Image
        src={blobSrc}
        alt=""
        fill
        className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
        sizes="22vw"
      />
      {iconSrc ? (
        <div
          className="absolute"
          style={{ inset: iconInset }}
        >
          <Image src={iconSrc} alt="" fill className="object-contain" sizes="12vw" />
        </div>
      ) : null}
    </div>
  );
}

function PreStepPrompt({ stepKey }) {
  const spec = UX2_PRE_STEP_PROMPTS[stepKey];
  if (!spec) return null;

  const textClass =
    "font-doto text-[4.8cqw] font-black leading-none tracking-[-0.02em]";

  if (stepKey === -4) {
    return (
      <div
        className={`${textClass} absolute left-1/2 w-full max-w-[92%] -translate-x-1/2 text-center`}
        style={{ top: `${pctPre(PRE_STEP_4_PROMPT.top)}%`, ...GRADIENT_TEXT }}
      >
        <p className="mb-0 whitespace-nowrap">{spec.lines[0]}</p>
        <p className="whitespace-nowrap">{spec.lines[1]}</p>
      </div>
    );
  }

  if (stepKey === -2) {
    return (
      <div
        className={`${textClass} absolute left-1/2 w-full max-w-[92%] -translate-x-1/2 text-center`}
        style={{ top: `${pctPre(PRE_STEP_2_PROMPT.top)}%`, ...GRADIENT_TEXT }}
      >
        <p className="mb-0 whitespace-nowrap">{spec.lines[0]}</p>
        <p className="whitespace-nowrap">{spec.lines[1]}</p>
      </div>
    );
  }

  if (stepKey === -1) {
    return (
      <div
        className={`${textClass} absolute max-w-[78%] text-left`}
        style={{
          left: `${pctPre(PRE_STEP_1_PROMPT.left)}%`,
          top: `${pctPre(PRE_STEP_1_PROMPT.top)}%`,
          ...PURPLE_TEXT,
        }}
      >
        <p className="mb-0">{spec.lines[0]}</p>
        <p>{spec.lines[1]}</p>
      </div>
    );
  }

  return null;
}

function PreStepScene({
  stepKey,
  show = false,
  showGradient = true,
  showVoice = true,
  showCenterDots = true,
  /** -4: 가운데 닷만 (보이스 슬롯 미사용) */
  dotsOnly = false,
  preStep4PromptIn = false,
  enterInstant = false,
  exiting = false,
  children,
}) {
  const sceneClass =
    "left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden";

  const sceneBody = (
      <PreStepAmbient showGradient={showGradient}>
        {dotsOnly ? (
          <PreStepCenterDots />
        ) : (
          <PreStepVoiceAndDots
            showCenterDots={showCenterDots}
            showVoice={showVoice}
          />
        )}
        {children}
        {stepKey === -4 ? (
          <BlurFade
            show={preStep4PromptIn}
            className="ux2-pre-step-4-prompt pointer-events-none absolute inset-0 z-[6] overflow-visible"
          >
            <PreStepPrompt stepKey={-4} />
          </BlurFade>
        ) : (
          <PreStepPrompt stepKey={stepKey} />
        )}
      </PreStepAmbient>
  );

  if (!show && !exiting) {
    return null;
  }

  if (exiting) {
    return (
      <div
        className={`ui-blur-fade ui-blur-fade--visible z-[7] ${sceneClass} ${preStep4ExitStyles.sceneExiting}`}
        style={{ "--ux2-pre4-exit-ms": `${UX2_PRE_STEP4_EXIT_MS}ms` }}
        aria-hidden={false}
      >
        {sceneBody}
      </div>
    );
  }

  if (enterInstant) {
    return (
      <div
        className={`ui-blur-fade ui-blur-fade--visible ${sceneClass}`}
        aria-hidden={false}
      >
        {sceneBody}
      </div>
    );
  }

  return (
    <BlurFade show={show} className={sceneClass}>
      {sceneBody}
    </BlurFade>
  );
}

/** Figma 12:303 — -3 BG·닷 (검색 블롭·arc는 LeftAmbientBackground) */
export function LeftCompanionPreStepAmbient({
  show = false,
  showGradient = true,
  enterSoft = false,
  enterActive = false,
}) {
  if (!show) {
    return null;
  }

  const wrapClass =
    "pointer-events-none absolute inset-0 z-[4] overflow-hidden";

  const body = (
    <PreStepAmbient showGradient={showGradient}>
      <PreStepVoiceAndDots showVoice />
    </PreStepAmbient>
  );

  if (enterSoft) {
    return (
      <div
        className={`${wrapClass} ${preStep4ExitStyles.layerEnter} ${
          enterActive ? preStep4ExitStyles.layerEnterActive : ""
        }`}
        style={{
          "--ux2-pre4-enter-ms": `${UX2_PRE_STEP4_TO3_ENTER_MS}ms`,
        }}
      >
        {body}
      </div>
    );
  }

  return (
    <BlurFade show className={`left-step4-ui-blur-in ${wrapClass}`}>
      {body}
    </BlurFade>
  );
}

/** Figma 1:572 / 12:496 / 12:691 — -4·-2·-1 (-3은 arc·ambient) BlurFade 교차 */
export default function LeftCompanionPreStep({
  step = 0,
  preStep4TextReady = false,
  preStep4HandoffInstant = false,
}) {
  const preStep4PromptIn = useUx2PreStep4TextReveal(
    step,
    preStep4TextReady,
    preStep4HandoffInstant,
  );
  const revealStep0Bg = useUx2PreStep1Handoff(step);
  const fadePreGradient = step === -1 && revealStep0Bg;
  const prevStepRef = useRef(step);
  const [preStep2EnterKey, setPreStep2EnterKey] = useState(0);
  const [preStep1InstaEnterKey, setPreStep1InstaEnterKey] = useState(0);
  const [leftSearchEnter, setLeftSearchEnter] = useState(false);
  const [showPreStep2Prompt, setShowPreStep2Prompt] = useState(false);
  const [holdPreStep4Exit, setHoldPreStep4Exit] = useState(false);
  /** -1까지 정적 블롭 · 0은 Ux2Step0IconMotion handoff */
  /** -2 좌: 검색 블롭만(LeftAmbientBackground) · -1: 인스타+검색 handoff */
  const showPreStep2Layer = step === -2 || step === -1;

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;
    if (step === -2 && prev !== -2) {
      setPreStep2EnterKey((k) => k + 1);
      setLeftSearchEnter(true);
      setShowPreStep2Prompt(false);
      const searchEndS =
        ux2PreStep2BlobEnterDelayS("leftSearch") +
        UX2_PRE_STEP2_BLOB_ENTER_DURATION_S;
      const promptMs = ux2PreStep2AllBlobsEnterEndS() * 1000;
      const tSearch = setTimeout(
        () => setLeftSearchEnter(false),
        searchEndS * 1000 + 80,
      );
      const tPrompt = setTimeout(() => setShowPreStep2Prompt(true), promptMs);
      return () => {
        clearTimeout(tSearch);
        clearTimeout(tPrompt);
      };
    }
    if (step === -1 && prev === -2) {
      setPreStep1InstaEnterKey((k) => k + 1);
      setLeftSearchEnter(false);
      setShowPreStep2Prompt(false);
    }
    if (prev === UX2_PRE_STEP_FIRST && step === -3) {
      setHoldPreStep4Exit(true);
      const t = setTimeout(
        () => setHoldPreStep4Exit(false),
        ux2PreStep4ExitHoldMs(),
      );
      return () => clearTimeout(t);
    }
    if (step === UX2_PRE_STEP_FIRST) {
      setHoldPreStep4Exit(false);
    }
    if (step < -2) {
      setLeftSearchEnter(false);
      setShowPreStep2Prompt(false);
    }
    if (step === -2 && prev === -2) {
      setShowPreStep2Prompt(true);
    }
    return undefined;
  }, [step]);

  return (
    <>
      <PreStepScene
        stepKey={-4}
        show={step === -4 || holdPreStep4Exit}
        exiting={holdPreStep4Exit && step !== -4}
        dotsOnly
        preStep4PromptIn={preStep4PromptIn || holdPreStep4Exit}
        enterInstant={preStep4HandoffInstant}
      >
        <IconBlob
          centerX={PRE_STEP_4_COCKTAIL.centerX}
          centerY={PRE_STEP_4_COCKTAIL.centerY}
          size={PRE_STEP_4_COCKTAIL.size}
          blobSrc="/figma/left-orbit/cocktail-blob.svg"
        />
      </PreStepScene>

      {/* -2·-1·0: 검색·인스타 슬롯 동일 → -1→0 아이콘 연속 유지 */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        {showPreStep2Layer ? (
          <PreStepAmbient
            showGradient={!fadePreGradient && step !== 0}
            slowGradientFade={step === -1}
          >
            {step === -2 || step === -1 ? (
              <div key={`pre-step-left-search-${preStep2EnterKey}`}>
                <Step0MatchIconBlob
                  blobId="leftSearch"
                  enter={leftSearchEnter}
                  enterDelayS={ux2PreStep2BlobEnterDelayS("leftSearch")}
                  centerX={PRE_STEP_1_SEARCH.centerX}
                  centerY={PRE_STEP_1_SEARCH.centerY}
                  blobSize={PRE_STEP_1_SEARCH.size}
                  iconSrc="/figma/ux2/step0/web-search-icon.svg"
                  iconSizePct={54}
                />
              </div>
            ) : null}
            {step === -1 ? (
              <div key={`pre-step-1-left-insta-${preStep1InstaEnterKey}`}>
                <Step0MatchIconBlob
                  key={`leftInstagram-s-1-k${preStep1InstaEnterKey}`}
                  blobId="leftInstagram"
                  enter
                  enterDelayS={2}
                  centerX={PRE_STEP_1_INSTAGRAM.centerX}
                  centerY={PRE_STEP_1_INSTAGRAM.centerY}
                  blobSize={PRE_STEP_1_INSTAGRAM.size}
                  iconSrc="/figma/ux2/instagram-icon.svg"
                  iconSizePct={42}
                />
              </div>
            ) : null}
          </PreStepAmbient>
        ) : null}
      </div>
      <BlurFade
        show={step === -2 && showPreStep2Prompt}
        className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      >
        <PreStepPrompt stepKey={-2} />
      </BlurFade>
      <BlurFade
        show={step === -1}
        className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      >
        <PreStepPrompt stepKey={-1} />
      </BlurFade>
    </>
  );
}
