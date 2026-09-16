"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctCircle,
  STEP0_TEXT,
  STEP0_TEXT_HANDOFF_MS,
} from "@/ux2/lib/ux2Step0Layout";
import { LEFT_TEXT_GRADIENT } from "@/ux2/lib/ux2Step1Layout";

const TEXT_STYLE = {
  backgroundImage: LEFT_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** Figma [1:792](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=1-792) */
export default function LeftCompanionStep0({ show = false }) {
  const [showInstagramCopy, setShowInstagramCopy] = useState(false);
  const textCenterY = STEP0_TEXT.top + STEP0_TEXT.height / 2;

  useEffect(() => {
    if (!show) {
      setShowInstagramCopy(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      setShowInstagramCopy(true);
    }, STEP0_TEXT_HANDOFF_MS);

    return () => clearTimeout(timer);
  }, [show]);

  const textBlockClass =
    "font-doto absolute max-w-[56%] text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em]";

  const textPosition = {
    left: `${pctCircle(STEP0_TEXT.left)}%`,
    top: `${pctCircle(textCenterY)}%`,
    transform: "translateY(-50%)",
    ...TEXT_STYLE,
  };

  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[2]"
    >
      <BlurFade show={!showInstagramCopy} className="absolute inset-0">
        <div className={textBlockClass} style={textPosition}>
          <p className="mb-0">2022, Memories</p>
          <p>of the Seven Sisters</p>
        </div>
      </BlurFade>

      <BlurFade show={showInstagramCopy} className="absolute inset-0">
        <div className={textBlockClass} style={textPosition}>
          <p className="mb-0">Better on</p>
          <p>Instagram</p>
        </div>
      </BlurFade>
    </BlurFade>
  );
}
