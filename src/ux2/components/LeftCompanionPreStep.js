"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";
import Ux2PreStepBlobReveal from "@/ux2/components/Ux2PreStepBlobReveal";
import Ux2LeftCenterLoadingDots from "@/ux2/components/Ux2LeftCenterLoadingDots";
import { pctCircle, STEP0_SEARCH_BLOB } from "@/ux2/lib/ux2Step0Layout";
import { LEFT_TEXT_GRADIENT } from "@/ux2/lib/ux2Step1Layout";
import { UX2_PRE_STEP_PROMPTS } from "@/ux2/lib/ux2PreStepCopy";
import { useUx2PreStep1Handoff } from "@/ux2/lib/ux2PreStep1Handoff";
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
import { ux2PreStep2LeftSearchDelayS } from "@/ux2/lib/ux2PreStep2BlobEnter";

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

function PreStepAmbient({ children, showGradient = true }) {
  return (
    <>
      <BlurFade
        show={showGradient}
        className="left-step4-ui-blur-in pointer-events-none absolute inset-0 overflow-hidden"
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
      <Ux2LeftCenterLoadingDots />
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
          <Image
            src="/figma/ux2/step0/voice-recorder.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.4)]"
            sizes="14vw"
          />
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
  const blobSize = sizeCqwPre(size);
  const iconInset = `${iconInsetPct}%`;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pctPre(centerX)}%`,
        top: `${pctPre(centerY)}%`,
        width: `${blobSize}%`,
        height: `${blobSize}%`,
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
  children,
}) {
  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
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
        <PreStepPrompt stepKey={stepKey} />
      </PreStepAmbient>
    </BlurFade>
  );
}

/** Figma 12:303 — -3 BG·닷 (검색 블롭·arc는 LeftAmbientBackground) */
export function LeftCompanionPreStepAmbient({ show = false, showGradient = true }) {
  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[4] overflow-hidden"
    >
      <PreStepAmbient showGradient={showGradient}>
        <PreStepVoiceAndDots showVoice />
      </PreStepAmbient>
    </BlurFade>
  );
}

/** Figma 1:572 / 12:496 / 12:691 — -4·-2·-1 (-3은 arc·ambient) BlurFade 교차 */
export default function LeftCompanionPreStep({ step = 0 }) {
  const revealStep0Bg = useUx2PreStep1Handoff(step);
  const fadePreGradient = step === -1 && revealStep0Bg;
  const prevStepRef = useRef(step);
  const [preStep2EnterKey, setPreStep2EnterKey] = useState(0);
  const [preStep1InstaEnterKey, setPreStep1InstaEnterKey] = useState(0);
  /** -1까지 정적 블롭 · 0은 Ux2Step0IconMotion handoff */
  /** -2·-1 좌: 0 handoff 슬롯(검색·인스타) 동일 · -2는 정착만 */
  const showPreStep12BlobLayer = step === -2 || step === -1;

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;
    if (step === -2 && prev !== -2) {
      setPreStep2EnterKey((k) => k + 1);
    }
    if (step === -1 && prev === -2) {
      setPreStep1InstaEnterKey((k) => k + 1);
    }
  }, [step]);

  return (
    <>
      <PreStepScene stepKey={-4} show={step === -4} dotsOnly>
        <IconBlob
          centerX={PRE_STEP_4_COCKTAIL.centerX}
          centerY={PRE_STEP_4_COCKTAIL.centerY}
          size={PRE_STEP_4_COCKTAIL.size}
          blobSrc="/figma/left-orbit/cocktail-blob.svg"
        />
      </PreStepScene>

      {/* -2·-1·0: 검색·인스타 슬롯 동일 → -1→0 아이콘 연속 유지 */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        {showPreStep12BlobLayer ? (
          <PreStepAmbient showGradient={!fadePreGradient && step !== 0}>
            {step === -2 ? (
              <div key={`pre-step-2-left-blobs-${preStep2EnterKey}`}>
                <Step0MatchIconBlob
                  blobId="leftSearch"
                  enter
                  enterDelayS={ux2PreStep2LeftSearchDelayS()}
                  centerX={PRE_STEP_1_SEARCH.centerX}
                  centerY={PRE_STEP_1_SEARCH.centerY}
                  blobSize={PRE_STEP_1_SEARCH.size}
                  iconSrc="/figma/ux2/step0/web-search-icon.svg"
                  iconSizePct={54}
                />
              </div>
            ) : null}
            {step === -1 ? (
              <div key={`pre-step-1-left-blobs-${preStep2EnterKey}`}>
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
                <Step0MatchIconBlob
                  blobId="leftSearch"
                  enter={false}
                  centerX={PRE_STEP_1_SEARCH.centerX}
                  centerY={PRE_STEP_1_SEARCH.centerY}
                  blobSize={PRE_STEP_1_SEARCH.size}
                  iconSrc="/figma/ux2/step0/web-search-icon.svg"
                  iconSizePct={54}
                />
              </div>
            ) : null}
          </PreStepAmbient>
        ) : null}
      </div>
      <BlurFade
        show={step === -2}
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
