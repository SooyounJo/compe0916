"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import {
  UX1_STEP7_RIGHT_SOUND_IN_ANIM_S,
  UX1_STEP7_RIGHT_SOUND_IN_DELAY_S,
  UX1_STEP7_RIGHT_TEXT_IN_ANIM_S,
  UX1_STEP7_RIGHT_TEXT_IN_DELAY_S,
  UX1_STEP7_SONG_LINES,
} from "../lib/leftOrbitStep7";

const TEXT_SHADOW = "0 4px 73px rgba(255,255,255,0.8)";

/** VoiceMusicSlot과 동일 고정 슬롯 */
const VOICE_SLOT_CLASS =
  "absolute left-[8.55%] top-1/2 z-30 h-[7.37cqw] w-[7.37cqw] -translate-x-1/2 -translate-y-1/2";

/** 6→7: 음악 out(CircleUI) → 사운드 슬롯 → 텍스트 */
export default function RightCompanionStep7({ step = 1 }) {
  const [entering, setEntering] = useState(false);
  const [soundVisible, setSoundVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 7 && prevStep === 6) {
      setEntering(true);
      setSoundVisible(false);
      setTextVisible(false);
      return undefined;
    }

    if (step === 7) {
      setEntering(false);
      setSoundVisible(true);
      setTextVisible(true);
      return undefined;
    }

    setEntering(false);
    setSoundVisible(false);
    setTextVisible(false);
    return undefined;
  }, [step]);

  useEffect(() => {
    if (!entering) return undefined;

    const soundTimer = setTimeout(
      () => setSoundVisible(true),
      UX1_STEP7_RIGHT_SOUND_IN_DELAY_S * 1000,
    );

    const textTimer = setTimeout(
      () => setTextVisible(true),
      UX1_STEP7_RIGHT_TEXT_IN_DELAY_S * 1000,
    );

    const settleTimer = setTimeout(
      () => setEntering(false),
      (UX1_STEP7_RIGHT_TEXT_IN_DELAY_S + UX1_STEP7_RIGHT_TEXT_IN_ANIM_S) * 1000 +
        120,
    );

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(textTimer);
      clearTimeout(settleTimer);
    };
  }, [entering]);

  if (step !== 7) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[36] overflow-hidden rounded-full">
      {soundVisible ? (
        <div
          className={`${VOICE_SLOT_CLASS} voice-slot--glow ${
            entering ? "ux1-right-step7-sound-in" : "ux1-right-step7-sound-in--settled"
          }`}
          style={
            entering
              ? { animationDuration: `${UX1_STEP7_RIGHT_SOUND_IN_ANIM_S}s` }
              : undefined
          }
        >
          <VoiceRecorder active compact />
        </div>
      ) : null}

      {textVisible ? (
        <div
          className={`absolute top-1/2 flex -translate-y-1/2 items-center ${
            entering ? "ux1-right-step7-text-in" : "ux1-right-step7-text-in--settled"
          }`}
          style={{
            left: "calc(8.55% + 5.8cqw)",
            ...(entering
              ? { animationDuration: `${UX1_STEP7_RIGHT_TEXT_IN_ANIM_S}s` }
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
