import Ux2IconBlob from "@/ux2/components/Ux2IconBlob";

/** 0 정착 후 ~3단계 — BlurFade 없이 동일 DOM 유지 */
export default function Ux2InstagramIconPersist({
  show = false,
  slotCenterX,
  slotCenterY,
  blobSizeCqw,
  toPct,
  className = "",
  instagramIconClassName = "",
  iconFillColor,
  emphasized = false,
  blueTint = false,
}) {
  if (!show) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute z-[18] -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        left: `${toPct(slotCenterX)}%`,
        top: `${toPct(slotCenterY)}%`,
        width: `${blobSizeCqw}cqw`,
        height: `${blobSizeCqw}cqw`,
      }}
    >
      <Ux2IconBlob
        iconSrc="/figma/ux2/instagram-icon.svg"
        iconSizePct={42}
        iconClassName={instagramIconClassName}
        iconFillColor={iconFillColor}
        emphasized={emphasized}
        blueTint={blueTint}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
