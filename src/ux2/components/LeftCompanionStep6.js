"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import continuityStyles from "@/ux2/styles/ux2Step67Continuity.module.css";
import Ux2LeftCenterLoadingDots from "@/ux2/components/Ux2LeftCenterLoadingDots";
import {
  pctLeft6,
  sizeCqwLeft6,
  STEP6_LEFT_DOTS,
  STEP6_LEFT_MUSIC,
  STEP6_LEFT_ORBIT_A,
  STEP6_LEFT_ORBIT_C,
} from "@/ux2/lib/ux2Step6LeftLayout";
import {
  pctLeft7,
  sizeCqwLeft7,
  STEP7_LEFT_MUSIC_BLOB,
  UX2_STEP7_QR_BLOB_SRC,
} from "@/ux2/lib/ux2Step7LeftLayout";
import Ux2Step7LeftBlobHandoff from "@/ux2/components/Ux2Step7LeftBlobHandoff";

function OrbitIcon({
  layout,
  blobSrc,
  iconSrc,
  iconScale = 0.43,
  pct = pctLeft6,
  sizeCqw = sizeCqwLeft6,
}) {
  const size = sizeCqw(layout.size);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pct(layout.centerX)}%`,
        top: `${pct(layout.centerY)}%`,
        width: `${size}%`,
        height: `${size}%`,
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src={blobSrc}
          alt=""
          fill
          className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
          sizes="16vw"
        />
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={96}
            height={96}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain opacity-90"
            style={{ width: `${iconScale * 100}%`, height: `${iconScale * 100}%` }}
          />
        ) : null}
      </div>
    </div>
  );
}

/** Figma [8:142](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-142) */
export default function LeftCompanionStep6({ show = false, step = 6 }) {
  const step7Plus = step >= 7;
  const showCenterDots = step >= 6 && step <= 7;
  const [persistVideo, setPersistVideo] = useState(step <= 7);

  useEffect(() => {
    if (step === 6) {
      setPersistVideo(true);
    }
    if (step >= 8) {
      setPersistVideo(false);
    }
  }, [step]);

  const onStep7HandoffSettled = useCallback(() => {
    setPersistVideo(false);
  }, []);

  const showSharedVideo =
    persistVideo && (step === 6 || step === 7);
  const videoLayout =
    step >= 7 ? STEP7_LEFT_MUSIC_BLOB : STEP6_LEFT_MUSIC;
  const videoPct = step >= 7 ? pctLeft7 : pctLeft6;
  const videoSizeCqw = step >= 7 ? sizeCqwLeft7 : sizeCqwLeft6;

  return (
    <BlurFade
      show={show}
      className={`party-night-foreground pointer-events-none absolute inset-0 z-[6] overflow-hidden ${
        step >= 7 ? continuityStyles.rightContinuity : ""
      }`}
    >
      {showCenterDots ? (
        <div
          className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center"
          style={{
            top: `${pctLeft6(STEP6_LEFT_DOTS.top)}%`,
            width: `${pctLeft6(STEP6_LEFT_DOTS.width)}%`,
            height: `${pctLeft6(STEP6_LEFT_DOTS.height)}%`,
          }}
        >
          <Ux2LeftCenterLoadingDots />
        </div>
      ) : null}

      {showSharedVideo ? (
        <OrbitIcon
          layout={videoLayout}
          blobSrc="/figma/ux2/step4/video-blob.svg"
          iconSrc={null}
          pct={videoPct}
          sizeCqw={videoSizeCqw}
        />
      ) : null}

      {step === 7 ? (
        <Ux2Step7LeftBlobHandoff
          show={show}
          onSettled={onStep7HandoffSettled}
        />
      ) : null}

      {step >= 8 && step <= 11 ? (
        <OrbitIcon
          layout={STEP7_LEFT_MUSIC_BLOB}
          blobSrc={UX2_STEP7_QR_BLOB_SRC}
          iconSrc={null}
          pct={pctLeft7}
          sizeCqw={sizeCqwLeft7}
        />
      ) : null}

      {step === 6 || step === 7 ? (
        <div
          className={
            step === 7 ? continuityStyles.orbit6FadeOut : undefined
          }
        >
          <OrbitIcon
            layout={STEP6_LEFT_ORBIT_A}
            blobSrc={UX2_STEP7_QR_BLOB_SRC}
            iconSrc={null}
          />
          <OrbitIcon
            layout={STEP6_LEFT_ORBIT_C}
            blobSrc="/figma/ux2/step4/edit-blob.svg"
            iconSrc={null}
          />
        </div>
      ) : null}
    </BlurFade>
  );
}
