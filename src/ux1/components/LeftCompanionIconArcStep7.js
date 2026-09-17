"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import RightStep4MusicIcon from "./RightStep4MusicIcon";
import { LEFT_ORBIT_STEP7_ARC_ICONS } from "../lib/leftOrbitStep7";
import {
  LEFT_ORBIT_STEP4_ENTRY_BASE_S,
  UX1_LEFT_ORBIT_STEP4_ENTER_ANIM_S,
} from "../lib/leftOrbitStep4";

/** 7단계 좌 arc — 4단계와 동일 enter-arc 모션·stagger (우→좌 순) */
export default function LeftCompanionIconArcStep7({
  step = 1,
  arcIconsVisible = false,
  entering = false,
}) {
  const [arcSettled, setArcSettled] = useState(false);
  const [enterGen, setEnterGen] = useState(0);
  const enterDoneCountRef = useRef(0);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 7 && prevStep !== 7) {
      enterDoneCountRef.current = 0;
      setEnterGen((gen) => gen + 1);
      if (prevStep === 6) {
        setArcSettled(false);
      } else if (prevStep !== null) {
        setArcSettled(true);
      }
      return undefined;
    }

    if (step !== 7) {
      setArcSettled(false);
    }

    return undefined;
  }, [step]);

  const playEnter =
    step === 7 && arcIconsVisible && entering && !arcSettled;

  const onEnterEnd = useCallback(
    (e) => {
      if (step !== 7 || e.animationName !== "ux1-left-icon-arc-enter") return;
      enterDoneCountRef.current += 1;
      if (enterDoneCountRef.current >= LEFT_ORBIT_STEP7_ARC_ICONS.length) {
        setArcSettled(true);
      }
    },
    [step],
  );

  if (step !== 7) return null;
  if (!arcIconsVisible && entering) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
      {LEFT_ORBIT_STEP7_ARC_ICONS.map((icon) => {
        const motion =
          arcSettled || !entering
            ? "left-icon-orbit-settled"
            : playEnter
              ? "ux1-left-icon-orbit-enter-arc"
              : "left-icon-orbit-settled";

        const delayS = playEnter
          ? LEFT_ORBIT_STEP4_ENTRY_BASE_S + icon.delayS
          : 0;

        const sizeStyle = icon.isMusic
          ? { width: `${icon.sizePct}%`, height: `${icon.sizePct}%` }
          : { width: `${icon.sizeCqw}cqw`, height: `${icon.sizeCqw}cqw` };

        return (
          <div
            key={playEnter ? `${icon.id}-${enterGen}` : icon.id}
            className={`absolute ${motion}`}
            style={{
              ...sizeStyle,
              animationDelay: `${delayS}s`,
              "--orbit-end-left": icon.left,
              "--orbit-end-top": icon.top,
              "--orbit-end-opacity": icon.opacity ?? 1,
            }}
            onAnimationEnd={playEnter ? onEnterEnd : undefined}
          >
            {icon.isMusic ? (
              <RightStep4MusicIcon />
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
