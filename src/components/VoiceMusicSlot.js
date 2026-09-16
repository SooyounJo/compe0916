import VoiceRecorder from "@/components/VoiceRecorder";

const T =
  "transition-[transform,opacity,filter] duration-[1200ms] ease-[cubic-bezier(0.33,0,0.15,1)]";

const SLOT_CLASS =
  "absolute left-[8.55%] top-1/2 z-30 h-[7.37cqw] w-[7.37cqw] -translate-x-1/2 -translate-y-1/2";

/** 2~3 보이스 — 3末 gather·4初에 서서히 퇴장 (갑작 unmount 방지) */
export default function VoiceMusicSlot({ step, dotsGathering = false }) {
  if (step < 2 || step > 4) return null;

  const voiceActive =
    (step === 2 || step === 3) && !dotsGathering && step !== 4;

  return (
    <div
      className={`${SLOT_CLASS} ${
        voiceActive ? "voice-slot--glow" : ""
      }`}
      aria-hidden={step === 4}
    >
      <div
        className={`absolute inset-0 origin-center will-change-[transform,opacity,filter] ${T} ${
          voiceActive
            ? "scale-100 opacity-100 [filter:blur(0px)]"
            : "pointer-events-none scale-[0.28] opacity-0 [filter:blur(12px)]"
        }`}
      >
        <VoiceRecorder active={voiceActive} compact />
      </div>
    </div>
  );
}
