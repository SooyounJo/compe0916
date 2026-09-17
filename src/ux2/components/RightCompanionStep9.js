"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Ux2Ux1Step7CenterLoadingDots from "@/ux2/components/Ux2Ux1Step7CenterLoadingDots";
import { UX2_STEP9_RIGHT_LOADING_BEFORE_CARD_MS } from "@/ux2/lib/ux2Step9RightEnter";
import { UX2_STEP910_CARD_CROSSFADE_MS } from "@/ux2/lib/ux2Step910Crossfade";
import { useUx2Step910Crossfade } from "@/ux2/lib/useUx2Step910Crossfade";
import exitStyles from "@/ux2/styles/ux2Step11RightExit.module.css";
import enterStyles from "@/ux2/styles/ux2Step9RightCardEnter.module.css";
import {
  pctRight9,
  sizeCqwRight9,
  STEP9_RIGHT_BOOKMARK,
  STEP9_RIGHT_CARD_TITLE,
  STEP9_RIGHT_HEART,
  STEP9_RIGHT_MEMORY_CARD,
  UX2_STEP9_MEMORY_CARD_PHOTO,
} from "@/ux2/lib/ux2Step9RightLayout";
import { UX2_STEP10_MEMORY_CARD_PHOTO } from "@/ux2/lib/ux2Step10RightLayout";
import crossfadeStyles from "@/ux2/styles/ux2Step910PhotoCrossfade.module.css";

/** Figma [50:522](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-522) */
export default function RightCompanionStep9({
  show = false,
  flowStep = 9,
  exitDown = false,
  cardSlideFromLeft = false,
}) {
  const showTenCard = useUx2Step910Crossfade(flowStep);
  const isStep9Entry = flowStep === 9;
  const crossfadeVars = {
    "--ux2-step910-crossfade-ms": `${UX2_STEP910_CARD_CROSSFADE_MS}ms`,
    "--ux2-step910-chrome-ms": `${Math.round(UX2_STEP910_CARD_CROSSFADE_MS * 0.78)}ms`,
  };
  const card = STEP9_RIGHT_MEMORY_CARD;
  const [cardsReady, setCardsReady] = useState(!isStep9Entry);
  const [sinkActive, setSinkActive] = useState(false);
  const [slideActive, setSlideActive] = useState(false);

  useEffect(() => {
    if (!show || !isStep9Entry) {
      setCardsReady(!isStep9Entry);
      return undefined;
    }

    setCardsReady(false);
    const timer = setTimeout(
      () => setCardsReady(true),
      UX2_STEP9_RIGHT_LOADING_BEFORE_CARD_MS,
    );
    return () => clearTimeout(timer);
  }, [show, isStep9Entry]);

  useEffect(() => {
    if (!show || !exitDown) {
      setSinkActive(false);
      return undefined;
    }
    setSinkActive(false);
    let innerId = 0;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => setSinkActive(true));
    });
    return () => {
      cancelAnimationFrame(outerId);
      cancelAnimationFrame(innerId);
    };
  }, [show, exitDown]);

  useEffect(() => {
    if (!show || !cardSlideFromLeft || !cardsReady) {
      setSlideActive(false);
      return undefined;
    }
    setSlideActive(false);
    let innerId = 0;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => setSlideActive(true));
    });
    return () => {
      cancelAnimationFrame(outerId);
      cancelAnimationFrame(innerId);
    };
  }, [show, cardSlideFromLeft, cardsReady]);

  if (!show) {
    return null;
  }

  const cardCluster = (
    <>
      <div
        className={`absolute overflow-hidden bg-[#1a1210] shadow-[0_12px_48px_rgba(0,0,0,0.28)] ${
          exitDown ? exitStyles.photoSink : ""
        } ${exitDown && sinkActive ? exitStyles.photoSinkActive : ""}`}
        style={{
          left: `${pctRight9(card.left)}%`,
          top: `${pctRight9(card.top)}%`,
          width: `${sizeCqwRight9(card.width)}%`,
          height: `${sizeCqwRight9(card.height)}%`,
          borderRadius: `${card.radiusCqw}cqw`,
          ...crossfadeVars,
        }}
      >
        <Image
          src={UX2_STEP9_MEMORY_CARD_PHOTO}
          alt=""
          fill
          className={`object-cover object-center scale-[1.06] ${crossfadeStyles.cardPhotoLayer} ${crossfadeStyles.cardPhotoNine} ${
            showTenCard
              ? crossfadeStyles.cardPhotoHidden
              : crossfadeStyles.cardPhotoVisible
          }`}
          sizes="40vw"
        />
        <Image
          src={UX2_STEP10_MEMORY_CARD_PHOTO}
          alt=""
          fill
          className={`object-cover object-center ${crossfadeStyles.cardPhotoLayer} ${crossfadeStyles.cardPhotoTen} ${
            showTenCard
              ? crossfadeStyles.cardPhotoVisible
              : crossfadeStyles.cardPhotoHidden
          }`}
          sizes="40vw"
        />
      </div>

      <>
        <p
          className={`absolute whitespace-nowrap text-[2.24cqw] font-bold leading-none text-white ${crossfadeStyles.cardChrome} ${
            showTenCard
              ? crossfadeStyles.cardChromeHidden
              : crossfadeStyles.cardChromeVisible
          }`}
          style={{
            left: `${pctRight9(STEP9_RIGHT_CARD_TITLE.left)}%`,
            top: `${pctRight9(STEP9_RIGHT_CARD_TITLE.top)}%`,
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
          aria-hidden={showTenCard}
        >
          Wine party with my BF
        </p>

        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${crossfadeStyles.cardChrome} ${
            showTenCard
              ? crossfadeStyles.cardChromeHidden
              : crossfadeStyles.cardChromeVisible
          }`}
          style={{
            left: `${pctRight9(STEP9_RIGHT_HEART.centerX)}%`,
            top: `${pctRight9(STEP9_RIGHT_HEART.centerY)}%`,
            width: `${sizeCqwRight9(STEP9_RIGHT_HEART.size)}%`,
            height: `${sizeCqwRight9(STEP9_RIGHT_HEART.size)}%`,
          }}
          aria-hidden={showTenCard}
        >
          <Image
            src="/figma/ux2/step2/59df8.svg"
            alt=""
            fill
            className="object-contain"
            sizes="8vw"
          />
        </div>

        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${crossfadeStyles.cardChrome} ${
            showTenCard
              ? crossfadeStyles.cardChromeHidden
              : crossfadeStyles.cardChromeVisible
          }`}
          style={{
            left: `${pctRight9(STEP9_RIGHT_BOOKMARK.centerX)}%`,
            top: `${pctRight9(STEP9_RIGHT_BOOKMARK.centerY)}%`,
            width: `${sizeCqwRight9(STEP9_RIGHT_BOOKMARK.size)}%`,
            height: `${sizeCqwRight9(STEP9_RIGHT_BOOKMARK.size)}%`,
          }}
          aria-hidden={showTenCard}
        >
          <Image
            src="/figma/ux2/step2/52235.svg"
            alt=""
            fill
            className="object-contain"
            sizes="8vw"
          />
        </div>
      </>
    </>
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden">
      {isStep9Entry && !cardsReady ? (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[16] -translate-x-1/2 -translate-y-1/2">
          <Ux2Ux1Step7CenterLoadingDots white />
        </div>
      ) : null}
      {cardsReady ? (
        cardSlideFromLeft ? (
          <div
            className={`absolute inset-0 ${enterStyles.cardGroup} ${
              slideActive ? enterStyles.cardGroupActive : ""
            }`}
          >
            {cardCluster}
          </div>
        ) : (
          cardCluster
        )
      ) : null}
    </div>
  );
}
