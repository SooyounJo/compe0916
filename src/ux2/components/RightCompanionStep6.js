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
  UX2_STEP7_VIDEO_BLOB_WHITE,
} from "@/ux2/lib/ux2Step7RightLayout";
import { STEP7_LEFT_ICON_HOLD_MS } from "@/ux2/lib/ux2Step7LeftEnter";
import {
  UX2_STEP8_COMPOSE_IN_BLOB_SCALE,
  UX2_STEP8_COMPOSE_WHITE,
} from "@/ux2/lib/ux2Step8Icons";

/** 6·7·8 우측 — 6·7 카메라 블롭 · 8은 동일 블롭 + compose_outline */
export default function RightCompanionStep6({ show = false, step = 6 }) {
  const step7 = step === 7;
  const step8 = step === 8;
  const useStep7Layout = step7;
  const [step7QrActive, setStep7QrActive] = useState(false);

  useEffect(() => {
    if (!show || !step7) {
      setStep7QrActive(false);
      return undefined;
    }
    setStep7QrActive(false);
    const t = setTimeout(() => setStep7QrActive(true), STEP7_LEFT_ICON_HOLD_MS);
    return () => clearTimeout(t);
  }, [show, step7]);

  const layout = step8
    ? STEP6_RIGHT_VIDEO_BLOB
    : useStep7Layout
      ? STEP7_RIGHT_ICON_BLOB
      : STEP6_RIGHT_VIDEO_BLOB;
  const pct = step8 || !useStep7Layout ? pctRight6 : pctRight7;
  const sizeCqw = step8 || !useStep7Layout ? sizeCqwRight6 : sizeCqwRight7;
  const blobSize = sizeCqw(layout.size);
  const blobSrc = step8
    ? UX2_STEP7_VIDEO_BLOB_WHITE
    : useStep7Layout
      ? step7QrActive
        ? UX2_STEP7_QR_BLOB_WHITE
        : UX2_STEP7_VIDEO_BLOB_WHITE
      : "/figma/ux2/step4/video-blob.svg";

  return (
    <BlurFade
      show={show}
      className="party-night-foreground right-step6-dual-in pointer-events-none absolute inset-0 z-[14] overflow-hidden"
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
        <div className="relative h-full w-full">
          <Image
            src={blobSrc}
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
            sizes="18vw"
          />
          {step8 ? (
            <Image
              src={UX2_STEP8_COMPOSE_WHITE}
              alt=""
              width={96}
              height={96}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain opacity-95"
              style={{
                width: `${UX2_STEP8_COMPOSE_IN_BLOB_SCALE * 100}%`,
                height: `${UX2_STEP8_COMPOSE_IN_BLOB_SCALE * 100}%`,
              }}
            />
          ) : null}
        </div>
      </div>
    </BlurFade>
  );
}
