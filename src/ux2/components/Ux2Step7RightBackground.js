"use client";

import { useEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import {
  STEP7_RIGHT_BG_BLUR_CLEAR_MS,
  STEP7_RIGHT_BG_BLUR_END_PX,
  STEP7_RIGHT_BG_BLUR_START_PX,
  STEP7_RIGHT_BG_IMAGE_SCALE,
  UX2_STEP7_RIGHT_BG_VIDEO,
} from "@/ux2/lib/ux2Step7RightLayout";

/** 7~8단계 우측 — 동일 식사 영상 BG (7 진입 시 블러 해제, 8까지 연속 재생) */
export default function Ux2Step7RightBackground({ show = false }) {
  const videoRef = useRef(null);
  const sessionActiveRef = useRef(false);
  const [blurPx, setBlurPx] = useState(STEP7_RIGHT_BG_BLUR_END_PX);

  useEffect(() => {
    const video = videoRef.current;
    if (!show) {
      sessionActiveRef.current = false;
      if (video) {
        video.pause();
      }
      setBlurPx(STEP7_RIGHT_BG_BLUR_START_PX);
      return undefined;
    }

    const freshEnter = !sessionActiveRef.current;
    sessionActiveRef.current = true;

    if (video) {
      if (freshEnter) {
        video.currentTime = 0;
      }
      void video.play().catch(() => {});
    }

    if (freshEnter) {
      setBlurPx(STEP7_RIGHT_BG_BLUR_START_PX);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setBlurPx(STEP7_RIGHT_BG_BLUR_END_PX));
      });
      return () => cancelAnimationFrame(id);
    }

    return undefined;
  }, [show]);

  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[11] overflow-hidden rounded-full"
    >
      <video
        ref={videoRef}
        src={UX2_STEP7_RIGHT_BG_VIDEO}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          transform: `scale(${STEP7_RIGHT_BG_IMAGE_SCALE})`,
          filter: `blur(${blurPx}px)`,
          transition: `filter ${STEP7_RIGHT_BG_BLUR_CLEAR_MS}ms cubic-bezier(0.33, 0, 0.15, 1)`,
        }}
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
    </BlurFade>
  );
}
