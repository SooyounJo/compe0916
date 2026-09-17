"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AgentDotsContinuity } from "./AgentDots";
import VoiceRecorder from "./VoiceRecorder";
import {
  step7RightSequenceTotalS,
  UX1_STEP7_RIGHT_DOTS_IN_ANIM_S,
  UX1_STEP7_RIGHT_DOTS_IN_DELAY_S,
  UX1_STEP7_RIGHT_SOUND_IN_ANIM_S,
  UX1_STEP7_RIGHT_SOUND_IN_DELAY_S,
  UX1_STEP7_RIGHT_TEXT_IN_ANIM_S,
  UX1_STEP7_RIGHT_TEXT_IN_DELAY_S,
  UX1_STEP7_RIGHT_TEXT_OUT_ANIM_S,
  UX1_STEP7_RIGHT_TEXT_OUT_DELAY_S,
  UX1_STEP7_SONG_LINES,
} from "../lib/leftOrbitStep7";
import {
  UX1_STEP7_TO8_DOTS_MORPH_DELAY_S,
  UX1_STEP7_TO8_SOUND_OUT_ANIM_S,
  UX1_STEP8_RIGHT_WINE_IN_ANIM_S,
  UX1_STEP8_RIGHT_WINE_IN_DELAY_S,
  UX1_STEP8_RIGHT_WINE_LEFT_PCT,
  UX1_STEP8_RIGHT_WINE_SIZE_CQW,
} from "../lib/rightOrbitStep8";

const TEXT_SHADOW = "0 4px 73px rgba(255,255,255,0.8)";

const VOICE_SLOT_CLASS =
  "absolute left-[8.55%] top-1/2 z-30 h-[7.37cqw] w-[7.37cqw] -translate-x-1/2 -translate-y-1/2";


/** 6→7: 사운드 → 텍스트 → 로딩 닷 / 7→8: 와인(스피커 자리) + 삼각형 닷 */
export default function RightCompanionStep7({ step = 1 }) {
  const [entering7, setEntering7] = useState(false);
  const [transitioningTo8, setTransitioningTo8] = useState(false);
  const [soundVisible, setSoundVisible] = useState(false);
  const [soundExiting, setSoundExiting] = useState(false);
  const [wineVisible, setWineVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [textExiting, setTextExiting] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(false);
  const [dotsPhase, setDotsPhase] = useState(1);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 7 && prevStep === 6) {
      setEntering7(true);
      setTransitioningTo8(false);
      setSoundVisible(false);
      setSoundExiting(false);
      setWineVisible(false);
      setTextVisible(false);
      setTextExiting(false);
      setDotsVisible(false);
      setDotsPhase(1);
      return undefined;
    }

    if (step === 7) {
      setEntering7(false);
      setTransitioningTo8(false);
      setSoundVisible(true);
      setSoundExiting(false);
      setWineVisible(false);
      setTextVisible(false);
      setTextExiting(false);
      setDotsVisible(true);
      setDotsPhase(1);
      return undefined;
    }

    if (step === 8 && prevStep === 7) {
      setEntering7(false);
      setTransitioningTo8(true);
      setTextVisible(false);
      setTextExiting(false);
      setSoundVisible(true);
      setSoundExiting(true);
      setWineVisible(false);
      setDotsVisible(true);
      setDotsPhase(1);
      return undefined;
    }

    if (step === 8) {
      setEntering7(false);
      setTransitioningTo8(false);
      setSoundVisible(false);
      setSoundExiting(false);
      setWineVisible(true);
      setTextVisible(false);
      setDotsVisible(true);
      setDotsPhase(2);
      return undefined;
    }

    setEntering7(false);
    setTransitioningTo8(false);
    setSoundVisible(false);
    setSoundExiting(false);
    setWineVisible(false);
    setTextVisible(false);
    setTextExiting(false);
    setDotsVisible(false);
    setDotsPhase(1);
    return undefined;
  }, [step]);

  useEffect(() => {
    if (!entering7) return undefined;

    const soundTimer = setTimeout(
      () => setSoundVisible(true),
      UX1_STEP7_RIGHT_SOUND_IN_DELAY_S * 1000,
    );

    const textTimer = setTimeout(
      () => setTextVisible(true),
      UX1_STEP7_RIGHT_TEXT_IN_DELAY_S * 1000,
    );

    const textOutTimer = setTimeout(() => {
      setTextExiting(true);
      setDotsVisible(true);
    }, UX1_STEP7_RIGHT_TEXT_OUT_DELAY_S * 1000);

    const textHideTimer = setTimeout(
      () => {
        setTextVisible(false);
        setTextExiting(false);
      },
      (UX1_STEP7_RIGHT_TEXT_OUT_DELAY_S + UX1_STEP7_RIGHT_TEXT_OUT_ANIM_S) *
        1000 +
        80,
    );

    const settleTimer = setTimeout(
      () => setEntering7(false),
      step7RightSequenceTotalS() * 1000 + 120,
    );

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(textTimer);
      clearTimeout(textOutTimer);
      clearTimeout(textHideTimer);
      clearTimeout(settleTimer);
    };
  }, [entering7]);

  useEffect(() => {
    if (!transitioningTo8) return undefined;

    const morphTimer = setTimeout(
      () => setDotsPhase(2),
      UX1_STEP7_TO8_DOTS_MORPH_DELAY_S * 1000,
    );

    const wineTimer = setTimeout(
      () => setWineVisible(true),
      UX1_STEP8_RIGHT_WINE_IN_DELAY_S * 1000,
    );

    const soundHideTimer = setTimeout(
      () => {
        setSoundVisible(false);
        setSoundExiting(false);
      },
      UX1_STEP7_TO8_SOUND_OUT_ANIM_S * 1000 + 80,
    );

    const settleTimer = setTimeout(
      () => setTransitioningTo8(false),
      (UX1_STEP8_RIGHT_WINE_IN_DELAY_S + UX1_STEP8_RIGHT_WINE_IN_ANIM_S) *
        1000 +
        120,
    );

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(wineTimer);
      clearTimeout(soundHideTimer);
      clearTimeout(settleTimer);
    };
  }, [transitioningTo8]);

  if (step < 7) return null;

  const textMotion = textExiting
    ? "ux1-right-step7-text-out"
    : entering7 && textVisible
      ? "ux1-right-step7-text-in"
      : "ux1-right-step7-text-in--settled";

  const dotsMotion =
    entering7 && dotsVisible && step === 7
      ? "ux1-right-step7-dots-in"
      : "ux1-right-step7-dots-in--settled";

  const soundMotion = soundExiting
    ? "ux1-right-step7-sound-out"
    : entering7
      ? "ux1-right-step7-sound-in"
      : "ux1-right-step7-sound-in--settled";

  const wineMotion =
    transitioningTo8 && wineVisible
      ? "ux1-right-step8-wine-in"
      : "ux1-right-step8-wine-in--settled";

  return (
    <div className="pointer-events-none absolute inset-0 z-[36] overflow-hidden rounded-full">
      {soundVisible ? (
        <div
          className={`${VOICE_SLOT_CLASS} voice-slot--glow ${soundMotion}`}
          style={
            entering7 && !soundExiting
              ? { animationDuration: `${UX1_STEP7_RIGHT_SOUND_IN_ANIM_S}s` }
              : soundExiting
                ? { animationDuration: `${UX1_STEP7_TO8_SOUND_OUT_ANIM_S}s` }
                : undefined
          }
        >
          <VoiceRecorder active compact />
        </div>
      ) : null}

      {wineVisible ? (
        <div
          className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${UX1_STEP8_RIGHT_WINE_LEFT_PCT}%`,
            width: `${UX1_STEP8_RIGHT_WINE_SIZE_CQW}cqw`,
            height: `${UX1_STEP8_RIGHT_WINE_SIZE_CQW}cqw`,
          }}
        >
          <div
            className={`relative h-full w-full ${wineMotion}`}
            style={
              transitioningTo8 && wineVisible
                ? { animationDuration: `${UX1_STEP8_RIGHT_WINE_IN_ANIM_S}s` }
                : undefined
            }
          >
            <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
            <Image
              src="/figma/icon-orbit-wine.svg"
              alt=""
              fill
              className="relative z-[1] object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
              sizes="8vw"
            />
          </div>
        </div>
      ) : null}

      {dotsVisible ? (
        <div
          className="absolute left-1/2 top-1/2 z-[38] -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className={`${dotsMotion} ux1-right-step7-dots-morph`}
            style={
              entering7 && dotsVisible && step === 7
                ? { animationDuration: `${UX1_STEP7_RIGHT_DOTS_IN_ANIM_S}s` }
                : undefined
            }
          >
            <AgentDotsContinuity
              step={dotsPhase}
              gathering={false}
              step1White
            />
          </div>
        </div>
      ) : null}

      {step === 7 && textVisible ? (
        <div
          className={`absolute top-1/2 z-[40] flex -translate-y-1/2 items-center ${textMotion}`}
          style={{
            left: "calc(8.55% + 5.8cqw)",
            ...(entering7 && textVisible && !textExiting
              ? { animationDuration: `${UX1_STEP7_RIGHT_TEXT_IN_ANIM_S}s` }
              : {}),
            ...(textExiting
              ? { animationDuration: `${UX1_STEP7_RIGHT_TEXT_OUT_ANIM_S}s` }
              : {}),
          }}
        >
          <div
            className="font-doto text-left text-[4.45cqw] font-black leading-[1.12] tracking-[-0.02em] text-white"
            style={{ textShadow: TEXT_SHADOW }}
          >
            {UX1_STEP7_SONG_LINES.map((line, index) => (
              <p
                key={line}
                className={
                  index < UX1_STEP7_SONG_LINES.length - 1
                    ? "mb-0 whitespace-nowrap"
                    : "whitespace-nowrap"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
