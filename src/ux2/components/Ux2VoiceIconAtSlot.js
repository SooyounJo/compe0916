import BlurFade from "@/ux2/components/BlurFade";
import Ux2VoiceRecorderFill from "@/ux2/components/Ux2VoiceRecorderFill";

/** 검색/인스타 슬롯 — 3단계 보이스 아이콘 (UX1 VoiceRecorder 모션) */
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
      <Ux2VoiceRecorderFill active={show} glowVariant="slot" />
    </BlurFade>
  );
}
