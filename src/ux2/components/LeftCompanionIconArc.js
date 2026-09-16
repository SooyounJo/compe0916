"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  markLeftOrbitEnterPlayed,
  shouldPlayLeftOrbitEnter,
} from "@/lib/leftOrbitEnterLatch";
import {
  LEFT_ORBIT_ARC_ENTRY,
  LEFT_ORBIT_STEP4_ENTRY_BASE_S,
  LEFT_ORBIT_STEP4_ICONS,
} from "@/lib/leftOrbitStep4";
import {
  LEFT_STEP5_ICONS,
  LEFT_STEP5_INNER_PCT,
} from "@/lib/leftOrbitStep5";

function iconMotionClass(step, arcSettled, playEnter) {
  if (step === 5) return "left-icon-orbit-settled";
  if (step === 4 && arcSettled) return "left-icon-orbit-settled";
  if (step === 4 && playEnter) return "left-icon-orbit-enter-arc";
  if (step === 4) return "left-icon-orbit-settled";
  return "";
}

function Step5Icon({ icon }) {
  const innerPct = icon.innerPct ?? LEFT_STEP5_INNER_PCT;
  const innerStyle = {
    width: `${innerPct}%`,
    height: `${innerPct}%`,
  };

  return (
    <div
      className="left-icon-orbit-settled absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: icon.left,
        top: icon.top,
        width: `${icon.sizeCqw}cqw`,
        height: `${icon.sizeCqw}cqw`,
        opacity: icon.opacity ?? 1,
      }}
    >
      {icon.variant === "music" ? (
        <div className="relative h-full w-full">
          <Image
            src="/figma/left-orbit/step6-music-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            sizes="20vw"
          />
          <Image
            src="/figma/left-orbit/step6-music-note.svg"
            alt=""
            width={84}
            height={84}
            style={innerStyle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      ) : icon.iconSrc ? (
        <div className="relative h-full w-full">
          <Image
            src={icon.src}
            alt=""
            fill
            className="object-contain"
            sizes="20vw"
          />
          <Image
            src={icon.iconSrc}
            alt=""
            width={84}
            height={84}
            style={innerStyle}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      ) : (
        <div className="relative h-full w-full">
          <Image
            src={icon.src}
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            sizes="20vw"
          />
        </div>
      )}
    </div>
  );
}

/** 좌측 4 arc · 5 Figma 17:1686 정착 */
export default function LeftCompanionIconArc({ step = 1 }) {
  const [arcSettled, setArcSettled] = useState(false);
  const [entering, setEntering] = useState(false);
  const enterDoneCountRef = useRef(0);

  useEffect(() => {
    enterDoneCountRef.current = 0;
    if (step === 4 && shouldPlayLeftOrbitEnter(4)) {
      setEntering(true);
      setArcSettled(false);
    } else if (step === 4) {
      setEntering(false);
      setArcSettled(true);
    }
    if (step < 4) {
      setEntering(false);
      setArcSettled(false);
    }
    if (step === 5) setEntering(false);
  }, [step]);

  const playEnter = step === 4 && entering && !arcSettled;

  const onEnterStart = useCallback(
    (e) => {
      if (step !== 4 || e.animationName !== "left-icon-arc-enter") return;
      markLeftOrbitEnterPlayed();
    },
    [step],
  );

  const onEnterEnd = useCallback(
    (e) => {
      if (step !== 4 || e.animationName !== "left-icon-arc-enter") return;
      enterDoneCountRef.current += 1;
      if (enterDoneCountRef.current >= LEFT_ORBIT_STEP4_ICONS.length) {
        setArcSettled(true);
      }
    },
    [step],
  );

  if (step !== 4 && step !== 5) return null;

  if (step === 5) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        aria-hidden
      >
        {LEFT_STEP5_ICONS.map((icon) => (
          <Step5Icon key={icon.id} icon={icon} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4]"
      aria-hidden
    >
      {LEFT_ORBIT_STEP4_ICONS.map((icon) => {
        const motion = iconMotionClass(step, arcSettled, playEnter);
        const delayS = playEnter
          ? LEFT_ORBIT_STEP4_ENTRY_BASE_S + icon.delayS
          : 0;

        return (
          <div
            key={icon.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 will-change-[left,top,transform,opacity,filter] ${motion}`}
            style={{
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: `${delayS}s`,
              "--orbit-start-left":
                icon.entryStartLeft ?? LEFT_ORBIT_ARC_ENTRY.left,
              "--orbit-start-top":
                icon.entryStartTop ?? LEFT_ORBIT_ARC_ENTRY.top,
              "--orbit-entry-rim-a-left": icon.entryRimALeft,
              "--orbit-entry-rim-a-top": icon.entryRimATop,
              "--orbit-entry-rim-b-left": icon.entryRimBLeft,
              "--orbit-entry-rim-b-top": icon.entryRimBTop,
              "--orbit-entry-rim-c-left": icon.entryRimCLeft,
              "--orbit-entry-rim-c-top": icon.entryRimCTop,
              "--orbit-entry-rim-d-left": icon.entryRimDLeft,
              "--orbit-entry-rim-d-top": icon.entryRimDTop,
              "--orbit-end-left": icon.left,
              "--orbit-end-top": icon.top,
              "--orbit-end-opacity": icon.opacity ?? 1,
              "--orbit-rim-a-left": icon.rimALeft,
              "--orbit-rim-a-top": icon.rimATop,
              "--orbit-rim-b-left": icon.rimBLeft,
              "--orbit-rim-b-top": icon.rimBTop,
              "--orbit-dip-left": icon.dipLeft,
              "--orbit-dip-top": icon.dipTop,
              "--orbit-s-out-left": icon.sOutLeft,
              "--orbit-s-out-top": icon.sOutTop,
              "--orbit-s-mid-left": icon.sMidLeft,
              "--orbit-s-mid-top": icon.sMidTop,
              "--orbit-s-bridge-left": icon.sBridgeLeft,
              "--orbit-s-bridge-top": icon.sBridgeTop,
              "--orbit-relocate-left": icon.relocateLeft,
              "--orbit-relocate-top": icon.relocateTop,
            }}
            onAnimationStart={playEnter ? onEnterStart : undefined}
            onAnimationEnd={playEnter ? onEnterEnd : undefined}
          >
            {icon.iconSrc ? (
              <div className="relative h-full w-full">
                <Image
                  src={icon.src}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="20vw"
                />
                <Image
                  src={icon.iconSrc}
                  alt=""
                  width={84}
                  height={84}
                  className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={icon.src}
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
                  sizes="20vw"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
