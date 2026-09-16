"use client";

import BlurFade from "@/ux2/components/BlurFade";
import { pctLeft5, STEP5_LEFT_PROMPT } from "@/ux2/lib/ux2Step5LeftLayout";

const PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #644577 0%, #30094c 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** 5단계 카피 — 아이콘은 LeftCompanionIconArc handoff */
export default function LeftCompanionStep5({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <div
        className="font-doto absolute max-w-[56%] text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em]"
        style={{
          left: `${pctLeft5(STEP5_LEFT_PROMPT.left)}%`,
          top: `${pctLeft5(STEP5_LEFT_PROMPT.top)}%`,
          ...PROMPT_STYLE,
        }}
      >
        <p className="mb-0 whitespace-nowrap">Peachy-coral, smooth</p>
        <p className="whitespace-nowrap">sunset-inspired vibe</p>
      </div>
    </BlurFade>
  );
}
