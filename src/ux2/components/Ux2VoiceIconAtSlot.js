import Image from "next/image";
import BlurFade from "@/ux2/components/BlurFade";

/** 검색/인스타 슬롯 — 3단계 보이스 아이콘 */
export default function Ux2VoiceIconAtSlot({
  show = false,
  slotCenterX,
  slotCenterY,
  iconSizeCqw,
  toPct,
  className = "",
}) {
  return (
    <BlurFade
      show={show}
      className={`pointer-events-none absolute z-[18] -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        left: `${toPct(slotCenterX)}%`,
        top: `${toPct(slotCenterY)}%`,
        width: `${iconSizeCqw}cqw`,
        height: `${iconSizeCqw}cqw`,
      }}
    >
      <Image
        src="/figma/ux2/step0/voice-recorder.svg"
        alt=""
        fill
        className="object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.45)]"
        sizes="12vw"
      />
    </BlurFade>
  );
}
