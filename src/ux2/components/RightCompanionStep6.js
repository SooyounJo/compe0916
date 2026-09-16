"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctRight6,
  sizeCqwRight6,
  STEP6_RIGHT_ALWAYS_ASK,
} from "@/ux2/lib/ux2Step6RightLayout";
import {
  pctRight7,
  sizeCqwRight7,
  STEP7_RIGHT_ICON_BLOB,
} from "@/ux2/lib/ux2Step7RightLayout";

const ICON_CROSSFADE =
  "transition-opacity duration-[900ms] ease-[cubic-bezier(0.33,0,0.15,1)]";

/** 6·7 우측 전경 — 6: 뮤직+보이스, 7: Figma 50:465 video always ask (동일 슬롯 크로스페이드) */
export default function RightCompanionStep6({ show = false, step = 6 }) {
  const useStep7Layout = step >= 7;
  const layout = useStep7Layout ? STEP7_RIGHT_ICON_BLOB : STEP6_RIGHT_ALWAYS_ASK;
  const pct = useStep7Layout ? pctRight7 : pctRight6;
  const sizeCqw = useStep7Layout ? sizeCqwRight7 : sizeCqwRight6;
  const blobSize = sizeCqw(layout.size);
  const showStep7Icon = step >= 7;
  const showStep6Icon = step === 6;

  return (
    <BlurFade
      show={show}
      className="party-night-foreground right-step6-dual-in pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pct(layout.centerX)}%`,
          top: `${pct(layout.centerY)}%`,
          width: `${blobSize}%`,
          height: `${blobSize}%`,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className={`absolute inset-0 ${ICON_CROSSFADE} ${
              showStep6Icon ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showStep6Icon}
          >
            <div className="relative h-full w-full">
              <Image
                src="/figma/left-orbit/step6-music-blob.svg"
                alt=""
                fill
                className="object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
                sizes="18vw"
              />
              <Image
                src="/figma/ux2/step0/voice-recorder.svg"
                alt=""
                width={120}
                height={120}
                className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-95"
              />
            </div>
          </div>
          <div
            className={`absolute inset-0 ${ICON_CROSSFADE} ${
              showStep7Icon ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showStep7Icon}
          >
            <Image
              src="/figma/ux2/step4/video-blob.svg"
              alt=""
              fill
              className="object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
              sizes="18vw"
            />
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
