import VoiceRecorder from "@/components/VoiceRecorder";

/** 2~4 보이스 (5단계는 아이콘만 — 파형 없음) */
export default function LeftVoiceWineMorph({ step, voiceActive }) {
  return (
    <div className="left-ambient__voice">
      <VoiceRecorder active={voiceActive} compact />
    </div>
  );
}
