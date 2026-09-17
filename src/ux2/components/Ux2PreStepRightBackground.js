"use client";

import { useEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import {
  UX2_PRE_STEP_NIGHT_FADE_MS,
  UX2_PRE_STEP_NIGHT_HOLD_MS,
} from "@/ux2/lib/ux2PreStepRightEnter";
import { UX2_FIRST_STEP } from "@/ux2/lib/ux2FlowSteps";
import styles from "@/ux2/styles/ux2PreStepRightBackground.module.css";

export const UX2_PRE_STEP_NIGHT_VIDEO = "/video/ux2-pre-step-night.mp4";

/** -4~-2: night BlurFade in · -1: hold 후 BlurFade out → Weather BG */
export default function Ux2PreStepRightBackground({ step = 0 }) {
  const videoRef = useRef(null);
  const prevStepRef = useRef(step);
  const fadeTimerRef = useRef(null);
  const unmountTimerRef = useRef(null);
  const [layerMounted, setLayerMounted] = useState(
    step >= UX2_FIRST_STEP && step <= -1,
  );
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);

    if (step >= UX2_FIRST_STEP && step <= -2) {
      setLayerMounted(true);
      const enteringNight =
        prev < UX2_FIRST_STEP || prev > -1 || prev === null;
      if (enteringNight) {
        setVideoVisible(false);
        const enterId = requestAnimationFrame(() => {
          requestAnimationFrame(() => setVideoVisible(true));
        });
        return () => cancelAnimationFrame(enterId);
      }
      setVideoVisible(true);
      return undefined;
    }

    if (step === -1) {
      setLayerMounted(true);
      setVideoVisible(true);
      fadeTimerRef.current = setTimeout(() => {
        setVideoVisible(false);
        unmountTimerRef.current = setTimeout(() => {
          setLayerMounted(false);
        }, UX2_PRE_STEP_NIGHT_FADE_MS + 80);
      }, UX2_PRE_STEP_NIGHT_HOLD_MS);
      return () => {
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
      };
    }

    if (step >= 0) {
      setVideoVisible(false);
      unmountTimerRef.current = setTimeout(() => {
        setLayerMounted(false);
      }, UX2_PRE_STEP_NIGHT_FADE_MS + 80);
      return () => {
        if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
      };
    }

    setVideoVisible(false);
    setLayerMounted(false);
    return undefined;
  }, [step]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (videoVisible && layerMounted) {
      void video.play().catch(() => {});
      return undefined;
    }

    video.pause();
    return undefined;
  }, [videoVisible, layerMounted]);

  if (!layerMounted) {
    return null;
  }

  return (
    <BlurFade
      show={videoVisible}
      className={`${styles.nightVideo} pointer-events-none absolute inset-0 z-[10] overflow-hidden rounded-full`}
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
    </BlurFade>
  );
}
