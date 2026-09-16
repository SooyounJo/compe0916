import LeftAmbientBackground from "@/ux2/components/LeftAmbientBackground";

export default function CompanionLeftBlob({
  step = 1,
  dotsGathering = false,
  className = "",
}) {
  return (
    <div
      className={`dual-blob__circle dual-blob__circle--left @container/left relative aspect-square overflow-hidden rounded-full bg-[#fff9f9] shadow-[0_8px_48px_rgba(0,0,0,0.45)] [container-type:size] ${className}`}
      role="img"
      aria-label="엠비언트 배경"
    >
      <LeftAmbientBackground step={step} dotsGathering={dotsGathering} />
    </div>
  );
}
