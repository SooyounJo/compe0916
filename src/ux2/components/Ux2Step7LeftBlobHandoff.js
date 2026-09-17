"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctLeft7,
  sizeCqwLeft7,
  STEP7_LEFT_MUSIC_BLOB,
  STEP7_LEFT_QR_BLOB,
  UX2_STEP7_QR_BLOB_SRC,
} from "@/ux2/lib/ux2Step7LeftLayout";
import {
  STEP7_LEFT_ICON_HANDOFF_MS,
  STEP7_LEFT_ICON_HOLD_MS,
} from "@/ux2/lib/ux2Step7LeftEnter";
import motionStyles from "@/ux2/styles/step0-icon-motion.module.css";

function posStyle(layout) {
  return {
    left: `${pctLeft7(layout.centerX)}%`,
    top: `${pctLeft7(layout.centerY)}%`,
    width: `${sizeCqwLeft7(layout.size)}%`,
    height: `${sizeCqwLeft7(layout.size)}%`,
  };
}

function BlobImage({ src }) {
  return (
    <div className="relative h-full w-full">
      <Image src={src} alt="" fill className="object-contain" sizes="16vw" />
    </div>
  );
}

/**
 * 7단계 좌 — 상단 video · 하단 QR 유지 후 QR이 상단 슬롯으로 rise (0단계 handoff)
 */
export default function Ux2Step7LeftBlobHandoff({ show = false }) {
  const [phase, setPhase] = useState("idle");
  const [travelToSlot, setTravelToSlot] = useState(false);

  useEffect(() => {
    if (!show) {
      setPhase("idle");
      setTravelToSlot(false);
      return undefined;
    }

    setPhase("hold");
    setTravelToSlot(false);

    const handoffTimer = setTimeout(() => setPhase("handoff"), STEP7_LEFT_ICON_HOLD_MS);
    const settledTimer = setTimeout(
      () => setPhase("settled"),
      STEP7_LEFT_ICON_HOLD_MS + STEP7_LEFT_ICON_HANDOFF_MS,
    );

    return () => {
      clearTimeout(handoffTimer);
      clearTimeout(settledTimer);
    };
  }, [show]);

  useEffect(() => {
    if (phase !== "handoff") {
      setTravelToSlot(false);
      return undefined;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTravelToSlot(true));
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  if (!show && phase === "idle") {
    return null;
  }

  const slotStyle = posStyle(STEP7_LEFT_MUSIC_BLOB);
  const originStyle = posStyle(STEP7_LEFT_QR_BLOB);
  const travelSizeStyle = {
    width: `${sizeCqwLeft7(STEP7_LEFT_MUSIC_BLOB.size)}%`,
    height: `${sizeCqwLeft7(STEP7_LEFT_MUSIC_BLOB.size)}%`,
  };

  const showVideoAtSlot = phase === "hold" || phase === "handoff";
  const showQrAtOrigin = phase === "hold";
  const handoff = phase === "handoff";
  const showQrAtSlot = phase === "settled";

  return (
    <>
      {showVideoAtSlot ? (
        <BlurFade
          show={phase === "hold"}
          className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
          style={slotStyle}
        >
          <BlobImage src="/figma/ux2/step4/video-blob.svg" />
        </BlurFade>
      ) : null}

      {showQrAtOrigin ? (
        <div
          className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
          style={originStyle}
        >
          <BlobImage src={UX2_STEP7_QR_BLOB_SRC} />
        </div>
      ) : null}

      {showQrAtSlot ? (
        <div
          className="absolute z-[4] -translate-x-1/2 -translate-y-1/2"
          style={slotStyle}
        >
          <BlobImage src={UX2_STEP7_QR_BLOB_SRC} />
        </div>
      ) : null}

      {handoff ? (
        <div
          className={`absolute z-[5] ${motionStyles.travel} ${
            travelToSlot ? motionStyles.atSlot : motionStyles.atOrigin
          }`}
          style={{
            left: travelToSlot ? slotStyle.left : originStyle.left,
            top: travelToSlot ? slotStyle.top : originStyle.top,
            ...travelSizeStyle,
          }}
        >
          <BlobImage src={UX2_STEP7_QR_BLOB_SRC} />
        </div>
      ) : null}
    </>
  );
}
