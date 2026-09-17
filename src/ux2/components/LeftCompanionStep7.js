"use client";

import BlurFade from "@/ux2/components/BlurFade";
import { pctLeft7, STEP7_LEFT_PROMPT } from "@/ux2/lib/ux2Step7LeftLayout";

const PROMPT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** 6→7: 아이콘은 LeftCompanionStep6 유지, 7에서 카피만 추가 */
export default function LeftCompanionStep7({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[7] overflow-hidden"
    >
      <div
        className="font-doto absolute left-1/2 w-full -translate-x-1/2 px-4 text-center text-[4.79cqw] font-black leading-none tracking-[-0.04em]"
        style={{ top: `${pctLeft7(STEP7_LEFT_PROMPT.top)}%`, ...PROMPT_STYLE }}
      >
        <p className="mb-0 leading-none">Documenting</p>
        <p className="leading-none">Today</p>
      </div>
    </BlurFade>
  );
}
