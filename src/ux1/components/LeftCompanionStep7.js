"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AgentDotsContinuity } from "./AgentDots";
import VoiceRecorder from "./VoiceRecorder";
import RightStep4MusicIcon from "./RightStep4MusicIcon";
import LeftCompanionIconArcStep7 from "./LeftCompanionIconArcStep7";
import {
  step7ArcIconsTotalS,
  UX1_STEP7_ARC_ICONS_BASE_S,
  UX1_STEP7_MUSIC_OUT_ANIM_S,
  UX1_STEP7_MUSIC_OUT_DELAY_S,
  UX1_STEP7_SOUND_IN_ANIM_S,
  UX1_STEP7_SOUND_IN_DELAY_S,
} from "../lib/leftOrbitStep7";

/** 6→7: 음악 out → 사운드 in → arc — 7→8 arc 퇴장까지 동일 인스턴스 유지 */
export default function LeftCompanionStep7({ step = 1 }) {
  const [entering, setEntering] = useState(false);
  const [musicHandoff, setMusicHandoff] = useState(false);
  const [soundVisible, setSoundVisible] = useState(false);
  const [arcIconsVisible, setArcIconsVisible] = useState(false);
  const prevStepRef = useRef(null);

  useLayoutEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    if (step === 7 && prevStep === 6) {
      setEntering(true);
      setMusicHandoff(true);
      setSoundVisible(false);
      setArcIconsVisible(false);
      return undefined;
    }

    if (step === 7) {
      setEntering(false);
      setMusicHandoff(false);
      setSoundVisible(true);
      setArcIconsVisible(true);
      return undefined;
    }

    if (step === 8 && prevStep === 7) {
      setEntering(false);
      setArcIconsVisible(true);
      return undefined;
    }

    if (step === 8) {
      setEntering(false);
      setArcIconsVisible(true);
      return undefined;
    }

    setEntering(false);
    setMusicHandoff(false);
    setSoundVisible(false);
    setArcIconsVisible(false);
    return undefined;
  }, [step]);

  useEffect(() => {
    if (!entering) return undefined;

    const soundTimer = setTimeout(
      () => setSoundVisible(true),
      UX1_STEP7_SOUND_IN_DELAY_S * 1000,
    );

    const musicHideTimer = setTimeout(
      () => setMusicHandoff(false),
      (UX1_STEP7_MUSIC_OUT_DELAY_S + UX1_STEP7_MUSIC_OUT_ANIM_S) * 1000,
    );

    const arcIconsTimer = setTimeout(
      () => setArcIconsVisible(true),
      UX1_STEP7_ARC_ICONS_BASE_S * 1000,
    );

    const settleTimer = setTimeout(
      () => setEntering(false),
      step7ArcIconsTotalS() * 1000 + 200,
    );

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(musicHideTimer);
      clearTimeout(arcIconsTimer);
      clearTimeout(settleTimer);
    };
  }, [entering]);

  if (step !== 7 && step !== 8) return null;

  return (
    <>
      {step === 7 ? (
        <div className="pointer-events-none absolute inset-0 z-[6]">
          <div
            className="absolute inset-0 opacity-[0.42] mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 2.5%, #fffff8 40%, #ffc8d7 97.8%)",
            }}
            aria-hidden
          />

          <div className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 ux1-left-step6-fade-in--settled">
            <AgentDotsContinuity step={1} gathering={false} />
          </div>

          {musicHandoff ? (
            <div
              className="left-ambient__voice left-step5-music-icon pointer-events-none ux1-left-step7-music-out"
              style={{
                animationDelay: `${UX1_STEP7_MUSIC_OUT_DELAY_S}s`,
                animationDuration: `${UX1_STEP7_MUSIC_OUT_ANIM_S}s`,
              }}
              aria-hidden
            >
              <RightStep4MusicIcon />
            </div>
          ) : null}

          {soundVisible ? (
            <div
              className={`left-step7-sound-slot left-ambient__voice--glow pointer-events-none ${
                entering
                  ? "ux1-left-step7-sound-in"
                  : "left-ambient__voice--settled"
              }`}
              style={
                entering
                  ? {
                      animationDuration: `${UX1_STEP7_SOUND_IN_ANIM_S}s`,
                    }
                  : undefined
              }
              aria-hidden
            >
              <VoiceRecorder active={soundVisible} compact />
            </div>
          ) : null}
        </div>
      ) : null}

      <LeftCompanionIconArcStep7
        step={step}
        arcIconsVisible={arcIconsVisible}
        entering={entering}
      />
    </>
  );
}
