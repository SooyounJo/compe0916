"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import {
  ux2PreStep3RightTextEnterDelayS,
  ux2PreStep3SearchAtVoiceDelayS,
} from "@/ux2/lib/ux2PreStep3IconEnter";
import {
  PRE_STEP_RIGHT_3_TEXT,
  PRE_STEP_RIGHT_3_VOICE,
} from "@/ux2/lib/ux2PreStepRightLayout";
import styles from "@/ux2/styles/ux2PreStepRight3.module.css";

const TEXT_SHADOW = "0 4px 73px rgba(255,255,255,0.8)";

/** Figma [12:202](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-202) — 전경 */
export default function RightCompanionPreStep3({ step = 0 }) {
  const [searchBlobVisible, setSearchBlobVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  useLayoutEffect(() => {
    if (step !== -3) {
      setShowText(false);
      return undefined;
    }

    setShowText(false);
    const delayMs = ux2PreStep3RightTextEnterDelayS() * 1000;
    const timer = setTimeout(() => setShowText(true), delayMs);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== -3) {
      setSearchBlobVisible(false);
      return undefined;
    }

    setSearchBlobVisible(false);
    const delayMs = ux2PreStep3SearchAtVoiceDelayS() * 1000;
    const timer = setTimeout(() => setSearchBlobVisible(true), delayMs);

    return () => clearTimeout(timer);
  }, [step]);

  const voiceSizePct = pctCircleRight(PRE_STEP_RIGHT_3_VOICE.size);
  const showVoice = step === -3 && !searchBlobVisible;

  return (
    <BlurFade
      show={step === -3}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
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
          <Image
            src="/figma/ux2/step0/voice-recorder.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.45)]"
            sizes="12vw"
          />
        </div>
      ) : null}

      {showText ? (
        <div
          className={`${styles.textReveal} font-doto absolute max-w-[72%] text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.02em] text-white`}
          style={{
            left: `${pctCircleRight(PRE_STEP_RIGHT_3_TEXT.left)}%`,
            top: `${pctCircleRight(PRE_STEP_RIGHT_3_TEXT.top)}%`,
            textShadow: TEXT_SHADOW,
          }}
        >
          <p className="mb-0 whitespace-pre">{`2022, Memories `}</p>
          <p className="whitespace-pre">of the Seven Sisters</p>
        </div>
      ) : null}
    </BlurFade>
  );
}
