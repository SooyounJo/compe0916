"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctRight6,
  sizeCqwRight6,
  STEP6_RIGHT_VIDEO_BLOB,
} from "@/ux2/lib/ux2Step6RightLayout";
import {
  pctRight7,
  sizeCqwRight7,
  STEP7_RIGHT_ICON_BLOB,
  UX2_STEP7_QR_BLOB_WHITE,
} from "@/ux2/lib/ux2Step7RightLayout";

import {
  UX2_RIGHT_VIDEO_BLOB_SRC,
  UX2_RIGHT_WHITE_BLOB_IMG_CLASS,
} from "@/ux2/lib/ux2RightIconFill";
import { STEP7_LEFT_ICON_HOLD_MS } from "@/ux2/lib/ux2Step7LeftEnter";
import continuityStyles from "@/ux2/styles/ux2Step67Continuity.module.css";
/** 6 — 컬러 video · 7~11 — 7단계 QR(white) 정착 유지 */
export default function RightCompanionStep6({ show = false, step = 6 }) {
  const useStep7Layout = step >= 7;
  const [step7QrActive, setStep7QrActive] = useState(false);

  useEffect(() => {
    if (!show || step < 7) {
      setStep7QrActive(false);
      return undefined;
    }
    if (step >= 8) {
      setStep7QrActive(true);
      return undefined;
    }
    setStep7QrActive(false);
    const t = setTimeout(() => setStep7QrActive(true), STEP7_LEFT_ICON_HOLD_MS);
    return () => clearTimeout(t);
  }, [show, step]);

  const layout = useStep7Layout
    ? STEP7_RIGHT_ICON_BLOB
    : STEP6_RIGHT_VIDEO_BLOB;
  const pct = useStep7Layout ? pctRight7 : pctRight6;
  const sizeCqw = useStep7Layout ? sizeCqwRight7 : sizeCqwRight6;
  const blobSize = sizeCqw(layout.size);
  const showQrBlob = useStep7Layout && step7QrActive;
  const showColoredVideo = !useStep7Layout || (step === 7 && !step7QrActive);

  return (
    <BlurFade
      show={show}
      className={`party-night-foreground pointer-events-none absolute inset-0 z-[14] overflow-hidden ${
        step >= 7
          ? continuityStyles.rightContinuity
          : "right-step6-dual-in"
      }`}
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
        <div className={continuityStyles.blobCrossfade}>
          <div
            className={`${continuityStyles.blobLayer} ${
              showColoredVideo
                ? continuityStyles.blobLayerVisible
                : continuityStyles.blobLayerHidden
            }`}
          >
            <Image
              src={UX2_RIGHT_VIDEO_BLOB_SRC}
              alt=""
              fill
              className={UX2_RIGHT_WHITE_BLOB_IMG_CLASS}
              sizes="18vw"
            />
          </div>
          <div
            className={`${continuityStyles.blobLayer} ${
              showQrBlob
                ? continuityStyles.blobLayerVisible
                : continuityStyles.blobLayerHidden
            }`}
          >
            <Image
              src={UX2_STEP7_QR_BLOB_WHITE}
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
