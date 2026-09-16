"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctLeft,
  STEP4_LEFT_DOTS,
  STEP4_LEFT_VOICE,
} from "@/ux2/lib/ux2Step4Layout";

/** Figma [39:318](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=39-318) */
export default function LeftCompanionStep4({ show = false }) {
  const voiceSizePct = pctLeft(STEP4_LEFT_VOICE.size);
  const dotsTop = pctLeft(STEP4_LEFT_DOTS.top);
  const dotsHeightPct = pctLeft(STEP4_LEFT_DOTS.height);
  const dotsWidthPct = pctLeft(STEP4_LEFT_DOTS.width);

  return (
    <BlurFade
      show={show}
      className="left-step4-ui-blur-in pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.42] mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 2.5%, #fffff8 40%, #ffc8d7 97.8%)",
        }}
        aria-hidden
      />

      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: `${dotsTop}%`,
          width: `${dotsWidthPct}%`,
          height: `${dotsHeightPct}%`,
        }}
      >
        <Image
          src="/figma/left-orbit/step6-dots.svg"
          alt=""
          fill
          className="object-contain"
          sizes="20vw"
        />
      </div>

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pctLeft(STEP4_LEFT_VOICE.centerX)}%`,
          top: `${pctLeft(STEP4_LEFT_VOICE.centerY)}%`,
          width: `${voiceSizePct}%`,
          height: `${voiceSizePct}%`,
        }}
      >
        <Image
          src="/figma/ux2/step0/voice-recorder.svg"
          alt=""
          fill
          className="object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.4)]"
          sizes="14vw"
        />
      </div>
    </BlurFade>
  );
}
