"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import { ux2Step5DualLeftCameraDelayS } from "@/ux2/lib/ux2Step45DualTiming";
import {
  pctLeft5,
  sizeCqwLeft5,
  STEP5_LEFT_CAMERA,
  STEP5_LEFT_PROMPT,
} from "@/ux2/lib/ux2Step5LeftLayout";

const PROMPT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #644577 0%, #30094c 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** 5단계 카피 + Figma 8:205 촬영 블롭 (4→5 handoff 후 유지) */
export default function LeftCompanionStep5({ show = false }) {
  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setCameraVisible(false);
      return undefined;
    }
    setCameraVisible(false);
    const t = setTimeout(
      () => setCameraVisible(true),
      ux2Step5DualLeftCameraDelayS() * 1000,
    );
    return () => clearTimeout(t);
  }, [show]);

  const camSize = sizeCqwLeft5(STEP5_LEFT_CAMERA.size);

  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <div
        className="font-doto absolute max-w-[56%] text-left text-[4.79cqw] font-black leading-[1.08] tracking-[-0.04em]"
        style={{
          left: `${pctLeft5(STEP5_LEFT_PROMPT.left)}%`,
          top: `${pctLeft5(STEP5_LEFT_PROMPT.top)}%`,
          ...PROMPT_STYLE,
        }}
      >
        <p className="mb-0 whitespace-nowrap">Peachy-coral, smooth</p>
        <p className="whitespace-nowrap">sunset-inspired vibe</p>
      </div>

      <div
        className="left-icon-orbit-settled absolute transition-opacity duration-700 ease-out"
        style={{
          width: `${camSize}%`,
          height: `${camSize}%`,
          opacity: cameraVisible ? 1 : 0,
          "--orbit-end-left": `${pctLeft5(STEP5_LEFT_CAMERA.centerX)}%`,
          "--orbit-end-top": `${pctLeft5(STEP5_LEFT_CAMERA.centerY)}%`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/figma/ux2/step4/video-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
            sizes="18vw"
          />
        </div>
      </div>
    </BlurFade>
  );
}
