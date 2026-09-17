"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import {
  PRE_STEP_RIGHT_4_COCKTAIL,
  PRE_STEP_RIGHT_4_PROMPT,
} from "@/ux2/lib/ux2PreStepRightLayout";
import { UX2_RIGHT_TINTED_BLOB_IMG_CLASS } from "@/ux2/lib/ux2RightIconFill";

const PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #efe5a9 0%, #ffffff 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const COCKTAIL_CQW = pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.size);

/** Figma [6:248](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=6-248) — 전경 */
export default function RightCompanionPreStep4({ step = 0 }) {
  return (
    <BlurFade
      show={step === -4}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.centerX)}%`,
          top: `${pctCircleRight(PRE_STEP_RIGHT_4_COCKTAIL.centerY)}%`,
          width: `${COCKTAIL_CQW}cqw`,
          height: `${COCKTAIL_CQW}cqw`,
        }}
      >
        <Image
          src="/figma/left-orbit/cocktail-blob.svg"
          alt=""
          fill
          className={UX2_RIGHT_TINTED_BLOB_IMG_CLASS}
          sizes="22vw"
        />
      </div>

      <div
        className="font-doto absolute left-1/2 w-full max-w-[92%] -translate-x-1/2 text-center text-[4.79cqw] font-extrabold leading-none tracking-[-0.02em]"
        style={{
          top: `${pctCircleRight(PRE_STEP_RIGHT_4_PROMPT.top)}%`,
          ...PROMPT_STYLE,
        }}
      >
        <p className="mb-0 whitespace-nowrap">About Wine,</p>
        <p className="whitespace-nowrap">Our Memories</p>
      </div>
    </BlurFade>
  );
}
