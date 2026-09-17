"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import continuityStyles from "@/ux2/styles/ux2Step67Continuity.module.css";
import Ux2LeftCenterLoadingDots from "@/ux2/components/Ux2LeftCenterLoadingDots";
import Ux2Ux1Step7CenterLoadingDots from "@/ux2/components/Ux2Ux1Step7CenterLoadingDots";
import {
  pctLeft6,
  sizeCqwLeft6,
  STEP6_LEFT_DOTS,
  STEP6_LEFT_MUSIC,
  STEP6_LEFT_ORBIT_A,
  STEP6_LEFT_VOICE,
} from "@/ux2/lib/ux2Step6LeftLayout";
import {
  UX2_UX1_STEP4_ENTER_ANIM_S,
  UX2_UX1_STEP4_ENTRY_BASE_S,
} from "@/ux2/lib/ux2Ux1Step45Timing";
import {
  ux2Step6LeftEnterDelayS,
  ux2Step6LeftQrBlurEnterDelayS,
} from "@/ux2/lib/ux2Step6LeftEnter";
import qrBlurStyles from "@/ux2/styles/ux2Step6QrBlurIn.module.css";
import {
  pctLeft7,
  sizeCqwLeft7,
  STEP7_LEFT_MUSIC_BLOB,
  UX2_STEP7_QR_BLOB_SRC,
} from "@/ux2/lib/ux2Step7LeftLayout";
import Ux2Step7LeftBlobHandoff from "@/ux2/components/Ux2Step7LeftBlobHandoff";

const UX1_STEP6_ENTER = "ux1-left-icon-orbit-enter-arc";
const UX1_STEP6_SETTLED = "left-icon-orbit-settled";

function Step6EnterSlot({
  enterId,
  playEnter,
  enterGen,
  centerX,
  centerY,
  sizeCqw,
  pct = pctLeft6,
  sizeCqwFn = sizeCqwLeft6,
  onAnimationEnd,
  children,
}) {
  const size = sizeCqwFn(sizeCqw);
  const left = `${pct(centerX)}%`;
  const top = `${pct(centerY)}%`;
  const motion = playEnter ? UX1_STEP6_ENTER : UX1_STEP6_SETTLED;
  const delayS = playEnter
    ? UX2_UX1_STEP4_ENTRY_BASE_S + ux2Step6LeftEnterDelayS(enterId)
    : 0;

  return (
    <div
      key={playEnter ? `${enterId}-${enterGen}` : enterId}
      className={`absolute ${motion}`}
      style={{
        width: `${size}%`,
        height: `${size}%`,
        "--orbit-end-left": left,
        "--orbit-end-top": top,
        animationDelay: playEnter ? `${delayS}s` : undefined,
        animationDuration: playEnter ? `${UX2_UX1_STEP4_ENTER_ANIM_S}s` : undefined,
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  );
}

function OrbitIcon({
  layout,
  blobSrc,
  iconSrc,
  iconScale = 0.43,
}) {
  return (
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
  );
}

/** Figma [8:142](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=8-142) */
const STEP6_DOTS_CENTER_Y =
  STEP6_LEFT_DOTS.top + STEP6_LEFT_DOTS.height / 2;

function SettledOrbitSlot({ layout, pct = pctLeft6, sizeCqw = sizeCqwLeft6, children }) {
  const size = sizeCqw(layout.size);
  return (
    <div
      className={`absolute ${UX1_STEP6_SETTLED}`}
      style={{
        width: `${size}%`,
        height: `${size}%`,
        "--orbit-end-left": `${pct(layout.centerX)}%`,
        "--orbit-end-top": `${pct(layout.centerY)}%`,
      }}
    >
      {children}
    </div>
  );
}

/** 6단계 QR — 전경 페이드·video와 분리, 지연 후 blur·opacity */
function Step6QrBlurSlot({ step, enterGen, layout, children }) {
  const [showQr, setShowQr] = useState(false);
  const [playReveal, setPlayReveal] = useState(false);
  const size = sizeCqwLeft6(layout.size);

  useLayoutEffect(() => {
    if (step < 6) {
      setShowQr(false);
      setPlayReveal(false);
      return undefined;
    }
    if (step > 6) {
      setShowQr(true);
      setPlayReveal(false);
      return undefined;
    }
    setShowQr(false);
    setPlayReveal(false);
    const delayMs = ux2Step6LeftQrBlurEnterDelayS() * 1000;
    const t = setTimeout(() => {
      setShowQr(true);
      setPlayReveal(true);
    }, delayMs);
    return () => clearTimeout(t);
  }, [step, enterGen]);

  if (!showQr) {
    return null;
  }

  return (
    <div
      className={`absolute ${UX1_STEP6_SETTLED} ${
        playReveal ? qrBlurStyles.reveal : ""
      }`}
      style={{
        width: `${size}%`,
        height: `${size}%`,
        "--orbit-end-left": `${pctLeft6(layout.centerX)}%`,
        "--orbit-end-top": `${pctLeft6(layout.centerY)}%`,
      }}
    >
      {children}
    </div>
  );
}

export default function LeftCompanionStep6({ show = false, step = 6 }) {
  const showCenterDots = step >= 6 && step <= 7;
  const [persistVideo, setPersistVideo] = useState(step <= 7);
  const [entering, setEntering] = useState(false);
  const [enterSettled, setEnterSettled] = useState(step !== 6);
  const [enterGen, setEnterGen] = useState(0);
  const enterDoneRef = useRef(0);
  const prevStepRef = useRef(null);

  const playStep6Enter = step === 6 && !enterSettled;

  useLayoutEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 6 && prev !== 6) {
      enterDoneRef.current = 0;
      setEnterGen((g) => g + 1);
      setEntering(true);
      setEnterSettled(false);
      return undefined;
    }

    if (step !== 6) {
      setEntering(false);
      if (step > 6) {
        setEnterSettled(true);
      } else {
        setEnterSettled(false);
      }
    }

    return undefined;
  }, [step]);

  const onStep6EnterEnd = useCallback((e) => {
    if (e.animationName !== "ux1-left-icon-arc-enter") {
      return;
    }
    enterDoneRef.current += 1;
    if (enterDoneRef.current >= 2) {
      setEnterSettled(true);
      setEntering(false);
    }
  }, []);

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
    <>
    <BlurFade
      show={show}
      className={`party-night-foreground pointer-events-none absolute inset-0 z-[6] overflow-hidden ${
        step >= 7 ? continuityStyles.rightContinuity : ""
      }`}
    >
      {showCenterDots ? (
        <Step6EnterSlot
          enterId="dots"
          playEnter={playStep6Enter}
          enterGen={enterGen}
          centerX={STEP6_LEFT_VOICE.centerX}
          centerY={STEP6_DOTS_CENTER_Y}
          sizeCqw={STEP6_LEFT_DOTS.width}
          onAnimationEnd={playStep6Enter ? onStep6EnterEnd : undefined}
        >
          <div className="flex h-full w-full items-center justify-center">
            {step === 7 ? (
              <Ux2Ux1Step7CenterLoadingDots />
            ) : (
              <Ux2LeftCenterLoadingDots />
            )}
          </div>
        </Step6EnterSlot>
      ) : null}

      {showSharedVideo ? (
        <Step6EnterSlot
          enterId="music"
          playEnter={playStep6Enter && step === 6}
          enterGen={enterGen}
          centerX={videoLayout.centerX}
          centerY={videoLayout.centerY}
          sizeCqw={videoLayout.size}
          pct={videoPct}
          sizeCqwFn={videoSizeCqw}
          onAnimationEnd={playStep6Enter ? onStep6EnterEnd : undefined}
        >
          <OrbitIcon
            layout={videoLayout}
            blobSrc="/figma/ux2/step4/video-blob.svg"
            iconSrc={null}
          />
        </Step6EnterSlot>
      ) : null}

      {step === 7 ? (
        <Ux2Step7LeftBlobHandoff
          show={show}
          onSettled={onStep7HandoffSettled}
        />
      ) : null}

      {step >= 8 && step <= 11 ? (
        <SettledOrbitSlot
          layout={STEP7_LEFT_MUSIC_BLOB}
          pct={pctLeft7}
          sizeCqw={sizeCqwLeft7}
        >
          <OrbitIcon
            layout={STEP7_LEFT_MUSIC_BLOB}
            blobSrc={UX2_STEP7_QR_BLOB_SRC}
            iconSrc={null}
          />
        </SettledOrbitSlot>
      ) : null}

    </BlurFade>

    {show && (step === 6 || step === 7) ? (
      <div
        className={`pointer-events-none absolute inset-0 z-[8] overflow-hidden ${
          step === 7 ? continuityStyles.orbit6FadeOut : ""
        }`}
      >
        <Step6QrBlurSlot
          step={step}
          enterGen={enterGen}
          layout={STEP6_LEFT_ORBIT_A}
        >
          <OrbitIcon
            layout={STEP6_LEFT_ORBIT_A}
            blobSrc={UX2_STEP7_QR_BLOB_SRC}
            iconSrc={null}
          />
        </Step6QrBlurSlot>
      </div>
    ) : null}
    </>
  );
}
