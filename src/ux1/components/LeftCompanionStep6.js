"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AgentDotsContinuity } from "./AgentDots";
import {
  UX1_STEP6_LEFT_DOTS_ENTER_DELAY_S,
  UX1_STEP6_LEFT_TEXT_ENTER_DELAY_S,
} from "../lib/leftOrbitStep4";
import { UX1_STEP6_TO7_TEXT_OUT_ANIM_S } from "../lib/leftOrbitStep7";

const FOOTER_TEXT_CLASS =
  "font-doto absolute bottom-[11%] left-1/2 z-30 w-full -translate-x-1/2 px-4 text-center text-[4.65cqw] font-black leading-none tracking-[-0.04em]";

const TEXT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.45)",
};

/** 6단계 — 로딩 닷·텍스트 fade-in */
export default function LeftCompanionStep6({ step = 6 }) {
  const [entering, setEntering] = useState(false);
  const [exitingTo7, setExitingTo7] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 6 && prevStep === 5) {
      setEntering(true);
      setExitingTo7(false);
      return undefined;
    }

    if (step === 7 && prevStep === 6) {
      setEntering(false);
      setExitingTo7(true);
      return undefined;
    }

    setEntering(false);
    setExitingTo7(false);
    return undefined;
  }, [step]);

  useEffect(() => {
    if (!exitingTo7) return undefined;
    const timer = setTimeout(
      () => setExitingTo7(false),
      UX1_STEP6_TO7_TEXT_OUT_ANIM_S * 1000 + 80,
    );
    return () => clearTimeout(timer);
  }, [exitingTo7]);

  if (step !== 6 && !exitingTo7) return null;

  const dotsMotion = exitingTo7
    ? "ux1-left-step6-fade-in--settled"
    : entering
      ? "ux1-left-step6-fade-in"
      : "ux1-left-step6-fade-in--settled";
  const textMotion = exitingTo7
    ? "ux1-left-step6-fade-out"
    : entering
      ? "ux1-left-step6-fade-in"
      : "ux1-left-step6-fade-in--settled";

  return (
    <div className="party-night-foreground pointer-events-none absolute inset-0 z-[5]">
      {!exitingTo7 ? (
        <div
          className={`absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 ${dotsMotion}`}
          style={{
            animationDelay: entering
              ? `${UX1_STEP6_LEFT_DOTS_ENTER_DELAY_S}s`
              : undefined,
          }}
        >
          <AgentDotsContinuity step={1} gathering={false} />
        </div>
      ) : null}

      <div
        className={`${FOOTER_TEXT_CLASS} ${textMotion}`}
        style={{
          ...TEXT_STYLE,
          animationDelay: entering
            ? `${UX1_STEP6_LEFT_TEXT_ENTER_DELAY_S}s`
            : undefined,
        }}
      >
        <p className="mb-0 leading-none">Home party</p>
        <p className="leading-none">music for you</p>
      </div>
    </div>
  );
}
