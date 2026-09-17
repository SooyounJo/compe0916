"use client";

import BlurFade from "@/ux2/components/BlurFade";
import Ux2LeftCenterLoadingDots from "@/ux2/components/Ux2LeftCenterLoadingDots";
import {
  pctLeft10,
  sizeCqwLeft10,
  STEP10_LEFT_DOTS,
  STEP10_LEFT_PROMPT,
} from "@/ux2/lib/ux2Step10LeftLayout";

const PROMPT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** Figma [50:554](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-554) */
export default function LeftCompanionStep10({ show = false }) {
  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[6] overflow-hidden"
    >
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{
          left: `${pctLeft10(STEP10_LEFT_DOTS.centerX)}%`,
          top: `${pctLeft10(STEP10_LEFT_DOTS.centerY)}%`,
          width: `${sizeCqwLeft10(STEP10_LEFT_DOTS.width)}%`,
          height: `${sizeCqwLeft10(STEP10_LEFT_DOTS.height)}%`,
        }}
      >
        <Ux2LeftCenterLoadingDots />
      </div>

      <div
        className="font-doto absolute left-1/2 w-full max-w-[88%] -translate-x-1/2 px-4 text-center text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em]"
        style={{ top: `${pctLeft10(STEP10_LEFT_PROMPT.top)}%`, ...PROMPT_STYLE }}
      >
        <p className="mb-0">Optimized for</p>
        <p className="mb-0">mobile download</p>
      </div>
    </BlurFade>
  );
}
