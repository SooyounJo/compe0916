"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Ux2PreStepBlobReveal from "@/ux2/components/Ux2PreStepBlobReveal";
import { pctCircleRight } from "@/ux2/lib/ux2Step0Layout";
import {
  UX2_PRE_STEP2_BLOB_ENTER_DURATION_S,
  ux2PreStep2ArcExitTotalMs,
  ux2PreStep2BlobEnterDelayS,
} from "@/ux2/lib/ux2PreStep2BlobEnter";
import {
  PRE_STEP_RIGHT_2_CALENDAR,
  PRE_STEP_RIGHT_2_GALLERY,
} from "@/ux2/lib/ux2PreStepRightLayout";
import tintStyles from "@/ux2/styles/icon-tint.module.css";

function pctBlobSize(px) {
  return pctCircleRight(px);
}

function IconBlobImage({
  blobId,
  enter,
  exit,
  centerX,
  centerY,
  sizePx,
  blobSrc,
  iconSrc,
  endOpacity = 1,
  iconInsetPct = 28,
}) {
  const blobCqw = pctBlobSize(sizePx);
  return (
    <Ux2PreStepBlobReveal
      blobId={blobId}
      enter={enter}
      exit={exit}
      endOpacity={endOpacity}
      style={{
        left: `${pctCircleRight(centerX)}%`,
        top: `${pctCircleRight(centerY)}%`,
        width: `${blobCqw}cqw`,
        height: `${blobCqw}cqw`,
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src={blobSrc}
          alt=""
          fill
          className={`object-contain ${
            iconSrc ? "" : "brightness-[1.12] contrast-[0.92] saturate-[0.35]"
          }`}
          sizes="18vw"
        />
        {iconSrc ? (
          <div className="absolute" style={{ inset: `${iconInsetPct}%` }}>
            <div
              className={`h-full w-full ${tintStyles.glyphWhiteFill}`}
              style={{ ["--ux2-icon-mask"]: `url(${iconSrc})` }}
              aria-hidden
            />
          </div>
        ) : null}
      </div>
    </Ux2PreStepBlobReveal>
  );
}

/**
 * Figma [12:638](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=12-638)
 * -2→-1: arc만 blur·opacity 퇴장, 메인 검색은 Ux2RightPreStepSearchPersist 유지
 */
export default function RightCompanionPreStep2({ step = 0 }) {
  const prevStepRef = useRef(step);
  const [preStep2EnterKey, setPreStep2EnterKey] = useState(0);
  const [playEnter, setPlayEnter] = useState(false);
  const [playExit, setPlayExit] = useState(false);
  const [showArcLayer, setShowArcLayer] = useState(step === -2);

  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (step === -2 && prev !== -2) {
      setShowArcLayer(true);
      setPlayExit(false);
      setPreStep2EnterKey((k) => k + 1);
      setPlayEnter(true);
      const endS =
        ux2PreStep2BlobEnterDelayS("rightCalendar") +
        UX2_PRE_STEP2_BLOB_ENTER_DURATION_S;
      const t = setTimeout(() => setPlayEnter(false), endS * 1000 + 80);
      return () => clearTimeout(t);
    }

    if (prev === -2 && step === -1) {
      setPlayEnter(false);
      setPlayExit(true);
      setShowArcLayer(true);
      const t = setTimeout(
        () => setShowArcLayer(false),
        ux2PreStep2ArcExitTotalMs(),
      );
      return () => clearTimeout(t);
    }

    if (step === -2) {
      setShowArcLayer(true);
      setPlayExit(false);
    } else if (step < -2) {
      setShowArcLayer(false);
      setPlayEnter(false);
      setPlayExit(false);
    }

    return undefined;
  }, [step]);

  if (!showArcLayer) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[16] overflow-hidden">
      <div key={`pre-step-2-right-blobs-${preStep2EnterKey}`}>
        <IconBlobImage
          blobId="rightGallery"
          enter={playEnter}
          exit={playExit}
          centerX={PRE_STEP_RIGHT_2_GALLERY.centerX}
          centerY={PRE_STEP_RIGHT_2_GALLERY.centerY}
          sizePx={PRE_STEP_RIGHT_2_GALLERY.size}
          blobSrc="/figma/ux2/step4/gallery-blob.svg"
          iconInsetPct={24}
        />

        <IconBlobImage
          blobId="rightCalendar"
          enter={playEnter}
          exit={playExit}
          centerX={PRE_STEP_RIGHT_2_CALENDAR.centerX}
          centerY={PRE_STEP_RIGHT_2_CALENDAR.centerY}
          sizePx={PRE_STEP_RIGHT_2_CALENDAR.size}
          blobSrc="/figma/left-orbit/calendar-blob.svg"
          iconSrc="/figma/left-orbit/calendar-icon.svg"
          endOpacity={0.4}
          iconInsetPct={22}
        />
      </div>
    </div>
  );
}
