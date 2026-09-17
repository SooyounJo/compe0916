import Image from "next/image";
import { ICON_BLOB_CQW } from "@/ux2/lib/ux2Step1Layout";
import tintStyles from "@/ux2/styles/icon-tint.module.css";

/** Figma icon blob — glass circle + inner glyph */
export default function Ux2IconBlob({
  iconSrc,
  iconSizePct = 42,
  iconClassName = "",
  iconFillColor,
  emphasized = false,
  className = "",
  style,
}) {
  const fill = iconFillColor?.toLowerCase();
  const useMaskFill = fill === "#9a93aa" || fill === "#ffffff";
  const maskGlyphClass =
    fill === "#ffffff" ? tintStyles.glyphWhiteFill : tintStyles.glyph9a93aa;

  return (
    <div
      className={`${emphasized ? tintStyles.blobEmphasis : ""} ${className}`}
      style={{
        width: `${ICON_BLOB_CQW}cqw`,
        height: `${ICON_BLOB_CQW}cqw`,
        ...style,
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src="/figma/left-orbit/step6-music-blob.svg"
          alt=""
          fill
          className={`blobGlass object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.28)]`}
          sizes="18vw"
        />
        {useMaskFill ? (
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${maskGlyphClass}`}
            style={{
              width: `${iconSizePct}%`,
              height: `${iconSizePct}%`,
              ["--ux2-icon-mask"]: `url(${iconSrc})`,
            }}
            aria-hidden
          />
        ) : (
          <Image
            src={iconSrc}
            alt=""
            width={118}
            height={117}
            className={`glyphWhite absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain ${iconClassName}`}
            style={{ width: `${iconSizePct}%`, height: `${iconSizePct}%` }}
          />
        )}
      </div>
    </div>
  );
}
