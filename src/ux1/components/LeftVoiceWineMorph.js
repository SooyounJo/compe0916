"use client";

import { useLayoutEffect, useRef, useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import {
  leftStep5MusicEnterDelayS,
  UX1_STEP5_RIGHT_ENTER_ANIM_S,
} from "../lib/leftOrbitStep4";

/** 2~4 보이스 — 5에서 음악 등장과 크로스페이드 */
export default function LeftVoiceWineMorph({ step, voiceActive }) {
  const [morphingToMusic, setMorphingToMusic] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 5 && prevStep === 4) {
      setMorphingToMusic(true);
      const morphMs =
        (leftStep5MusicEnterDelayS() + UX1_STEP5_RIGHT_ENTER_ANIM_S) * 1000 +
        80;
      const timer = setTimeout(() => setMorphingToMusic(false), morphMs);
      return () => clearTimeout(timer);
    }

    if (step !== 5) {
      setMorphingToMusic(false);
    }

    return undefined;
  }, [step]);

  if (step < 2) return null;
  if (step === 5 && !morphingToMusic) return null;

  const showVoiceContent = voiceActive || morphingToMusic;

  return (
    <div
      className={`left-ambient__voice ${
        voiceActive ? "left-ambient__voice--glow" : ""
      } ${morphingToMusic ? "left-step5-voice-morph-out" : ""}`}
      style={
        morphingToMusic
          ? {
              "--left-step5-voice-out-delay": `${leftStep5MusicEnterDelayS()}s`,
            }
          : undefined
      }
    >
      <div
        className={
          morphingToMusic
            ? "left-step5-voice-morph-out__inner"
            : `transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.33,0,0.15,1)] ${
                showVoiceContent
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-[0.78] blur-[4px]"
              }`
        }
      >
        <VoiceRecorder active={voiceActive} compact />
      </div>
    </div>
  );
}
