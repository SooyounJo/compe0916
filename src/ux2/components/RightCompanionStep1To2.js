"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BlurFade from "@/ux2/components/BlurFade";
import { GLASS_CARD_GRADIENT, RIGHT_TEXT_GRADIENT, STEP2_TITLE_GRADIENT } from "@/ux2/lib/ux2Step1Layout";
import { UX2_RIGHT_GLYPH_IMG_CLASS } from "@/ux2/lib/ux2RightIconFill";
import {
  BLOB_ORIGIN_PCT,
  MORPH_CARDS,
  STEP1_TITLE_BAND,
  STEP2_TITLE_BAND,
  feedSlotForContent,
  STEP1_CARD_INTRO_RANK,
  STEP1_CARD_INTRO_SHIFT_CQW,
  STEP1_CARD_INTRO_STAGGER_MS,
  step2SlotRect,
} from "@/ux2/lib/ux2Step1To2Morph";
import { pctInCircle } from "@/ux2/lib/ux2Step2RightFeed";
import RightCompanionStep3Overlay from "@/ux2/components/RightCompanionStep3Overlay";
import cardStyles from "@/ux2/styles/step1-to2-cards.module.css";

const STEP3_FEED_EXIT_DELAY_MS = 120;
/** 화면 좌→중→우 슬롯 순차 퇴장 간격 */
const STEP3_EXIT_STAGGER_MS = 420;
const STEP3_CARD_EXIT_MS = 1050;
const STEP3_OVERLAY_IN_MS =
  STEP3_FEED_EXIT_DELAY_MS +
  STEP3_EXIT_STAGGER_MS * 2 +
  STEP3_CARD_EXIT_MS +
  80;

const FEED_SLOT_EXIT_RANK = { left: 0, center: 1, right: 2 };

const TEXT1 = {
  backgroundImage: RIGHT_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const TEXT2 = {
  backgroundImage: STEP2_TITLE_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const STEP2_HERO_VIDEO = "/video/ux2-step2-center.mp4";
const STEP2_HERO_VIDEO_DELAY_MS = 2000;
/** 중앙 영상 재생 후 좌·우 사진이 차례로 중앙으로 넘어가는 간격 */
const STEP2_CAROUSEL_AFTER_VIDEO_MS = 3600;

function HeroCenterMedia({ showPhoto, heroVideoActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (heroVideoActive) {
      video.currentTime = 0;
      void video.play().catch(() => {});
      return undefined;
    }

    video.pause();
    return undefined;
  }, [heroVideoActive]);

  if (!showPhoto) {
    return null;
  }

  return (
    <>
      <div
        className={cardStyles.mediaLayer}
        style={{ opacity: heroVideoActive ? 0 : 1 }}
        aria-hidden={heroVideoActive}
      >
        <Image
          src="/figma/ux2/step2/60ba9.png"
          alt=""
          fill
          className="object-cover"
          sizes="32vw"
        />
      </div>
      <div
        className={cardStyles.mediaLayer}
        style={{ opacity: heroVideoActive ? 1 : 0 }}
        aria-hidden={!heroVideoActive}
      >
        <video
          ref={videoRef}
          src={STEP2_HERO_VIDEO}
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </>
  );
}

function SideFeedChrome() {
  return (
    <>
      <div className="absolute inset-x-0 top-[6%] flex items-center gap-[1cqw] px-[3cqw]">
        <Image
          src="/figma/ux2/step2/a5eeb.png"
          alt=""
          width={46}
          height={46}
          className="h-[2.4cqw] w-[2.4cqw] rounded-full object-cover"
        />
        <span className="font-haas text-[1.41cqw] font-bold text-white">
          Seven Sisters 1020
        </span>
        <Image
          src="/figma/ux2/step2/cf610.svg"
          alt=""
          width={31}
          height={8}
          className={`ml-auto h-[0.41cqw] w-[1.65cqw] ${UX2_RIGHT_GLYPH_IMG_CLASS}`}
        />
      </div>
      <div className="absolute bottom-[3.5%] right-[3.5%] flex items-center gap-[1.2cqw]">
        <Image
          src="/figma/ux2/step2/59df8.svg"
          alt=""
          width={64}
          height={64}
          className={`h-[3.4cqw] w-[3.4cqw] ${UX2_RIGHT_GLYPH_IMG_CLASS}`}
        />
        <Image
          src="/figma/ux2/step2/52235.svg"
          alt=""
          width={49}
          height={49}
          className={`h-[2.62cqw] w-[2.62cqw] ${UX2_RIGHT_GLYPH_IMG_CLASS}`}
        />
      </div>
    </>
  );
}

function HeroFeedChrome() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 flex items-center gap-[1.2cqw] bg-gradient-to-b from-white/55 to-transparent px-[2.4cqw] py-[1.8cqw]">
        <Image
          src="/figma/ux2/step2/379a8.png"
          alt=""
          width={56}
          height={56}
          className="h-[2.98cqw] w-[2.98cqw] rounded-full object-cover"
        />
        <span className="font-haas text-[2.23cqw] font-bold text-white drop-shadow-sm">
          Seven Sisters 1020
        </span>
        <Image
          src="/figma/ux2/step2/699a8.svg"
          alt=""
          width={38}
          height={10}
          className={`ml-auto h-[0.5cqw] w-[2.02cqw] opacity-90 ${UX2_RIGHT_GLYPH_IMG_CLASS}`}
        />
      </div>
      <div className="absolute bottom-[2.4cqw] right-[2.4cqw] flex items-center gap-[1.6cqw]">
        <Image
          src="/figma/ux2/step2/523b7.svg"
          alt=""
          width={78}
          height={78}
          className={`h-[4.15cqw] w-[4.15cqw] ${UX2_RIGHT_GLYPH_IMG_CLASS}`}
        />
        <Image
          src="/figma/ux2/step2/eab56.svg"
          alt=""
          width={61}
          height={61}
          className={`h-[3.24cqw] w-[3.24cqw] ${UX2_RIGHT_GLYPH_IMG_CLASS}`}
        />
      </div>
    </>
  );
}

function MorphCard({
  card,
  step,
  morphToFeed,
  emergeFromBlob,
  step1PopDelayMs,
  heroVideoActive,
  carouselRotation,
  feedExitStage = -1,
}) {
  const atFeed = step === 2 && morphToFeed;
  const leftCardGlassFlow =
    card.key === "left" && step === 1 && !emergeFromBlob && !morphToFeed;
  const feedSlot = atFeed
    ? feedSlotForContent(card.key, carouselRotation)
    : card.key;
  const rect = atFeed ? step2SlotRect(feedSlot) : card.step1;
  const showPhoto = atFeed && !emergeFromBlob;
  const isHero = atFeed && feedSlot === "center";
  const slotRank = FEED_SLOT_EXIT_RANK[feedSlot] ?? 0;
  const exitLeft =
    feedExitStage >= 0 && feedExitStage >= slotRank && atFeed;
  const step1Layout = step === 1 && !morphToFeed && !emergeFromBlob;
  const introShiftCqw = STEP1_CARD_INTRO_SHIFT_CQW[card.key] ?? 48;
  const playStep1Pop = step1Layout;

  return (
    <div
      className={`${cardStyles.card} ${atFeed ? cardStyles.cardAtFeed : ""} ${
        emergeFromBlob ? cardStyles.cardBlurPeak : ""
      } ${exitLeft ? cardStyles.cardExitLeft : ""} ${
        playStep1Pop ? cardStyles.cardStep1PopIn : ""
      }`}
      style={{
        left: `${emergeFromBlob ? BLOB_ORIGIN_PCT.x : rect.left}%`,
        top: `${emergeFromBlob ? BLOB_ORIGIN_PCT.y : rect.top}%`,
        width: emergeFromBlob ? "14.2cqw" : `${rect.width}%`,
        height: emergeFromBlob ? "14.2cqw" : `${rect.height}%`,
        opacity: emergeFromBlob ? 0.55 : rect.opacity,
        borderRadius: `${rect.radiusCqw}cqw`,
        transform: emergeFromBlob
          ? "translate(-50%, -50%) scale(0.72)"
          : playStep1Pop
            ? undefined
            : "translateX(0) scale(1)",
        "--intro-shift": `-${introShiftCqw}cqw`,
        "--intro-opacity": rect.opacity,
        animationDelay: playStep1Pop ? `${step1PopDelayMs}ms` : undefined,
        zIndex: isHero ? 4 : 2,
      }}
    >
      <div
        className={`${cardStyles.glassLayer} ${
          leftCardGlassFlow ? cardStyles.glassLayerFlow : ""
        }`}
        style={{
          opacity: showPhoto ? 0 : 1,
          backgroundImage: GLASS_CARD_GRADIENT,
          borderRadius: `${rect.radiusCqw}cqw`,
        }}
      />
      <div
        className={`${cardStyles.photoLayer} relative min-h-0`}
        style={{ opacity: showPhoto ? 1 : 0 }}
      >
        {card.key === "center" ? (
          <HeroCenterMedia
            showPhoto={showPhoto}
            heroVideoActive={heroVideoActive}
          />
        ) : (
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover"
            sizes="22vw"
          />
        )}
        {showPhoto && isHero ? <HeroFeedChrome /> : null}
        {showPhoto && !isHero ? <SideFeedChrome /> : null}
      </div>
    </div>
  );
}

/** Figma 18:427 → 1:897 — 글래스 3장이 블롭에서 펼쳐지며 피드 카드로 모프; 3에서 피드 좌측 퇴장 */
export default function RightCompanionStep1To2({ step = 1 }) {
  const [holdStep3Feed, setHoldStep3Feed] = useState(false);
  const visible =
    step === 1 || step === 2 || step === 3 || holdStep3Feed;
  const uiStep =
    step === 3 || (step === 4 && holdStep3Feed) ? 2 : step;
  const uiFeedStep =
    step === 3 || (step === 4 && holdStep3Feed) ? 3 : step;
  const [morphToFeed, setMorphToFeed] = useState(step === 2 || step === 3);
  const [emergeFromBlob, setEmergeFromBlob] = useState(false);
  const [heroVideoActive, setHeroVideoActive] = useState(false);
  const [carouselRotation, setCarouselRotation] = useState(step === 3 ? 2 : 0);
  const [feedExitStage, setFeedExitStage] = useState(-1);
  const [showStep3Overlay, setShowStep3Overlay] = useState(false);
  const [step1PopCycle, setStep1PopCycle] = useState(0);

  useLayoutEffect(() => {
    if (step === 1) {
      setStep1PopCycle((c) => c + 1);
    }
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      setHoldStep3Feed(false);
      setMorphToFeed(true);
      setEmergeFromBlob(false);
      setHeroVideoActive(false);
      setCarouselRotation(2);
      setFeedExitStage(-1);
      setShowStep3Overlay(false);

      const stageTimers = [0, 1, 2].map((stage) =>
        setTimeout(() => {
          setFeedExitStage(stage);
        }, STEP3_FEED_EXIT_DELAY_MS + stage * STEP3_EXIT_STAGGER_MS),
      );
      const overlayTimer = setTimeout(() => {
        setShowStep3Overlay(true);
      }, STEP3_OVERLAY_IN_MS);

      return () => {
        stageTimers.forEach(clearTimeout);
        clearTimeout(overlayTimer);
      };
    }

    if (step === 4) {
      setShowStep3Overlay(false);
      setHoldStep3Feed(false);
      setFeedExitStage(-1);
      setMorphToFeed(false);
      return undefined;
    }

    setHoldStep3Feed(false);
    setFeedExitStage(-1);
    setShowStep3Overlay(false);

    if (step === 2) {
      setMorphToFeed(false);
      setEmergeFromBlob(true);
      const emergeId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEmergeFromBlob(false);
          setMorphToFeed(true);
        });
      });
      return () => cancelAnimationFrame(emergeId);
    }
    setMorphToFeed(false);
    setEmergeFromBlob(false);
    return undefined;
  }, [step]);

  useEffect(() => {
    if (step !== 2 || !morphToFeed) {
      setHeroVideoActive(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      setHeroVideoActive(true);
    }, STEP2_HERO_VIDEO_DELAY_MS);

    return () => clearTimeout(timer);
  }, [step, morphToFeed]);

  useEffect(() => {
    if (!heroVideoActive) {
      if (step !== 3) {
        setCarouselRotation(0);
      }
      return undefined;
    }

    const flip1 = setTimeout(() => {
      setCarouselRotation(1);
    }, STEP2_CAROUSEL_AFTER_VIDEO_MS);
    const flip2 = setTimeout(() => {
      setCarouselRotation(2);
    }, STEP2_CAROUSEL_AFTER_VIDEO_MS * 2);

    return () => {
      clearTimeout(flip1);
      clearTimeout(flip2);
    };
  }, [heroVideoActive, step]);

  useEffect(() => {
    if (step !== 2 && step !== 3) {
      setCarouselRotation(0);
    }
  }, [step]);

  return (
    <BlurFade
      show={visible}
      className="pointer-events-none absolute inset-0 z-[12] overflow-hidden"
    >
      <div className="absolute inset-0">
        {MORPH_CARDS.map((card) => (
          <MorphCard
            key={`${card.key}-${step1PopCycle}`}
            card={card}
            step={uiStep}
            morphToFeed={morphToFeed}
            emergeFromBlob={emergeFromBlob}
            step1PopDelayMs={
              (STEP1_CARD_INTRO_RANK[card.key] ?? 0) *
              STEP1_CARD_INTRO_STAGGER_MS
            }
            heroVideoActive={
              card.key === "center" &&
              heroVideoActive &&
              carouselRotation === 0
            }
            carouselRotation={carouselRotation}
            feedExitStage={uiFeedStep === 3 ? feedExitStage : -1}
          />
        ))}

        <BlurFade
          show={uiStep === 1}
          className="pointer-events-none absolute inset-0"
        >
        <div
          className="absolute flex items-start justify-center px-[6%] pt-[0.6cqw]"
          style={{
            left: `${pctInCircle(STEP1_TITLE_BAND.left)}%`,
            top: `${pctInCircle(STEP1_TITLE_BAND.top)}%`,
            width: `${pctInCircle(STEP1_TITLE_BAND.width)}%`,
            height: `${pctInCircle(STEP1_TITLE_BAND.height)}%`,
          }}
        >
          <div
            className="font-doto text-center text-[4.79cqw] font-black leading-none tracking-[-0.04em]"
            style={TEXT1}
          >
            <p className="mb-0">Take a walk down</p>
            <p>memory lane</p>
          </div>
        </div>
        </BlurFade>

        <BlurFade
          show={uiStep === 2 && morphToFeed && step !== 4}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className={`absolute flex items-end justify-center pb-[0.4cqw] ${
              feedExitStage >= 2 ? cardStyles.step3TitleExit : ""
            }`}
            style={{
              left: `${pctInCircle(STEP2_TITLE_BAND.left)}%`,
              top: `${pctInCircle(STEP2_TITLE_BAND.top)}%`,
              width: `${pctInCircle(STEP2_TITLE_BAND.width)}%`,
              height: `${pctInCircle(STEP2_TITLE_BAND.height)}%`,
            }}
          >
            <p
              className="font-doto text-center text-[4.26cqw] font-black leading-none tracking-[-0.04em]"
              style={TEXT2}
            >
              Our 2022
            </p>
          </div>
        </BlurFade>
      </div>

      <RightCompanionStep3Overlay
        show={step === 3 && showStep3Overlay}
      />
    </BlurFade>
  );
}
