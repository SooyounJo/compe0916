"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ORBIT_BURGER,
  ORBIT_PEOPLE,
  RIGHT_STEP5_STAGGER_INDEX,
  RIGHT_STEP6_EXIT_INDEX,
} from "../lib/orbitIconLayout";
import {
  rightStep5EnterDelayS,
  rightStep6ExitDelayS,
  UX1_STEP6_RIGHT_EXIT_ANIM_S,
} from "../lib/leftOrbitStep4";

const ORBIT_ICONS = [
  {
    id: "people",
    src: "/figma/icon-orbit-people.svg",
    ...ORBIT_PEOPLE,
    staggerIndex: RIGHT_STEP5_STAGGER_INDEX.people,
    exitIndex: RIGHT_STEP6_EXIT_INDEX.people,
  },
  {
    id: "burger",
    src: "/figma/icon-orbit-burger.svg",
    ...ORBIT_BURGER,
    staggerIndex: RIGHT_STEP5_STAGGER_INDEX.burger,
    exitIndex: RIGHT_STEP6_EXIT_INDEX.burger,
  },
];

/** 5·6단계 — 5→6에서 people·burger fade-out */
export default function IconOrbitCarousel({ step }) {
  const [entering, setEntering] = useState(false);
  const [exitingTo6, setExitingTo6] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 5 && prevStep === 4) {
      setEntering(true);
      setExitingTo6(false);
      return undefined;
    }

    if (step === 6 && prevStep === 5) {
      setEntering(false);
      setExitingTo6(true);
      const exitMs =
        (rightStep6ExitDelayS(RIGHT_STEP6_EXIT_INDEX.burger) +
          UX1_STEP6_RIGHT_EXIT_ANIM_S) *
          1000 +
        80;
      const timer = setTimeout(() => setExitingTo6(false), exitMs);
      return () => clearTimeout(timer);
    }

    setEntering(false);
    setExitingTo6(false);
    return undefined;
  }, [step]);

  if (step < 5) return null;
  if (step === 6 && !exitingTo6) return null;

  const playEnter = step === 5 && entering;
  const playExit = step === 6 && exitingTo6;

  return (
    <div className="pointer-events-none absolute inset-0 z-[28]" aria-hidden>
      {ORBIT_ICONS.map((icon) => {
        const motion = playExit
          ? "ux1-right-icon-step6-exit"
          : playEnter
            ? "ux1-right-icon-step5-enter"
            : "icon-orbit-settled";

        return (
          <div
            key={icon.id}
            className={`absolute ${motion}`}
            style={{
              left: icon.left,
              top: icon.top,
              width: `${icon.sizeCqw}cqw`,
              height: `${icon.sizeCqw}cqw`,
              animationDelay: playExit
                ? `${rightStep6ExitDelayS(icon.exitIndex)}s`
                : playEnter
                  ? `${rightStep5EnterDelayS(icon.staggerIndex)}s`
                  : undefined,
            }}
          >
            <div className="relative h-full w-full">
              <span className="icon-orbit-trail absolute inset-[8%] rounded-full bg-white/25 blur-md" />
              <Image
                src={icon.src}
                alt=""
                width={260}
                height={260}
                className="relative z-[1] h-full w-full max-w-none drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
