import VoiceRecorder from "@/components/VoiceRecorder";

/** 2~4 보이스 (5단계는 아이콘만 — 파형 없음) */
export default function LeftVoiceWineMorph({ step, voiceActive }) {
  return (
    <div
      className={`left-ambient__voice ${
        voiceActive ? "left-ambient__voice--glow" : ""
      }`}
    >
      <div
        className={`transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.33,0,0.15,1)] ${
          voiceActive
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-[0.78] blur-[4px]"
        }`}
      >
        <VoiceRecorder active={voiceActive} compact />
      </div>
    </div>
  );
}
