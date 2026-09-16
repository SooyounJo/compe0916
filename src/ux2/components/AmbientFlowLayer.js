"use client";

import { useEffect, useRef } from "react";

/** weather-bg와 동일 구간 루프 */
const BG_LOOP_END_S = 5.11;

/**
 * Figma mesh + MP4 — 좌측 엠비언트가 계속 흐르도록 (blur는 wrapper)
 */
export default function AmbientFlowLayer({
  className = "",
  meshSrc = "/figma/mesh-weather.png",
  showVideo = true,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!showVideo) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    const loopSegment = () => {
      if (video.currentTime >= BG_LOOP_END_S) {
        video.currentTime = 0;
      }
    };

    const ensurePlay = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    ensurePlay();
    video.addEventListener("loadeddata", ensurePlay);
    video.addEventListener("canplay", ensurePlay);
    video.addEventListener("timeupdate", loopSegment);

    return () => {
      video.removeEventListener("loadeddata", ensurePlay);
      video.removeEventListener("canplay", ensurePlay);
      video.removeEventListener("timeupdate", loopSegment);
    };
  }, [showVideo]);

  return (
    <div className={`ambient-flow ${className}`} aria-hidden>
      {showVideo ? (
        <div className="ambient-flow__video">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop={false}
            playsInline
            preload="auto"
            className="ambient-flow__video-el"
          >
            <source src="/video/weather-bg.mp4" type="video/mp4" />
          </video>
        </div>
      ) : null}
      <div className="ambient-flow__mesh">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={meshSrc} alt="" className="ambient-flow__mesh-img" />
      </div>
    </div>
  );
}
