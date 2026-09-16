"use client";

import { pctRight8, STEP8_RIGHT_PROMPT } from "@/ux2/lib/ux2Step8RightLayout";

/** 7→8: 우측 video 블롭은 RightCompanionStep6 유지, 8에서 카피만 */
export default function RightCompanionStep8({ show = false }) {
  if (!show) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden">
      <p
        className="font-doto absolute whitespace-nowrap text-[4.79cqw] font-black leading-none tracking-[-0.04em] text-white"
        style={{
          left: `${pctRight8(STEP8_RIGHT_PROMPT.left)}%`,
          top: `${pctRight8(STEP8_RIGHT_PROMPT.top)}%`,
          textShadow: "0 4px 73px rgba(255,255,255,0.8)",
        }}
      >
        Easier saving
      </p>
    </div>
  );
}
