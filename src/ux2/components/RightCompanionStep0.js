"use client";

import { useLayoutEffect, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctCircleRight,
  STEP0_RIGHT_ROW,
  STEP0_RIGHT_TEXT_AFTER_ICON_MS,
  STEP0_RIGHT_TEXT_NUDGE_LEFT_PX,
} from "@/ux2/lib/ux2Step0Layout";
import promptStyles from "@/ux2/styles/ux2Step4RightPrompt.module.css";

const TEXT_SHADOW = "0 4px 73px rgba(255,255,255,0.8)";
const ROW = STEP0_RIGHT_ROW;
const BLOB_CQW = pctCircleRight(ROW.blobSize);
const GAP_CQW = pctCircleRight(
  ROW.textOffsetX - ROW.blobSize - STEP0_RIGHT_TEXT_NUDGE_LEFT_PX,
);

/**
 * Figma [33:224](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=33-224)
 */
export default function RightCompanionStep0({ show = true }) {
  const [showText, setShowText] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setShowText(false);
      return undefined;
    }
    setShowText(false);
    const t = setTimeout(
      () => setShowText(true),
      STEP0_RIGHT_TEXT_AFTER_ICON_MS,
    );
    return () => clearTimeout(t);
  }, [show]);

  return (
    <BlurFade show={show} className="pointer-events-none absolute inset-0 z-[12]">
      <div
        className="absolute flex items-center"
        style={{
          left: `${pctCircleRight(ROW.left)}%`,
          top: `${pctCircleRight(ROW.top)}%`,
          width: `${pctCircleRight(ROW.width)}%`,
          height: `${pctCircleRight(ROW.height)}%`,
          gap: `${GAP_CQW}cqw`,
        }}
      >
        <div
          className="shrink-0"
          style={{
            width: `${BLOB_CQW}cqw`,
            height: `${BLOB_CQW}cqw`,
          }}
          aria-hidden
        />

        {showText ? (
          <div
            className={`${promptStyles.textReveal} font-doto min-w-0 flex-1 text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em] text-white`}
            style={{ textShadow: TEXT_SHADOW }}
          >
            <p className="mb-0">{`I'd love to look at`}</p>
            <p>more of our old photos</p>
          </div>
        ) : null}
      </div>
    </BlurFade>
  );
}
