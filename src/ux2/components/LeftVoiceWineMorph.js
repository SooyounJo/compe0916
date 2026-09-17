import VoiceRecorder from "@/ux2/components/VoiceRecorder";

/** 2~4 보이스 (5단계는 아이콘만 — 파형 없음) */
export default function LeftVoiceWineMorph({ step, voiceActive }) {
  return (
    <div
      className={`left-ambient__voice ${
        voiceActive ? "left-ambient__voice--glow" : ""
      }`}
    >
      <VoiceRecorder active={voiceActive} compact />
    </div>
  );
}
