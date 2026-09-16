"use client";

import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";
import {
  pctLeft6,
  sizeCqwLeft6,
  STEP6_LEFT_DOTS,
  STEP6_LEFT_MUSIC,
  STEP6_LEFT_ORBIT_A,
  STEP6_LEFT_ORBIT_B,
  STEP6_LEFT_ORBIT_C,
} from "@/ux2/lib/ux2Step6LeftLayout";
import {
  pctLeft7,
  sizeCqwLeft7,
  STEP7_LEFT_MUSIC_BLOB,
} from "@/ux2/lib/ux2Step7LeftLayout";

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
        <Image src={blobSrc} alt="" fill className="object-contain" sizes="16vw" />
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
  const musicLayout = step7Plus ? STEP7_LEFT_MUSIC_BLOB : STEP6_LEFT_MUSIC;
  const musicPct = step7Plus ? pctLeft7 : pctLeft6;
  const musicSizeCqw = step7Plus ? sizeCqwLeft7 : sizeCqwLeft6;

  return (
    <BlurFade
      show={show}
      className="party-night-foreground pointer-events-none absolute inset-0 z-[6] overflow-hidden"
    >
      {showCenterDots ? (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: `${pctLeft6(STEP6_LEFT_DOTS.top)}%`,
            width: `${pctLeft6(STEP6_LEFT_DOTS.width)}%`,
            height: `${pctLeft6(STEP6_LEFT_DOTS.height)}%`,
          }}
        >
          <Image
            src="/figma/left-orbit/step6-dots.svg"
            alt=""
            fill
            className="object-contain"
            sizes="20vw"
          />
        </div>
      ) : null}

      <OrbitIcon
        layout={musicLayout}
        blobSrc="/figma/left-orbit/step6-music-blob.svg"
        iconSrc="/figma/left-orbit/step6-music-note.svg"
        iconScale={0.31}
        pct={musicPct}
        sizeCqw={musicSizeCqw}
      />
      {!step7Plus ? (
        <>
          <OrbitIcon
            layout={STEP6_LEFT_ORBIT_A}
            blobSrc="/figma/ux2/step4/gallery-blob.svg"
            iconSrc="/figma/icon-orbit-people.svg"
            iconScale={0.38}
          />
          <OrbitIcon
            layout={STEP6_LEFT_ORBIT_B}
            blobSrc="/figma/ux2/step4/bookmark-blob.svg"
            iconSrc={null}
          />
          <OrbitIcon
            layout={STEP6_LEFT_ORBIT_C}
            blobSrc="/figma/ux2/step4/edit-blob.svg"
            iconSrc={null}
          />
        </>
      ) : null}
    </BlurFade>
  );
}
