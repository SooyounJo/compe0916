import BlurFade from "./BlurFade";

const FOOTER_TEXT_CLASS =
  "font-doto absolute bottom-[11%] left-1/2 z-30 w-full -translate-x-1/2 px-4 text-center text-[4.65cqw] font-black leading-none tracking-[-0.04em]";

/** 6번 Party Night — 5단계 footer와 동일 위치·크기 */
export default function PartyNightScreen({ step }) {
  const show = step === 6;

  const titleStyle = {
    backgroundImage: "linear-gradient(180deg, #4600b7 0%, #020004 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 4px 73px rgba(255, 255, 255, 0.35)",
  };

  return (
    <BlurFade
      show={show}
      className="party-night-foreground pointer-events-none absolute inset-0 z-[35] overflow-hidden rounded-full"
    >
      <p className={FOOTER_TEXT_CLASS} style={titleStyle}>
        Party Night
      </p>
    </BlurFade>
  );
}
