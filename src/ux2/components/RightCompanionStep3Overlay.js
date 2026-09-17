"use client";

import BlurFade from "@/ux2/components/BlurFade";
import { pctStep3, STEP3_PROMPT } from "@/ux2/lib/ux2Step3RightLayout";

const PROMPT_STYLE = {
  color: "#fff",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** Figma 69:278 — 피드 퇴장 후 문구 + 보이스 레코더 */
/** 보이스 아이콘은 CircleUI Ux2VoiceIconAtSlot(좌측과 동기) */
export default function RightCompanionStep3Overlay({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      <div
        className="absolute font-doto text-[4.8cqw] font-black leading-none tracking-[-0.02em]"
        style={{
          left: `${pctStep3(STEP3_PROMPT.left)}%`,
          top: `${pctStep3(STEP3_PROMPT.top)}%`,
          ...PROMPT_STYLE,
        }}
      >
        <p className="mb-0 whitespace-nowrap">Why not save</p>
        <p className="whitespace-nowrap">today too?</p>
      </div>
    </BlurFade>
  );
}
