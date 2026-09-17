"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import { UX1_STEP8_TEXT_LINES } from "../lib/leftOrbitStep8";
import {
  UX1_STEP8_LEFT_TEXT_IN_ANIM_S,
  UX1_STEP8_LEFT_TEXT_IN_DELAY_S,
} from "../lib/rightOrbitStep8";

const TEXT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.45)",
};

/** 7→8: 좌 텍스트(좌측 정렬) + 3시 사운드 슬롯 */
export default function LeftCompanionStep8({ step = 1 }) {
  const [entering, setEntering] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 8 && prevStep === 7) {
      setEntering(true);
      setTextVisible(false);
      return undefined;
    }

    if (step === 8) {
      setEntering(false);
      setTextVisible(true);
      return undefined;
    }

    setEntering(false);
    setTextVisible(false);
    return undefined;
  }, [step]);

  useEffect(() => {
    if (!entering) return undefined;

    const textTimer = setTimeout(
      () => setTextVisible(true),
      UX1_STEP8_LEFT_TEXT_IN_DELAY_S * 1000,
    );

    const settleTimer = setTimeout(
      () => setEntering(false),
      (UX1_STEP8_LEFT_TEXT_IN_DELAY_S + UX1_STEP8_LEFT_TEXT_IN_ANIM_S) * 1000 +
        120,
    );

    return () => {
      clearTimeout(textTimer);
      clearTimeout(settleTimer);
    };
  }, [entering]);

  if (step !== 8) return null;

  const textMotion =
    entering && textVisible
      ? "ux1-left-step8-text-in"
      : "ux1-left-step8-text-in--settled";

  return (
    <div className="pointer-events-none absolute inset-0 z-[6]">
      <div
        className="absolute inset-0 opacity-[0.42] mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 2.5%, #fffff8 40%, #ffc8d7 97.8%)",
        }}
        aria-hidden
      />

      {textVisible ? (
        <div
          className={`absolute top-1/2 z-[5] -translate-y-1/2 ${textMotion}`}
          style={{
            left: "11%",
            maxWidth: "62%",
            ...(entering && textVisible
              ? { animationDuration: `${UX1_STEP8_LEFT_TEXT_IN_ANIM_S}s` }
              : {}),
          }}
        >
          <div
            className="font-doto text-left text-[4.25cqw] font-black leading-[1.14] tracking-[-0.02em]"
            style={TEXT_STYLE}
          >
            {UX1_STEP8_TEXT_LINES.map((line) => (
              <p key={line} className="mb-0 whitespace-nowrap leading-[1.14]">
                {line}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {textVisible ? (
        <div
          className={`left-step7-sound-slot left-ambient__voice--glow pointer-events-none ${
            entering && textVisible
              ? "ux1-left-step8-text-in"
              : "ux1-left-step8-text-in--settled"
          }`}
          style={
            entering && textVisible
              ? { animationDuration: `${UX1_STEP8_LEFT_TEXT_IN_ANIM_S}s` }
              : undefined
          }
          aria-hidden
        >
          <VoiceRecorder active compact />
        </div>
      ) : null}
    </div>
  );
}
