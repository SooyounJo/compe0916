import Image from "next/image";
import BlurFade from "@/components/BlurFade";
import {
  F,
  GLASS_CARD_GRADIENT,
  ICON_BLOB_CQW,
  RIGHT_TEXT_GRADIENT,
} from "@/ux2/lib/ux2Step1Layout";

const TEXT_STYLE = {
  backgroundImage: RIGHT_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

const glassBase =
  "absolute rounded-[4.5cqw] backdrop-blur-[1.15cqw] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.25)]";

/** Figma [18:427](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=18-427) */
export default function RightCompanionStep1({ show = true }) {
  return (
    <BlurFade show={show} className="pointer-events-none absolute inset-0 z-[12]">
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: `${(516 / F) * 100}%`,
          width: `${(1728 / F) * 100}%`,
          height: `${(839 / F) * 100}%`,
        }}
      >
        <div
          className={`${glassBase} opacity-35`}
          style={{
            left: 0,
            top: `${(144 / 839) * 100}%`,
            width: `${(450 / 1728) * 100}%`,
            height: `${(551 / 839) * 100}%`,
            backgroundImage: GLASS_CARD_GRADIENT,
          }}
        />
        <div
          className={glassBase}
          style={{
            left: `${(535 / 1728) * 100}%`,
            top: 0,
            width: `${(680 / 1728) * 100}%`,
            height: "100%",
            backgroundImage: GLASS_CARD_GRADIENT,
          }}
        />
        <div
          className={`${glassBase} opacity-30`}
          style={{
            left: `${(1300 / 1728) * 100}%`,
            top: `${(150.5 / 839) * 100}%`,
            width: `${(428 / 1728) * 100}%`,
            height: `${(538 / 839) * 100}%`,
            backgroundImage: GLASS_CARD_GRADIENT,
          }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${(16 / 1728) * 100}%`,
            width: `${ICON_BLOB_CQW}cqw`,
            height: `${ICON_BLOB_CQW}cqw`,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src="/figma/left-orbit/step6-music-blob.svg"
              alt=""
              fill
              className="object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]"
              sizes="18vw"
            />
            <Image
              src="/figma/ux2/instagram-icon.svg"
              alt=""
              width={118}
              height={117}
              className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      <div
        className="font-doto absolute left-1/2 w-[88%] -translate-x-1/2 text-center text-[4.79cqw] font-black leading-none tracking-[-0.04em]"
        style={{
          top: `${(1457 / F) * 100}%`,
          ...TEXT_STYLE,
        }}
      >
        <p className="mb-0">Take a walk down</p>
        <p>memory lane</p>
      </div>
    </BlurFade>
  );
}
