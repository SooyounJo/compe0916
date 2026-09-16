"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import exitStyles from "@/ux2/styles/ux2Step11RightExit.module.css";
import {
  pctRight9,
  sizeCqwRight9,
  STEP9_RIGHT_BOOKMARK,
  STEP9_RIGHT_CARD_TITLE,
  STEP9_RIGHT_HEART,
  STEP9_RIGHT_MEMORY_CARD,
  STEP9_RIGHT_QR_BLOB,
  UX2_STEP9_MEMORY_CARD_PHOTO,
} from "@/ux2/lib/ux2Step9RightLayout";

/** Figma [50:522](https://www.figma.com/design/BeRQvUjf5ci89pXVH3bry5/Untitled?node-id=50-522) */
export default function RightCompanionStep9({
  show = false,
  cardPhotoSrc = UX2_STEP9_MEMORY_CARD_PHOTO,
  /** PNG에 타이틀·하트·북마크가 포함된 10단계 카드 */
  bakedCardChrome = false,
  /** 11단계: 중앙 사진만 아래로 sink + 블러 */
  exitDown = false,
}) {
  const card = STEP9_RIGHT_MEMORY_CARD;
  const qrSize = sizeCqwRight9(STEP9_RIGHT_QR_BLOB.size);
  const [sinkActive, setSinkActive] = useState(false);

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

  const shell = (
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
          src={cardPhotoSrc}
          alt=""
          fill
          className={
            bakedCardChrome
              ? "object-cover object-center"
              : "object-cover object-center scale-[1.06]"
          }
          sizes="40vw"
        />
      </div>

      {bakedCardChrome ? null : (
        <>
          <p
            className="absolute whitespace-nowrap text-[2.24cqw] font-bold leading-none text-white"
            style={{
              left: `${pctRight9(STEP9_RIGHT_CARD_TITLE.left)}%`,
              top: `${pctRight9(STEP9_RIGHT_CARD_TITLE.top)}%`,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            Wine party with my BF
          </p>

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pctRight9(STEP9_RIGHT_HEART.centerX)}%`,
              top: `${pctRight9(STEP9_RIGHT_HEART.centerY)}%`,
              width: `${sizeCqwRight9(STEP9_RIGHT_HEART.size)}%`,
              height: `${sizeCqwRight9(STEP9_RIGHT_HEART.size)}%`,
            }}
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
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pctRight9(STEP9_RIGHT_BOOKMARK.centerX)}%`,
              top: `${pctRight9(STEP9_RIGHT_BOOKMARK.centerY)}%`,
              width: `${sizeCqwRight9(STEP9_RIGHT_BOOKMARK.size)}%`,
              height: `${sizeCqwRight9(STEP9_RIGHT_BOOKMARK.size)}%`,
            }}
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
      )}

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pctRight9(STEP9_RIGHT_QR_BLOB.centerX)}%`,
          top: `${pctRight9(STEP9_RIGHT_QR_BLOB.centerY)}%`,
          width: `${qrSize}%`,
          height: `${qrSize}%`,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/figma/left-orbit/step6-music-blob.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
            sizes="18vw"
          />
          <Image
            src="/figma/ux2/web-search-icon.svg"
            alt=""
            width={96}
            height={96}
            className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>
    </>
  );

  if (exitDown) {
    if (!show) return null;
    return (
      <div className="pointer-events-none absolute inset-0 z-[14] overflow-hidden">
        {shell}
      </div>
    );
  }

  return (
    <BlurFade
      show={show}
      className="pointer-events-none absolute inset-0 z-[14] overflow-hidden"
    >
      {shell}
    </BlurFade>
  );
}
