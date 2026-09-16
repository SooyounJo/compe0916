"use client";

import Image from "next/image";
import LeftCompanionAgentLayer from "@/components/LeftCompanionAgentLayer";
import LeftCompanionIconArc from "@/components/LeftCompanionIconArc";
import LeftCompanionStep1 from "@/components/LeftCompanionStep1";
import LeftCompanionStep6 from "@/components/LeftCompanionStep6";
import LeftVoiceWineMorph from "@/components/LeftVoiceWineMorph";

const LEFT_BLOB_BG_STEP1 = "/figma/left-blob/step1-bg.png";
const LEFT_BLOB_BG_FROM_STEP2 = "/figma/left-blob/ambient-bg.png";

const BG_CROSSFADE =
  "transition-opacity duration-[1200ms] ease-[cubic-bezier(0.33,0,0.15,1)]";

/**
 * 좌측 원 — 참조 이미지 배경 (+ 2단계~ 보이스)
 */
export default function LeftAmbientBackground({
  step = 1,
  dotsGathering = false,
}) {
  const showVoice = step >= 2 && step <= 4;
  /** 2~3과 동일 펄스 — 4에서도 arc 구간 동안 유지 (3末 gather 때만 잠깐 정지) */
  const voiceActive =
    (step >= 2 && step <= 4) && !(dotsGathering && step === 3);

  return (
    <div
      className="left-ambient absolute inset-0 overflow-hidden rounded-full"
      data-step={step}
    >
      <Image
        src={LEFT_BLOB_BG_FROM_STEP2}
        alt=""
        fill
        className={`left-ambient__photo object-cover object-center ${BG_CROSSFADE} ${
          step >= 2 ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 900px) 41vmin, 520px"
        priority={step >= 2}
      />
      <Image
        src={LEFT_BLOB_BG_STEP1}
        alt=""
        fill
        className={`left-ambient__photo object-cover object-center ${BG_CROSSFADE} ${
          step === 1 ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 900px) 41vmin, 520px"
        priority={step === 1}
      />

      <LeftCompanionStep1 show={step === 1} />

      <div
        className={`pointer-events-none absolute left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 transition-[top,opacity] duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.2,1)] ${
          step <= 4 || dotsGathering ? "" : "pointer-events-none opacity-0"
        }`}
        style={{
          /** 실기 레이아웃에 맞춰 약간 위로 */
          top: step <= 1 ? "70%" : "50%",
        }}
      >
        <LeftCompanionAgentLayer
          step={step}
          dotsGathering={dotsGathering}
        />
      </div>

      <LeftCompanionIconArc step={step} />

      <LeftCompanionStep6 show={step >= 6} />

      {showVoice ? (
        <LeftVoiceWineMorph step={step} voiceActive={voiceActive} />
      ) : null}
    </div>
  );
}
