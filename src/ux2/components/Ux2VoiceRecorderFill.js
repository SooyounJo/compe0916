import VoiceRecorder from "@/ux2/components/VoiceRecorder";

/**
 * UX1 보이스 슬롯 — 파형 pulse + voice-slot / ambient glow
 * @param {"slot"|"ambient"|"none"} glowVariant
 */
export default function Ux2VoiceRecorderFill({
  active = true,
  glow = true,
  glowVariant = "slot",
  className = "",
}) {
  const glowClass =
    active && glow
      ? glowVariant === "ambient"
        ? "left-ambient__voice left-ambient__voice--glow"
        : glowVariant === "slot"
          ? "voice-slot--glow"
          : ""
      : glowVariant === "ambient"
        ? "left-ambient__voice"
        : "";

  return (
    <div className={`relative h-full w-full ${glowClass} ${className}`.trim()}>
      <VoiceRecorder active={active} fill />
    </div>
  );
}
