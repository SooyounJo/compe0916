"use client";

import { useEffect, useRef } from "react";
import LeftCompanionAgentLayer from "./LeftCompanionAgentLayer";
import LeftCompanionIconArc from "./LeftCompanionIconArc";
import LeftCompanionStep1 from "./LeftCompanionStep1";
import LeftCompanionStep6 from "./LeftCompanionStep6";
import LeftVoiceWineMorph from "./LeftVoiceWineMorph";
import BlurFade from "./BlurFade";

const LEFT_AMBIENT_BG_VIDEO = `/video/${encodeURIComponent("백그라운드 엠비언트 영상.mp4")}`;

/**
 * 좌측 원 — 비디오 배경 (+ 2단계~ 보이스)
 */
export default function LeftAmbientBackground({
  step = 1,
  dotsGathering = false,
}) {
  const showVoice = step >= 2 && step <= 4;
  /** 2~3과 동일 펄스 — 4에서도 arc 구간 동안 유지 (3末 gather 때만 잠깐 정지) */
  const voiceActive =
    (step >= 2 && step <= 4) && !(dotsGathering && step === 3);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const ensurePlay = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    ensurePlay();
    video.addEventListener("loadeddata", ensurePlay);
    video.addEventListener("canplay", ensurePlay);

    return () => {
      video.removeEventListener("loadeddata", ensurePlay);
      video.removeEventListener("canplay", ensurePlay);
    };
  }, []);

  return (
    <div
      className="left-ambient absolute inset-0 overflow-hidden rounded-full"
      data-step={step}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="left-ambient__photo absolute inset-0 h-full w-full object-cover object-center"
        style={{
          transform: step === 4 ? "scale(1.428)" : "scale(1.4)",
          filter: step === 4 ? "blur(3px)" : "none",
          transition: "transform 2.4s cubic-bezier(0.33, 0, 0.15, 1), filter 2.4s cubic-bezier(0.33, 0, 0.15, 1)",
        }}
        aria-hidden
      >
        <source src={LEFT_AMBIENT_BG_VIDEO} type="video/mp4" />
      </video>

      <BlurFade show={step === 1}>
        <LeftCompanionStep1 show />
      </BlurFade>

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
