"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";
import Ux2LeftCenterLoadingDots from "@/ux2/components/Ux2LeftCenterLoadingDots";
import { pctCircle, STEP0_SEARCH_BLOB } from "@/ux2/lib/ux2Step0Layout";
import { LEFT_TEXT_GRADIENT } from "@/ux2/lib/ux2Step1Layout";
import { UX2_PRE_STEP_PROMPTS } from "@/ux2/lib/ux2PreStepCopy";
import {
  pctPre,
  PRE_STEP_1_INSTAGRAM,
  PRE_STEP_1_PROMPT,
  PRE_STEP_2_PROMPT,
  PRE_STEP_2_SEARCH,
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

function PreStepAmbient({ children }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.42] mix-blend-soft-light"
        style={{ background: PRE_STEP_GRADIENT }}
        aria-hidden
      />
      {children}
    </>
  );
}

function PreStepVoiceAndDots() {
  const voiceSize = sizeCqwPre(PRE_STEP_VOICE.size);
  return (
    <>
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
    </>
  );
}

const STEP0_LEFT_BLOB_CQW = pctCircle(STEP0_SEARCH_BLOB.size);
const STEP0_LEFT_ICON_FILL = "#9A93AA";

/** 0단계 Ux2Step0IconMotion과 동일 블롭·glyph 비율 */
function Step0MatchIconBlob({ centerX, centerY, iconSrc, iconSizePct }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pctPre(centerX)}%`,
        top: `${pctPre(centerY)}%`,
        width: `${STEP0_LEFT_BLOB_CQW}cqw`,
        height: `${STEP0_LEFT_BLOB_CQW}cqw`,
      }}
    >
      <Ux2IconBlob
        iconSrc={iconSrc}
        iconSizePct={iconSizePct}
        iconFillColor={STEP0_LEFT_ICON_FILL}
        emphasized
        style={{ width: "100%", height: "100%" }}
      />
    </div>
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

function PreStepScene({ stepKey, show = false, children }) {
  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <PreStepAmbient>
        <PreStepVoiceAndDots />
        {children}
        <PreStepPrompt stepKey={stepKey} />
      </PreStepAmbient>
    </BlurFade>
  );
}

/** Figma 12:303 — -3 BG·닷·보이스 (arc는 IconArc) */
export function LeftCompanionPreStepAmbient({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[4] overflow-hidden"
    >
      <PreStepAmbient>
        <PreStepVoiceAndDots />
      </PreStepAmbient>
    </BlurFade>
  );
}

/** Figma 1:572 / 12:496 / 12:691 — -4·-2·-1 (-3은 arc·ambient) BlurFade 교차 */
export default function LeftCompanionPreStep({ step = 0 }) {
  return (
    <>
      <PreStepScene stepKey={-4} show={step === -4}>
        <IconBlob
          centerX={PRE_STEP_4_COCKTAIL.centerX}
          centerY={PRE_STEP_4_COCKTAIL.centerY}
          size={PRE_STEP_4_COCKTAIL.size}
          blobSrc="/figma/left-orbit/cocktail-blob.svg"
        />
      </PreStepScene>

      {/* -2·-1: 검색·인스타 슬롯 동일 → 아이콘 한 벌만, 카피만 교차 페이드 */}
      <BlurFade
        show={step === -2 || step === -1}
        className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      >
        <PreStepAmbient>
          <PreStepVoiceAndDots />
          <Step0MatchIconBlob
            centerX={PRE_STEP_2_SEARCH.centerX}
            centerY={PRE_STEP_2_SEARCH.centerY}
            iconSrc="/figma/ux2/step0/web-search-icon.svg"
            iconSizePct={54}
          />
          <Step0MatchIconBlob
            centerX={PRE_STEP_1_INSTAGRAM.centerX}
            centerY={PRE_STEP_1_INSTAGRAM.centerY}
            iconSrc="/figma/ux2/instagram-icon.svg"
            iconSizePct={42}
          />
        </PreStepAmbient>
      </BlurFade>
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
