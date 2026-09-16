import BlurFade from "./BlurFade";

/** Figma 17:1709 — 6번 Party Night 타이틀 (와인은 OrbitWinePersist) */
export default function PartyNightScreen({ step }) {
  const show = step >= 6;

  const titleStyle = {
    backgroundImage: "linear-gradient(180deg, #4600b7 0%, #020004 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 4px 73px rgba(255,255,255,0.35)",
  };

  return (
    <BlurFade
      show={show}
      className="party-night-foreground pointer-events-none absolute inset-0 z-[35] overflow-hidden rounded-full"
    >
      <p
        className="font-doto absolute left-1/2 top-[79%] w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center text-[4.79cqw] font-black leading-none tracking-[-0.04em]"
        style={titleStyle}
      >
        Party Night
      </p>
    </BlurFade>
  );
}
