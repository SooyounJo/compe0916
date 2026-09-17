"use client";

import { useLayoutEffect, useState } from "react";
import { pctRight8, STEP8_RIGHT_PROMPT } from "@/ux2/lib/ux2Step8RightLayout";
import { ux2Step8RightTextDelayMs } from "@/ux2/lib/ux2Step8CopyTiming";
import textStyles from "@/ux2/styles/ux2Step1LeftTextIn.module.css";

/** 7→8: 우측 QR 블롭은 RightCompanionStep6(7~11), 좌 카피 후 우 텍스트 */
export default function RightCompanionStep8({ show = false }) {
  const [showText, setShowText] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setShowText(false);
      return undefined;
    }
    setShowText(false);
    const t = setTimeout(() => setShowText(true), ux2Step8RightTextDelayMs());
    return () => clearTimeout(t);
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden">
      {showText ? (
        <p
          className={`${textStyles.inPlaceReveal} font-doto absolute whitespace-nowrap text-[4.79cqw] font-black leading-none tracking-[-0.04em] text-white`}
          style={{
            left: `${pctRight8(STEP8_RIGHT_PROMPT.left)}%`,
            top: `${pctRight8(STEP8_RIGHT_PROMPT.top)}%`,
            textShadow: "0 4px 73px rgba(255,255,255,0.8)",
          }}
        >
          Easier saving
        </p>
      ) : null}
    </div>
  );
}
