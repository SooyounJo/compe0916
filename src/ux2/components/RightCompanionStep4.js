"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import Ux2VoiceRecorderFill from "@/ux2/components/Ux2VoiceRecorderFill";
import {
  pctRight,
  STEP4_RIGHT_PROMPT,
  STEP4_RIGHT_VOICE,
} from "@/ux2/lib/ux2Step4Layout";
import { ux2Step4RightVoiceHideDelayS } from "@/ux2/lib/ux2Step45DualTiming";
import { UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S } from "@/ux2/lib/ux2Ux1Step45Timing";
import promptStyles from "@/ux2/styles/ux2Step4RightPrompt.module.css";

const PROMPT_STYLE = {
  color: "#fff",
  textShadow: "0 4px 73px rgba(255,123,180,0.8)",
};

/** Figma [8:282](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-282) — BG는 WeatherBackground MP4 */
export default function RightCompanionStep4({ show = false }) {
  const voiceSizePct = pctRight(STEP4_RIGHT_VOICE.size);
  const [showVoice, setShowVoice] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setShowPrompt(false);
      return undefined;
    }
    setShowPrompt(false);
    const t = setTimeout(
      () => setShowPrompt(true),
      UX2_UX1_STEP4_RIGHT_REVEAL_DELAY_S * 1000,
    );
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    if (!show) {
      setShowVoice(true);
      return undefined;
    }
    setShowVoice(true);
    const t = setTimeout(
      () => setShowVoice(false),
      ux2Step4RightVoiceHideDelayS() * 1000,
    );
    return () => clearTimeout(t);
  }, [show]);

  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      <BlurFade show={showVoice} className="absolute inset-0">
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pctRight(STEP4_RIGHT_VOICE.centerX)}%`,
            top: `${pctRight(STEP4_RIGHT_VOICE.centerY)}%`,
            width: `${voiceSizePct}%`,
            height: `${voiceSizePct}%`,
          }}
        >
          <Ux2VoiceRecorderFill active={showVoice} glowVariant="slot" />
        </div>
      </BlurFade>

      {showPrompt ? (
        <div
          className={`${promptStyles.textReveal} pointer-events-none absolute font-doto text-[4.8cqw] font-black leading-none tracking-[-0.02em]`}
          style={{
            left: `${pctRight(STEP4_RIGHT_PROMPT.left)}%`,
            top: `${pctRight(STEP4_RIGHT_PROMPT.top)}%`,
            ...PROMPT_STYLE,
          }}
        >
          <p className="mb-0 whitespace-nowrap">Save new memories</p>
          <p className="whitespace-nowrap">with Friends</p>
        </div>
      ) : null}
    </BlurFade>
  );
}
