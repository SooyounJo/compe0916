"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const atTenPlus = flowStep >= 10;
  const card = STEP9_RIGHT_MEMORY_CARD;
  const [sinkActive, setSinkActive] = useState(false);
  const [slideActive, setSlideActive] = useState(false);

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
    if (!show || !cardSlideFromLeft) {
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
  }, [show, cardSlideFromLeft]);

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
        }}
      >
        <Image
          src={UX2_STEP9_MEMORY_CARD_PHOTO}
          alt=""
          fill
          className={`object-cover object-center scale-[1.06] ${crossfadeStyles.cardPhoto} ${
            atTenPlus
              ? crossfadeStyles.cardPhotoHidden
              : crossfadeStyles.cardPhotoVisible
          }`}
          sizes="40vw"
        />
        <Image
          src={UX2_STEP10_MEMORY_CARD_PHOTO}
          alt=""
          fill
          className={`object-cover object-center ${crossfadeStyles.cardPhoto} ${
            atTenPlus
              ? crossfadeStyles.cardPhotoVisible
              : crossfadeStyles.cardPhotoHidden
          }`}
          sizes="40vw"
        />
      </div>

      <>
        <p
          className={`absolute whitespace-nowrap text-[2.24cqw] font-bold leading-none text-white ${crossfadeStyles.cardChrome} ${
            atTenPlus
              ? crossfadeStyles.cardChromeHidden
              : crossfadeStyles.cardChromeVisible
          }`}
          style={{
            left: `${pctRight9(STEP9_RIGHT_CARD_TITLE.left)}%`,
            top: `${pctRight9(STEP9_RIGHT_CARD_TITLE.top)}%`,
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
          aria-hidden={atTenPlus}
        >
          Wine party with my BF
        </p>

        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${crossfadeStyles.cardChrome} ${
            atTenPlus
              ? crossfadeStyles.cardChromeHidden
              : crossfadeStyles.cardChromeVisible
          }`}
          style={{
            left: `${pctRight9(STEP9_RIGHT_HEART.centerX)}%`,
            top: `${pctRight9(STEP9_RIGHT_HEART.centerY)}%`,
            width: `${sizeCqwRight9(STEP9_RIGHT_HEART.size)}%`,
            height: `${sizeCqwRight9(STEP9_RIGHT_HEART.size)}%`,
          }}
          aria-hidden={atTenPlus}
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
            atTenPlus
              ? crossfadeStyles.cardChromeHidden
              : crossfadeStyles.cardChromeVisible
          }`}
          style={{
            left: `${pctRight9(STEP9_RIGHT_BOOKMARK.centerX)}%`,
            top: `${pctRight9(STEP9_RIGHT_BOOKMARK.centerY)}%`,
            width: `${sizeCqwRight9(STEP9_RIGHT_BOOKMARK.size)}%`,
            height: `${sizeCqwRight9(STEP9_RIGHT_BOOKMARK.size)}%`,
          }}
          aria-hidden={atTenPlus}
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
      {cardSlideFromLeft ? (
        <div
          className={`absolute inset-0 ${enterStyles.cardGroup} ${
            slideActive ? enterStyles.cardGroupActive : ""
          }`}
        >
          {cardCluster}
        </div>
      ) : (
        cardCluster
      )}
    </div>
  );
}
