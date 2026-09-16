import Image from "next/image";
import {
  F,
  ICON_BLOB_CQW,
  LEFT_TEXT_GRADIENT,
} from "@/ux2/lib/ux2Step1Layout";

const TEXT_STYLE = {
  backgroundImage: LEFT_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 4px 73px rgba(255,255,255,0.8)",
};

/** Figma [55:148](https://www.figma.com/design/cXldlocGQQFUzuQBy7DTEn/-3-AI-Companion_2?node-id=55-148) */
export default function LeftCompanionStep1({ show = true }) {
  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      <div
        className="font-doto absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 text-center text-[4.79cqw] font-black leading-none tracking-[-0.04em]"
        style={TEXT_STYLE}
      >
        <p className="mb-0">Want to see more</p>
        <p>travel photos from 2022?</p>
      </div>

      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${((939.5 + 699.13) / F) * 100}%`,
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
            src="/figma/ux2/web-search-icon.svg"
            alt=""
            width={150}
            height={150}
            className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
