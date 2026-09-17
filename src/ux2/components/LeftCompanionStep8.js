"use client";

import { useLayoutEffect, useState } from "react";
import { pctLeft8, STEP8_LEFT_PROMPT } from "@/ux2/lib/ux2Step8LeftLayout";
import textStyles from "@/ux2/styles/ux2Step1LeftTextIn.module.css";

const PROMPT_STYLE = {
  backgroundImage:
    "linear-gradient(90deg, #75002d 0%, #383645 55%, #22166d 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** 7→8: 아이콘은 LeftCompanionStep6 유지, 8에서 좌 카피 먼저 */
export default function LeftCompanionStep8({ show = false }) {
  const [showText, setShowText] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setShowText(false);
      return undefined;
    }
    setShowText(false);
    const id = requestAnimationFrame(() => setShowText(true));
    return () => cancelAnimationFrame(id);
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[8] overflow-hidden">
      {showText ? (
        <div
          className={`${textStyles.inPlaceReveal} font-doto absolute max-w-[56%] text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em]`}
          style={{
            left: `${pctLeft8(STEP8_LEFT_PROMPT.left)}%`,
            top: `${pctLeft8(STEP8_LEFT_PROMPT.top)}%`,
            ...PROMPT_STYLE,
          }}
        >
          <p className="mb-0">We need to change it</p>
          <p className="mb-0">easier to save</p>
        </div>
      ) : null}
    </div>
  );
}
