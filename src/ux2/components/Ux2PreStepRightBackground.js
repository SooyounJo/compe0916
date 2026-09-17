"use client";

import { useEffect, useRef } from "react";
import { useUx2PreStep1Handoff } from "@/ux2/lib/ux2PreStep1Handoff";
import {
  UX2_PRE_STEP_NIGHT_FADE_MS,
} from "@/ux2/lib/ux2PreStepRightEnter";
import { UX2_PRE_STEP_FIRST } from "@/ux2/lib/ux2FlowSteps";
import styles from "@/ux2/styles/ux2PreStepRightBackground.module.css";

export const UX2_PRE_STEP_NIGHT_VIDEO = "/video/ux2-pre-step-night.mp4";

/** -4~-1: night 레이어 · -1 crossfade는 opacity만 (언마운트·blur 퇴장 없음) */
export default function Ux2PreStepRightBackground({ step = 0 }) {
  const videoRef = useRef(null);
  const { nightFadingOut, minus1NightHold } = useUx2PreStep1Handoff(step);

  const showNightStack =
    step >= UX2_PRE_STEP_FIRST && step <= -1;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showNightStack) return undefined;

    void video.play().catch(() => {});
    return undefined;
  }, [showNightStack, step]);

  if (!showNightStack) {
    return null;
  }

  const fadeClass =
    step === -1 && nightFadingOut ? styles.nightVideoFading : "";

  const inlineOpacity =
    step <= -2 || minus1NightHold || nightFadingOut
      ? 1
      : step === -1
        ? 0
        : 1;

  return (
    <div
      className={`${styles.nightVideoLayer} ${fadeClass} pointer-events-none absolute inset-0 z-[10] overflow-hidden rounded-full`}
      style={{
        "--ux2-pre1-night-fade-s": `${UX2_PRE_STEP_NIGHT_FADE_MS / 1000}s`,
        opacity: inlineOpacity,
      }}
      aria-hidden={step === -1 && inlineOpacity === 0 && !nightFadingOut}
    >
      <video
        ref={videoRef}
        src={UX2_PRE_STEP_NIGHT_VIDEO}
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}
